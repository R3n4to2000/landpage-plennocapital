import { writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const target = await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' }).then(r => r.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
const pending = new Map();
const errors = [];
let id = 0;
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') errors.push(message.params.entry);
  if (message.method === 'Network.loadingFailed' && !message.params.canceled) errors.push(message.params);
  if (message.id) {
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    clearTimeout(entry.timer);
    message.error ? entry.reject(new Error(JSON.stringify(message.error))) : entry.resolve(message.result);
  }
};
function cdp(method, params = {}) {
  return new Promise((resolve, reject) => {
    const request = ++id;
    const timer = setTimeout(() => reject(new Error(`Timeout: ${method}`)), 15000);
    pending.set(request, { resolve, reject, timer });
    socket.send(JSON.stringify({ id: request, method, params }));
  });
}
async function evaluate(expression) {
  const result = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitFor(expression) {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (await evaluate(expression)) return;
    await delay(100);
  }
  throw new Error(`Condition failed: ${expression}`);
}
async function viewport(width, height = 900) {
  await cdp('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
}
async function reduced(value) {
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: value ? 'reduce' : 'no-preference' }] });
}
async function load() {
  await cdp('Page.navigate', { url: 'http://127.0.0.1:5173/' });
  await waitFor("document.querySelector('.counter-value') && [...document.images].every(image => image.complete)");
}
async function click(selector) {
  const point = await evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
}
async function key(key, code, virtualKey) {
  await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: virtualKey, ...(key === 'Enter' ? { text: '\r' } : {}) });
  await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: virtualKey });
}
const expected = ['+R$ 2,3 bi', '+6.500', '+20 anos', '98%'];
const counters = "[...document.querySelectorAll('.counter-value')].map(n=>n.textContent)";
try {
  await cdp('Page.enable');
  await cdp('Runtime.enable');
  await cdp('Log.enable');
  await cdp('Network.enable');
  await reduced(true);
  await viewport(1440);
  await load();
  const widths = [320,360,375,390,430,768,1024,1280,1440,1920];
  const layouts = [];
  for (const width of widths) {
    await viewport(width);
    await delay(80);
    const layout = await evaluate(`(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll('body *')].filter(el => {
        const r=el.getBoundingClientRect(); const style=getComputedStyle(el);
        return r.width && (r.right>innerWidth+1 || r.left < -1) && style.position !== 'absolute';
      }).map(el => ({tag:el.tagName,class:el.className,width:el.getBoundingClientRect().width})),
      headingFits: [...document.querySelectorAll('h1 span,h2,h3')].every(el => el.scrollWidth<=el.clientWidth+1),
    }))()`);
    assert(layout.document <= width, `Document overflow at ${width}: ${JSON.stringify(layout)}`);
    assert.equal(layout.overflow.length, 0, `Element overflow at ${width}: ${JSON.stringify(layout.overflow)}`);
    layouts.push({ width, overflow: false });
  }
  assert.deepEqual(await evaluate(counters), expected);
  const reducedBars = await evaluate("[...document.querySelectorAll('.comparison-bars span')].map(el=>getComputedStyle(el,'::after').transform)");
  assert(reducedBars.every(value => value === 'matrix(1, 0, 0, 1, 0, 0)'));
  assert.equal(await evaluate("[...document.querySelectorAll('.reveal,.reveal-group>*')].every(el=>getComputedStyle(el).opacity==='1')"), true);
  assert.equal(await evaluate("document.querySelector('.hero-image').getAnimations().length"), 0);
  assert.equal(await evaluate("document.querySelector('.site-footer>a[href^=\"mailto:\"]').getAttribute('href')"), 'mailto:administrativo@plennocapital.com');
  assert.equal(await evaluate("document.querySelector('.final-cta .cta-button').href"), 'https://wa.me/556283045044');

  await viewport(360, 800);
  await evaluate("scrollTo({top:0,behavior:'instant'})");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#primary-navigation')).display"), 'none');
  await evaluate("document.querySelector('.menu-toggle').focus()");
  await key(' ', 'Space', 32);
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'true');
  await key('Tab', 'Tab', 9);
  assert.equal(await evaluate("document.activeElement.textContent"), 'Sobre');
  await key('Escape', 'Escape', 27);
  assert.equal(await evaluate("document.activeElement.className"), 'menu-toggle');
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'false');
  await click('.menu-toggle');
  await click('#primary-navigation a');
  assert.equal(await evaluate("location.hash"), '#sobre');
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), 'false');
  await evaluate("document.querySelector('.faq-item summary').focus()");
  await key('Enter', 'Enter', 13);
  assert.equal(await evaluate("document.querySelector('.faq-item').open"), true);
  await key('Enter', 'Enter', 13);
  assert.equal(await evaluate("document.querySelector('.faq-item').open"), false);

  await reduced(false);
  await viewport(360, 640);
  await load();
  await delay(200);
  assert.deepEqual(await evaluate(counters), ['+R$ 0,0 bi', '+0', '+0 anos', '0%']);
  const hiddenBars = await evaluate("[...document.querySelectorAll('.comparison-bars span')].map(el=>getComputedStyle(el,'::after').transform)");
  assert(hiddenBars.every(value=>value==='matrix(0, 0, 0, 1, 0, 0)'));
  await evaluate("document.querySelector('.metrics').scrollIntoView({behavior:'instant',block:'center'})");
  await delay(300);
  const intermediateCounters = await evaluate(counters);
  assert.notDeepEqual(intermediateCounters, expected);
  assert.notDeepEqual(intermediateCounters, ['+R$ 0,0 bi', '+0', '+0 anos', '0%']);
  await delay(1500);
  assert.deepEqual(await evaluate(counters), expected);
  await evaluate("document.querySelector('.comparison-bars').scrollIntoView({behavior:'instant',block:'center'})");
  await delay(300);
  const intermediateBars = await evaluate("[...document.querySelectorAll('.comparison-bars span')].map(el=>getComputedStyle(el,'::after').transform)");
  assert(intermediateBars.every(value => value !== 'matrix(0, 0, 0, 1, 0, 0)' && value !== 'matrix(1, 0, 0, 1, 0, 0)'));
  await delay(1400);
  const finalBars = await evaluate("[...document.querySelectorAll('.comparison-bars span')].map(el=>({transform:getComputedStyle(el,'::after').transform,width:parseFloat(getComputedStyle(el,'::after').width)/el.clientWidth}))");
  finalBars.forEach((bar,index) => {
    assert.equal(bar.transform, 'matrix(1, 0, 0, 1, 0, 0)');
    assert(Math.abs(bar.width-[.64,.82,.48][index])<.01);
  });
  await evaluate("scrollTo({top:0,behavior:'instant'})");
  await delay(200);
  assert.deepEqual(await evaluate(counters), expected);
  await reduced(true);
  await delay(100);
  assert.deepEqual(await evaluate(counters), expected);

  await mkdir('tmp/screenshots', { recursive: true });
  for (const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
    await viewport(width,height);
    await evaluate("scrollTo({top:0,behavior:'instant'})");
    await delay(100);
    const { data } = await cdp('Page.captureScreenshot', { format:'png' });
    await writeFile(`tmp/screenshots/motion-${name}.png`,Buffer.from(data,'base64'));
  }
  assert.equal(errors.length,0,JSON.stringify(errors));
  const report = { layouts, reducedMotion:'passed', counters:{intermediate:intermediateCounters,final:expected}, bars:{intermediate:intermediateBars,final:finalBars}, menu:'keyboard, Escape, link close passed', faq:'keyboard open and close passed', contacts:'passed',consoleErrors:errors };
  await writeFile('tmp/motion-verification.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally {
  socket.close();
  await fetch(`http://127.0.0.1:9223/json/close/${target.id}`).catch(()=>{});
}

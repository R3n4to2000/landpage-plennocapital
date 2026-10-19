import { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export function AnimatedCounter({ value, amount, prefix = '', suffix = '', decimals = 0 }) {
  const { ref, visible } = useInView();
  const numberRef = useRef(null);
  const completed = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = numberRef.current;
    if (reducedMotion || completed.current) {
      node.textContent = value;
      completed.current = true;
      return;
    }

    const format = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const display = (number) => `${prefix}${format.format(number)}${suffix}`;
    node.textContent = display(0);
    if (!visible) return;

    let frame;
    let start;
    const tick = (now) => {
      start ??= now;
      const progress = Math.min((now - start) / 1500, 1);
      const eased = 1 - (1 - progress) ** 3;
      const number = decimals ? amount * eased : Math.round(amount * eased);
      node.textContent = progress === 1 ? value : display(number);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else completed.current = true;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, reducedMotion, value, amount, prefix, suffix, decimals]);

  return (
    <strong ref={ref} className="animated-counter">
      <span className="sr-only">{value}</span>
      <span className="counter-reserve" aria-hidden="true">{value}</span>
      <span ref={numberRef} className="counter-value" aria-hidden="true">{value}</span>
    </strong>
  );
}

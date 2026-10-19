import logoImage from '../assets/brand/plenno-capital.png';
import symbolImage from '../assets/brand/plenno-symbol-gold.png';
import { Reveal } from './Reveal.jsx';

export function BrandMark() {
  return (
    <img className="brand-mark" src={symbolImage} width="1382" height="1382" alt="" aria-hidden="true" />
  );
}

export function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Plenno Capital">
      <img className="logo-image" src={logoImage} width="1768" height="691" alt="Plenno Capital" />
    </a>
  );
}

export function CTAButton({ children, href = '#contato', variant = 'primary' }) {
  return (
    <a className={`cta-button cta-button--${variant}`} href={href}>
      {children}
    </a>
  );
}

export function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

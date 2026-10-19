import { useEffect, useRef, useState } from 'react';
import { CTAButton, Logo } from './Shared.jsx';
import { navigation } from '../data/content.js';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1081px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (!headerRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`site-header${open ? ' menu-open' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggleRef.current.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Logo />
      <button
        ref={toggleRef}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav id="primary-navigation" aria-label="Navegação principal">
        {navigation.map(({ href, label }) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <CTAButton href="#contato" variant="compact">Estruturar acesso</CTAButton>
    </header>
  );
}

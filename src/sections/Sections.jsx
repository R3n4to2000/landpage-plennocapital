import heroArchitecture from '../assets/hero-architecture.png';
import { BrandMark, CTAButton, Logo, SectionHeading } from '../components/Shared.jsx';
import { AnimatedCounter } from '../components/AnimatedCounter.jsx';
import { Reveal } from '../components/Reveal.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { useInView } from '../hooks/useInView.js';
import {
  navigation,
  contact,
  metrics,
  strategies,
  steps,
  differentiators,
  opportunities,
  editorialTopics,
  faq,
} from '../data/content.js';

export function HeroSection() {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <img className="hero-image" src={heroArchitecture} alt="Residência contemporânea iluminada à noite" />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner">
        <SiteHeader />
        <div className="hero-content">
          <p className="eyebrow">Capital que vai além</p>
          <h1 id="hero-title">
            Estratégias para construir{' '}
            <span>patrimônio</span> de forma <span>inteligente.</span>
          </h1>
          <p className="hero-subtitle">
            Oportunidades, antecipação e planejamento para quem pensa no longo prazo.
          </p>
          <CTAButton>Quero conhecer a estratégia</CTAButton>
        </div>
        <div className="metrics" aria-label="Indicadores institucionais">
          {metrics.map(({ label, ...counter }) => (
            <div className="metric-item" key={label}>
              <AnimatedCounter {...counter} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section about-section" id="sobre">
      <div className="section-grid">
        <SectionHeading
          eyebrow="Sobre a Plenno Capital"
          title="Capital que vai além"
          text="A Plenno Capital atua com estratégia patrimonial e consórcios para pessoas e investidores que desejam construir, organizar e ampliar patrimônio com clareza, direção e inteligência."
        />
        <Reveal className="institutional-panel">
          <BrandMark />
          <p>
            Mais do que oferecer soluções, organizamos caminhos para decisões patrimoniais
            consistentes, com leitura de cenário, critério e acompanhamento próximo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function StrategiesSection() {
  return (
    <section className="section" id="estrategias">
      <SectionHeading eyebrow="Nossas estratégias" title="Estratégias pensadas para evolução patrimonial" />
      <Reveal className="card-grid" group>
        {strategies.map(({ title, text }, index) => (
          <article className="strategy-card" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="section process-section">
      <SectionHeading eyebrow="Como funciona" title="Uma jornada clara para decisões mais estratégicas" />
      <Reveal className="process-list" group>
        {steps.map(({ title, text }, index) => (
          <article className="process-step" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export function DifferentialsSection() {
  return (
    <section className="section split-section">
      <SectionHeading
        eyebrow="Por que escolher"
        title="Sofisticação estratégica com proximidade real"
        text="A atuação combina processo, critério e linguagem clara para apoiar escolhas relevantes sem pressa artificial."
      />
      <Reveal as="ul" className="differential-list" group>
        {differentiators.map((item) => <li key={item}>{item}</li>)}
      </Reveal>
    </section>
  );
}

export function OpportunitiesSection() {
  return (
    <section className="section opportunities-section" id="oportunidades">
      <SectionHeading
        eyebrow="Oportunidades patrimoniais"
        title="Oportunidades para quem pensa no longo prazo"
        text="Conectamos objetivos a possibilidades de aquisição com responsabilidade, clareza de etapa e leitura estratégica."
      />
      <Reveal className="opportunity-grid" group>
        {opportunities.map((item) => (
          <article className="opportunity-card" key={item}>
            <h3>{item}</h3>
            <p>Análise, planejamento e acompanhamento para uma decisão mais estruturada.</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export function SimulationsSection() {
  const { ref, visible } = useInView();
  return (
    <section className="section simulations-section">
      <div className="simulation-panel">
        <SectionHeading
          eyebrow="Comparativos e simulações"
          title="Decisões melhores começam com comparação"
          text="A Plenno Capital valoriza decisões bem estruturadas. Comparar cenários, avaliar possibilidades e planejar etapas faz parte de uma construção patrimonial sólida."
        />
        <div ref={ref} className={`comparison-bars${visible ? ' is-visible' : ''}`} aria-hidden="true">
          <span style={{ '--bar-width': '64%' }} />
          <span style={{ '--bar-width': '82%' }} />
          <span style={{ '--bar-width': '48%' }} />
        </div>
      </div>
    </section>
  );
}

export function AuthoritySection() {
  return (
    <section className="section authority-section">
      <SectionHeading eyebrow="Conteudo e autoridade" title="Clareza para investir. Direção para construir." />
      <Reveal className="editorial-grid" group>
        {editorialTopics.map((item) => (
          <article className="editorial-card" key={item}>
            <p>{item}</p>
            <span>Leitura estratégica</span>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <SectionHeading eyebrow="FAQ" title="Dúvidas frequentes" />
      <Reveal className="faq-list">
        {faq.map(({ question, answer }) => (
          <details className="faq-item" key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}

export function ContactSection() {
  return (
    <Reveal as="section" className="final-cta" id="contato">
      <div>
        <p className="eyebrow">Proximo passo</p>
        <h2>Construa patrimônio com mais direção e clareza</h2>
        <p>
          Converse com a Plenno Capital e entenda como estruturar uma estratégia
          alinhada aos seus objetivos patrimoniais.
        </p>
      </div>
      <CTAButton href={`https://wa.me/${contact.whatsapp}`}>Quero falar com a Plenno</CTAButton>
    </Reveal>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Logo />
      <p>Capital que vai além</p>
      <nav aria-label="Links do rodape">
        {navigation.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </footer>
  );
}

import {
  HeroSection,
  AboutSection,
  StrategiesSection,
  ProcessSection,
  DifferentialsSection,
  OpportunitiesSection,
  SimulationsSection,
  AuthoritySection,
  FAQSection,
  ContactSection,
  SiteFooter,
} from './sections/Sections.jsx';

export default function App() {
  return (
    <>
      <HeroSection />
      <main>
        <AboutSection />
        <StrategiesSection />
        <ProcessSection />
        <DifferentialsSection />
        <OpportunitiesSection />
        <SimulationsSection />
        <AuthoritySection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

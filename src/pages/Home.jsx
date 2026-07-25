import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import ClientLogos from '../components/ClientLogos';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <ClientLogos />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

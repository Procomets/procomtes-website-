import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SubtleBackground from './components/ParticleBackground';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen hero-gradient">
      <SubtleBackground />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <TestimonialsSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

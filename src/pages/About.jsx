import AboutHero from '../components/AboutHero';
import AboutValues from '../components/AboutValues';
import TeamSection from '../components/TeamSection';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutValues />
      <TeamSection />
    </main>
  );
}

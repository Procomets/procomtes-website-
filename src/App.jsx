import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import SubtleBackground from './components/ParticleBackground';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scrollToElement = (attempts) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts > 0) {
          setTimeout(() => scrollToElement(attempts - 1), 100);
        }
      };
      scrollToElement(10);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href') || anchor.getAttribute('to') || '';
        if (href.includes('#')) {
          const id = href.split('#')[1];
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="relative min-h-screen hero-gradient">
        <SubtleBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

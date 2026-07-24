import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';
import logoNav from '../assets/procomets logo full black & white.svg';

const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Get in Touch', href: '/#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ease-out bg-transparent"
    >
      <div 
        className="w-full px-5 sm:px-8 md:px-[50px]" 
        style={{ paddingLeft: "20px", paddingRight: "30px" }}
      >
        <div className="flex h-[72px] items-center justify-between w-full">

          {/* Left: Logo */}
          <Link to="/" className="flex items-center shrink-0 group" id="nav-logo">
            <img 
              src={logoNav} 
              alt="Procomets" 
              style={{ height: "55px", width: "auto" }}
              className="object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Right: Nav Links + CTA Button */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="nav-link text-text-secondary text-sm font-medium tracking-wide hover:text-text-primary transition-colors"
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center"
            aria-label="Menu"
            id="nav-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden absolute left-0 right-0 shadow-2xl shadow-black/50"
            style={{
              top: '72px',
              backgroundColor: 'rgba(6, 6, 9, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', padding: '32px', gap: '16px' }}>
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-white/80 font-medium hover:text-[#D8FF00] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    paddingTop: '16px',
                    paddingBottom: '8px',
                    fontSize: '18px',
                    textDecoration: 'none',
                    borderBottom: index !== navLinks.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

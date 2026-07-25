import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', className = '', href, onClick, disabled, style = {}, ...props }) {
  const isPrimary = variant === 'primary';
  const isShiny = variant === 'shiny';
  
  // Use explicit inline styles to guarantee it works, bypassing tailwind classes for core layout
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 36px',
    borderRadius: '16px', // Neumorphism usually looks best with rounded rectangles rather than full pills
    fontSize: '15px',
    fontWeight: 600,
    letterSpacing: '0.025em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.75 : 1,
    userSelect: 'none',
    textDecoration: 'none',
    
    ...(isShiny ? {
      // Shiny Metallic Styling
      backgroundColor: '#D8FF00',
      backgroundImage: 'linear-gradient(110deg, #c5eb00 0%, #D8FF00 40%, #fdff99 50%, #D8FF00 60%, #c5eb00 100%)',
      backgroundSize: '200% auto',
      color: '#111111',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 4px 15px rgba(216, 255, 0, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0)',
      animation: 'shiny-metal 3s infinite linear',
    } : {
      // Neumorphism styling
      backgroundColor: '#FAFAFA',
      color: '#111111',
      border: 'none',
      boxShadow: '8px 8px 16px rgba(205, 205, 205, 0.4), -8px -8px 16px #ffffff',
    }),
    ...style
  };

  const motionProps = disabled ? {} : (isShiny ? {
    whileHover: { 
      scale: 1.06,
      boxShadow: '0 8px 25px rgba(216, 255, 0, 0.9), inset 0 2px 6px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.1)',
      filter: 'brightness(1.05)',
    },
    whileTap: { scale: 0.94 },
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  } : {
    whileHover: { 
      scale: 1.03,
      boxShadow: '10px 10px 20px rgba(205, 205, 205, 0.6), -10px -10px 20px #ffffff',
      color: '#000000',
    },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  });

  if (href) {
    const handleLinkClick = (e) => {
      if (onClick) onClick(e);
      if (href && href.includes('#')) {
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    };

    return (
      <Link
        to={href}
        onClick={handleLinkClick}
        style={{ textDecoration: 'none', display: 'inline-block' }}
      >
        <motion.div
          className={className}
          style={baseStyle}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      className={className}
      style={baseStyle}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}

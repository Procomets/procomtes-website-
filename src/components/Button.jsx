import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

export default function Button({ children, variant = 'primary', className = '', href, onClick, ...props }) {
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
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    transition: 'all 0.3s ease-out',
    
    ...(isShiny ? {
      // Shiny Metallic Styling
      backgroundColor: '#D8FF00',
      backgroundImage: 'linear-gradient(110deg, #c5eb00 0%, #D8FF00 40%, #fdff99 50%, #D8FF00 60%, #c5eb00 100%)',
      backgroundSize: '200% auto',
      color: '#111111',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 4px 15px rgba(216, 255, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0)',
      animation: 'shiny-metal 3s infinite linear',
    } : {
      // Neumorphism styling
      backgroundColor: '#FAFAFA',
      color: '#111111',
      border: 'none',
      boxShadow: '8px 8px 16px rgba(205, 205, 205, 0), -8px -8px 16px #ffffff',
    })
  };

  const motionProps = isShiny ? {
    whileHover: { 
      scale: 1.03,
      boxShadow: '0 6px 20px rgba(216, 255, 0, 0.7), inset 0 2px 6px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.1)',
    },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  } : {
    whileHover: { 
      scale: 0.98,
      // Neumorphic "pressed" effect on hover
      boxShadow: 'inset 6px 6px 12px rgba(0, 0, 0, 0.08), inset -6px -6px 12px #FFFFFF',
      color: '#111111',
    },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <MotionLink
        to={href}
        className={className}
        style={baseStyle}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={className}
      style={baseStyle}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}

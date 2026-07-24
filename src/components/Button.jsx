import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

export default function Button({ children, variant = 'primary', className = '', href, onClick, ...props }) {
  const isPrimary = variant === 'primary';
  
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
    // Neumorphism styling
    backgroundColor: '#FAFAFA',
    color: '#111111',
    border: 'none',
    boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px #ffffff',
  };

  const motionProps = {
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

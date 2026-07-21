import { motion } from 'framer-motion';

const variants = {
  primary: {
    base: 'bg-accent text-black font-semibold btn-glow',
    hover: '',
  },
  secondary: {
    base: 'bg-transparent text-text-primary border border-text-primary/20 hover:bg-accent hover:text-black hover:border-accent',
    hover: '',
  },
};

export default function Button({ children, variant = 'primary', className = '', href, onClick, ...props }) {
  const style = variants[variant] || variants.primary;

  const classes = [
    'inline-flex items-center justify-center gap-2',
    'px-7 py-3 rounded-full',
    'text-sm font-medium tracking-wide',
    'transition-all duration-300 ease-out',
    'cursor-pointer select-none',
    style.base,
    style.hover,
    className,
  ].join(' ');

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}

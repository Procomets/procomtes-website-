import { motion } from 'framer-motion';
import Button from './Button';
import ServiceCards from './ServiceCards';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section 
      className="relative w-full flex flex-col items-center pt-48 pb-16" 
      style={{ paddingTop: '80px' }}
      id="hero"
    >
      {/* ─── Content Container ─── */}
      <div className="site-container flex flex-col items-center text-center">
        <div className="w-full max-w-[860px] flex flex-col items-center text-center">

          {/* ─── H1 ─── */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center w-full text-2xl sm:text-3xl md:text-[2.25rem] lg:text-[2.8rem] font-extrabold leading-[1.25] tracking-tight mx-auto text-text-primary"
          >
            Custom Software Development Company Building Business-Specific Digital Solutions
          </motion.h1>

          {/* ─── H2 / Services List ─── */}
          <motion.h2
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center w-full mt-6 md:mt-8 text-text-secondary text-sm sm:text-base font-medium leading-[2.2]"
          >
            Custom ERP Development <span className="text-text-secondary/40 mx-2 sm:mx-3">•</span> Software Development <span className="text-text-secondary/40 mx-2 sm:mx-3">•</span> Web Development <span className="text-text-secondary/40 mx-2 sm:mx-3">•</span> Mobile App Development
            <br className="hidden md:block" />
            AI Automation <span className="text-text-secondary/40 mx-2 sm:mx-3">•</span> Business Analytics <span className="text-text-secondary/40 mx-2 sm:mx-3">•</span> Motion Graphics <span className="text-text-secondary/40 mx-2 sm:mx-3">•</span> Video Editing
          </motion.h2>

          {/* ─── CTA Button ─── */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ marginTop: '18px' }}
          >
            <Button
              variant="primary"
              href="/#contact"
              className="text-sm px-8 py-3 shadow-2xl"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ─── Service Cards (Full Width) ─── */}
      <div className="mt-12 md:mt-16 w-full" style={{ overflow: 'visible' }}>
        <ServiceCards />
      </div>
    </section>
  );
}


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
      className="relative min-h-screen w-full flex flex-col items-center" 
      style={{ paddingTop: '80px' }}
      id="hero"
    >
      {/* ─── Content Container ─── */}
      <div className="w-full max-w-[760px] mx-auto px-[32px] flex flex-col items-center">

        {/* ─── H1 ─── */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center w-full text-4xl md:text-[3.25rem] font-extrabold leading-[1.25] tracking-tight mx-auto text-text-primary"
        >
          Custom Software Development Company Building Business-Specific Digital Solutions
        </motion.h1>

        {/* ─── H2 / Services List ─── */}
        <motion.h2
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center w-full mt-[20px] text-text-secondary text-sm sm:text-base font-medium leading-[2.2]"
        >
          Custom ERP Development <span className="text-text-secondary/40 mx-3">•</span> Software Development <span className="text-text-secondary/40 mx-3">•</span> Web Development <span className="text-text-secondary/40 mx-3">•</span> Mobile App Development
          <br className="hidden md:block" />
          AI Automation <span className="text-text-secondary/40 mx-3">•</span> Business Analytics <span className="text-text-secondary/40 mx-3">•</span> Motion Graphics <span className="text-text-secondary/40 mx-3">•</span> Video Editing
        </motion.h2>



      </div>

      {/* ─── Service Cards (Full Width) ─── */}
      <div className="mt-[240px] w-full" style={{ overflow: 'visible' }}>
        <ServiceCards />
      </div>
    </section>
  );
}

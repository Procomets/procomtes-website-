import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  "Acme Corp", "Nexus", "Job Hub pro", "Sri Jothi Moulding Works", "Think litmus", "Zenith", "Forgit", "Qelanto", "Stratos", "Global"
];

export default function ClientLogos() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Scroll scrub animation: moves from left to right based on scroll
      gsap.fromTo(trackRef.current, 
        { x: "-60%" }, 
        { 
          x: "0%", 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="bg-white overflow-hidden relative border-t border-b border-gray-50"
      style={{ padding: "80px 0" }}
    >
      <div className="site-container">
        <h3 
          className="text-center text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest"
          style={{ marginBottom: "40px" }}
        >
          Trusted by Innovative Companies
        </h3>
      </div>
      
      {/* Mask container to fade edges */}
      <div 
        className="w-full relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Moving Track */}
        <div 
          ref={trackRef} 
          className="flex items-center w-max"
          style={{ gap: "96px", padding: "0 16px" }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <div 
              key={idx} 
              className="text-lg md:text-xl font-bold text-gray-300 uppercase tracking-tight select-none flex items-center"
              style={{ gap: "8px" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-200" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

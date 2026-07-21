import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Working with Procomets felt like having an internal team rather than an external agency. They were proactive, detail-oriented, and genuinely invested in the outcome.",
    name: "DANIEL MORGAN",
    company: "acme",
    logo: ""
  },
  {
    quote: "Their ability to listen, challenge assumptions, and translate ideas into a clean digital system made a real difference for our brand.",
    name: "ELENA ROSSI",
    company: "FR",
    logo: ""
  },
  {
    quote: "We didn't just get a website — we got a solid digital foundation. Procomets is the kind of partner you want when building something meant to last.",
    name: "MICHAEL TURNER",
    company: "Radius",
    logo: ""
  },
  {
    quote: "A rare mix of strategic thinking and flawless execution. They elevated our entire digital presence faster than we thought possible.",
    name: "SARAH CHEN",
    company: "Elevate",
    logo: ""
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".test-letter");
      const cards = cardsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=250%", // Even longer scroll distance for slower speed
          scrub: 1, // Smooth scrubbing
          pin: true,
        }
      });

      // 1. Letters fall from the top
      tl.fromTo(letters, 
        { 
          y: -300, 
          opacity: 0, 
          rotation: 2 
        },
        { 
          y: 0, 
          opacity: 1, 
          rotation: 0,
          duration: 1.4,
          ease: "back.out(1.4)",
          stagger: 0.2 // Reduced speed: longer duration & larger stagger
        },
        0
      );

      // 2. Cards fade in and slide up
      tl.fromTo(cards,
        {
          opacity: 0,
          scale: 0.9,
          y: 120
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.12
        },
        2.8 // Start after ~70% of letters have landed (Total time is longer now)
      );

      // 3. Subtle Parallax for the remainder of the scroll
      tl.to(cards, {
        y: -30,
        ease: "none",
        duration: 1.5 
      }, 2.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const word = "TESTIMONIALS".split("");

  return (
    <section ref={containerRef} className="bg-white">
      {/* 
        This wrapper is pinned. 
        It occupies 100vh on screen, but due to GSAP pin it will keep the user scrolling for 100% more.
      */}
      <div 
        ref={wrapperRef} 
        className="relative w-full h-[100vh] overflow-hidden flex items-center justify-center bg-white"
      >
        
        {/* Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
          <div 
            className="flex flex-wrap justify-center text-center max-w-full" 
            style={{ 
              fontSize: "clamp(120px, 13vw, 220px)", 
              fontWeight: 900, 
              color: "#111", 
              letterSpacing: "-0.05em", 
              lineHeight: 1 
            }}
          >
            {word.map((char, i) => (
              <span key={i} className="test-letter inline-block will-change-transform">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Cards Container */}
        <div className="relative w-full max-w-[1600px] h-full mx-auto px-6 z-10 flex flex-col md:grid md:grid-cols-2 md:content-center gap-6 lg:block">
          
          {testimonials.map((test, index) => {
            // Desktop floating positions
            let lgClasses = "";
            if (index === 0) lgClasses = "lg:absolute lg:top-[15%] lg:left-[5%]";
            else if (index === 1) lgClasses = "lg:absolute lg:top-[35%] lg:right-[8%]";
            else if (index === 2) lgClasses = "lg:absolute lg:bottom-[15%] lg:left-[18%]";
            else if (index === 3) lgClasses = "lg:absolute lg:bottom-[20%] lg:right-[15%]";

            return (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`bg-white rounded-[28px] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-black/5 will-change-transform w-full lg:max-w-[400px] xl:max-w-[440px] ${lgClasses}`}
              >
                <p className="text-[#444] text-[1.05rem] md:text-[1.1rem] leading-[1.7] mb-10 font-medium">
                  "{test.quote}"
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-[#111] uppercase">
                    {test.name}
                  </span>
                  
                  <div className="flex items-center text-[#999] font-semibold text-sm">
                    {test.logo ? (
                      <img src={test.logo} alt={test.company} className="h-4 opacity-60" />
                    ) : (
                      <span className="opacity-60">{test.company}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

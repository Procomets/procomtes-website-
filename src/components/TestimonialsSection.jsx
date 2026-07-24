import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Exceeded our expectations with innovative designs that brought our vision to life — a truly remarkable creative agency.",
    name: "Samantha Johnson",
    role: "CEO and Co-founder of ABC Company",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Working with Procomets felt like having an internal team rather than an external agency. They were proactive, detail-oriented, and genuinely invested in our outcome.",
    name: "Daniel Morgan",
    role: "Product Director at TechPulse",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "Their ability to listen, challenge assumptions, and translate complex ideas into a clean digital system made a real difference for our brand.",
    name: "Elena Rossi",
    role: "Managing Partner at FR Capital",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "A rare mix of strategic thinking and flawless technical execution. They elevated our entire platform faster than we thought possible.",
    name: "Michael Turner",
    role: "VP of Engineering at Radius Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
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
          end: "+=220%",
          scrub: 0.6,
          pin: true,
        }
      });

      // 0. Background Letters drop in
      tl.fromTo(letters, 
        { y: -160, opacity: 0, rotation: 2 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.3, ease: "power2.out", stagger: 0.02 },
        0
      );

      // Card 0 (Top-Left): Pops in first at timestamp 0.2
      if (cards[0]) {
        tl.fromTo(cards[0],
          { opacity: 0, scale: 0.85, y: 70 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" },
          0.2
        );
      }

      // Card 1 (Mid-Top Right): Pops in second at timestamp 0.75
      if (cards[1]) {
        tl.fromTo(cards[1],
          { opacity: 0, scale: 0.85, y: 70 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" },
          0.75
        );
      }

      // Card 2 (Mid-Bottom Left): Pops in third at timestamp 1.3
      if (cards[2]) {
        tl.fromTo(cards[2],
          { opacity: 0, scale: 0.85, y: 70 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" },
          1.3
        );
      }

      // Card 3 (Bottom-Right): Pops in fourth at timestamp 1.85
      if (cards[3]) {
        tl.fromTo(cards[3],
          { opacity: 0, scale: 0.85, y: 70 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.3)" },
          1.85
        );
      }

      // Gentle overall float animation towards end of scroll
      tl.to(cards, { y: -15, ease: "none", duration: 0.4 }, 2.3);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const word = "TESTIMONIALS".split("");

  return (
    <section ref={containerRef} className="bg-white">
      <div 
        ref={wrapperRef} 
        className="relative w-full min-h-[110vh] overflow-hidden flex items-center justify-center bg-white"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        
        {/* Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
          <div 
            className="flex flex-wrap justify-center text-center max-w-full" 
            style={{ 
              fontSize: "clamp(100px, 12vw, 210px)", 
              fontWeight: 900, 
              color: "#010101ff", 
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

        {/* Zig-Zag Floating Cards Container */}
        <div className="relative site-container h-full z-10 flex flex-col md:grid md:grid-cols-2 md:content-center gap-8 lg:block">
          
          {testimonials.map((test, index) => {
            // Zig-Zag Layout (Left, Right, Left, Right)
            let lgClasses = "";
            if (index === 0) lgClasses = "lg:absolute lg:top-[8%] lg:left-[5%]";
            else if (index === 1) lgClasses = "lg:absolute lg:top-[28%] lg:right-[5%]";
            else if (index === 2) lgClasses = "lg:absolute lg:top-[48%] lg:left-[10%]";
            else if (index === 3) lgClasses = "lg:absolute lg:top-[68%] lg:right-[10%]";

            return (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className={`rounded-[16px] shadow-md border border-black/5 will-change-transform w-full lg:max-w-[340px] xl:max-w-[360px] transition-colors duration-300 flex flex-col justify-between ${lgClasses}`}
                style={{
                  backgroundColor: "#f4f5f7",
                  padding: "20px 22px",
                  opacity: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#eceef2"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f4f5f7"}
              >
                {/* Brand Primary Accent Quote Badge (#D8FF00) */}
                <div 
                  className="w-8 h-8 rounded-lg text-[#151515]   flex items-center justify-center shrink-0 "
                  style={{ marginBottom: "12px" }}
                >
                  <svg width="15" height="13" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 24V14.4C0 6.4 4.8 1.6 12 0L13.6 3.2C8.8 4.4 6.4 7.2 6.4 11.2H12V24H0ZM16 24V14.4C16 6.4 20.8 1.6 28 0L29.6 3.2C24.8 4.4 22.4 7.2 22.4 11.2H28V24H16Z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Quote Text */}
                <p 
                  className="text-[#1a1a1a] font-semibold"
                  style={{ fontSize: "14.5px", lineHeight: "1.55", marginBottom: "16px" }}
                >
                  "{test.quote}"
                </p>
                
                {/* Author Profile Footer */}
                <div 
                  className="flex items-center"
                  style={{ gap: "10px", marginTop: "auto", paddingTop: "4px" }}
                >
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="rounded-full object-cover shrink-0 border border-black/10" 
                    style={{ width: "36px", height: "36px" }}
                  />
                  <div className="flex flex-col">
                    <h4 
                      className="font-semibold text-[#111111] leading-snug"
                      style={{ fontSize: "14px" }}
                    >
                      {test.name}
                    </h4>
                    <p 
                      className="text-[#777777] font-normal"
                      style={{ fontSize: "11.5px", marginTop: "1px" }}
                    >
                      {test.role}
                    </p>
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

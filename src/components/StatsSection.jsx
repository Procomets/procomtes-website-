import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { prefix: "", value: 95, suffix: "%", label: "Complete customer satisfaction" },
  { prefix: "", value: 10, suffix: "+", label: "Innovation and valuable insight" },
  { prefix: "$", value: 10, suffix: "m", label: "Highly efficient financial strategies" },
  { prefix: "", value: 50, suffix: "m", label: "Users worldwide, providing them with" },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = STATS[index].value;
        const counter = { val: 0 };

        // Animate counter from 0 to target value when scrolled into view
        gsap.to(counter, {
          val: targetValue,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            // Random shuffling effect before settling near target
            if (counter.val < targetValue * 0.8) {
              const randomOffset = Math.floor(Math.random() * 5);
              el.textContent = Math.min(targetValue, Math.floor(counter.val) + randomOffset);
            } else {
              el.textContent = Math.floor(counter.val);
            }
          },
          onComplete: () => {
            el.textContent = targetValue;
          }
        });
      });

      // Fade in animations for labels
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-white border-b border-gray-100"
      style={{ padding: "96px 0", backgroundColor: "#ffffff" }}
    >
      <div className="site-container">
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: "48px",
            textAlign: "center"
          }}
        >
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              className="stat-item flex flex-col items-center justify-center"
              style={{ padding: "0 16px" }}
            >
              {/* Number display */}
              <div 
                style={{ 
                  fontSize: "clamp(48px, 6vw, 72px)", 
                  fontWeight: "800", 
                  color: "#111111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center"
                }}
              >
                {stat.prefix && <span>{stat.prefix}</span>}
                <span ref={(el) => (numberRefs.current[index] = el)}>0</span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>

              {/* Label */}
              <p 
                style={{ 
                  fontSize: "15px", 
                  color: "#6B7280", 
                  lineHeight: 1.6, 
                  maxWidth: "240px", 
                  margin: "0 auto",
                  fontWeight: "500" 
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

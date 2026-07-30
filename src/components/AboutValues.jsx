import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const valuesData = [
  {
    num: "01",
    title: "Quality First",
    desc: "every build goes through senior review and QA before launch, not just before invoice."
  },
  {
    num: "02",
    title: "Customer-Centered",
    desc: "you get a named point of contact and a documented scope, not a rotating support inbox."
  },
  {
    num: "03",
    title: "Integrity & Transparency",
    desc: "fixed-scope pricing agreed upfront, with any change discussed before it's billed."
  },
  {
    num: "04",
    title: "Long-Term Partnership",
    desc: "post-launch support included, because software you build and abandon is a liability, not an asset."
  }
];

export default function AboutValues() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".values-image",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          }
        }
      );

      gsap.fromTo(
        ".val-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "80px 0 100px",
        borderBottom: "1px solid #F3F4F6"
      }}
    >
      <div className="site-container">
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "64px",
            alignItems: "center"
          }}
        >
          {/* Left Column: Image */}
          <div 
            className="values-image"
            style={{
              width: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "#F9FAFB",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              aspectRatio: "4 / 4"
            }}
          >
            <img 
              src="/images/ai-workflow.png" 
              alt="Procomets collaborative strategy" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
              loading="lazy"
            />
          </div>

          {/* Right Column: 2x2 Values Grid */}
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              columnGap: "40px",
              rowGap: "48px",
              paddingTop: "16px",
              borderTop: "1px solid #E5E7EB"
            }}
          >
            {valuesData.map((item, idx) => (
              <div key={idx} className="val-item" style={{ display: "flex", flexDirection: "column" }}>
                <span 
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#9CA3AF",
                    marginBottom: "12px",
                    letterSpacing: "0.05em"
                  }}
                >
                  {item.num}
                </span>
                <h3 
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111111",
                    marginBottom: "10px",
                    lineHeight: 1.3
                  }}
                >
                  {item.title}
                </h3>
                <p 
                  style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

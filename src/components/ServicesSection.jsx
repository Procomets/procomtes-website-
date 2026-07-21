import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    number: "001",
    title: "Custom ERP Development",
    description: "Build intelligent ERP solutions tailored to your business operations. Our custom ERP systems streamline inventory, production, finance, HR, and reporting to improve efficiency and drive business growth.",
    tags: ["ERP Systems", "Inventory", "Production", "Finance", "CRM", "HRMS"],
    image: "/images/erp-service.png"
  },
  {
    number: "002",
    title: "AI Automation",
    description: "Integrate AI into your business with custom automation solutions that reduce manual work, improve efficiency, and accelerate decision-making through intelligent chatbots and AI agents.",
    tags: ["AI Agents", "Chatbots", "Workflow Automation", "Document Processing"],
    image: "/images/ai-automation-service.png"
  },
  {
    number: "003",
    title: "Web Development",
    description: "Design and develop fast, responsive, SEO-optimized websites and web applications that provide exceptional user experiences and help businesses generate more leads online.",
    tags: ["React", "Next.js", "Responsive", "SEO", "UI/UX", "Frontend", "Backend"],
    image: "/images/web-service.png"
  },
  {
    number: "004",
    title: "Mobile App Development",
    description: "Build high-performance Android and iOS applications with seamless user experiences tailored to your business needs and target audience.",
    tags: ["Android", "iOS", "Flutter", "React Native", "Firebase", "REST APIs"],
    image: "/images/mobile-service.png"
  },
  {
    number: "005",
    title: "Motion Graphics & Video Editing",
    description: "Create engaging motion graphics and professional video content that strengthens your brand identity and increases audience engagement across all platforms.",
    tags: ["After Effects", "Premiere Pro", "Motion Graphics", "Brand Videos"],
    image: "/images/video-service.png"
  },
  {
    number: "006",
    title: "Business Analytics",
    description: "Transform complex business data into clear, actionable insights through interactive dashboards, KPI tracking, and advanced reporting that drives smarter decisions.",
    tags: ["Power BI", "Dashboards", "KPIs", "SQL", "Data Visualization"],
    image: "/images/analytics-service.png"
  },
  {
    number: "007",
    title: "UI/UX Design",
    description: "Create intuitive, user-centered interfaces that deliver seamless digital experiences across web and mobile, focused on usability, accessibility, and modern design systems.",
    tags: ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"],
    image: "/images/uiux-service.png"
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card");
      if (cards.length < 2) return;

      // 001 is fixed at y: 0. 002-007 are pushed down below the wrapper completely.
      gsap.set(cards[0], { yPercent: 0 });
      gsap.set(cards.slice(1), { yPercent: 100 });

      // ONE master timeline
      const tl = gsap.timeline();

      for (let i = 1; i < cards.length; i++) {
        // The incoming card moves up from 100% to 0%.
        // Because of z-index, it overlays the previous card exactly like a drawer.
        tl.to(cards[i], {
          yPercent: 0,
          ease: "none",
          duration: 1
        });
      }

      // Pin the wrapper
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        pin: true,
        start: "top top", // Pin exactly at the top of viewport
        end: `+=${(cards.length - 1) * 100}%`, // Scroll distance equals number of incoming cards
        scrub: 1.5,
        animation: tl,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: "#ffffff" }}>
      {/* 
        The pinned wrapper is EXACTLY 100vh tall.
        It contains BOTH the header and the cards, so the header stays pinned 
        and there is NO massive white void at the top of the screen.
      */}
      <div 
        ref={wrapperRef} 
        style={{ 
          position: "relative", 
          width: "100%", 
          height: "100vh", // Full viewport height container
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Pinned Section Header */}
        <div style={{ flexShrink: 0, maxWidth: "1280px", margin: "0 auto", padding: "80px 24px 20px", width: "100%" }}>
          <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.15em", textTransform: "uppercase", color: "#b3d900", backgroundColor: "rgba(216,255,0,0.1)", padding: "6px 12px", borderRadius: "100px", display: "inline-block", marginBottom: "16px" }}>
            Services
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "800", color: "#111", margin: 0, lineHeight: 1.1 }}>
            Our Software Development Services
          </h2>
        </div>

        {/* Cards Deck Container */}
        <div style={{ flex: 1, position: "relative", width: "100%" }}>
          {servicesData.map((service, index) => (
            <div 
              key={service.number}
              className="service-card"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%", // Takes full height of the deck container
                backgroundColor: "#ffffff",
                zIndex: index + 1, // 002 overlays 001, 003 overlays 002, etc.
                willChange: "transform"
              }}
            >
              {/* Card Content Wrapper - Vertically centered beautifully */}
              <div style={{ width: "100%", height: "100%", maxWidth: "1280px", margin: "0 auto", padding: "20px 24px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                
                {/* Card Header */}
                <div style={{ paddingBottom: "20px", borderBottom: "1px solid #f0f0f0", marginBottom: "32px", display: "flex", alignItems: "baseline", gap: "16px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "0.15em", color: "#ccc" }}>
                    {service.number}
                  </span>
                  <span style={{ fontSize: "2.2rem", fontWeight: "800", color: "#111" }}>
                    {service.title}
                  </span>
                </div>

                {/* 3-Column Layout (30% / 45% / 25%) */}
                <div style={{ display: "flex", gap: "4%", alignItems: "center" }}>
                  
                  {/* 1. Image (30%, max 420px) */}
                  <div style={{ width: "30%", maxWidth: "420px", flexShrink: 0, borderRadius: "20px", overflow: "hidden", backgroundColor: "#f9f9f9", aspectRatio: "4/3", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                    <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                  </div>

                  {/* 2. Content (45%) */}
                  <div style={{ width: "45%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.6, margin: 0 }}>
                      {service.description}
                    </p>
                  </div>

                  {/* 3. Tech Tags (25%) */}
                  <div style={{ width: "25%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", color: "#999", textTransform: "uppercase", marginBottom: "12px", display: "block" }}>
                      Technologies
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {service.tags.map(tag => (
                        <span key={tag} style={{ padding: "6px 12px", border: "1px solid #eee", borderRadius: "100px", fontSize: "12px", fontWeight: "500", color: "#444" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

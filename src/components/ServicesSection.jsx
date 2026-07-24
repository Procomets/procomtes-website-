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
      if (cards.length === 0) return;

      // All cards pushed down completely
      gsap.set(cards, { yPercent: 100 });

      // ONE master timeline
      const tl = gsap.timeline();

      for (let i = 0; i < cards.length; i++) {
        tl.to(cards[i], {
          yPercent: 0,
          ease: "none",
          duration: 1
        });
      }

      // Pin the single wrapper
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        pin: true,
        start: "top top", // Pin exactly at the top of viewport
        end: `+=${cards.length * 100}%`, // Scroll distance equals number of incoming cards
        scrub: 1.5,
        animation: tl,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} style={{ backgroundColor: "#ffffff", paddingTop: "40px" }}>
      {/* 
        Single Pinned Wrapper (100vh tall).
        Contains BOTH the section header and the card deck container.
        Inside each card, responsive CSS toggles between desktop 3-column layout and mobile card representation.
      */}
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Pinned Section Header - positioned absolutely behind the cards and centered */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h2 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: "900", color: "#111", margin: 0, lineHeight: 1.1, textAlign: "center", letterSpacing: "-0.02em" }}>
            Our Services
          </h2>
        </div>

        {/* Cards Deck Container */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: index + 1,
                willChange: "transform"
              }}
            >
              {/* ─── DESKTOP VIEW CONTENT (md+ : 3-column layout) ─── */}
              <div className="hidden md:flex site-container pt-2 pb-8 h-full flex-col justify-center">

                {/* Card Header */}
                <div style={{ paddingBottom: "14px", borderBottom: "1px solid #f0f0f0", marginBottom: "24px", display: "flex", alignItems: "baseline", gap: "16px" }}>
                  <span style={{ fontSize: "1.85rem", fontWeight: "800", color: "#111" }}>
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

              {/* ─── MOBILE VIEW CONTENT (< md : Card representation) ─── */}
              <div className="flex md:hidden h-full flex-col justify-center" style={{ padding: "16px 24px 48px 24px" }}>
                <div 
                  className="w-full bg-white rounded-[24px] border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col relative"
                  style={{ padding: "24px", gap: "16px" }}
                >

                  {/* 1. Service Title */}
                  <div className="border-b border-gray-100 flex items-center justify-between" style={{ paddingBottom: "10px" }}>
                    <h3 className="text-xl font-extrabold text-[#111] leading-tight" style={{ margin: 0 }}>
                      {service.title}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 shrink-0 ml-2">
                      {service.number}
                    </span>
                  </div>

                  {/* 2. Image of the Service */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* 3. Details Paragraph */}
                  <p className="text-sm text-gray-600 leading-relaxed" style={{ margin: 0 }}>
                    {service.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="border-t border-gray-100 mt-auto" style={{ paddingTop: "12px" }}>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5" style={{ marginBottom: "6px" }}>
                      Technologies
                    </span>
                    <div className="flex flex-wrap" style={{ gap: "6px" }}>
                      {service.tags.map(tag => (
                        <span key={tag} className="bg-gray-50 border border-gray-200/80 rounded-full text-[11px] font-medium text-gray-600" style={{ padding: "4px 10px" }}>
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

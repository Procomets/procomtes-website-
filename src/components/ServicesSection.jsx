import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css"; // Import the CSS file

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    number: "01",
    title: "Custom ERP\nDevelopment",
    tags: ["Enterprise", "Operations"],
    description: "Stop adapting to rigid software. We build custom ERPs tailored directly to your inventory, finance, and operations—replacing spreadsheets for good.",
    cta: "Get an ERP Assessment",
    image: "/images/erp-service.png",
    bgColor: "#e0ffabff" // Lime green
  },
  {
    number: "02",
    title: "AI\nAutomation",
    tags: ["AI Agents", "Efficiency"],
    description: "Cut manual work. Eliminate manual tasks with custom AI agents, chatbots, and workflow automation scoped to save real hours.",
    cta: "Book an AI Readiness Call",
    image: "/images/ai-automation-service.png",
    bgColor: "#ffd7d7ff" // Light gray
  },
  {
    number: "03",
    title: "Web\nDevelopment",
    tags: ["React", "Next.js"],
    description: "Built for conversions, not just looks. Fast, SEO-optimized React & Next.js sites designed to drive leads with clear CTAs and clean UX.",
    cta: "Start My Website Project",
    image: "/images/web-service.png",
    bgColor: "#ffffa4ff" // Beige
  },
  {
    number: "04",
    title: "Mobile App\nDevelopment",
    tags: ["iOS", "Android"],
    description: "Launch iOS and Android apps with confidence using Flutter and React Native, supported by rock-solid backend architecture and QA.",
    cta: "Plan My App",
    image: "/images/mobile-service.png",
    bgColor: "#d1efffff" // Light blue
  },
  {
    number: "05",
    title: "Business\nAnalytics",
    tags: ["Data", "Insights"],
    description: "Data built for action, not clutter. Interactive Power BI dashboards, SQL reporting, and KPI tracking tailored to the metrics that run your business.",
    cta: "Request a Dashboard Demo",
    image: "/images/analytics-service.png",
    bgColor: "#fed7aa" // Orange
  },
  {
    number: "06",
    title: "Motion Graphics\n& Video Editing",
    tags: ["Video", "Brand"],
    description: "Understandable in 60 seconds or less. High-converting brand videos, product explainers, and motion graphics built for the platforms your audience uses.",
    cta: "See Our Video Work",
    image: "/images/video-service.png",
    bgColor: "#e9d5ff" // Purple
  },
  {
    number: "07",
    title: "UI/UX\nDesign",
    tags: ["Figma", "Experience"],
    description: "Drive higher retention with wireframe-first UI/UX designs built to solve real user friction, not just look pretty.",
    cta: "Review My Product's UX",
    image: "/images/uiux-service.png",
    bgColor: "#8dff91ff" // Pink/Red
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cardsContainer = cardsContainerRef.current;
      
      const getScrollAmount = () => {
        let cardsContainerWidth = cardsContainer.scrollWidth;
        let viewportWidth = window.innerWidth;
        // Scroll enough to show the last card, considering padding
        return -(cardsContainerWidth - viewportWidth + (viewportWidth < 768 ? 32 : 80)); 
      };

      const tl = gsap.timeline();
      tl.to(cardsContainer, {
        x: getScrollAmount,
        ease: "none",
        duration: 1
      });
      // Add a buffer at the end to absorb scroll momentum before unpinning
      tl.to({}, { duration: 0.3 });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${cardsContainer.scrollWidth * 1.5}`, // Balanced speed: not too fast, not too slow
        pin: true,
        animation: tl,
        scrub: 1, // Snappier response
        invalidateOnRefresh: true,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="services-section">
      <div 
        ref={wrapperRef}
        className="services-wrapper"
      >
        {/* Header section pinned at the top */}
        <div className="services-header">
          <div>
            
            <h2 className="services-title">
             What We Offer<br className="hidden-br" /> for your Business  
            </h2>
          </div>
          
          {/* Arrow navigation buttons */}
          <div className="services-nav">
             <div 
               className="services-nav-btn" 
               onClick={() => window.scrollBy({ top: -400, behavior: 'smooth' })}
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
             </div>
             <div 
               className="services-nav-btn" 
               onClick={() => window.scrollBy({ top: 400, behavior: 'smooth' })}
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
             </div>
          </div>
        </div>

        {/* Cards Track */}
        <div className="services-track-container">
          <div 
            ref={cardsContainerRef}
            className="services-track"
          >
            {servicesData.map((service, index) => (
              <div 
                key={index}
                className="service-card"
                style={{ backgroundColor: service.bgColor }}
              >
                {/* Top Half: Content */}
                <div className="service-card-top">

                  
                  {/* Title */}
                  <h3 className="service-card-title">
                    {service.title.split('\n').map((line, i) => (
                      <span key={i} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </h3>
                  
                  {/* Description */}
                  <p className="service-card-desc">
                    {service.description}
                  </p>
                </div>
                
                {/* Bottom Half: Image */}
                <div className="service-card-bottom">
                  <img 
                    src={service.image} 
                    alt={service.title.replace('\n', ' ')} 
                    className="service-card-img" 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <button className="service-card-cta">
                    {service.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


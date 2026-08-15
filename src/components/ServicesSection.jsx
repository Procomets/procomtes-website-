import { useRef } from "react";
import { Link } from "react-router-dom";
import "./ServicesSection.css"; // Import the CSS file

import erpSystemImg from "../assets/ERP System.png";
import aiAutomationImg from "../assets/AI AUTOMATION (2).png";
import websiteLpImg from "../assets/WEBSITE LP.png";
import mobileAppImg from "../assets/MOBILE APP.png";
import businessAnalyticsImg from "../assets/BUSINESS ANALYITICS .png";
import videoEditingImg from "../assets/VIdeo editing.png";
import scoImg from "../assets/sco.png";

const servicesData = [
  {
    number: "01",
    title: "Custom ERP\nDevelopment",
    tags: ["Enterprise", "Operations"],
    description: "Stop adapting to rigid software. We build custom ERPs tailored directly to your inventory, finance, and operations—replacing spreadsheets for good.",
    cta: "Get an ERP Assessment",
    image: erpSystemImg,
    bgColor: "#e0ffabff" // Lime green
  },
  {
    number: "02",
    title: "AI\nAutomation",
    tags: ["AI Agents", "Efficiency"],
    description: "Cut manual work. Eliminate manual tasks with custom AI agents, chatbots, and workflow automation scoped to save real hours.",
    cta: "Book an AI Readiness Call",
    image: aiAutomationImg,
    bgColor: "#ffd7d7ff" // Light gray
  },
  {
    number: "03",
    title: "Web\nDevelopment",
    tags: ["React", "Next.js"],
    description: "Built for conversions, not just looks. Fast, SEO-optimized React & Next.js sites designed to drive leads with clear CTAs and clean UX.",
    cta: "Start My Website Project",
    image: websiteLpImg,
    bgColor: "#FFDFA8" // Beige
  },
  {
    number: "04",
    title: "Mobile App\nDevelopment",
    tags: ["iOS", "Android"],
    description: "Launch iOS and Android apps with confidence using Flutter and React Native, supported by rock-solid backend architecture and QA.",
    cta: "Plan My App",
    image: mobileAppImg,
    bgColor: "#d1efffff" // Light blue
  },
  {
    number: "05",
    title: "Business\nAnalytics",
    tags: ["Data", "Insights"],
    description: "Data built for action, not clutter. Interactive Power BI dashboards, SQL reporting, and KPI tracking tailored to the metrics that run your business.",
    cta: "Request a Dashboard Demo",
    image: businessAnalyticsImg,
    bgColor: "#ffcdcdff" // Orange
  },
  {
    number: "06",
    title: "Motion Graphics\n& Video Editing",
    tags: ["Video", "Brand"],
    description: "Understandable in 60 seconds or less. High-converting brand videos, product explainers, and motion graphics built for the platforms your audience uses.",
    cta: "See Our Video Work",
    image: videoEditingImg,
    bgColor: "#e9d5ff" // Purple
  },
  {
    number: "07",
    title: "SEO, AEO,\nGEO & GBP",
    tags: ["Search", "AI Visibility"],
    description: "Boost your visibility across search engines, AI platforms, and local search.",
    cta: "Boost My Online Visibility",
    image: scoImg,
    bgColor: "#dfeeffff" // Pink/Red
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const scrollLeft = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

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
               onClick={scrollLeft}
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
             </div>
             <div 
               className="services-nav-btn" 
               onClick={scrollRight}
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
             </div>
          </div>
        </div>

        {/* Cards Track */}
        <div 
          ref={cardsContainerRef}
          className="services-track-container"
        >
          <div className="services-track">
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
                  <Link to="/#contact" className="service-card-cta">
                    {service.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


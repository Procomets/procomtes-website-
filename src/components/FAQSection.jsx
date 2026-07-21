import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services does Procomets provide?",
    answer: "We build websites, AI automation systems, ERP solutions, mobile applications, UI/UX design, business analytics dashboards, and digital experiences tailored to business growth."
  },
  {
    question: "How long does a project usually take?",
    answer: "Most websites are completed within 3–6 weeks, while ERP systems and custom software projects vary depending on complexity and business requirements."
  },
  {
    question: "Do you build AI-powered solutions?",
    answer: "Yes. We develop AI chatbots, workflow automation, document processing systems, recommendation engines, and custom AI integrations."
  },
  {
    question: "Will my website be SEO optimized?",
    answer: "Every website is built with technical SEO, fast performance, responsive layouts, clean code, and optimized metadata."
  },
  {
    question: "Can you redesign an existing website?",
    answer: "Yes. We modernize outdated websites while improving performance, usability, branding, and conversion rates."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer maintenance, updates, security improvements, performance monitoring, and long-term technical support."
  },
  {
    question: "Can you integrate third-party APIs?",
    answer: "Absolutely. We integrate payment gateways, CRMs, ERPs, AI platforms, analytics, authentication providers, and custom APIs."
  },
  {
    question: "How do we get started?",
    answer: "Simply contact us through our website. We'll schedule a discovery call, understand your requirements, and prepare a tailored proposal."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const cardsRef = useRef([]);
  const answerRefs = useRef([]);

  // Setup initial scroll animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Trigger when 20% of FAQ hits the viewport
          once: true, // Only trigger once
        }
      });

      // Left column slides in
      tl.fromTo(leftColRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

      // Right cards stagger in
      tl.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 },
        "-=0.4" // Start slightly before left column finishes
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle accordion toggle animation
  const toggleFAQ = (index) => {
    const isOpening = openIndex !== index;
    const previousIndex = openIndex;
    
    // Update state to trigger React render for height/layout,
    // but we use GSAP to animate the answer content specifically
    setOpenIndex(isOpening ? index : null);

    // We use setTimeout to allow React to render the answer div so GSAP can animate it
    setTimeout(() => {
      // Close previous
      if (previousIndex !== null && previousIndex !== index && answerRefs.current[previousIndex]) {
        gsap.to(answerRefs.current[previousIndex], {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in"
        });
      }

      // Open new
      if (isOpening && answerRefs.current[index]) {
        gsap.fromTo(answerRefs.current[index],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
        );
      }
    }, 10);
  };

  return (
    <section ref={sectionRef} className="bg-white" style={{ padding: "80px 0 180px 0" }}>
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        
        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 relative">
          
          {/* LEFT COLUMN - 35% on Desktop, 40% Tablet, 100% Mobile */}
          <div 
            className="w-full lg:w-[35%] xl:w-[35%] flex-shrink-0"
          >
            {/* Container */}
            <div ref={leftColRef} className="will-change-transform opacity-0">
              <h2 
                style={{ fontSize: "clamp(64px, 8vw, 110px)", fontWeight: 900, color: "#111", lineHeight: 1, letterSpacing: "-0.03em" }}
                className="mb-8"
              >
                FAQ
              </h2>
              
              <p className="text-[#555] text-[1.1rem] leading-relaxed mb-10 max-w-md">
                Everything you need to know before getting started. Find answers about our process, timelines, pricing, technologies, and support.
              </p>

              <button 
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-black/20 text-[#111] font-semibold tracking-wide text-sm transition-all duration-300 hover:border-transparent overflow-hidden"
              >
                {/* Background Hover fill */}
                <span className="absolute inset-0 bg-[#d8ff00] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100"></span>
                <span className="relative z-10 transition-colors duration-300">Let's Talk</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - 65% on Desktop, 60% Tablet, 100% Mobile */}
          <div className="w-full lg:w-[65%] xl:w-[65%] flex flex-col gap-5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  onClick={() => toggleFAQ(index)}
                  className="group opacity-0 will-change-transform cursor-pointer relative bg-white rounded-[24px] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    padding: "28px",
                    border: isOpen ? "1px solid #d8ff00" : "1px solid rgba(0,0,0,0.08)",
                    transform: "translateY(0)", // Base transform
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.06)";
                      e.currentTarget.style.borderColor = "#d8ff00";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    {/* Number & Question */}
                    <div className="flex gap-6 items-start">
                      <span className="text-xs font-bold text-[#ccc] tracking-widest mt-1.5 flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-[1.25rem] font-bold text-[#111] leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Plus / X Icon */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 flex-shrink-0 transition-all duration-400"
                      style={{ 
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        backgroundColor: isOpen ? "#f9f9f9" : "transparent"
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1V13M1 7H13" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Answer - Animates height naturally with CSS grid transition, contents fade/slide with GSAP */}
                  <div 
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div 
                        ref={el => answerRefs.current[index] = el}
                        className="pt-6 pl-[2.8rem] text-[#555] text-lg leading-relaxed opacity-0"
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

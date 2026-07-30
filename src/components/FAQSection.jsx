import { useState } from "react";

const faqs = [
  {
    question: "What is your development process from idea to launch?",
    answer: "We guide you through discovery, wireframing, development, rigorous testing, and final deployment. You get clear updates at every stage, so you are always in complete control of your build."
  },
  {
    question: "Can I request a refund on my purchase if I'm not satisfied?",
    answer: "We are aware that bad refund policies are unpleasant. If you are not satisfied with Procomets services within the first 15 days of your project start, we will offer you a full refund. Please note that custom software licenses and dedicated engineering hours delivered will be reviewed. The refund is applicable if requirements have not been executed."
  },
  {
    question: "How do I know if my business needs a custom ERP system?",
    answer: "If your team spends hours manually re-entering data across spreadsheets and off-the-shelf software feels too rigid, a custom ERP is your next best growth step. It adapts entirely to your unique business processes instead of forcing you to adapt to generic software."
  },
  {
    question: "Can a custom ERP integrate with my existing tools (accounting, CRM, HRMS)?",
    answer: "Absolutely, seamless integrations are one of our core strengths. We build custom APIs that bridge your existing tools directly into your new system without missing a beat."
  },
  {
    question: "Can I license a single track or request a single custom module?",
    answer: "Yes! In addition to full end-to-end development, we build standalone modules, custom API integrations, AI workflows, and dedicated analytics dashboards."
  },
  {
    question: "Do you produce brand videos as a standalone service, or only alongside software projects?",
    answer: "We offer video production and motion graphics both as a standalone service and as an addon to custom software builds. Whether you need a full rebrand or a product explainer, we have you covered"
  },
  {
    question: "Do you provide software maintenance and support after launch?",
    answer: "Yes, we stand behind everything we build with dedicated post-launch support and SLA maintenance plans. We keep your systems secure, up to date, and scaling smoothly as your company expands."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="relative w-full bg-white scroll-mt-24 transition-colors duration-300 flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: "80px", paddingBottom: "100px" }}
    >
      {/* Soft Ambient Gradient Backdrop (matching Home Page aesthetics) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        aria-hidden="true"
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, rgba(216, 255, 0, 0.08) 0%, rgba(216, 255, 0, 0.02) 55%, transparent 75%)"
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 75% 55% at 50% 50%, rgba(216, 255, 0, 0.04) 0%, transparent 70%)"
          }}
        />
      </div>

      <div className="relative z-10 site-container w-full flex flex-col items-center justify-center">
        <div 
          className="w-full flex flex-col items-center justify-center"
          style={{ maxWidth: "1080px", margin: "0 auto" }}
        >
          
          {/* Centered Section Header */}
          <h2 
            className="w-full font-bold text-[#111111] tracking-tight text-center"
            style={{ 
              fontSize: "clamp(24px, 3.2vw, 34px)", 
              marginBottom: "36px", 
              lineHeight: "1.2",
              textAlign: "center"
            }}
          >
            Frequently Asked Questions
          </h2>

          {/* Centered Cards Stack (Wider Container) */}
          <div 
            className="w-full flex flex-col items-center"
            style={{ gap: "12px", maxWidth: "1080px", margin: "0 auto" }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index} 
                  className="w-full rounded-xl cursor-pointer select-none transition-all duration-200"
                  style={{
                    backgroundColor: isOpen ? "rgba(237, 237, 242, 0.9)" : "rgba(244, 245, 247, 0.8)",
                    backdropFilter: "blur(8px)",
                    padding: "16px 24px",
                    boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,0.03)" : "none",
                    border: isOpen ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(0,0,0,0.04)"
                  }}
                  onClick={() => toggleFAQ(index)}
                  onMouseEnter={(e) => {
                    if (!isOpen) e.currentTarget.style.backgroundColor = "rgba(234, 235, 240, 0.95)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isOpen) e.currentTarget.style.backgroundColor = "rgba(244, 245, 247, 0.8)";
                  }}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between gap-4 w-full">
                    <h3 
                      className="font-semibold text-[#111111] leading-snug text-left"
                      style={{ fontSize: "15.5px" }}
                    >
                      {faq.question}
                    </h3>

                    {/* Minimal Icon (+ / x) */}
                    <div 
                      className="text-[#333333] shrink-0 flex items-center justify-center rounded-md transition-transform duration-300"
                      style={{ width: "24px", height: "24px" }}
                    >
                      {isOpen ? (
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Accordion Answer */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out w-full ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    style={{
                      marginTop: isOpen ? "12px" : "0px",
                      paddingTop: isOpen ? "12px" : "0px",
                      borderTop: isOpen ? "1px solid rgba(0,0,0,0.06)" : "none"
                    }}
                  >
                    <div className="overflow-hidden w-full">
                      <p 
                        className="text-[#444444] font-normal text-left"
                        style={{ fontSize: "14px", lineHeight: "1.6" }}
                      >
                        {faq.answer}
                      </p>
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

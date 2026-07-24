import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Sharan",
    designation: "Founder & Chief Executive Officer",
    image: "/images/team-sharan.png",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Pranav",
    designation: "Co-Founder & Business Analytics Lead",
    image: "/images/team-pranav.png",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Santhosh",
    designation: "Creative UI/UX Designer",
    image: "/images/team-santhosh.png",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Ashvitha",
    designation: "Lead Software Engineer",
    image: "/images/team-ashvitha.png",
    linkedin: "https://linkedin.com"
  }
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const glowRef = useRef(null);
  const descRef = useRef(null);
  const cardImagesRef = useRef([]);
  const cardTextsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Trigger when 25% enters viewport
          once: true,
        }
      });

      // 1. "The Minds Behind" fades in
      tl.fromTo(headingLine1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power4.out" }
      );

      // 2. "Procomets" fades in with scale
      tl.fromTo(headingLine2Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // 3. Description fades up
      tl.fromTo(descRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // 4. Card Images stagger in
      const cardImages = cardImagesRef.current.filter(Boolean);
      tl.fromTo(cardImages,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.12 },
        "-=0.3"
      );

      // 5. Names and designations fade in
      const cardTexts = cardTextsRef.current.filter(Boolean);
      tl.fromTo(cardTexts,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.12 },
        "-=0.4"
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
        height: "auto",
        minHeight: "fit-content",
        display: "block",
        position: "relative"
      }}
    >
      <div className="site-container">

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{
            fontSize: "clamp(56px, 6vw, 90px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
          }}>
            <span
              ref={headingLine1Ref}
              style={{ color: "#111111", display: "inline-block", opacity: 0, willChange: "opacity" }}
            >
              The Minds Behind{" "}
            </span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span
                ref={headingLine2Ref}
                style={{
                  color: "#D8FF00",
                  display: "inline-block",
                  opacity: 0,
                  willChange: "opacity",
                  position: "relative",
                  textShadow: "0px 0px 40px rgba(216,255,0,0.35)",
                  zIndex: 1,
                }}
              >
                Procomets
              </span>
            </span>
          </h2>
        </div>

        {/* Description */}
        <div ref={descRef} style={{ textAlign: "center", marginBottom: "80px", opacity: 0 }}>
          <p style={{
            maxWidth: "720px",
            margin: "0 auto",
            fontSize: "18px",
            color: "rgba(0,0,0,0.65)",
            lineHeight: 1.7,
          }}>
            Our multidisciplinary team combines business strategy, software engineering, AI, design, and analytics to build modern digital solutions that help businesses scale.
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="team-card"
            >
              {/* Image Container */}
              <div 
                ref={el => cardImagesRef.current[index] = el}
                className="team-card-image-wrap" 
                style={{ opacity: 0 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card-image"
                  loading="lazy"
                  draggable="false"
                />

                {/* LinkedIn Overlay */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-card-overlay"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* LinkedIn Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#D8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="9" width="4" height="12" stroke="#D8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="4" cy="4" r="2" stroke="#D8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em" }}>View LinkedIn</span>
                    {/* Arrow */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "2px" }}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </div>

              {/* Text Below Image */}
              <div 
                ref={el => cardTextsRef.current[index] = el}
                style={{ padding: "18px 4px 8px", opacity: 0 }}
              >
                <h3 style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#111111",
                  margin: "0 0 8px 0",
                  lineHeight: 1.2,
                }}>
                  {member.name}
                </h3>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  color: "#646464ff",
                  textTransform: "uppercase",
                  display: "block",
                }}>
                  {member.designation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped Styles */}
      <style>{`
        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }

        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .team-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
        }

        .team-card {
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
          display: flex;
          flex-direction: column;
        }

        .team-card:hover {
          /* Removed translateY */
        }

        .team-card-image-wrap {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          aspect-ratio: 4 / 5;
          transition: box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .team-card:hover .team-card-image-wrap {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .team-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .team-card:hover .team-card-image {
          transform: scale(1.05);
        }

        .team-card-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          opacity: 0;
          transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          text-decoration: none;
          border-radius: 0 0 18px 18px;
        }

        .team-card:hover .team-card-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

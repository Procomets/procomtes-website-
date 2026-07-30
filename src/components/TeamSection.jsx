import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import sharanImg from "../assets/minds behind procomets/sharan.jpg";
import pranavImg from "../assets/minds behind procomets/pranav.jpg";
import santhoshImg from "../assets/minds behind procomets/Santhosh.jpg";
import ashvithaImg from "../assets/minds behind procomets/Ashvitha.jpg";

const teamMembers = [
  {
    name: "Sharan",
    designation: "Founder & Chief Executive Officer",
    image: sharanImg,
    linkedin: "https://www.linkedin.com/in/sharanrajt/"
  },
  {
    name: "Pranav",
    designation: "Co-Founder & Business Analytics Lead",
    image: pranavImg,
    linkedin: "https://www.linkedin.com/in/pranav-m-75a156293/"
  },
  {
    name: "Santhosh",
    designation: "Co-Founder & Creative UI/UX Designer",
    image: santhoshImg,
    linkedin: "https://www.linkedin.com/in/santhosh-m-b372342a5/"
  },
  {
    name: "Ashvitha",
    designation: "Co-Founder & Marketing Lead",
    image: ashvithaImg,
    linkedin: "https://www.linkedin.com/in/ashvithar/"
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
        padding: "80px 0 120px",
        position: "relative"
      }}
    >
      <div className="site-container">

        {/* Heading Section */}
        <div style={{ textAlign: "left", marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: "0 0 12px 0",
            color: "#111111",
            fontFamily: "'Inter', sans-serif",
          }}>
            <span ref={headingLine1Ref} style={{ display: "inline-block", opacity: 0 }}>
              Meet Our Team
            </span>
          </h2>
          
          <p 
            ref={descRef} 
            style={{
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#9CA3AF",
               
              margin: 0,
              opacity: 0
            }}
          >
            Minds Behind Procomets
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="team-card"
              ref={el => cardImagesRef.current[index] = el}
              style={{ opacity: 0 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="team-card-image"
                loading="lazy"
                draggable="false"
              />

              {/* Gradient & Content Overlay at Bottom Left */}
              <div className="team-card-content">
                <h3 style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 4px 0",
                  lineHeight: 1.2,
                }}>
                  {member.name}
                </h3>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.8)",
                  display: "block",
                }}>
                  {member.designation}
                </span>

                {/* LinkedIn link visible on hover */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#D8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="#D8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="#D8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
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
          gap: 24px;
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
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background-color: #151515;
          aspect-ratio: 4 / 5;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }

        .team-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .team-card:hover .team-card-image {
          transform: scale(1.06);
        }

        .team-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 24px 24px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0) 100%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          transition: padding-bottom 0.3s ease;
        }

        .linkedin-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          color: #D8FF00;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .team-card:hover .linkedin-link {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

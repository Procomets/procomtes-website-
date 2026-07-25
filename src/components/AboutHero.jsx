import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AboutHero() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".about-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        ".about-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        backgroundColor: "#ffffff",
        paddingTop: "140px",
        paddingBottom: "40px",
        overflow: "hidden"
      }}
    >
      <div className="site-container">
        {/* Title */}
        <h1 
          className="about-title"
          style={{
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: "800",
            color: "#111111",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            textAlign: "left"
          }}
        >
          About Us
        </h1>

        {/* Subtitle */}
        <p 
          className="about-subtitle"
          style={{
            fontSize: "16px",
            color: "#6B7280",
            lineHeight: 1.6,
            marginBottom: "24px",
            textAlign: "left",
            maxWidth: "1400px",
            fontWeight: "500"
          }}
        >
          At Procomets, we specialize in creating customized software, AI-powered solutions, and digital experiences that solve real business challenges. Our team combines technical expertise, creativity, and innovation to deliver scalable solutions that help organizations improve efficiency, automate processes, and accelerate growth.
        </p>
        <p style={{
            fontSize: "16px",
            color: "#6B7280",
            lineHeight: 1.6,
            marginBottom: "24px",
            textAlign: "left",
            maxWidth: "1400px",
            fontWeight: "500"
          }} >Procomets, we help businesses transform ideas into powerful digital solutions. From startups to established enterprises, we design, develop, and deliver innovative technology that streamlines operations, enhances customer experiences, and drives business growth.</p>
      </div>
    </section>
  );
}

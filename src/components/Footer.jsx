import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const columnsRef = useRef([]);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const socialIconsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        }
      });

      // Entire footer fade up slightly
      tl.fromTo(footerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Logo slide from left
      tl.fromTo(logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Columns stagger
      tl.fromTo(columnsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        "-=0.4"
      );

      // Nav Links stagger
      if (navLinksRef.current.length > 0) {
        tl.fromTo(navLinksRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.03 },
          "-=0.2"
        );
      }

      // Social Icons stagger scale
      if (socialIconsRef.current.length > 0) {
        tl.fromTo(socialIconsRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)", stagger: 0.05 },
          "-=0.2"
        );
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Services", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const servicesLinks = [
    { label: "Custom ERP Development", href: "#" },
    { label: "AI Automation", href: "#" },
    { label: "Web Development", href: "#" },
    { label: "Mobile App Development", href: "#" },
    { label: "UI/UX Design", href: "#" },
    { label: "Motion Graphics & Video Editing", href: "#" },
    { label: "Business Analytics", href: "#" },
  ];

  const addToNavLinks = (el) => {
    if (el && !navLinksRef.current.includes(el)) {
      navLinksRef.current.push(el);
    }
  };

  const addToSocials = (el) => {
    if (el && !socialIconsRef.current.includes(el)) {
      socialIconsRef.current.push(el);
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-white border-t border-[#ECECEC]"
      style={{ paddingTop: "100px", paddingBottom: "56px", opacity: 0 }}
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-[80px]">
        
        {/* Main Grid: 4 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* COLUMN 1: Brand (Spans 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start" ref={el => columnsRef.current[0] = el}>
            {/* Logo */}
            <div ref={logoRef} className="flex items-center gap-2.5 group mb-[20px]">
              <div className="w-8 h-8 rounded-lg bg-[#D8FF00] flex items-center justify-center font-bold text-black text-sm">
                P
              </div>
              <span className="text-[#111] font-semibold text-xl tracking-tight">
                Procomets
              </span>
            </div>
            
            <h3 className="font-bold text-[#111] mb-[24px] text-base tracking-wide">
              Develop. Design. Automate. Analyse.
            </h3>
            
            <p className="text-[17px] text-[#5F6368] font-normal leading-[1.8] mb-[32px] max-w-[360px]">
              We build custom ERP systems, AI automation, modern web applications, business analytics platforms and digital solutions that help businesses streamline operations and scale efficiently.
            </p>

            {/* Social Icons */}
            <div className="flex gap-[18px] items-center">
              {[
                { name: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" },
                { name: "GitHub", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
                { name: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" },
                { name: "Email", path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  ref={addToSocials}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-[#555] transition-all duration-300 hover:text-[#D8FF00] hover:border-[#D8FF00] hover:bg-[#111] hover:scale-115 hover:-translate-y-1"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Company (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col" ref={el => columnsRef.current[1] = el}>
            <h4 className="text-[12px] uppercase font-bold tracking-[0.15em] text-[#111] mb-[20px]">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-left">
              {companyLinks.map((link, i) => (
                <li key={i} ref={addToNavLinks}>
                  <a 
                    href={link.href} 
                    className="text-[16px] text-[#666] font-normal inline-block transition-all duration-200 hover:text-[#111] hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Services (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col" ref={el => columnsRef.current[2] = el}>
            <h4 className="text-[12px] uppercase font-bold tracking-[0.15em] text-[#111] mb-[20px]">
              Services
            </h4>
            <ul className="flex flex-col gap-4 text-left">
              {servicesLinks.map((link, i) => (
                <li key={i} ref={addToNavLinks}>
                  <a 
                    href={link.href} 
                    className="text-[16px] text-[#666] font-normal inline-block transition-all duration-200 hover:text-[#111] hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col text-left" ref={el => columnsRef.current[3] = el}>
            <h4 className="text-[12px] uppercase font-bold tracking-[0.15em] text-[#111] mb-[20px]">
              Contact
            </h4>
            
            <div className="flex flex-col gap-4">
              <div ref={addToNavLinks}>
                <a href="mailto:hello@procomets.com" className="text-[16px] text-[#666] font-normal inline-block transition-all duration-200 hover:text-[#111] hover:translate-x-1">
                  hello@procomets.com
                </a>
              </div>
              
              <div ref={addToNavLinks}>
                <a href="tel:+910000000000" className="text-[16px] text-[#666] font-normal inline-block transition-all duration-200 hover:text-[#111] hover:translate-x-1">
                  +91 80151 16201
                </a>
              </div>
              
              <div ref={addToNavLinks} className="text-[16px] text-[#666] font-normal leading-[1.6]">
                Chennai, Tamil Nadu<br/>India
              </div>
              
              <div ref={addToNavLinks} className="text-[16px] text-[#666] font-normal leading-[1.6] mt-4">
                Monday – Saturday<br/>9:00 AM – 6:00 PM IST
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#ECECEC] mt-[48px] py-[24px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[14px] text-[#888] font-medium">
            © 2026 Procomets. All rights reserved.
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="group text-[14px] text-[#888] hover:text-[#111] font-medium transition-colors duration-200 relative">
              Privacy Policy
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#111] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="group text-[14px] text-[#888] hover:text-[#111] font-medium transition-colors duration-200 relative">
              Terms of Service
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#111] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

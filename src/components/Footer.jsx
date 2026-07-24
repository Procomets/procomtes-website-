import { Link } from 'react-router-dom';
import logoFooter from "../assets/procomet full logo green.svg";

export default function Footer() {


  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Our Team", href: "/about" },
  ];

  const serviceLinks = [
    { label: "Custom ERP Development", href: "/#services" },
    { label: "AI Automation", href: "/#services" },
    { label: "Web Development", href: "/#services" },
    { label: "Mobile App Development", href: "/#services" },
    { label: "Business Analytics", href: "/#services" },
  ];

  const companyLinks = [
    { label: "FAQs", href: "/#faq" },
    { label: "Contact Us", href: "/#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer
      className="relative bg-[#060609] text-white overflow-hidden border-t border-white/10"
      style={{ paddingTop: "120px" }}
    >
      {/* Primary Brand Glow in Background */}
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D8FF00]/[0.035] blur-[150px] pointer-events-none rounded-full" 
      />

      <div className="site-container relative z-10">
        {/* Top Grid: Main content links */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 ">
          
          {/* Brand Info (Spans 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-3.5 ">
            {/* Logo */}
            <Link to="/" className="flex items-center group mb-6">
              <img 
                src={logoFooter} 
                alt="Procomets" 
                className="h-9 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Tagline / Description */}
            <p className="text-[#9E9EAE] text-[15px] leading-[1.8] mb-10 max-w-[420px]">
              Engineering intelligent systems that transform complex operations into scalable, high-performance digital ecosystems driven by strategy, automation, and business impact.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5">
              {[
                { name: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { name: "GitHub", path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
                { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { name: "LinkedIn", path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" }
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#9E9EAE] hover:text-[#D8FF00] hover:border-[#D8FF00]/50 hover:bg-[#D8FF00]/10 transition-all duration-300"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Menu (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-semibold text-sm mb-6 tracking-wider">
              Menu
            </h4>
            <ul className="flex flex-col gap-1.5">
              {menuLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-[#8E919F] text-sm hover:text-[#D8FF00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (Spans 3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-white font-semibold text-sm mb-6 tracking-wider">
              Services
            </h4>
            <ul className="flex flex-col gap-1.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-[#8E919F] text-sm hover:text-[#D8FF00] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-semibold text-sm mb-6 tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-1.5">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-[#8E919F] text-sm hover:text-[#D8FF00] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[#8E919F] text-sm hover:text-[#D8FF00] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider Line & Copyright Bar */}
        <div className="py-8  flex flex-col sm:flex-row items-center justify-between gap-4  text-xs text-[#4f4f4f]">
          <dev></dev>
          <div >
            © 2026 Procomets. All rights reserved.
          </div>
           
        </div>
      </div>

      {/* Giant Cropped Watermark Text Container */}
      <div 
        className="w-full select-none pointer-events-none overflow-hidden flex justify-center items-end pt-12 pb-0"
      >
        <h1 
          className="font-black text-center tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/[0.10] to-transparent uppercase"
          style={{ 
            fontSize: "clamp(90px, 18vw, 290px)",
            transform: "translateY(35%)",
            lineHeight: 0.85
          }}
        >
          Procomets
        </h1>
      </div>
    </footer>
  );
}


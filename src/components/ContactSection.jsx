import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);
  const successRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        }
      });

      // Left Column Slide
      tl.fromTo(leftColRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );

      // Right Column (Form) Slide
      tl.fromTo(rightColRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Inputs Fade Up Stagger
      const inputs = inputsRef.current.filter(Boolean);
      tl.fromTo(inputs,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 },
        "-=0.4"
      );

      // Button Scale
      tl.fromTo(buttonRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Success Animation
        gsap.fromTo(successRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
        );
      }, 1200);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ backgroundColor: "#ffffff", padding: "120px 0" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }} className="lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Contact Info */}
          <div 
            ref={leftColRef} 
            className="w-full lg:w-[45%] xl:w-[40%] flex flex-col opacity-0 will-change-transform"
          >
            <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.15em", color: "#999", textTransform: "uppercase", marginBottom: "16px", display: "block" }}>
              Get In Touch
            </span>
            
            <h2 style={{ fontSize: "clamp(48px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "24px", color: "#111" }}>
              Send us a <span style={{ color: "#D8FF00" }}>message</span>
            </h2>
            
            <p style={{ fontSize: "18px", color: "rgba(0,0,0,0.6)", lineHeight: 1.7, marginBottom: "48px", maxWidth: "90%" }}>
              Tell us about your business, project, or idea. Our team will review your requirements and get back to you with the best solution.
            </p>

            <div className="flex flex-col gap-8">
              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-black/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Email</h4>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>procomets3@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-black/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0032 20.1986 21.9441 20.4743 21.8271 20.7254C21.71 20.9765 21.5383 21.1963 21.3255 21.3676C21.1128 21.5389 20.8647 21.657 20.5999 21.7135C20.3351 21.77 20.0607 21.7634 19.8 21.694C16.7335 20.7323 13.9169 19.103 11.55 16.932C9.2553 14.8322 7.42621 12.1895 6.2 9.206C6.06941 8.8778 6.00228 8.5273 6.00228 8.173C6.00228 7.8187 6.06941 7.4682 6.2 7.14C6.27318 6.87971 6.3986 6.63853 6.5684 6.43265C6.73819 6.22676 6.94859 6.06093 7.1856 5.94635C7.42261 5.83177 7.68067 5.77112 7.94229 5.76865C8.20392 5.76617 8.46305 5.82194 8.7 5.932L11.7 7.432C11.9669 7.56525 12.1906 7.76615 12.3486 8.0142C12.5065 8.26225 12.5929 8.54877 12.6 8.844C12.6101 9.21323 12.5041 9.57502 12.298 9.876C12.0919 10.177 11.7963 10.4013 11.455 10.516L10.555 10.816C11.516 12.7845 13.1115 14.4285 15.05 15.442L15.35 14.542C15.4673 14.2052 15.6922 13.9152 15.9926 13.7144C16.2929 13.5136 16.6534 13.4124 17.023 13.424C17.3195 13.4338 17.6074 13.5233 17.8559 13.6826C18.1044 13.8419 18.3043 14.065 18.435 14.332L19.935 17.332C20.1741 17.8184 20.1843 18.3846 19.9627 18.8781C19.7412 19.3715 19.317 19.7289 18.8 19.866" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Phone</h4>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>+91 80151 16201, 97890 07999<br/>99406 25630</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-black/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Location</h4>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-black/5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Business Hours</h4>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>Monday – Saturday<br/>9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div 
            ref={rightColRef} 
            className="w-full lg:w-[55%] xl:w-[60%] opacity-0 will-change-transform"
          >
            <div 
              style={{
                backgroundColor: "#F8F8F8",
                borderRadius: "24px",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.03)",
                padding: "48px 40px",
                position: "relative",
                overflow: "hidden"
              }}
              className="form-card"
            >
              {isSuccess ? (
                <div ref={successRef} className="flex flex-col items-center justify-center text-center py-12 opacity-0">
                  <div className="w-20 h-20 bg-[#D8FF00] rounded-full flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[#111] mb-4">Thank you!</h3>
                  <p className="text-lg text-[#555] max-w-md">
                    We've received your message and will contact you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div ref={el => inputsRef.current[0] = el} className="flex flex-col opacity-0">
                      <label htmlFor="name" className="text-[13px] font-semibold text-[#111] mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-black/10'} rounded-[12px] px-4 py-3.5 text-[#111] text-base focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250`}
                      />
                      {errors.name && <span className="text-red-500 text-xs mt-1.5">{errors.name}</span>}
                    </div>

                    {/* Company Name */}
                    <div ref={el => inputsRef.current[1] = el} className="flex flex-col opacity-0">
                      <label htmlFor="company" className="text-[13px] font-semibold text-[#111] mb-2">Company Name</label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white border border-black/10 rounded-[12px] px-4 py-3.5 text-[#111] text-base focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div ref={el => inputsRef.current[2] = el} className="flex flex-col opacity-0">
                      <label htmlFor="email" className="text-[13px] font-semibold text-[#111] mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-black/10'} rounded-[12px] px-4 py-3.5 text-[#111] text-base focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250`}
                      />
                      {errors.email && <span className="text-red-500 text-xs mt-1.5">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div ref={el => inputsRef.current[3] = el} className="flex flex-col opacity-0">
                      <label htmlFor="phone" className="text-[13px] font-semibold text-[#111] mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white border border-black/10 rounded-[12px] px-4 py-3.5 text-[#111] text-base focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service Dropdown */}
                    <div ref={el => inputsRef.current[4] = el} className="flex flex-col opacity-0">
                      <label htmlFor="service" className="text-[13px] font-semibold text-[#111] mb-2">Select Service *</label>
                      <div className="relative">
                        <select 
                          id="service" 
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.service ? 'border-red-400' : 'border-black/10'} rounded-[12px] px-4 py-3.5 text-[#111] text-base appearance-none focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250`}
                        >
                          <option value="" disabled>Select a service...</option>
                          <option value="Custom ERP Development">Custom ERP Development</option>
                          <option value="AI Automation">AI Automation</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Motion Graphics & Video Editing">Motion Graphics & Video Editing</option>
                          <option value="Business Analytics">Business Analytics</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                            <path d="M6 9l6 6 6-6"/>
                          </svg>
                        </div>
                      </div>
                      {errors.service && <span className="text-red-500 text-xs mt-1.5">{errors.service}</span>}
                    </div>

                    {/* Budget Dropdown */}
                    <div ref={el => inputsRef.current[5] = el} className="flex flex-col opacity-0">
                      <label htmlFor="budget" className="text-[13px] font-semibold text-[#111] mb-2">Budget</label>
                      <div className="relative">
                        <select 
                          id="budget" 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-white border border-black/10 rounded-[12px] px-4 py-3.5 text-[#111] text-base appearance-none focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250"
                        >
                          <option value="" disabled>Select budget range...</option>
                          <option value="Under ₹50K">Under ₹50K</option>
                          <option value="₹50K – ₹2L">₹50K – ₹2L</option>
                          <option value="₹2L – ₹5L">₹2L – ₹5L</option>
                          <option value="₹5L+">₹5L+</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                            <path d="M6 9l6 6 6-6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div ref={el => inputsRef.current[6] = el} className="flex flex-col opacity-0">
                    <label htmlFor="message" className="text-[13px] font-semibold text-[#111] mb-2">Message *</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={4}
                      className={`w-full bg-white border ${errors.message ? 'border-red-400' : 'border-black/10'} rounded-[12px] px-4 py-3.5 text-[#111] text-base resize-none focus:outline-none focus:border-[#D8FF00] focus:ring-4 focus:ring-[#D8FF00]/20 transition-all duration-250`}
                    />
                    {errors.message && <span className="text-red-500 text-xs mt-1.5">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <div ref={buttonRef} className="mt-2 opacity-0">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#D8FF00] hover:bg-[#cbf000] text-[#111] font-bold text-[16px] py-4 rounded-[12px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(216,255,0,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Get in Touch"}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

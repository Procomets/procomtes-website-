import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

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
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );

      gsap.fromTo(rightColRef.current,
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );

      const inputs = inputsRef.current.filter(Boolean);
      gsap.fromTo(inputs,
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );

      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
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
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        gsap.fromTo(successRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
        );
      }, 1200);
    }
  };

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="scroll-mt-24 bg-white border-t border-gray-100"
      style={{ padding: "96px 0", backgroundColor: "#ffffff" }}
    >
      <div className="site-container">
        {/* Section Title */}
        <h2 
          className="tracking-tight text-black"
          style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 600, 
            lineHeight: 1.15,
            marginBottom: "48px" 
          }}
        >
          Reach out today
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 justify-between items-start" style={{ gap: "48px" }}>
          
          {/* LEFT COLUMN: Form */}
          <div 
            ref={leftColRef} 
            className="w-full lg:w-[60%] will-change-transform"
          >
            {isSuccess ? (
              <div 
                ref={successRef} 
                className="bg-gray-50 border border-gray-200 text-center"
                style={{ padding: "48px 24px", borderRadius: "16px" }}
              >
                <div 
                  className="bg-[#D8FF00] rounded-full flex items-center justify-center mx-auto"
                  style={{ width: "64px", height: "64px", marginBottom: "16px" }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L20 7" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>Message Sent!</h3>
                <p style={{ fontSize: "16px", color: "#4B5563", maxWidth: "400px", margin: "0 auto" }}>
                  Thank you for reaching out. We have received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }} noValidate>
                
                {/* Row 1: Full Name & Company Name */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                  {/* Full Name */}
                  <div ref={el => inputsRef.current[0] = el} className="flex flex-col">
                    <label htmlFor="name" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                      Full name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      style={{ 
                        width: "100%", 
                        backgroundColor: "#ffffff", 
                        border: errors.name ? "1px solid #EF4444" : "1px solid #E5E7EB", 
                        borderRadius: "12px", 
                        padding: "14px 16px", 
                        fontSize: "15px", 
                        color: "#111827",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                      className="focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                    />
                    {errors.name && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.name}</span>}
                  </div>

                  {/* Company Name */}
                  <div ref={el => inputsRef.current[1] = el} className="flex flex-col">
                    <label htmlFor="company" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                      Company name
                    </label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      style={{ 
                        width: "100%", 
                        backgroundColor: "#ffffff", 
                        border: "1px solid #E5E7EB", 
                        borderRadius: "12px", 
                        padding: "14px 16px", 
                        fontSize: "15px", 
                        color: "#111827",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                      className="focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Email Address & Phone No */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                  {/* Email Address */}
                  <div ref={el => inputsRef.current[2] = el} className="flex flex-col">
                    <label htmlFor="email" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                      Email address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      style={{ 
                        width: "100%", 
                        backgroundColor: "#ffffff", 
                        border: errors.email ? "1px solid #EF4444" : "1px solid #E5E7EB", 
                        borderRadius: "12px", 
                        padding: "14px 16px", 
                        fontSize: "15px", 
                        color: "#111827",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                      className="focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                    />
                    {errors.email && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.email}</span>}
                  </div>

                  {/* Phone No */}
                  <div ref={el => inputsRef.current[3] = el} className="flex flex-col">
                    <label htmlFor="phone" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                      Phone no
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                      style={{ 
                        width: "100%", 
                        backgroundColor: "#ffffff", 
                        border: "1px solid #E5E7EB", 
                        borderRadius: "12px", 
                        padding: "14px 16px", 
                        fontSize: "15px", 
                        color: "#111827",
                        outline: "none",
                        boxSizing: "border-box"
                      }}
                      className="focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                    />
                  </div>
                </div>

                {/* Services */}
                <div ref={el => inputsRef.current[4] = el} className="flex flex-col">
                  <label htmlFor="service" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Services
                  </label>
                  <div className="relative">
                    <select 
                      id="service" 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      style={{ 
                        width: "100%", 
                        backgroundColor: "#ffffff", 
                        border: errors.service ? "1px solid #EF4444" : "1px solid #E5E7EB", 
                        borderRadius: "12px", 
                        padding: "14px 16px", 
                        fontSize: "15px", 
                        color: formData.service ? "#111827" : "#9CA3AF",
                        outline: "none",
                        appearance: "none",
                        boxSizing: "border-box"
                      }}
                      className="focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
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
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                  {errors.service && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.service}</span>}
                </div>

                {/* Message */}
                <div ref={el => inputsRef.current[5] = el} className="flex flex-col">
                  <label htmlFor="message" style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Messages
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your messages here.."
                    rows={5}
                    style={{ 
                      width: "100%", 
                      backgroundColor: "#ffffff", 
                      border: errors.message ? "1px solid #EF4444" : "1px solid #E5E7EB", 
                      borderRadius: "12px", 
                      padding: "14px 16px", 
                      fontSize: "15px", 
                      color: "#111827",
                      outline: "none",
                      resize: "none",
                      minHeight: "150px",
                      boxSizing: "border-box"
                    }}
                    className="focus:border-black focus:ring-1 focus:ring-black/10 transition-all"
                  />
                  {errors.message && <span style={{ color: "#EF4444", fontSize: "12px", marginTop: "4px", display: "block" }}>{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <div ref={buttonRef} style={{ paddingTop: "8px" }}>
                  <Button 
                    variant="shiny"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ padding: "14px 44px" }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>

              </form>
            )}
          </div>

          {/* RIGHT COLUMN: Contact Info */}
          <div 
            ref={rightColRef} 
            className="w-full lg:w-[32%] xl:w-[30%] will-change-transform"
            style={{ paddingTop: "4px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Email */}
              <div>
                <span style={{ display: "block", fontSize: "14px", color: "#6B7280", fontWeight: "400", marginBottom: "6px" }}>Email:</span>
                <a href="mailto:procomets3@gmail.com" style={{ fontSize: "17px", fontWeight: "700", color: "#111827", textDecoration: "none" }} className="hover:underline">
                  procomets3@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <span style={{ display: "block", fontSize: "14px", color: "#6B7280", fontWeight: "400", marginBottom: "6px" }}>Phone:</span>
                <p style={{ fontSize: "17px", fontWeight: "700", color: "#111827", lineHeight: 1.4, margin: 0 }}>
                  +91 80151 16201<br/>
                  +91 97890 07999
                </p>
              </div>

              {/* Office */}
              <div>
                <span style={{ display: "block", fontSize: "14px", color: "#6B7280", fontWeight: "400", marginBottom: "6px" }}>Office:</span>
                <p style={{ fontSize: "17px", fontWeight: "700", color: "#111827", lineHeight: 1.4, margin: 0 }}>
                  Chennai, Tamil Nadu, India
                </p>
              </div>

               
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

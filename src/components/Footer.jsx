// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";
import { Mail, Heart, Github, Linkedin, Twitter } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" style={{ background: "#0A0A0A" }}>
      {/* Decorative gold line at top */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #E2BA5F, #C9A84C, transparent)" }} />

      {/* Top CTA band */}
      <div className="py-16 border-b relative overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {/* Subtle gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="font-bold text-white mb-2"
                style={{
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  lineHeight: 1.15,
                }}>
                Ready to start{" "}
                <em style={{ color: COLORS.gold }}>learning?</em>
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>
                Message us on WhatsApp — we usually respond within an hour.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <motion.a href="https://wa.link/5pk793"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-2xl text-sm font-bold text-center"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
                  color: "#0E0E0E",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
                  letterSpacing: "0.03em",
                }}>
                Join CS Classes →
              </motion.a>
              <motion.a href="https://wa.link/ctfbjv"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-2xl text-sm font-bold border text-center transition-all"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  borderColor: "rgba(255,255,255,0.12)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.color = COLORS.gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                Get a Website Built
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={Logo} alt="Pearlx" className="h-8 w-8 rounded-xl object-cover" />
                <span style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.15rem",
                  letterSpacing: "0.03em",
                }}>Pearlx</span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
                CS education for school students + web development for brands. Built by real developers.
              </p>
              <a href="mailto:support@pearlx.in"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
              >
                <Mail className="w-3.5 h-3.5" />
                support@pearlx.in
              </a>
            </div>

            {/* Links */}
            {[
              { title: "Learn", links: [{ l: "CS Classes", h: "/services/education" }, { l: "Coding Courses", h: "/services/education" }, { l: "Web Development", h: "/services/web-development" }] },
              { title: "Company", links: [{ l: "Services", h: "/services" }, { l: "Contact Us", h: "#contact" }, { l: "Careers", h: "https://forms.gle/YOUR_GOOGLE_FORM_LINK" }] },
              { title: "Boards", links: [{ l: "CBSE Tuition", h: "/services/education" }, { l: "ICSE Tuition", h: "/services/education" }, { l: "IGCSE Tuition", h: "/services/education" }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ color: COLORS.gold, letterSpacing: "0.1em", opacity: 0.8 }}>
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((item) => (
                    <li key={item.l}>
                      <a href={item.h}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.01em" }}
                        onMouseEnter={e => e.currentTarget.style.color = COLORS.gold}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                      >
                        {item.l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-xs flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.03em" }}>
              © {year} Pearlx — made with
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <Heart className="w-3 h-3 fill-current" style={{ color: COLORS.gold }} />
              </motion.span>
              for students
            </p>
            <div className="flex items-center gap-2">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all border"
                  style={{ borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = COLORS.gold; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// src/components/WebServicesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Layout, Code2, Rocket, Shield, ExternalLink } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const services = [
  { icon: Layout, title: "UI / UX Design", desc: "Beautiful, conversion-focused designs built around your brand identity and users." },
  { icon: Code2, title: "Website Development", desc: "React, Node.js, custom CMS — fast, modern, scalable websites." },
  { icon: Rocket, title: "Deployment & SEO", desc: "Domain, hosting, SSL, Google Search Console — fully handled." },
  { icon: Shield, title: "Support & Maintenance", desc: "Ongoing care, security patches, and performance monitoring." },
];

const WebServicesSection = () => (
  <section className="py-0 overflow-hidden">
    <div className="py-28 relative" style={{ background: "#0E0E0E" }}>
      {/* Gold gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />

      {/* Subtle dot grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-4"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.5) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
              Web Studio
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold text-white mb-6"
              style={{
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                lineHeight: 1.1,
              }}>
              We also build{" "}
              <em style={{ color: COLORS.gold }}>great websites</em>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              The same developers who teach CS build real production websites for brands, startups, and professionals.
              From design to deployment.
            </motion.p>

            <div className="flex gap-2.5 flex-wrap mb-8">
              {[
                { label: "E-commerce", color: COLORS.gold },
                { label: "Portfolio", color: COLORS.silverBright },
                { label: "Landing Pages", color: COLORS.emerald },
                { label: "Web Apps", color: "#B87333" },
              ].map((t, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    color: t.color,
                    borderColor: `${t.color}30`,
                    background: `${t.color}10`,
                    letterSpacing: "0.04em",
                  }}>
                  {t.label}
                </motion.span>
              ))}
            </div>

            <motion.a href="https://wa.link/ctfbjv"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
                color: "#0E0E0E",
                boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
                letterSpacing: "0.03em",
              }}
            >
              Get a free quote <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Right — service cards */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-2xl border transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(201,168,76,0.06)";
                  e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <s.icon className="w-4 h-4" style={{ color: COLORS.gold }} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5" style={{ letterSpacing: "0.01em" }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WebServicesSection;
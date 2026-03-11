// src/pages/WebDevelopmentServices.jsx
import { motion } from "framer-motion";
import { Layout, Code, Rocket, Shield, ArrowRight } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const services = [
  { icon: Layout, title: "UI / UX Design", desc: "Clean, conversion-focused designs built around your users.", color: COLORS.gold, bg: COLORS.goldLight },
  { icon: Code, title: "Website Development", desc: "React, Node.js, custom solutions — fast and scalable.", color: COLORS.emerald, bg: "#EBF5EF" },
  { icon: Rocket, title: "Deployment & SEO", desc: "Domain, hosting, SSL, Google Search Console — done.", color: COLORS.silver, bg: COLORS.silverLight },
  { icon: Shield, title: "Maintenance", desc: "Ongoing updates, security patches, and reliable support.", color: "#B87333", bg: "#FBF5EE" },
];

const WebDevelopmentServices = () => (
  <section className="min-h-screen pt-28 pb-24" style={{ background: COLORS.bgPrimary }}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-14 p-10 lg:p-14"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 100%)" }}>
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, #C9A84C, #E2BA5F, #C9A84C)" }} />
        {/* Subtle gold glow top-right */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)", transform: "translate(30%, -30%)" }} />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
          Web Studio
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-bold text-white mb-4"
          style={{
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            lineHeight: 1.1,
          }}>
          Web Development{" "}
          <em style={{ color: COLORS.gold }}>Services</em>
        </motion.h1>
        <p className="text-base max-w-lg" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
          Built by the same developers who teach CS. From design to deployment — we handle everything.
        </p>
        <motion.a href="https://wa.link/ctfbjv"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.4)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-2xl text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
            color: "#0E0E0E",
            boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
            letterSpacing: "0.03em",
          }}
        >
          Get a free quote <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            whileHover={{ y: -6, boxShadow: SHADOWS.hover, transition: { duration: 0.22 } }}
            className="p-7 rounded-3xl border"
            style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.card }}
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: s.bg }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <h3 className="font-bold text-xl mb-2"
              style={{
                color: COLORS.ink,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.25rem",
              }}>
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted, lineHeight: 1.7 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WebDevelopmentServices;
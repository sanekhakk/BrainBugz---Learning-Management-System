// src/components/ProcessSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Map, Rocket, TrendingUp } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const steps = [
  { icon: MessageSquare, n: "01", title: "Free Consultation", desc: "A 15-min chat to understand your board, grade, weak areas, and goals. Zero commitment.", color: COLORS.gold },
  { icon: Map, n: "02", title: "Custom Roadmap", desc: "We build a personalised plan — exact topics, schedule, and milestones mapped out for you.", color: COLORS.silver },
  { icon: Rocket, n: "03", title: "Start Learning", desc: "Live sessions begin. Concept → practice → project. Parents get a weekly progress update.", color: "#B87333" },
  { icon: TrendingUp, n: "04", title: "See Results", desc: "Exam scores improve. Concepts click. Students build things they're proud of.", color: COLORS.emerald },
];

const ProcessSection = () => (
  <section className="py-28 relative overflow-hidden" style={{ background: COLORS.bgPrimary }}>
    {/* Faint large number watermark */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 font-bold select-none pointer-events-none"
      style={{
        color: COLORS.pearlSheen,
        lineHeight: 1,
        fontSize: "clamp(10rem, 22vw, 18rem)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        right: "-2rem",
      }}>
      IV
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="text-center mb-16">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
          The Process
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-bold"
          style={{
            color: COLORS.ink,
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}>
          How it{" "}
          <em style={{ color: COLORS.gold }}>works</em>
        </motion.h2>
      </div>

      <div className="relative">
        {/* Connector line — gold gradient */}
        <div className="absolute top-10 left-16 right-16 h-px hidden lg:block"
          style={{ background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.silver}, #B87333, ${COLORS.emerald})`, opacity: 0.4 }} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Icon circle */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border relative z-10 transition-all duration-300"
                style={{
                  background: COLORS.white,
                  borderColor: COLORS.border,
                  boxShadow: SHADOWS.md,
                }}
                whileHover={{ scale: 1.06, boxShadow: `0 8px 30px rgba(14,14,14,0.12)` }}
              >
                <s.icon className="w-8 h-8" style={{ color: s.color }} />
              </motion.div>

              {/* Number */}
              <div className="font-bold text-xs mb-2 tracking-widest"
                style={{ color: s.color, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}>
                {s.n}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: COLORS.ink }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted, lineHeight: 1.7 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <motion.a href="https://wa.link/5pk793"
          whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.35)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
            color: "#0E0E0E",
            boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
            letterSpacing: "0.03em",
          }}
        >
          Book your free consultation →
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default ProcessSection;
// src/components/WhyPearlxSection.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Target, BookOpen, Users, Zap, Star } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";
import img from "../assets/chooseus.png";

const reasons = [
  { icon: Cpu, title: "Taught by real developers", desc: "Not academic tutors. People who build production apps and teach from hard-won experience." },
  { icon: Target, title: "Concept first, always", desc: "We build intuition so you can solve any problem — not just the ones from the textbook." },
  { icon: BookOpen, title: "Board-exam focused", desc: "Past papers, marking schemes, exam patterns. We know exactly what examiners want." },
  { icon: Users, title: "Small batches only", desc: "Max 6 students per batch. Every student gets attention, every question gets answered." },
  { icon: Zap, title: "Project-based learning", desc: "Every topic ends with a mini project. Students leave with a portfolio, not just notes." },
  { icon: Star, title: "Parents stay in the loop", desc: "Weekly progress reports and open communication. No surprises at report card time." },
];

const WhyPearlxSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28" style={{ background: COLORS.bgSecondary }}>
      {/* Top border line */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Image + quote */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: SHADOWS.float }}
            >
              <img
                src={img}
                alt="Online class"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 35%, rgba(14,14,14,0.75) 100%)" }} />
              {/* Gold accent strip */}
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, #C9A84C, #E2BA5F, #C9A84C)" }} />
              <div className="absolute bottom-5 left-5 right-5">
                <p style={{
                  color: "#fff",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  lineHeight: 1.45,
                }}>
                  "Our goal is simple — make sure every<br></br>Student Truely understands CS."
                </p>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>— Pearlx Founder</p>
              </div>
            </motion.div>

            {/* Second smaller image */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="absolute -bottom-8 -right-6 w-44 h-32 rounded-2xl overflow-hidden border-4 border-white"
              style={{ boxShadow: SHADOWS.lg }}
            >
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&q=80"
                alt="Coding" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -top-5 -left-5 px-4 py-3 rounded-2xl border"
              style={{
                background: COLORS.white,
                borderColor: "rgba(201,168,76,0.25)",
                boxShadow: `${SHADOWS.lg}, 0 0 0 1px rgba(201,168,76,0.1)`,
              }}
            >
              <div className="font-bold text-2xl"
                style={{ color: COLORS.gold, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.02em" }}>
                98%
              </div>
              <div className="text-xs" style={{ color: COLORS.textMuted, letterSpacing: "0.04em" }}>pass rate</div>
            </motion.div>
          </div>

          {/* Right — Reasons */}
          <div ref={ref}>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
              Why Pearlx
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-bold mb-10"
              style={{
                color: COLORS.ink,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                lineHeight: 1.1,
              }}>
              Why students{" "}
              <em style={{ color: COLORS.gold }}>choose us</em>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {reasons.map((r, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-default"
                  style={{ background: COLORS.white, borderColor: COLORS.border }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                    e.currentTarget.style.boxShadow = SHADOWS.md;
                    e.currentTarget.style.background = COLORS.goldLight;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = COLORS.white;
                  }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: COLORS.goldLight }}>
                    <r.icon className="w-4 h-4" style={{ color: COLORS.gold }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-0.5" style={{ color: COLORS.ink }}>{r.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: COLORS.textMuted }}>{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPearlxSection;
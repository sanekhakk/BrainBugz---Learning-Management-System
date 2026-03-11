// src/components/ServicesSection.jsx
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Users, Code, Check, ArrowRight } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const plans = [
    {
      icon: GraduationCap,
      name: "1-on-1 Mentorship",
      tagline: "Your pace, your syllabus",
      price: "Personalised",
      features: [
        "Custom curriculum built around your board",
        "Flexible session scheduling",
        "WhatsApp support between classes",
        "Weekly progress report for parents",
      ],
      color: COLORS.gold,
      bg: COLORS.goldLight,
      textBg: "rgba(201,168,76,0.12)",
      highlight: false,
    },
    {
      icon: Users,
      name: "Small Group Batch",
      tagline: "Best value · 3–6 students",
      price: "Most Popular",
      features: [
        "3–6 students per batch",
        "Collaborative peer learning",
        "Same board, same class",
        "Shared projects + presentations",
      ],
      color: COLORS.gold,
      bg: "#fff",
      textBg: "rgba(255,255,255,0.1)",
      highlight: true,
    },
    {
      icon: Code,
      name: "Coding Courses",
      tagline: "Build real projects",
      price: "Self-paced",
      features: [
        "Python, Java, Web Dev tracks",
        "Project-based — build from day 1",
        "DSA & problem-solving",
        "Portfolio-ready mini apps",
      ],
      color: COLORS.silver,
      bg: COLORS.silverLight,
      textBg: "rgba(142,154,171,0.12)",
      highlight: false,
    },
  ];

  return (
    <section className="py-0 relative overflow-hidden">
      {/* Dark band */}
      <div className="py-28 relative" style={{ background: COLORS.ink }}>
        {/* Subtle gold grain top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />

        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.6) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
                How We Teach
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-bold text-white"
                style={{
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  lineHeight: 1.1,
                }}>
                Pick your{" "}
                <em style={{ color: COLORS.gold }}>learning style</em>
              </motion.h2>
            </div>
            <motion.a href="https://wa.link/5pk793"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border whitespace-nowrap self-start"
              style={{ color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)", letterSpacing: "0.02em" }}
            >
              Not sure? Chat with us <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="relative rounded-3xl p-6 border flex flex-col"
                style={{
                  background: p.highlight ? "linear-gradient(160deg, #1A1A1A 0%, #222018 100%)" : "rgba(255,255,255,0.04)",
                  borderColor: p.highlight ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)",
                  boxShadow: p.highlight ? "0 0 0 1px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.5)" : "none",
                }}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #C9A84C 0%, #E2BA5F 100%)", color: "#0E0E0E", letterSpacing: "0.04em" }}>
                    ★ Most Popular
                  </div>
                )}

                <div className="inline-flex p-2.5 rounded-xl mb-4 self-start"
                  style={{ background: p.textBg, border: `1px solid ${p.highlight ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                  <p.icon className="w-5 h-5" style={{ color: p.highlight ? COLORS.gold : "rgba(255,255,255,0.6)" }} />
                </div>

                <div className="mb-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color: p.highlight ? COLORS.gold : "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
                  {p.price}
                </div>
                <h3 className="text-xl font-bold mb-1"
                  style={{
                    color: "#fff",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.3rem",
                  }}>
                  {p.name}
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {p.tagline}
                </p>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm"
                      style={{ color: "rgba(255,255,255,0.6)" }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.highlight ? COLORS.gold : "rgba(255,255,255,0.35)" }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="https://wa.link/5pk793"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: p.highlight ? "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)" : "rgba(255,255,255,0.07)",
                    color: p.highlight ? "#0E0E0E" : "rgba(255,255,255,0.6)",
                    border: p.highlight ? "none" : "1px solid rgba(255,255,255,0.1)",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={e => {
                    if (!p.highlight) {
                      e.currentTarget.style.background = "rgba(201,168,76,0.15)";
                      e.currentTarget.style.color = COLORS.gold;
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!p.highlight) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    }
                  }}
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
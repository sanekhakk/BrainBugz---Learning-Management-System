// src/pages/Services.jsx
import { motion } from "framer-motion";
import { GraduationCap, Laptop, ArrowRight } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const cards = [
    {
      icon: GraduationCap,
      title: "Computer Science Classes",
      subtitle: "For school students & beginners",
      desc: "Board-specific tuition for CBSE, ICSE, IGCSE + coding courses in Python, Java, Web Dev, and more. Taught by real developers.",
      cta: "Explore CS Classes",
      page: "/services/education",
      accent: COLORS.gold,
      gradBg: COLORS.goldLight,
    },
    {
      icon: Laptop,
      title: "Web Development Services",
      subtitle: "For brands & startups",
      desc: "Custom websites designed, developed, and deployed. From UI/UX to maintenance — built by the same developers who teach here.",
      cta: "Explore Web Dev",
      page: "/services/web-development",
      accent: COLORS.silver,
      gradBg: COLORS.silverLight,
    },
  ];

  return (
    <section className="min-h-screen pt-28 pb-24 px-4 sm:px-6" style={{ background: COLORS.bgPrimary }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
            What we offer
          </p>
          <h1 className="font-bold mb-4"
            style={{
              color: COLORS.ink,
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.1,
            }}>
            Our{" "}
            <em style={{ color: COLORS.gold }}>Services</em>
          </h1>
          <p className="text-sm max-w-md leading-relaxed" style={{ color: COLORS.textMuted }}>
            Two things we do — learning Computer Science and building great websites.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              onClick={() => navigate(c.page)}
              className="group p-7 rounded-3xl border cursor-pointer transition-all duration-300"
              style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.card }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${c.accent}30`;
                e.currentTarget.style.boxShadow = SHADOWS.hover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.boxShadow = SHADOWS.card;
              }}
            >
              <div className="inline-flex p-3 rounded-xl mb-6 border"
                style={{ background: c.gradBg, borderColor: `${c.accent}20` }}>
                <c.icon className="w-6 h-6" style={{ color: c.accent }} />
              </div>
              <p className="text-xs font-bold mb-1.5 tracking-wide" style={{ color: c.accent, letterSpacing: "0.06em" }}>
                {c.subtitle}
              </p>
              <h2 className="font-bold mb-3"
                style={{
                  color: COLORS.ink,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.4rem",
                  letterSpacing: "-0.01em",
                }}>
                {c.title}
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: COLORS.textMuted, lineHeight: 1.75 }}>
                {c.desc}
              </p>
              <div className="flex items-center gap-2 text-sm font-bold transition-all" style={{ color: c.accent, letterSpacing: "0.02em" }}>
                {c.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
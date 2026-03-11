// src/components/SubjectSection.jsx
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, BookOpen, ArrowRight } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const subjects = [
  {
    icon: Code, tag: "Most Popular",
    name: "Computer Science",
    boards: ["CBSE Class 10", "CBSE Class 12", "ICSE", "IGCSE"],
    topics: ["Python / Java / C++", "Algorithms & Logic", "Data Structures", "DBMS & SQL", "Past Paper Practice"],
    color: COLORS.gold, bg: COLORS.goldLight, border: "rgba(201,168,76,0.2)",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80",
  },
  {
    icon: Database, tag: "School Exam",
    name: "Information Technology",
    boards: ["CBSE IT (Class 10)", "CBSE IT (Class 12)", "State Boards"],
    topics: ["Networking Basics", "Database Management", "HTML & Web Basics", "Spreadsheets & Tools"],
    color: COLORS.silver, bg: COLORS.silverLight, border: "rgba(142,154,171,0.25)",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
  },
  {
    icon: BookOpen, tag: "ICSE Focused",
    name: "Computer Applications",
    boards: ["ICSE Class 10", "ISC Class 12", "State Boards"],
    topics: ["Java OOP", "HTML & CSS", "JDBC Basics", "Practical Exam Prep"],
    color: COLORS.emerald, bg: "#EBF5EF", border: "rgba(90,138,106,0.2)",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
  },
];

const SubjectCard = ({ s, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-3xl overflow-hidden border"
      style={{
        background: COLORS.white,
        borderColor: COLORS.border,
        boxShadow: SHADOWS.card,
      }}
      whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(14,14,14,0.12), 0 4px 12px rgba(14,14,14,0.06)`, transition: { duration: 0.3 } }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={s.img} alt={s.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transitionDuration: "700ms" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 25%, rgba(14,14,14,0.62) 100%)" }} />
        {/* Colour strip at very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: s.color }} />
        {/* Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide"
          style={{ background: s.color, color: i === 0 ? "#0E0E0E" : "#fff", letterSpacing: "0.04em" }}>
          {s.tag}
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white text-xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "1.3rem" }}>
            {s.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        {/* Boards */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {s.boards.map((b, bi) => (
            <span key={bi} className="px-2.5 py-0.5 rounded-lg text-xs font-medium"
              style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
              {b}
            </span>
          ))}
        </div>

        {/* Topics */}
        <ul className="space-y-1.5 mb-5">
          {s.topics.map((t, ti) => (
            <li key={ti} className="flex items-center gap-2.5 text-sm" style={{ color: COLORS.textSecondary }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              {t}
            </li>
          ))}
        </ul>

        <a href="https://wa.link/5pk793"
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold border transition-all duration-250 group/btn"
          style={{
            color: s.color,
            borderColor: s.border,
            background: s.bg,
            letterSpacing: "0.02em",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = i === 0 ? "#0E0E0E" : "#fff"; e.currentTarget.style.borderColor = s.color; }}
          onMouseLeave={e => { e.currentTarget.style.background = s.bg; e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.border; }}
        >
          Enroll Now
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

const SubjectSection = () => (
  <section className="py-28 relative overflow-hidden" style={{ background: COLORS.bgPrimary }}>
    {/* Subtle grain */}
    <div className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
      }} />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
            Subjects We Cover
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-bold"
            style={{
              color: COLORS.ink,
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.1,
            }}>
            Every board,{" "}
            <em style={{ color: COLORS.gold }}>every subject</em>
          </motion.h2>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }} className="text-sm max-w-xs leading-relaxed" style={{ color: COLORS.textMuted }}>
          We follow the exact syllabus — then go beyond it so students truly understand CS.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {subjects.map((s, i) => <SubjectCard key={i} s={s} i={i} />)}
      </div>
    </div>
  </section>
);

export default SubjectSection;
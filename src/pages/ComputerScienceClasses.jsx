// src/pages/ComputerScienceClasses.jsx
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

const boards = [
  { name: "CBSE", sub: "Class 10 & 12 — CS & IT", color: COLORS.gold, bg: COLORS.goldLight },
  { name: "ICSE", sub: "Computer Applications", color: COLORS.silver, bg: COLORS.silverLight },
  { name: "IGCSE", sub: "Cambridge CS & ICT", color: "#B87333", bg: "#FBF5EE" },
  { name: "State", sub: "Custom curriculum", color: COLORS.emerald, bg: "#EBF5EF" },
];

const courses = [
  { icon: "🐍", name: "Python Programming", level: "Beginner → Intermediate", board: "All Boards" },
  { icon: "☕", name: "Java Programming", level: "Beginner → Intermediate", board: "ICSE / ISC" },
  { icon: "🌐", name: "Web Development", level: "HTML · CSS · JS · React", board: "All Boards" },
  { icon: "🌲", name: "Data Structures", level: "Arrays, Stacks, Trees", board: "Class 12 / College" },
  { icon: "💻", name: "Computer Basics", level: "Hardware, OS, Networking", board: "Beginners" },
  { icon: "🗄", name: "SQL & DBMS", level: "Queries, ER Diagrams", board: "CBSE / ICSE" },
];

const ComputerScienceClasses = () => (
  <section className="min-h-screen pt-28 pb-24" style={{ background: COLORS.bgPrimary }}>
    <div className="max-w-5xl mx-auto px-4 sm:px-6">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-14 p-10 lg:p-14"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 100%)" }}>
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, #C9A84C, #E2BA5F, #C9A84C)" }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-8 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)", transform: "translate(30%, -30%)" }} />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
          Education
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-bold text-white mb-4"
          style={{
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            lineHeight: 1.1,
          }}>
          Computer Science{" "}
          <em style={{ color: COLORS.gold }}>Classes</em>
        </motion.h1>
        <p className="text-base max-w-lg" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
          Academic tuition for school students across all major boards. Taught by developers who build production software.
        </p>
        <motion.a href="https://wa.link/5pk793"
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
          <GraduationCap className="w-4 h-4" /> Join on WhatsApp <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Boards */}
      <h2 className="font-bold mb-5"
        style={{
          color: COLORS.ink,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: "1.6rem",
          letterSpacing: "-0.02em",
        }}>
        Boards we cover
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {boards.map((b, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl border text-center transition-all duration-200"
            style={{ background: b.bg, borderColor: `${b.color}25` }}
            whileHover={{ y: -4, boxShadow: SHADOWS.md, transition: { duration: 0.2 } }}
          >
            <div className="font-bold mb-1"
              style={{
                color: b.color,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.6rem",
                letterSpacing: "-0.01em",
              }}>
              {b.name}
            </div>
            <div className="text-xs" style={{ color: COLORS.textMuted, letterSpacing: "0.03em" }}>{b.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Courses */}
      <h2 className="font-bold mb-5"
        style={{
          color: COLORS.ink,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: "1.6rem",
          letterSpacing: "-0.02em",
        }}>
        Coding courses
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex gap-3.5 p-4 rounded-2xl border transition-all"
            style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
            whileHover={{ y: -3, boxShadow: SHADOWS.md, borderColor: "rgba(201,168,76,0.25)", transition: { duration: 0.2 } }}
          >
            <span className="text-3xl">{c.icon}</span>
            <div>
              <div className="font-semibold text-sm" style={{ color: COLORS.ink }}>{c.name}</div>
              <div className="text-xs mt-0.5" style={{ color: COLORS.gold }}>{c.level}</div>
              <div className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>{c.board}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ComputerScienceClasses;
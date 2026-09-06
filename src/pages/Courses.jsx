import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, BookOpen, Users, Clock, Code2, Database,
  Globe, Layers, GraduationCap, Award, Rocket, Check, Sparkles, Terminal,
  Target, Trophy, Monitor, Braces, FolderKanban, Play, MessageSquare
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { getWhatsAppLink } from "../utils/whatsapp";

const LOGOS = {
  python: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  java: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
  js: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  html: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  css: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
  react: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  mysql: "https://www.mysql.com/common/logos/logo-mysql-170x115.png",
};

const COURSES = [
  {
    id: "python",
    name: "Python",
    kicker: "Build with Python",
    tagline: "From scripts to full projects",
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
    logo: LOGOS.python,
    Icon: Code2,
    boards: ["CBSE", "ICSE", "ISC", "IGCSE"],
    tracks: [
      { name: "Python Launchpad", type: "Bootcamp", duration: "2 Months", badge: "SHORT" },
      { name: "Python Pro Intensive", type: "Intense Training", duration: "6 Months", badge: "DEEP DIVE" },
    ],
    skills: ["Variables & Loops", "Functions & OOP", "File I/O", "Libraries", "Mini Projects"],
  },
  {
    id: "java",
    name: "Java",
    kicker: "Think in objects",
    tagline: "OOP mastery for boards & beyond",
    color: COLORS.goldDeep,
    light: COLORS.goldLight,
    logo: LOGOS.java,
    Icon: Terminal,
    boards: ["ICSE", "ISC", "CBSE"],
    tracks: [
      { name: "Java Kickstart Bootcamp", type: "Bootcamp", duration: "2 Months", badge: "SHORT" },
      { name: "Java Mastery Intensive", type: "Intense Training", duration: "6 Months", badge: "DEEP DIVE" },
    ],
    skills: ["Java Syntax", "OOP Concepts", "Arrays & Strings", "Data Structures", "Board Prep"],
  },
  {
    id: "webdev",
    name: "Web Development",
    kicker: "Make it live",
    tagline: "Build real websites from scratch",
    color: COLORS.cyan,
    light: COLORS.cyanLight,
    logo: LOGOS.js,
    Icon: Globe,
    boards: ["CBSE", "ICSE", "IGCSE", "All Boards"],
    tracks: [
      { name: "Web Dev Launchpad", type: "Bootcamp", duration: "2 Months", badge: "SHORT" },
      { name: "Full Stack Intensive", type: "Intense Training", duration: "6 Months", badge: "DEEP DIVE" },
    ],
    skills: ["HTML5 & CSS3", "Flexbox & Grid", "JavaScript", "React Basics", "Deploy Sites"],
    stack: [LOGOS.html, LOGOS.css, LOGOS.js, LOGOS.react],
  },
  {
    id: "dbms",
    name: "DBMS & SQL",
    kicker: "Make data make sense",
    tagline: "Databases done right",
    color: COLORS.indigo,
    light: COLORS.indigoLight,
    logo: LOGOS.mysql,
    Icon: Database,
    boards: ["CBSE", "ISC"],
    tracks: [
      { name: "SQL Foundations", type: "Bootcamp", duration: "2 Months", badge: "SHORT" },
      { name: "DBMS Deep Dive", type: "Intense Training", duration: "4 Months", badge: "DEEP DIVE" },
    ],
    skills: ["SQL Queries", "Joins & Subqueries", "ER Diagrams", "Normalization", "Practicals"],
    stack: [LOGOS.mysql],
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    kicker: "Think sharper",
    tagline: "Crack boards & competitive coding",
    color: COLORS.cyan,
    light: COLORS.cyanLight,
    logo: null,
    Icon: FolderKanban,
    boards: ["CBSE", "ISC", "ICSE"],
    tracks: [
      { name: "DSA Essentials", type: "Bootcamp", duration: "2 Months", badge: "SHORT" },
      { name: "DSA + Algo Mastery", type: "Intense Training", duration: "5 Months", badge: "DEEP DIVE" },
    ],
    skills: ["Arrays & Strings", "Stacks & Queues", "Trees & Graphs", "Sorting & Searching", "Complexity"],
  },
];

const WHY = [
  [GraduationCap, "Expert mentors", "Learn live with teachers who know the subject."],
  [Target, "Project first", "Less theory. More making, solving and trying."],
  [Award, "Certificates", "Get recognised for completing your course."],
  [Rocket, "Future ready", "Build skills you can keep using beyond class."],
];

const BOARDS = [
  ["CBSE", "CS & IT", COLORS.gold, BookOpen],
  ["ICSE", "Computer Applications", COLORS.cyan, BookOpen],
  ["ISC", "Computer Science", COLORS.indigo, BookOpen],
  ["IGCSE", "CS & ICT", COLORS.emerald, Globe],
];

const CourseCard = ({ course, index, openDemoModal }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = course.Icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-[2rem] border-2 bg-white"
      style={{
        borderColor: `${course.color}30`,
        boxShadow: SHADOWS.card,
      }}
    >
      <div className="h-1.5 w-full" style={{ background: course.color }} />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div
            className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center shrink-0 bg-white"
            style={{ borderColor: `${course.color}28` }}
          >
            {course.logo ? (
              <img
                src={course.logo}
                alt=""
                className="w-8 h-8 object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <Icon className="w-7 h-7" style={{ color: course.color }} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div
              className="text-[9px] font-black tracking-widest uppercase"
              style={{ color: course.color }}
            >
              {course.kicker}
            </div>
            <h3
              className="font-black text-xl leading-tight mt-1"
              style={{ letterSpacing: "-0.035em" }}
            >
              {course.name}
            </h3>
            <p
              className="text-xs font-bold mt-1"
              style={{ color: COLORS.textSecondary }}
            >
              {course.tagline}
            </p>
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap mt-4">
          {course.boards.map((board) => (
            <span
              key={board}
              className="px-2.5 py-1 rounded-lg text-[9px] font-black border"
              style={{
                color: course.color,
                background: course.light,
                borderColor: `${course.color}25`,
              }}
            >
              {board}
            </span>
          ))}
        </div>

        {course.stack && (
          <div className="flex items-center gap-1.5 mt-4">
            <span
              className="text-[9px] font-black uppercase tracking-wider mr-1"
              style={{ color: COLORS.textMuted }}
            >
              Stack
            </span>
            {course.stack.map((logo, i) => (
              <span
                key={i}
                className="w-7 h-7 rounded-lg border flex items-center justify-center bg-white"
                style={{ borderColor: `${course.color}25` }}
              >
                <img src={logo} alt="" className="w-4.5 h-4.5 object-contain" />
              </span>
            ))}
          </div>
        )}

        {course.tracks.length > 1 && (
          <div
            className="flex items-center gap-2 mt-5 text-[9px] font-black uppercase tracking-wider"
            style={{ color: COLORS.textMuted }}
          >
            <Layers className="w-3.5 h-3.5" />
            Choose your format
          </div>
        )}

        <div className={`grid gap-2.5 mt-${course.tracks.length > 1 ? "2.5" : "5"} ${course.tracks.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
          {course.tracks.map((track) => (
            <div
              key={track.name}
              className="rounded-2xl border p-3.5"
              style={{
                borderColor: COLORS.border,
                background: COLORS.bgSecondary,
              }}
            >
              <div
                className="inline-flex px-2 py-1 rounded-lg text-[8px] font-black"
                style={{ background: course.light, color: course.color }}
              >
                {track.badge}
              </div>
              <div className="font-black text-xs mt-2 leading-tight">
                {track.name}
              </div>
              <div
                className="flex items-center gap-1 mt-1.5 text-[9px] font-bold"
                style={{ color: COLORS.textMuted }}
              >
                <Clock className="w-3 h-3" />
                {track.type} · {track.duration}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-4 text-xs font-black"
          style={{ color: course.color }}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Hide skills" : "See what you'll build"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-3 pb-1">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-bold"
                    style={{
                      borderColor: `${course.color}25`,
                      background: course.light,
                      color: COLORS.textSecondary,
                    }}
                  >
                    <Check className="w-3 h-3" style={{ color: course.color }} />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => openDemoModal?.(`course-${course.id}`)}
          className="w-full mt-4 py-3.5 rounded-2xl text-sm font-black text-white inline-flex items-center justify-center gap-2"
          style={{
            background: course.color,
            boxShadow: SHADOWS.sm,
          }}
        >
          Start with a free class
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
};

const Courses = ({ openDemoModal }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Bootcamps", "Intensive"];

  const visibleCourses = COURSES.map((course) => {
    if (activeFilter === "All") return course;

    const matchingTracks = course.tracks.filter((track) =>
      activeFilter === "Bootcamps"
        ? track.type.includes("Bootcamp")
        : track.type.includes("Intense")
    );

    return matchingTracks.length
      ? { ...course, tracks: matchingTracks }
      : null;
  }).filter(Boolean);

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{ background: COLORS.bgSecondary, color: COLORS.ink }}
    >
      {/* Quiet, handmade-feeling background — no AI-style visual effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-48 -left-48 w-[32rem] h-[32rem] rounded-full blur-3xl"
          style={{ background: COLORS.cyanLight }}
        />
        <div
          className="absolute top-[42%] -right-48 w-[30rem] h-[30rem] rounded-full blur-3xl"
          style={{ background: COLORS.emeraldLight }}
        />
        <div
          className="absolute bottom-0 left-[35%] w-[24rem] h-[24rem] rounded-full blur-3xl"
          style={{ background: COLORS.goldLight }}
        />
      </div>

      {/* HERO */}
      <section className="relative pt-48 sm:pt-48 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-black tracking-widest"
                style={{
                  color: COLORS.cyan,
                  background: COLORS.cyanLight,
                  border: `1px solid ${COLORS.cyan}25`,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                PICK YOUR NEXT SKILL
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.94] tracking-tight mt-4"
                style={{ letterSpacing: "-0.065em" }}
              >
                Learn it.
                <br />
                <span
                  style={{
                    background: GRADIENTS.textGlow,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Build it.
                </span>
                <br />
                Show it.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.16 }}
                className="max-w-lg mx-auto lg:mx-0 mt-5 text-sm sm:text-base leading-relaxed font-medium"
                style={{ color: COLORS.textSecondary }}
              >
                Focused tech courses, live mentors and projects you can actually make.
              </motion.p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2.5 mt-6">
                <button
                  onClick={() => openDemoModal?.("courses-hero")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black text-white"
                  style={{
                    background: GRADIENTS.primary,
                    boxShadow: SHADOWS.lg,
                  }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Book a Free Class
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#course-list"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black border-2 bg-white"
                  style={{
                    color: COLORS.cyan,
                    borderColor: `${COLORS.cyan}30`,
                  }}
                >
                  See courses
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5">
                {[
                  [Users, "Live mentors", COLORS.emerald],
                  [FolderKanban, "Project based", COLORS.cyan],
                  [Award, "Certificate", COLORS.gold],
                ].map(([I, label, color]) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white"
                    style={{ borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
                  >
                    <I className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-[10px] font-black">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COURSE DESK VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="relative max-w-[520px] w-full mx-auto"
            >
              <div
                className="relative rounded-[2.4rem] border-2 bg-white p-4 sm:p-5"
                style={{
                  borderColor: COLORS.border,
                  boxShadow: SHADOWS.lg,
                }}
              >
                <div className="flex items-center justify-between px-1 pb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black tracking-widest" style={{ color: COLORS.textMuted }}>
                        PEARLX
                      </div>
                      <div className="text-xs font-black">Course Shelf</div>
                    </div>
                  </div>
                  <div
                    className="text-[9px] font-black px-2.5 py-1.5 rounded-lg"
                    style={{ color: COLORS.cyan, background: COLORS.cyanLight }}
                  >
                    6 paths
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {COURSES.slice(0, 4).map((course, i) => {
                    const I = course.Icon;
                    return (
                      <motion.div
                        key={course.id}
                        animate={{ y: [0, i % 2 ? -4 : 3, 0] }}
                        transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        className="rounded-2xl border-2 p-3.5 bg-white"
                        style={{ borderColor: `${course.color}28` }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ background: course.light }}
                        >
                          {course.logo ? (
                            <img src={course.logo} alt="" className="w-5 h-5 object-contain" />
                          ) : (
                            <I className="w-5 h-5" style={{ color: course.color }} />
                          )}
                        </div>
                        <div className="text-xs font-black mt-3">{course.name}</div>
                        <div
                          className="text-[9px] font-bold mt-1"
                          style={{ color: COLORS.textMuted }}
                        >
                          {course.tracks[0].duration}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div
                  className="mt-3 rounded-2xl p-3 flex items-center justify-between"
                  style={{ background: COLORS.bgSecondary }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: COLORS.goldLight, color: COLORS.goldDeep }}
                    >
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black">Learn → Build → Celebrate</span>
                  </div>
                  <ArrowRight className="w-4 h-4" style={{ color: COLORS.goldDeep }} />
                </div>
              </div>

              <div
                className="absolute -right-2 sm:-right-5 top-10 px-3 py-2 rounded-xl bg-white border-2 rotate-3"
                style={{ borderColor: `${COLORS.gold}35`, boxShadow: SHADOWS.sm }}
              >
                <div className="text-[9px] font-black" style={{ color: COLORS.goldDeep }}>
                  PICK A PATH
                </div>
              </div>

              <div
                className="absolute -left-2 sm:-left-5 bottom-10 px-3 py-2 rounded-xl bg-white border-2 -rotate-3"
                style={{ borderColor: `${COLORS.emerald}35`, boxShadow: SHADOWS.sm }}
              >
                <div className="text-[9px] font-black" style={{ color: COLORS.emerald }}>
                  MAKE SOMETHING
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COURSE LIST */}
      <section id="course-list" className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.emerald, background: COLORS.emeraldLight }}
            >
              <Braces className="w-3.5 h-3.5" />
              THE COURSE SHELF
            </div>

            <h2
              className="font-black text-3xl sm:text-5xl tracking-tight mt-3"
              style={{ letterSpacing: "-0.055em" }}
            >
              Find your{" "}
              <span
                style={{
                  background: GRADIENTS.textGlow,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                thing.
              </span>
            </h2>
          </div>

          {/* FILTERS */}
          <div className="flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="shrink-0 px-4 py-2.5 rounded-xl border-2 text-[10px] font-black transition-all"
                style={{
                  background: activeFilter === filter ? COLORS.ink : COLORS.white,
                  color: activeFilter === filter ? COLORS.white : COLORS.textSecondary,
                  borderColor: activeFilter === filter ? COLORS.ink : COLORS.border,
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-5">
            {visibleCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                openDemoModal={openDemoModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY PEARLX */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.cyan, background: COLORS.cyanLight }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              THE PEARLX WAY
            </div>
            <h2
              className="font-black text-3xl sm:text-4xl tracking-tight mt-3"
              style={{ letterSpacing: "-0.045em" }}
            >
              More making. Less memorising.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WHY.map(([I, title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border-2 bg-white p-4"
                style={{ borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      i % 2 === 0 ? COLORS.emeraldLight : COLORS.cyanLight,
                    color: i % 2 === 0 ? COLORS.emerald : COLORS.cyan,
                  }}
                >
                  <I className="w-5 h-5" />
                </div>
                <div className="font-black text-sm mt-3">{title}</div>
                <div
                  className="text-[11px] leading-relaxed mt-1"
                  style={{ color: COLORS.textSecondary }}
                >
                  {desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOARDS */}
      <section className="relative py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2
              className="font-black text-3xl sm:text-4xl tracking-tight"
              style={{ letterSpacing: "-0.045em" }}
            >
              Your board. Your path.
            </h2>
            <p
              className="text-xs mt-2"
              style={{ color: COLORS.textMuted }}
            >
              Selected courses are available across the major boards.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {BOARDS.map(([name, sub, color, I]) => (
              <div
                key={name}
                className="rounded-2xl border-2 bg-white p-4 text-center"
                style={{ borderColor: `${color}28`, boxShadow: SHADOWS.sm }}
              >
                <div
                  className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center"
                  style={{ background: `${color}18`, color }}
                >
                  <I className="w-5 h-5" />
                </div>
                <div className="font-black text-lg mt-2" style={{ color }}>
                  {name}
                </div>
                <div className="text-[9px] font-bold mt-0.5" style={{ color: COLORS.textMuted }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-[2.3rem] border-2 bg-white p-7 sm:p-10 text-center"
            style={{
              borderColor: `${COLORS.emerald}25`,
              boxShadow: SHADOWS.lg,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: GRADIENTS.primary }}
            />

            <div
              className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}
            >
              <Rocket className="w-7 h-7" />
            </div>

            <h2
              className="font-black text-3xl sm:text-5xl tracking-tight mt-4"
              style={{ letterSpacing: "-0.055em" }}
            >
              Ready to build something?
            </h2>

            <p
              className="text-sm mt-3"
              style={{ color: COLORS.textSecondary }}
            >
              Start with a free class. Pick the right path together.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-2.5 mt-5">
              <button
                onClick={() => openDemoModal?.("courses-cta")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black text-white"
                style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.lg }}
              >
                Book a Free Class
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink("Hi! I'd like to know more about Pearlx courses.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 text-sm font-black"
                style={{
                  color: COLORS.emerald,
                  borderColor: `${COLORS.emerald}30`,
                }}
              >
                <MessageSquare className="w-4 h-4" />
                Ask us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Courses;

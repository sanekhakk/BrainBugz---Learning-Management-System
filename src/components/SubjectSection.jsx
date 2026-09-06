import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Sprout,
  BookOpen,
  Rocket,
  GraduationCap,
  Check,
} from "lucide-react";

import lp1 from "../assets/kids/LP1.webp";
import bp1 from "../assets/kids/BP1.webp";
import rp1 from "../assets/kids/RP1.webp";
import kid1 from "../assets/kids/KID1.webp";

const LEVELS = [
  {
    id: "little",
    number: "01",
    name: "Little Pearls",
    age: "Ages 5–7",
    grade: "Grades K–2",
    tag: "BEGINNER",
    tagline: "Where every learner begins.",
    desc:
      "A playful first step into coding and maths through stories, puzzles, visual activities and hands-on learning.",
    color: "#F59E0B",
    soft: "#FFF7E6",
    image: lp1,
    icon: Sprout,
    chips: ["Block Coding", "Number Play", "Story Learning"],
    outcome: "Build logic naturally",
  },
  {
    id: "bright",
    number: "02",
    name: "Bright Pearls",
    age: "Ages 8–11",
    grade: "Grades 3–6",
    tag: "INTERMEDIATE",
    tagline: "From curiosity to real projects.",
    desc:
      "Children start building games, apps and stronger maths reasoning while moving confidently from concepts to projects.",
    color: "#10B981",
    soft: "#ECFDF5",
    image: bp1,
    icon: BookOpen,
    chips: ["Scratch → Python", "Fractions & Geometry", "Real Projects"],
    outcome: "Turn ideas into projects",
  },
  {
    id: "rising",
    number: "03",
    name: "Rising Pearls",
    age: "Ages 12–15",
    grade: "Grades 7–10",
    tag: "ADVANCED",
    tagline: "Skills that go beyond the classroom.",
    desc:
      "Advanced coding, web development and competitive maths designed to create confident, independent problem-solvers.",
    color: "#8B5CF6",
    soft: "#F5F3FF",
    image: rp1,
    icon: Rocket,
    chips: ["Python & Web Dev", "Algebra & Olympiad", "Portfolio Projects"],
    outcome: "Build future-ready skills",
  },
  {
    id: "academic",
    number: "04",
    name: "Academic Tuition",
    age: "Classes 1–12",
    grade: "Major School Boards",
    tag: "ACADEMIC",
    tagline: "Better understanding. Better scores.",
    desc:
      "Structured academic support with expert guidance, regular practice, doubt clearing and exam-focused preparation.",
    color: "#0EA5E9",
    soft: "#EFF9FF",
    image: kid1,
    icon: GraduationCap,
    chips: ["CBSE / ICSE / IGCSE", "All Core Subjects", "Exam Preparation"],
    outcome: "Learn with confidence",
  },
];

const LevelVisual = ({ level }) => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ background: level.soft }}
  >
    {/* oversized abstract orbital shapes */}
    <div
      className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[1px]"
      style={{ borderColor: `${level.color}22` }}
    />
    <div
      className="absolute -right-8 top-8 h-56 w-56 rounded-full border-[1px]"
      style={{ borderColor: `${level.color}18` }}
    />
    <div
      className="absolute bottom-[-100px] left-[-80px] h-72 w-72 rounded-full"
      style={{
        background: `radial-gradient(circle, ${level.color}20, transparent 68%)`,
      }}
    />

    {/* subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.045]"
      style={{
        backgroundImage: `linear-gradient(${level.color} 1px, transparent 1px), linear-gradient(90deg, ${level.color} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        maskImage:
          "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      }}
    />

    {/* actual Pearl image */}
    <motion.img
      key={level.id}
      src={level.image}
      alt={level.name}
      initial={{ opacity: 0, y: 25, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="absolute bottom-0 left-1/2 z-10 h-[78%] w-[78%] -translate-x-1/2 object-contain drop-shadow-[0_24px_30px_rgba(15,23,42,0.16)] md:h-[86%] md:w-[78%]"
    />

    {/* floating label */}
    <motion.div
      key={`${level.id}-badge`}
      initial={{ opacity: 0, x: 15, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.18, duration: 0.45 }}
      className="absolute right-5 top-5 z-20 rounded-2xl border bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md md:right-7 md:top-7"
      style={{ borderColor: `${level.color}25` }}
    >
      <p
        className="text-[9px] font-black uppercase tracking-[0.18em]"
        style={{ color: level.color }}
      >
        {level.tag}
      </p>
      <p className="mt-1 text-xs font-black text-slate-800">
        {level.age}
      </p>
    </motion.div>

    {/* outcome pill */}
    <motion.div
      key={`${level.id}-outcome`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.28, duration: 0.45 }}
      className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-full border bg-white/90 px-4 py-2.5 text-[10px] font-black text-slate-700 shadow-lg backdrop-blur-md md:bottom-7 md:left-7"
      style={{ borderColor: `${level.color}25` }}
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full text-white"
        style={{ background: level.color }}
      >
        <Check className="h-3 w-3" />
      </span>
      {level.outcome}
    </motion.div>
  </div>
);

const SubjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("little");

  const current = LEVELS.find((level) => level.id === active) || LEVELS[0];
  const CurrentIcon = current.icon;

  return (
    <section
      id="learning-path"
      ref={ref}
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em]"
              style={{
                color: "#7C3AED",
                background: "#F5F3FF",
                borderColor: "#DDD6FE",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              The Pearlx journey
            </div>

            <h2
              className="font-black leading-[0.96] tracking-[-0.05em]"
              style={{
                color: "#0F172A",
                fontSize: "clamp(2.6rem, 5vw, 5rem)",
              }}
            >
              They grow.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#8B5CF6,#0EA5E9,#10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Their learning grows with them.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-7 text-slate-500 md:pb-1">
            Four pathways, designed around where your child is today — and
            where they can go next.
          </p>
        </motion.div>

        {/* Timeline selector */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative mb-5 overflow-x-auto pb-1"
        >
          <div className="relative flex min-w-max items-center justify-between gap-2 rounded-[2rem] border bg-slate-50 p-2 md:gap-3">
            <div className="pointer-events-none absolute left-[7%] right-[7%] top-1/2 hidden h-px bg-slate-200 md:block" />

            {LEVELS.map((level, i) => {
              const Icon = level.icon;
              const isActive = active === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  onMouseEnter={() => setActive(level.id)}
                  onFocus={() => setActive(level.id)}
                  onClick={() => setActive(level.id)}
                  className="group relative z-10 flex min-w-[150px] flex-1 items-center gap-3 rounded-[1.5rem] border px-4 py-3 text-left transition-all duration-300 md:min-w-0"
                  style={{
                    background: isActive ? "#fff" : "transparent",
                    borderColor: isActive
                      ? `${level.color}35`
                      : "transparent",
                    boxShadow: isActive
                      ? "0 10px 25px rgba(15,23,42,.07)"
                      : "none",
                  }}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{
                      color: level.color,
                      background: `${level.color}12`,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span>
                    <span
                      className="block text-[9px] font-black"
                      style={{ color: level.color }}
                    >
                      {level.number}
                    </span>
                    <span className="block whitespace-nowrap text-xs font-black text-slate-800">
                      {level.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main showcase */}
        <motion.div
          layout
          className="grid min-h-[620px] overflow-hidden rounded-[2.8rem] border md:min-h-[650px] lg:grid-cols-[1.08fr_.92fr]"
          style={{
            borderColor: `${current.color}28`,
            boxShadow: `0 35px 90px ${current.color}10`,
          }}
        >
          {/* Image stage */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <AnimatePresence mode="wait">
              <LevelVisual key={current.id} level={current} />
            </AnimatePresence>
          </div>

          {/* Information stage */}
          <motion.div
            key={`${current.id}-content`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="relative flex flex-col justify-between bg-white p-7 md:p-10 lg:p-12"
          >
            <div>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ color: current.color }}
                  >
                    {current.tag} · {current.age}
                  </p>

                  <h3
                    className="mt-3 font-black tracking-[-0.045em]"
                    style={{
                      color: "#0F172A",
                      fontSize: "clamp(2.2rem, 4vw, 4rem)",
                      lineHeight: 0.98,
                    }}
                  >
                    {current.name}
                  </h3>

                  <p className="mt-3 text-xs font-bold text-slate-400">
                    {current.grade}
                  </p>
                </div>

                <div
                  className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl md:flex"
                  style={{
                    background: current.soft,
                    color: current.color,
                  }}
                >
                  <CurrentIcon className="h-6 w-6" />
                </div>
              </div>

              <div
                className="mt-8 rounded-[1.5rem] border-l-4 px-5 py-4"
                style={{
                  background: current.soft,
                  borderColor: current.color,
                }}
              >
                <p className="text-sm font-black text-slate-800">
                  {current.tagline}
                </p>
              </div>

              <p className="mt-7 max-w-lg text-sm font-medium leading-7 text-slate-500 md:text-base">
                {current.desc}
              </p>

              {/* Chips */}
              <div className="mt-7 flex flex-wrap gap-2">
                {current.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border px-3.5 py-2 text-[10px] font-bold text-slate-600"
                    style={{ borderColor: `${current.color}25` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              {/* mini progression */}
              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                    Learning stage
                  </span>
                  <span
                    className="text-[10px] font-black"
                    style={{ color: current.color }}
                  >
                    {current.number} / 04
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {LEVELS.map((level) => (
                    <div
                      key={level.id}
                      className="h-1.5 flex-1 rounded-full transition-all duration-300"
                      style={{
                        background:
                          LEVELS.indexOf(level) <= LEVELS.indexOf(current)
                            ? level.color
                            : "#E2E8F0",
                      }}
                    />
                  ))}
                </div>
              </div>

              <a
                href={
                  current.id === "academic"
                    ? "/services/academic-tuition"
                    : "/services/education"
                }
                className="group flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
                style={{
                  background: current.color,
                  boxShadow: `0 14px 30px ${current.color}30`,
                }}
              >
                Explore {current.name}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-5 flex flex-col items-start justify-between gap-3 rounded-[1.8rem] border bg-slate-50 px-6 py-5 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-black text-slate-800">
              Not sure which path fits your child?
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              That's exactly what the free trial is for.
            </p>
          </div>

          <span className="text-xs font-black text-slate-500">
            Start → Learn → Build → Grow
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectSection;
export { SubjectSection };

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Trophy, Zap, Star, BookOpen, Users,
  Sprout, Bird, Medal, Award, Calculator, Ruler, Percent, Divide,
  Sigma, PieChart, Puzzle, Brain, Target, Infinity as InfinityIcon,
  Sparkles, Play, Shapes, CheckCircle2
} from "lucide-react";
import { getWhatsAppLink } from "../utils/whatsapp";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

import lp1 from "../assets/kids/LP1.webp";
import bp1 from "../assets/kids/BP1.webp";
import rp1 from "../assets/kids/RP1.webp";
import heroimage from "../assets/kids/mathhero.webp";

const LEVELS = [
  {
    id: "little",
    LevelIcon: Sprout,
    name: "Little Pearls",
    tag: "START HERE",
    color: COLORS.gold,
    light: COLORS.goldLight,
    image: lp1,
    sticker: "🔢",
    tagline: "Numbers become a playground.",
    short: "Count • Play • Discover",
    highlight: "Visual number play",
    modules: [
      { icon: Calculator, label: "Counting & Number Sense" },
      { icon: Puzzle, label: "Shapes & Patterns" },
      { icon: Sigma, label: "Addition & Subtraction" },
      { icon: Ruler, label: "Measurement Basics" },
      { icon: Brain, label: "Logical Reasoning" },
      { icon: Target, label: "Math Puzzles & Games" },
      { icon: Trophy, label: "Capstone Project" },
    ],
    tools: ["Number Blocks", "Interactive Whiteboard", "Math Games"],
    achievement: "Number Ninja Badge",
    description:
      "Stories, games and hands-on challenges that make early maths feel natural.",
  },
  {
    id: "bright",
    LevelIcon: BookOpen,
    name: "Bright Pearls",
    tag: "LEVEL UP",
    color: COLORS.cyan,
    light: COLORS.cyanLight,
    image: bp1,
    sticker: "🧩",
    tagline: "Think it through. Solve it.",
    short: "Fractions • Geometry • Logic",
    highlight: "Real-world problem solving",
    modules: [
      { icon: Divide, label: "Multiplication & Division" },
      { icon: Percent, label: "Fractions & Decimals" },
      { icon: Ruler, label: "Geometry Basics" },
      { icon: PieChart, label: "Data Handling & Graphs" },
      { icon: Target, label: "Word Problems" },
      { icon: Zap, label: "Mental Math Tricks" },
      { icon: Trophy, label: "Capstone Project" },
    ],
    tools: ["GeoGebra", "Math Playground", "Khan Academy"],
    achievement: "Problem Solver Badge",
    description:
      "Stronger number foundations through puzzles, practical problems and smart shortcuts.",
  },
  {
    id: "rising",
    LevelIcon: Bird,
    name: "Rising Pearls",
    tag: "GO FURTHER",
    color: COLORS.indigo,
    light: COLORS.indigoLight,
    image: rp1,
    sticker: "⚡",
    tagline: "Master the patterns behind maths.",
    short: "Algebra • Geometry • Olympiad",
    highlight: "Advanced problem solving",
    modules: [
      { icon: Sigma, label: "Algebra Foundations" },
      { icon: Sigma, label: "Advanced Algebra" },
      { icon: Ruler, label: "Geometry & Mensuration" },
      { icon: InfinityIcon, label: "Trigonometry" },
      { icon: PieChart, label: "Statistics & Probability" },
      { icon: Target, label: "Coordinate Geometry" },
      { icon: Calculator, label: "Number Theory" },
      { icon: Trophy, label: "Olympiad & Competitive Math" },
      { icon: Brain, label: "Speed & Mental Math" },
      { icon: Award, label: "Capstone Project" },
    ],
    tools: ["GeoGebra", "Desmos", "Wolfram Alpha", "Olympiad Workbooks"],
    achievement: "Math Olympian Badge",
    description:
      "Algebra, geometry, statistics and challenging problem solving that builds exam-ready confidence.",
  },
];

const FAQ = [
  {
    q: "Do you offer a free trial?",
    a: "Yes. Book a free 30-minute demo class with no commitment. We can understand the learner's level and show you how the class works.",
  },
  {
    q: "What happens in a Maths class?",
    a: "Classes are live and interactive, using visual explanations, puzzles, guided problem solving and level-appropriate digital tools.",
  },
  {
    q: "Which tools do students use?",
    a: "Depending on the level, students may use interactive whiteboards, number games, GeoGebra, Desmos and other learning tools.",
  },
  {
    q: "How often are classes held?",
    a: "The standard schedule is two live classes per week, with flexible support available around exams and competitions.",
  },
];

const Doodle = ({ children, style, color, delay = 0 }) => (
  <motion.div
    aria-hidden="true"
    className="absolute select-none font-black"
    style={{ color, ...style }}
    animate={{ y: [0, -7, 0], rotate: [-3, 3, -3] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const FaqItem = ({ q, a, i }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="rounded-2xl border-2 overflow-hidden"
      style={{
        borderColor: open ? `${COLORS.indigo}45` : COLORS.border,
        boxShadow: open ? SHADOWS.sm : "none",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
        style={{
          background: open ? COLORS.indigoLight : COLORS.white,
          color: COLORS.ink,
        }}
      >
        <span className="font-black text-sm sm:text-base">{q}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: COLORS.indigo }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 sm:px-5 pb-5 text-sm leading-relaxed"
            style={{
              color: COLORS.textSecondary,
              background: COLORS.indigoLight,
            }}
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MathsClasses = ({ openDemoModal }) => {
  const [active, setActive] = useState(1);
  const level = LEVELS[active];
  const Icon = level.LevelIcon;

  const next = () => setActive((v) => (v + 1) % LEVELS.length);

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{ background: COLORS.bgSecondary, color: COLORS.ink }}
    >
      {/* PLAYFUL BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[30rem] h-[30rem] rounded-full blur-3xl"
          style={{ background: COLORS.goldLight }}
        />
        <div
          className="absolute top-[35%] -right-40 w-[32rem] h-[32rem] rounded-full blur-3xl"
          style={{ background: COLORS.cyanLight }}
        />
        <div
          className="absolute bottom-0 left-[25%] w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{ background: COLORS.indigoLight }}
        />

        <Doodle color={COLORS.gold} style={{ top: "15%", left: "4%", fontSize: 22 }}>
          +
        </Doodle>
        <Doodle color={COLORS.cyan} style={{ top: "24%", right: "5%", fontSize: 18 }} delay={1}>
          ×
        </Doodle>
        <Doodle color={COLORS.indigo} style={{ top: "48%", left: "2%", fontSize: 16 }} delay={2}>
          π
        </Doodle>
        <Doodle color={COLORS.emerald} style={{ bottom: "16%", right: "4%", fontSize: 20 }} delay={1.5}>
          ∑
        </Doodle>
      </div>

      {/* HERO */}
      <section className="relative pt-48 sm:pt-48 pb-10 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-black tracking-wider"
                style={{
                  color: COLORS.indigo,
                  background: COLORS.indigoLight,
                  border: `1px solid ${COLORS.indigo}25`,
                }}
              >
                <Calculator className="w-3.5 h-3.5" />
                MATHS FOR CURIOUS MINDS
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-black tracking-tight leading-[0.94] text-5xl sm:text-6xl lg:text-7xl mt-4"
                style={{ letterSpacing: "-0.065em" }}
              >
                Numbers.
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.indigo})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Patterns.
                </span>
                <br />
                Aha!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="max-w-lg mx-auto lg:mx-0 mt-5 text-sm sm:text-base font-medium leading-relaxed"
                style={{ color: COLORS.textSecondary }}
              >
                Maths that feels less like memorising and more like figuring things out.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2.5 mt-6"
              >
                <button
                  onClick={() => openDemoModal?.("maths-hero")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black text-white active:scale-[0.98] transition-transform"
                  style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.lg }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Try a Free Class
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#levels"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black border-2 bg-white"
                  style={{
                    color: COLORS.indigo,
                    borderColor: `${COLORS.indigo}30`,
                  }}
                >
                  Explore levels
                </a>
              </motion.div>

              <div className="grid grid-cols-3 gap-2.5 mt-5 max-w-md mx-auto lg:mx-0">
                {[
                  [Puzzle, "Puzzles", COLORS.gold],
                  [Brain, "Reasoning", COLORS.cyan],
                  [Trophy, "Challenges", COLORS.indigo],
                ].map(([I, text, color]) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-2xl p-3 border bg-white text-left"
                    style={{ borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
                  >
                    <span
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}18`, color }}
                    >
                      <I className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-black">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MATHS PLAYGROUND */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="relative mx-auto w-full max-w-[500px]"
            >
              <div
                className="absolute -inset-3 rounded-[2.8rem] blur-2xl opacity-70"
                style={{ background: COLORS.indigoLight }}
              />

              <div
                className="relative rounded-[2.4rem] border-2 overflow-hidden bg-white"
                style={{ borderColor: `${COLORS.indigo}30`, boxShadow: SHADOWS.lg }}
              >
                <div
                  className="h-10 px-4 flex items-center justify-between border-b"
                  style={{ background: COLORS.bgSecondary, borderColor: COLORS.border }}
                >
                  <div className="flex gap-1.5">
                    {[COLORS.gold, COLORS.cyan, COLORS.indigo].map((c) => (
                      <span
                        key={c}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[9px] font-black tracking-widest"
                    style={{ color: COLORS.textMuted }}
                  >
                    PEARLX MATH LAB
                  </span>
                </div>

                <div
                  className="relative min-h-[350px] sm:min-h-[410px] flex items-end justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${COLORS.indigoLight}, ${COLORS.bgPrimary})`,
                  }}
                >
                  {/* <div className="absolute left-5 top-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black text-white"
                      style={{ background: COLORS.indigo }}
                    >
                      <Sparkles className="w-3 h-3" />
                      PUZZLE MODE
                    </span>
                  </div> */}

                  {/* <motion.div
                    animate={{ y: [0, -9, 0], rotate: [-2, 2, -2] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-5 top-14 w-16 h-16 rounded-2xl flex items-center justify-center bg-white border-2 rotate-6"
                    style={{ borderColor: `${COLORS.gold}35`, boxShadow: SHADOWS.sm }}
                  >
                    <span className="text-3xl">🧩</span>
                  </motion.div> */}

                  {/* <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute left-5 bottom-7 w-24 h-20 rounded-2xl bg-white border-2 p-2"
                    style={{ borderColor: `${COLORS.cyan}35`, boxShadow: SHADOWS.sm }}
                  >
                    <div className="text-[9px] font-black" style={{ color: COLORS.textMuted }}>
                      TODAY'S PUZZLE
                    </div>
                    <div className="text-xl font-black mt-2" style={{ color: COLORS.indigo }}>
                      8 × 7
                    </div>
                  </motion.div> */}

                  <motion.img
                    src={heroimage}
                    alt="Pearlx maths student"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 h-[78%] sm:h-[82%] max-w-[82%] object-contain"
                  />

                  {/* <div
                    className="absolute right-5 bottom-6 rounded-2xl px-4 py-2 bg-white border-2"
                    style={{ borderColor: `${COLORS.emerald}30`, boxShadow: SHADOWS.sm }}
                  >
                    <div className="text-[9px] font-black" style={{ color: COLORS.emerald }}>
                      SOLVED!
                    </div>
                    <div className="text-xs font-black mt-0.5">Nice thinking ✓</div>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section id="levels" className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.goldDeep, background: COLORS.goldLight }}
            >
              <Shapes className="w-3.5 h-3.5" />
              PICK A PATH
            </div>

            <h2
              className="font-black text-3xl sm:text-5xl tracking-tight mt-3"
              style={{ letterSpacing: "-0.055em" }}
            >
              Three ways to{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.indigo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                love maths.
              </span>
            </h2>
          </div>

          {/* MOBILE-FIRST LEVEL SWITCHER */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x scrollbar-hide">
            {LEVELS.map((item, index) => {
              const selected = active === index;
              const ItemIcon = item.LevelIcon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActive(index)}
                  className="shrink-0 snap-start flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 transition-all"
                  style={{
                    minWidth: "165px",
                    borderColor: selected ? item.color : COLORS.border,
                    background: selected ? item.light : COLORS.white,
                    color: selected ? item.color : COLORS.textMuted,
                    boxShadow: selected ? SHADOWS.sm : "none",
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: selected ? COLORS.white : COLORS.bgTertiary,
                    }}
                  >
                    <ItemIcon className="w-4 h-4" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[11px] font-black">{item.name}</span>
                    <span className="block text-[9px] font-bold mt-0.5">
                      {item.short}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mt-3 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 bg-white"
              style={{
                borderColor: `${level.color}35`,
                boxShadow: SHADOWS.card,
              }}
            >
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                {/* VISUAL */}
                <div
                  className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[500px] flex items-end justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(145deg, ${level.light}, ${COLORS.white})`,
                  }}
                >
                  <div className="absolute top-5 left-5">
                    <span
                      className="px-3 py-1.5 rounded-full text-[9px] font-black text-white"
                      style={{ background: level.color }}
                    >
                      {level.tag}
                    </span>
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-5 top-5 w-14 h-14 rounded-2xl flex items-center justify-center bg-white border-2 rotate-6"
                    style={{ borderColor: `${level.color}30`, boxShadow: SHADOWS.sm }}
                  >
                    <span className="text-2xl">{level.sticker}</span>
                  </motion.div>

                  <img
                    src={level.image}
                    alt={level.name}
                    className="relative z-10 h-[82%] sm:h-[88%] max-w-[86%] object-contain"
                  />

                  <button
                    onClick={next}
                    aria-label="Next maths level"
                    className="absolute right-4 bottom-4 w-11 h-11 rounded-full flex items-center justify-center text-white active:scale-95"
                    style={{ background: level.color, boxShadow: SHADOWS.sm }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div
                    className="absolute left-4 bottom-4 px-3 py-2 rounded-xl bg-white border"
                    style={{ borderColor: COLORS.border }}
                  >
                    <div
                      className="text-[9px] font-black"
                      style={{ color: level.color }}
                    >
                      {level.achievement}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="text-[10px] font-black tracking-widest mb-2"
                        style={{ color: level.color }}
                      >
                        {level.tag}
                      </div>

                      <h3
                        className="font-black text-3xl sm:text-4xl tracking-tight"
                        style={{ letterSpacing: "-0.05em" }}
                      >
                        {level.name}
                      </h3>
                    </div>

                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: level.light, color: level.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-lg font-black mt-4">
                    {level.tagline}
                  </p>

                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl mt-3 text-xs font-black"
                    style={{ background: level.light, color: level.color }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {level.highlight}
                  </div>

                  <p
                    className="text-sm leading-relaxed mt-4"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {level.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-5">
                    {level.modules.slice(0, 6).map((module, index) => {
                      const ModuleIcon = module.icon;

                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2.5 rounded-xl border"
                          style={{
                            borderColor: COLORS.border,
                            background: COLORS.bgSecondary,
                          }}
                        >
                          <ModuleIcon
                            className="w-4 h-4 shrink-0"
                            style={{ color: level.color }}
                          />
                          <span className="text-[10px] font-bold leading-tight">
                            {module.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {level.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-xl text-[10px] font-black border"
                        style={{
                          borderColor: `${level.color}30`,
                          color: level.color,
                          background: level.light,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
                    <button
                      onClick={() => openDemoModal?.(`maths-${level.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-sm font-black text-white"
                      style={{
                        background: level.color,
                        boxShadow: SHADOWS.sm,
                      }}
                    >
                      Try this level
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={getWhatsAppLink(
                        `Hi! I'd like to know more about the ${level.name} Maths program at Pearlx.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border-2 text-sm font-black"
                      style={{
                        borderColor: `${level.color}30`,
                        color: level.color,
                      }}
                    >
                      Ask us
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-5">
            {LEVELS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                aria-label={`Show ${item.name}`}
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: active === index ? 28 : 8,
                  background:
                    active === index ? item.color : COLORS.borderMed,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-[2rem] border-2 bg-white p-5 sm:p-7"
            style={{ borderColor: COLORS.border, boxShadow: SHADOWS.card }}
          >
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                [Puzzle, "Solve, don't memorise", COLORS.gold],
                [Brain, "Think step by step", COLORS.cyan],
                [CheckCircle2, "Build real confidence", COLORS.emerald],
              ].map(([I, text, color]) => (
                <div key={text} className="flex items-center gap-3 p-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, color }}
                  >
                    <I className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        style={{ background: COLORS.white }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.indigo, background: COLORS.indigoLight }}
            >
              <Star className="w-3.5 h-3.5" />
              PARENTS ASK
            </div>

            <h2
              className="font-black text-3xl sm:text-4xl tracking-tight mt-3"
              style={{ letterSpacing: "-0.045em" }}
            >
              Quick answers.
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQ.map((item, i) => (
              <FaqItem key={item.q} {...item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-[2.4rem] border-2 p-7 sm:p-10 text-center"
            style={{
              background: GRADIENTS.lightBg,
              borderColor: `${COLORS.indigo}25`,
              boxShadow: SHADOWS.lg,
            }}
          >
            <div
              className="absolute -top-10 -right-8 text-6xl opacity-40"
              style={{ color: COLORS.gold }}
            >
              ✦
            </div>
            <div
              className="absolute -bottom-10 -left-8 text-7xl opacity-20"
              style={{ color: COLORS.cyan }}
            >
              +
            </div>

            <div className="relative">
              <div
                className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: COLORS.indigoLight, color: COLORS.indigo }}
              >
                <Trophy className="w-7 h-7" />
              </div>

              <h2
                className="font-black text-3xl sm:text-5xl tracking-tight mt-4"
                style={{ letterSpacing: "-0.055em" }}
              >
                Ready for the{" "}
                <span style={{ color: COLORS.indigo }}>“Aha!” moment?</span>
              </h2>

              <p
                className="text-sm mt-3"
                style={{ color: COLORS.textSecondary }}
              >
                Start with a free Pearlx Maths class.
              </p>

              <button
                onClick={() => openDemoModal?.("maths-final")}
                className="inline-flex items-center justify-center gap-2 mt-5 px-6 py-3.5 rounded-2xl text-sm font-black text-white"
                style={{
                  background: GRADIENTS.primary,
                  boxShadow: SHADOWS.lg,
                }}
              >
                Book a Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MathsClasses;

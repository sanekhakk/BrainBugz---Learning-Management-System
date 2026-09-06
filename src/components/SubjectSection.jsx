import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, Code2, Calculator, BookOpen,
  Check, ChevronRight, Star, Rocket, Brain, GraduationCap
} from "lucide-react";
import { getWhatsAppLink } from "../utils/whatsapp";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

import lp1 from "../assets/kids/LP1.webp";
import bp1 from "../assets/kids/BP1.webp";
import rp1 from "../assets/kids/RP1.webp";
import kid1 from "../assets/kids/KID1.webp";

const CODING_ROUTE = "/services/education";
const MATHS_ROUTE = "/mathsclasses";
const ACADEMIC_ROUTE = "/services/academic-tuition";

const LEVELS = [
  {
    id: "little",
    name: "Little Pearls",
    label: "START HERE",
    color: COLORS.gold,
    light: COLORS.goldLight,
    image: lp1,
    icon: Sparkles,
    sticker: "🌱",
    headline: "Play. Discover. Learn.",
    desc: "A gentle first step into coding and maths through stories, games and playful challenges.",
    chips: ["Block Coding", "Number Play", "Mini Games"],
    stats: ["7 Modules", "84 Lessons"],
    cta: "Explore level",
    route: CODING_ROUTE,
    secondaryRoute: MATHS_ROUTE,
  },
  {
    id: "bright",
    name: "Bright Pearls",
    label: "LEVEL UP",
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
    image: bp1,
    icon: Rocket,
    sticker: "🚀",
    headline: "Build things for real.",
    desc: "Kids turn ideas into games, apps and clever maths solutions they can proudly show off.",
    chips: ["Scratch + Python", "Fractions", "Projects"],
    stats: ["6 Modules", "72 Lessons"],
    cta: "Explore level",
    route: CODING_ROUTE,
    secondaryRoute: MATHS_ROUTE,
  },
  {
    id: "rising",
    name: "Rising Pearls",
    label: "GO FURTHER",
    color: COLORS.indigo,
    light: COLORS.indigoLight,
    image: rp1,
    icon: Brain,
    sticker: "⚡",
    headline: "Think bigger. Build smarter.",
    desc: "Advanced coding, web development and competitive maths for curious young minds.",
    chips: ["Python + Web", "Algebra", "Advanced Projects"],
    stats: ["10 Modules", "120 Lessons"],
    cta: "Explore level",
    route: CODING_ROUTE,
    secondaryRoute: MATHS_ROUTE,
  },
  {
    id: "academic",
    name: "Academic Tuition",
    label: "SCHOOL SUPPORT",
    color: COLORS.cyan,
    light: COLORS.cyanLight,
    image: kid1,
    icon: GraduationCap,
    sticker: "📚",
    headline: "School feels easier.",
    desc: "Personalized support for Maths, Science, English, Social Science, Computer Science and more.",
    chips: ["CBSE / ICSE", "IGCSE", "State Boards"],
    stats: ["Classes 1–12", "1:1 Support"],
    cta: "Explore tuition",
    route: ACADEMIC_ROUTE,
    secondaryRoute: null,
  },
];

const StepDots = ({ active, onChange }) => (
  <div className="flex items-center justify-center gap-2">
    {LEVELS.map((level, index) => (
      <button
        key={level.id}
        aria-label={`Show ${level.name}`}
        onClick={() => onChange(index)}
        className="h-2.5 rounded-full transition-all duration-300"
        style={{
          width: active === index ? 28 : 8,
          background: active === index ? level.color : COLORS.borderMed,
        }}
      />
    ))}
  </div>
);

const SubjectSection = () => {
  const [active, setActive] = useState(0);
  const level = LEVELS[active];
  const Icon = level.icon;

  const next = () => setActive((v) => (v + 1) % LEVELS.length);

  return (
    <section
      id="curriculum"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{ background: COLORS.bgSecondary }}
    >
      {/* Playful, lightweight background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-24 w-72 h-72 rounded-full blur-3xl opacity-60"
          style={{ background: COLORS.cyanLight }}
        />
        <div
          className="absolute -bottom-40 -right-24 w-80 h-80 rounded-full blur-3xl opacity-60"
          style={{ background: COLORS.emeraldLight }}
        />

        <div
          className="absolute top-20 right-[8%] text-2xl opacity-50 rotate-12"
          style={{ color: COLORS.gold }}
        >
          ✦
        </div>
        <div
          className="absolute top-[42%] left-[4%] text-xl opacity-40 -rotate-12"
          style={{ color: COLORS.indigo }}
        >
          ●
        </div>
        <div
          className="absolute bottom-24 right-[7%] text-3xl opacity-40"
          style={{ color: COLORS.cyan }}
        >
          +
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-9 sm:mb-12">
          {/* <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-black mb-4"
            style={{
              color: COLORS.emerald,
              background: COLORS.emeraldLight,
              border: `1px solid ${COLORS.emerald}22`,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Pick their adventure
          </motion.div> */}

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black tracking-tight leading-[0.98] text-4xl sm:text-5xl lg:text-6xl"
            style={{ color: COLORS.ink, letterSpacing: "-0.055em" }}
          >
            Learning should feel
            <br />
            <span
              style={{
                background: GRADIENTS.textGlow,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              like an adventure.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: COLORS.textSecondary }}
          >
            The right challenge at the right age — with room to explore,
            make mistakes and get excited about learning.
          </motion.p>
        </div>

        {/* Mobile-first adventure selector */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 mb-5 snap-x snap-mandatory scrollbar-hide lg:justify-center">
          {LEVELS.map((item, index) => {
            const ActiveIcon = item.icon;
            const selected = active === index;

            return (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                className="snap-start shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border-2 transition-all duration-200"
                style={{
                  background: selected ? COLORS.white : "rgba(255,255,255,0.55)",
                  borderColor: selected ? item.color : COLORS.border,
                  boxShadow: selected ? SHADOWS.sm : "none",
                  color: selected ? item.color : COLORS.textMuted,
                }}
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: selected ? item.light : COLORS.bgTertiary,
                  }}
                >
                  <ActiveIcon className="w-4 h-4" />
                </span>
                <span className="text-left leading-none">
                  <span className="block text-[11px] font-black">{item.name}</span>
                  
                </span>
              </button>
            );
          })}
        </div>

        {/* Main interactive level scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28 }}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border-2 bg-white"
            style={{
              borderColor: `${level.color}35`,
              boxShadow: SHADOWS.card,
            }}
          >
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              {/* Visual playground */}
              <div
                className="relative min-h-[285px] sm:min-h-[360px] lg:min-h-[460px] overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${level.light}, ${COLORS.bgPrimary})`,
                }}
              >
                {/* Doodle shapes */}
                <div
                  className="absolute w-36 h-36 rounded-full border-2 border-dashed opacity-40 -top-10 -left-10"
                  style={{ borderColor: level.color }}
                />
                <motion.div
                  animate={{ rotate: [0, 8, 0, -8, 0], y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-7 right-6 w-14 h-14 rounded-[1.25rem] flex items-center justify-center rotate-6"
                  style={{
                    background: COLORS.white,
                    border: `2px solid ${level.color}30`,
                    boxShadow: SHADOWS.sm,
                  }}
                >
                  <span className="text-2xl">{level.sticker}</span>
                </motion.div>

                <div className="absolute left-5 top-5">
                  <span
                    className="px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest text-white"
                    style={{ background: level.color }}
                  >
                    {level.label}
                  </span>
                </div>

                {/* Character */}
                <motion.div
                  animate={{ y: [0, -9, 0], rotate: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 bottom-0 top-16 flex items-end justify-center px-8"
                >
                  <img
                    src={level.image}
                    alt={level.name}
                    className="h-[82%] sm:h-[88%] w-auto max-w-[82%] object-contain"
                    style={{
                      filter: "drop-shadow(0 18px 24px rgba(15,23,42,0.14))",
                    }}
                  />
                </motion.div>

                {/* Little floating learning tokens */}
                <div
                  className="absolute left-4 bottom-5 sm:left-7 sm:bottom-7 px-3 py-2 rounded-2xl bg-white border"
                  style={{ borderColor: `${level.color}25`, boxShadow: SHADOWS.sm }}
                >
                  <div className="text-[9px] font-black" style={{ color: level.color }}>
                    TODAY'S QUEST
                  </div>
                  <div className="text-xs font-black mt-0.5" style={{ color: COLORS.ink }}>
                    Learn something new ✨
                  </div>
                </div>

                <button
                  onClick={next}
                  aria-label="Next learning level"
                  className="absolute right-4 bottom-5 sm:right-7 sm:bottom-7 w-11 h-11 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
                  style={{ background: level.color, boxShadow: SHADOWS.sm }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-11 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    {/* <div
                      className="text-[10px] font-black uppercase tracking-widest mb-2"
                      style={{ color: level.color }}
                    >
                      Ages {level.age}
                    </div> */}
                    <h3
                      className="font-black text-3xl sm:text-4xl tracking-tight"
                      style={{ color: COLORS.ink, letterSpacing: "-0.045em" }}
                    >
                      {level.name}
                    </h3>
                  </div>

                  <div
                    className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: level.light,
                      color: level.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h4
                  className="text-lg sm:text-xl font-black mb-2"
                  style={{ color: COLORS.textPrimary }}
                >
                  {level.headline}
                </h4>

                <p
                  className="text-sm sm:text-base leading-relaxed mb-5"
                  style={{ color: COLORS.textSecondary }}
                >
                  {level.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {level.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] sm:text-[11px] font-black"
                      style={{
                        color: level.color,
                        background: level.light,
                      }}
                    >
                      <Check className="w-3 h-3" />
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {level.stats.map((stat) => (
                    <div
                      key={stat}
                      className="rounded-2xl p-3.5 border"
                      style={{
                        borderColor: COLORS.border,
                        background: COLORS.bgSecondary,
                      }}
                    >
                      <div
                        className="text-sm font-black"
                        style={{ color: COLORS.ink }}
                      >
                        {stat}
                      </div>
                      <div
                        className="text-[9px] font-bold uppercase tracking-wider mt-1"
                        style={{ color: COLORS.textMuted }}
                      >
                        Learning path
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={level.route}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-sm font-black text-white active:scale-[0.98] transition-transform"
                    style={{
                      background: level.color,
                      boxShadow:
                        level.color === COLORS.gold
                          ? SHADOWS.glowGold
                          : level.color === COLORS.cyan
                          ? SHADOWS.glowCyan
                          : level.color === COLORS.indigo
                          ? SHADOWS.sm
                          : SHADOWS.glowEmer,
                    }}
                  >
                    {level.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {level.secondaryRoute && (
                    <a
                      href={level.secondaryRoute}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-sm font-black border-2 active:scale-[0.98] transition-transform"
                      style={{
                        borderColor: `${level.color}35`,
                        color: level.color,
                        background: COLORS.white,
                      }}
                    >
                      <Calculator className="w-4 h-4" />
                      Try Maths
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe / progress cue */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <StepDots active={active} onChange={setActive} />
          <div
            className="flex items-center gap-1.5 text-[10px] font-bold"
            style={{ color: COLORS.textMuted }}
          >
            <span>Tap a level</span>
            <span>•</span>
            <span>or swipe to explore</span>
          </div>
        </div>

        {/* Bottom parent reassurance — intentionally compact */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 mx-auto max-w-3xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 border flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: COLORS.white,
            borderColor: COLORS.border,
            boxShadow: SHADOWS.sm,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: COLORS.goldLight,
                color: COLORS.goldDeep,
              }}
            >
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-sm font-black" style={{ color: COLORS.ink }}>
                One journey. No pressure.
              </div>
              <div className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>
                Kids move forward when they’re ready.
              </div>
            </div>
          </div>

          <a
            href={getWhatsAppLink("Hi! I'd like to book a free trial class for my child at Pearlx.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black text-white"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glowEmer,
            }}
          >
            Book a free trial
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectSection;

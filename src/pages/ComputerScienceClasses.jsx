import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Trophy, Zap, Star, BookOpen, Users, Clock,
  Sprout, Bird, Medal, Code2, FlaskConical, Gamepad2, Smartphone, Globe,
  Award, Cpu, Terminal, Sparkles, Rocket, Check, Play, Layers
} from "lucide-react";
import { getWhatsAppLink } from "../utils/whatsapp";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

import lp1 from "../assets/kids/LP1.webp";
import bp1 from "../assets/kids/BP1.webp";
import rp1 from "../assets/kids/RP1.webp";

const LEVELS = [
  {
    id: "little",
    LevelIcon: Sprout,
    name: "Little Pearls",
    tag: "START HERE",
    color: COLORS.gold,
    light: COLORS.goldLight,
    image: lp1,
    sticker: "🌱",
    tagline: "Code feels like play.",
    short: "Stories • Games • Logic",
    highlight: "Drag, drop & discover",
    modules: [
      { icon: Cpu, label: "Coding Fundamentals" },
      { icon: Gamepad2, label: "Game Development" },
      { icon: Smartphone, label: "App Development" },
      { icon: Code2, label: "Python Basics" },
      { icon: Globe, label: "HTML & CSS" },
      { icon: Trophy, label: "Capstone Project" },
    ],
    tools: ["Scratch Jr", "Code.org", "Trinket.io"],
    achievement: "Coder Badge",
  },
  {
    id: "bright",
    LevelIcon: BookOpen,
    name: "Bright Pearls",
    tag: "LEVEL UP",
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
    image: bp1,
    sticker: "🚀",
    tagline: "Ideas become real projects.",
    short: "Games • Apps • Python",
    highlight: "Build, test & remix",
    modules: [
      { icon: Cpu, label: "Coding Fundamentals" },
      { icon: Gamepad2, label: "Game Development" },
      { icon: Smartphone, label: "App Development" },
      { icon: Code2, label: "Python Basics" },
      { icon: Globe, label: "HTML & CSS" },
      { icon: Trophy, label: "Capstone Project" },
    ],
    tools: ["Scratch", "App Lab", "Thunkable", "Trinket.io"],
    achievement: "Builder Badge",
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
    tagline: "Build like a pro.",
    short: "Python • Web • Apps",
    highlight: "Real code. Real portfolio.",
    modules: [
      { icon: Cpu, label: "Python" },
      { icon: Code2, label: "JavaScript" },
      { icon: Globe, label: "Web Development" },
      { icon: Smartphone, label: "Mobile Apps" },
      { icon: Layers, label: "Full-Stack Projects" },
      { icon: Trophy, label: "Capstone Project" },
    ],
    tools: ["Replit", "GitHub Pages", "Thunkable", "VS Code"],
    achievement: "Pro Coder Badge",
  },
];

const FAQ = [
  {
    q: "Do you offer a free trial?",
    a: "Yes. Book a free demo class and see how Pearlx works before enrolling.",
  },
  {
    q: "How do classes work?",
    a: "Live online classes with hands-on building, guided practice and projects.",
  },
  {
    q: "Is there homework?",
    a: "Only light, fun projects that encourage kids to keep building between classes.",
  },
  {
    q: "What will my child build?",
    a: "Depending on the level: stories, games, apps, websites and portfolio-ready projects.",
  },
];

const Feature = ({ icon: Icon, title, color }) => (
  <div
    className="flex items-center gap-3 rounded-2xl p-3.5 border bg-white"
    style={{ borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `${color}18`, color }}
    >
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-xs sm:text-sm font-black" style={{ color: COLORS.ink }}>
      {title}
    </span>
  </div>
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
      style={{ borderColor: open ? `${COLORS.emerald}45` : COLORS.border }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
        style={{ background: open ? COLORS.emeraldLight : COLORS.white }}
      >
        <span className="font-black text-sm" style={{ color: COLORS.ink }}>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: COLORS.emerald }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 sm:px-5 pb-5 text-sm leading-relaxed"
            style={{ color: COLORS.textSecondary, background: COLORS.emeraldLight }}
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ComputerScienceClasses = ({ openDemoModal }) => {
  const [active, setActive] = useState(1);
  const level = LEVELS[active];
  const Icon = level.LevelIcon;

  const next = () => setActive((v) => (v + 1) % LEVELS.length);

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{ background: COLORS.bgSecondary, color: COLORS.ink }}
    >
      {/* HERO */}
      <section className="relative pt-48 sm:pt-48 pb-10 sm:pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -left-28 w-80 h-80 rounded-full blur-3xl"
            style={{ background: COLORS.cyanLight }}
          />
          <div
            className="absolute top-40 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: COLORS.emeraldLight }}
          />
          <div
            className="absolute top-20 right-[12%] text-3xl rotate-12"
            style={{ color: COLORS.gold }}
          >
            ✦
          </div>
          <div
            className="absolute top-[48%] left-[5%] text-2xl"
            style={{ color: COLORS.indigo }}
          >
            +
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-black tracking-wider mb-4"
                style={{
                  color: COLORS.emerald,
                  background: COLORS.emeraldLight,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                CODING FOR KIDS
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-black tracking-tight leading-[0.94] text-5xl sm:text-6xl lg:text-7xl"
                style={{ letterSpacing: "-0.065em" }}
              >
                Make.
                <br />
                <span
                  style={{
                    background: GRADIENTS.textGlow,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Break.
                </span>
                <br />
                Build again.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="max-w-lg mx-auto lg:mx-0 mt-5 text-sm sm:text-base font-medium leading-relaxed"
                style={{ color: COLORS.textSecondary }}
              >
                A playful coding journey where kids learn by creating games,
                apps and websites — not by memorising boring syntax.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2.5 mt-6"
              >
                <button
                  onClick={() => openDemoModal?.("kids-hero")}
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
                  style={{ color: COLORS.emerald, borderColor: `${COLORS.emerald}30` }}
                >
                  Explore levels
                </a>
              </motion.div>

              <div className="grid grid-cols-3 gap-2.5 mt-7 max-w-md mx-auto lg:mx-0">
                <Feature icon={Users} title="Small groups" color={COLORS.emerald} />
                <Feature icon={BookOpen} title="Project based" color={COLORS.cyan} />
                <Feature icon={Trophy} title="Build & show" color={COLORS.gold} />
              </div>
            </div>

            {/* Hero playground */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div
                className="absolute -inset-3 rounded-[2.8rem] opacity-70 blur-2xl"
                style={{ background: COLORS.cyanLight }}
              />

              <div
                className="relative rounded-[2.4rem] border-2 overflow-hidden bg-white"
                style={{ borderColor: `${COLORS.cyan}30`, boxShadow: SHADOWS.lg }}
              >
                <div
                  className="h-10 px-4 flex items-center justify-between border-b"
                  style={{ background: COLORS.bgSecondary, borderColor: COLORS.border }}
                >
                  <div className="flex gap-1.5">
                    {[COLORS.gold, COLORS.emerald, COLORS.cyan].map((c) => (
                      <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-[9px] font-black tracking-widest" style={{ color: COLORS.textMuted }}>
                    PEARLX PLAYGROUND
                  </span>
                </div>

                <div
                  className="relative min-h-[350px] sm:min-h-[420px] flex items-end justify-center"
                  style={{
                    background: `linear-gradient(145deg, ${COLORS.cyanLight}, ${COLORS.bgPrimary})`,
                  }}
                >
                  <div className="absolute left-5 top-5">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black text-white"
                      style={{ background: COLORS.indigo }}
                    >
                      <Code2 className="w-3 h-3" />
                      CREATE MODE
                    </span>
                  </div>

                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-5 top-16 w-14 h-14 rounded-2xl flex items-center justify-center bg-white border-2 rotate-6"
                    style={{ borderColor: `${COLORS.gold}35`, boxShadow: SHADOWS.sm }}
                  >
                    <span className="text-2xl">🚀</span>
                  </motion.div>

                  <motion.img
                    src={bp1}
                    alt="Pearlx coding student"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 h-[78%] sm:h-[82%] max-w-[82%] object-contain"
                    style={{ filter: "drop-shadow(0 20px 24px rgba(15,23,42,0.15))" }}
                  />

                  <div
                    className="absolute left-4 bottom-4 px-3 py-2.5 rounded-2xl bg-white border"
                    style={{ borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
                  >
                    <div className="text-[9px] font-black" style={{ color: COLORS.emerald }}>
                      PROJECT UNLOCKED
                    </div>
                    <div className="text-xs font-black mt-0.5">My first game 🎮</div>
                  </div>

                  <div
                    className="absolute right-4 bottom-4 px-3 py-2.5 rounded-2xl"
                    style={{ background: COLORS.navDark, color: COLORS.white }}
                  >
                    <div className="text-[9px] opacity-60 font-bold">LEVEL</div>
                    <div className="text-sm font-black">02 / 03</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section id="levels" className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black mb-3"
              style={{ color: COLORS.cyan, background: COLORS.cyanLight }}
            >
              <Rocket className="w-3.5 h-3.5" />
              PICK A PATH
            </div>
            <h2
              className="font-black text-3xl sm:text-5xl tracking-tight"
              style={{ letterSpacing: "-0.05em" }}
            >
              Three levels.
              <br />
              <span style={{ color: COLORS.emerald }}>One coding adventure.</span>
            </h2>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
            {LEVELS.map((item, index) => {
              const ItemIcon = item.LevelIcon;
              const selected = active === index;

              return (
                <button
                  key={item.id}
                  onClick={() => setActive(index)}
                  className="snap-start shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border-2 transition-all"
                  style={{
                    background: selected ? COLORS.white : "rgba(255,255,255,0.6)",
                    borderColor: selected ? item.color : COLORS.border,
                    color: selected ? item.color : COLORS.textMuted,
                    boxShadow: selected ? SHADOWS.sm : "none",
                  }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: selected ? item.light : COLORS.bgTertiary }}
                  >
                    <ItemIcon className="w-4 h-4" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[11px] font-black">{item.name}</span>
                    <span className="block text-[9px] font-bold mt-0.5" style={{ color: COLORS.textMuted }}>
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
              style={{ borderColor: `${level.color}35`, boxShadow: SHADOWS.card }}
            >
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div
                  className="relative min-h-[300px] sm:min-h-[370px] lg:min-h-[470px] flex items-end justify-center overflow-hidden"
                  style={{ background: `linear-gradient(145deg, ${level.light}, ${COLORS.white})` }}
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
                    style={{ filter: "drop-shadow(0 20px 26px rgba(15,23,42,0.13))" }}
                  />

                  <button
                    onClick={next}
                    aria-label="Next coding level"
                    className="absolute right-4 bottom-4 w-11 h-11 rounded-full flex items-center justify-center text-white active:scale-95"
                    style={{ background: level.color, boxShadow: SHADOWS.sm }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 sm:p-8 lg:p-11">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black tracking-widest mb-2" style={{ color: level.color }}>
                        {level.tag}
                      </div>
                      <h3 className="font-black text-3xl sm:text-4xl tracking-tight" style={{ letterSpacing: "-0.05em" }}>
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

                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl mt-4 text-xs font-black"
                    style={{ background: level.light, color: level.color }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {level.highlight}
                  </div>

                  <p className="text-lg font-black mt-4" style={{ color: COLORS.textPrimary }}>
                    {level.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 mt-5">
                    {level.modules.map((item) => {
                      const ModIcon = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-2.5 p-3 rounded-xl border"
                          style={{ borderColor: COLORS.border, background: COLORS.bgSecondary }}
                        >
                          <ModIcon className="w-4 h-4 shrink-0" style={{ color: level.color }} />
                          <span className="text-[10px] sm:text-[11px] font-black">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {level.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-xl text-[10px] font-black"
                        style={{ background: level.light, color: level.color }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-2 mt-5 p-3.5 rounded-2xl"
                    style={{ background: COLORS.goldLight }}
                  >
                    <Medal className="w-5 h-5 shrink-0" style={{ color: COLORS.goldDeep }} />
                    <span className="text-xs font-black">
                      Finish with: <span style={{ color: COLORS.goldDeep }}>{level.achievement}</span>
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 mt-6">
                    <button
                      onClick={() => openDemoModal?.(`kids-${level.id}`)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-black text-white active:scale-[0.98]"
                      style={{ background: level.color, boxShadow: SHADOWS.sm }}
                    >
                      Try this level
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={getWhatsAppLink(`Hi! I'd like to know more about the ${level.name} coding program at Pearlx.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border-2 text-sm font-black"
                      style={{ borderColor: `${level.color}30`, color: level.color }}
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
                  background: active === index ? item.color : COLORS.borderMed,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SIMPLE VALUE STRIP */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-[2rem] p-5 sm:p-7 border-2 bg-white"
            style={{ borderColor: COLORS.border, boxShadow: SHADOWS.card }}
          >
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                [Code2, "Learn by building", COLORS.cyan],
                [Rocket, "Projects kids love", COLORS.emerald],
                [Award, "Celebrate progress", COLORS.gold],
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
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: COLORS.white }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.indigo, background: COLORS.indigoLight }}
            >
              <Star className="w-3.5 h-3.5" />
              PARENTS ASK
            </div>
            <h2 className="font-black text-3xl sm:text-4xl tracking-tight mt-3" style={{ letterSpacing: "-0.045em" }}>
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
              borderColor: `${COLORS.emerald}25`,
              boxShadow: SHADOWS.lg,
            }}
          >
            <div className="absolute -top-10 -right-8 text-6xl opacity-40" style={{ color: COLORS.gold }}>✦</div>
            <div className="absolute -bottom-10 -left-8 text-7xl opacity-20" style={{ color: COLORS.cyan }}>+</div>

            <div className="relative">
              <div
                className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}
              >
                <Rocket className="w-7 h-7" />
              </div>

              <h2 className="font-black text-3xl sm:text-5xl tracking-tight mt-4" style={{ letterSpacing: "-0.055em" }}>
                Ready to build their
                <span style={{ color: COLORS.emerald }}> first thing?</span>
              </h2>

              <p className="text-sm mt-3" style={{ color: COLORS.textSecondary }}>
                Start with a free Pearlx trial class.
              </p>

              <button
                onClick={() => openDemoModal?.("kids-final")}
                className="mt-6 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-black text-white"
                style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.lg }}
              >
                Book Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ComputerScienceClasses;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Calculator, Code2, BookOpenCheck,
  Sparkles, Star, Gamepad2, Shapes, Trophy, Rocket, Brain,
  Check, Wand2
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

/*
  Pearlx Services — playful, mobile-first experience.
  Uses the existing Pearlx theme rather than introducing a new palette.
*/

const SERVICES = [
  {
    id: "coding",
    label: "Coding",
    eyebrow: "MAKE • PLAY • BUILD",
    title: "What could your child build today?",
    copy: "Start with playful visual coding, then grow into Python, web and real projects.",
    age: "Ages 5–15",
    route: "/services/education",
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
    Icon: Code2,
    doodles: ["{ }", "</>", "01", "★"],
    examples: ["Games", "Animations", "Websites", "Python"],
    scene: "coding",
  },
  {
    id: "maths",
    label: "Maths",
    eyebrow: "THINK • SOLVE • DISCOVER",
    title: "Make maths feel like a puzzle.",
    copy: "Concept-first learning that helps children stop guessing and start figuring things out.",
    age: "Ages 5–15",
    route: "/mathsclasses",
    color: COLORS.gold,
    light: COLORS.goldLight,
    Icon: Calculator,
    doodles: ["+", "×", "÷", "π"],
    examples: ["Numbers", "Logic", "Problems", "Reasoning"],
    scene: "maths",
  },
  {
    id: "academic",
    label: "Academics",
    eyebrow: "LEARN • PRACTISE • GROW",
    title: "Schoolwork, without the overwhelm.",
    copy: "Personalised tuition matched to your child's class, board, subjects and learning gaps.",
    age: "Classes 1–12",
    route: "/services/academic-tuition",
    color: COLORS.cyan,
    light: COLORS.cyanLight,
    Icon: BookOpenCheck,
    doodles: ["A+", "✓", "ABC", "★"],
    examples: ["CBSE", "ICSE", "IGCSE", "State Boards"],
    scene: "academic",
  },
];

function Doodle({ children, style, color, delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute select-none font-black"
      style={{ color, ...style }}
      animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function CodingScene({ color }) {
  return (
    <div className="relative h-[285px] overflow-hidden rounded-[30px] border-2 bg-white sm:h-[350px]" style={{ borderColor: `${color}25` }}>
      <div className="absolute inset-0 opacity-60" style={{
        backgroundImage: `radial-gradient(${color}22 1.5px, transparent 1.5px)`,
        backgroundSize: "22px 22px"
      }} />

      <Doodle color={color} style={{ top: 20, left: 18, fontSize: 24 }}>{"{ }"}</Doodle>
      <Doodle color={COLORS.gold} delay={1} style={{ right: 22, top: 40, fontSize: 20 }}>★</Doodle>

      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-[8%] top-[23%] w-[84%] rotate-[-2deg] overflow-hidden rounded-[22px] border-2 bg-[#0B1120] p-4 shadow-lg sm:p-6"
      >
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B9D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
          <span className="ml-2 text-[9px] font-bold text-white/35">my_game.py</span>
        </div>

        <div className="space-y-2 font-mono text-[11px] sm:text-sm">
          <div><span className="text-white/30">01</span> <span style={{ color }}>player</span> = <span className="text-white">"Ava"</span></div>
          <div><span className="text-white/30">02</span> <span style={{ color }}>score</span> = <span className="text-[#FFD166]">100</span></div>
          <div><span className="text-white/30">03</span> <span className="text-white">while</span> <span style={{ color }}>playing</span>:</div>
          <div className="pl-5"><span className="text-white/30">04</span> <span className="text-white">build</span>(<span style={{ color }}>"something awesome"</span>)</div>
          <div className="pl-5"><span className="text-white/30">05</span> <span className="text-white">score</span> += <span className="text-[#FFD166]">10</span></div>
        </div>
      </motion.div>

      <motion.div
        animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-5 right-5 flex items-center gap-2 rounded-2xl border-2 bg-white px-3 py-2.5 shadow-md"
        style={{ borderColor: `${color}25` }}
      >
        <Gamepad2 className="h-5 w-5" style={{ color }} />
        <div>
          <div className="text-[9px] font-black uppercase text-slate-400">Today</div>
          <div className="text-xs font-black text-slate-800">Made a game!</div>
        </div>
      </motion.div>
    </div>
  );
}

function MathsScene({ color }) {
  const choices = [36, 42, 48];
  return (
    <div className="relative h-[285px] overflow-hidden rounded-[30px] border-2 bg-[#FFFDF7] sm:h-[350px]" style={{ borderColor: `${color}25` }}>
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `linear-gradient(${color}20 1px, transparent 1px), linear-gradient(90deg, ${color}20 1px, transparent 1px)`,
        backgroundSize: "28px 28px"
      }} />

      <Doodle color={color} style={{ left: 20, top: 25, fontSize: 30 }}>×</Doodle>
      <Doodle color={COLORS.emerald} delay={.8} style={{ right: 25, top: 30, fontSize: 24 }}>π</Doodle>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-[8%] top-[18%] w-[84%] rounded-[24px] border-2 bg-white p-5 shadow-lg sm:p-7"
        style={{ borderColor: `${color}30` }}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider" style={{ background: COLORS.goldLight, color: COLORS.goldDeep }}>
            Brain teaser
          </span>
          <Brain className="h-5 w-5" style={{ color }} />
        </div>
        <div className="mt-5 text-center">
          <div className="text-[11px] font-bold text-slate-400">What comes next?</div>
          <div className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">12 → 24 → ?</div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {choices.map((n, i) => (
            <motion.div
              key={n}
              animate={i === 1 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-xl border-2 py-2 text-center text-xs font-black"
              style={{ borderColor: i === 1 ? `${color}60` : "#E2E8F0", color: i === 1 ? color : "#64748B", background: i === 1 ? `${color}10` : "#fff" }}
            >
              {n}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Doodle color={COLORS.pink} style={{ bottom: 20, left: 22, fontSize: 22 }}>★</Doodle>
    </div>
  );
}

function AcademicScene({ color }) {
  return (
    <div className="relative h-[285px] overflow-hidden rounded-[30px] border-2 bg-[#F4FBFF] sm:h-[350px]" style={{ borderColor: `${color}25` }}>
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-30 blur-3xl" style={{ background: color }} />
      <Doodle color={color} style={{ top: 24, left: 20, fontSize: 22 }}>A+</Doodle>
      <Doodle color={COLORS.gold} delay={1} style={{ top: 32, right: 22, fontSize: 21 }}>★</Doodle>

      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute left-[7%] top-[17%] w-[86%] rounded-[24px] border-2 bg-white p-4 shadow-lg sm:p-6"
        style={{ borderColor: `${color}25` }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: COLORS.cyanLight, color }}>
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[9px] font-black uppercase tracking-wider" style={{ color }}>Learning plan</div>
            <div className="text-sm font-black text-slate-900">This week</div>
          </div>
          <div className="ml-auto rounded-full px-2.5 py-1 text-[9px] font-black" style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}>
            On track
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {[
            ["Maths", "Fractions", true],
            ["Science", "Electricity", true],
            ["English", "Writing", false],
          ].map(([subject, topic, done]) => (
            <div key={topic} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: done ? COLORS.emerald : color }} />
              <div className="text-[11px] font-bold text-slate-600">{subject} · {topic}</div>
              {done && <Check className="ml-auto h-4 w-4" style={{ color: COLORS.emerald }} />}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md">
        <Trophy className="h-4 w-4" style={{ color: COLORS.gold }} />
        <span className="text-[10px] font-black text-slate-600">Small wins add up.</span>
      </div>
    </div>
  );
}

function Scene({ service }) {
  if (service.scene === "coding") return <CodingScene color={service.color} />;
  if (service.scene === "maths") return <MathsScene color={service.color} />;
  return <AcademicScene color={service.color} />;
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];
  const Icon = service.Icon;

  return (
    <section id="programs" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24" style={{ background: COLORS.bgSecondary }}>
      {/* playful background, intentionally irregular rather than a corporate grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: COLORS.cyanLight }} />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: COLORS.emeraldLight }} />
        <Doodle color={COLORS.indigo} style={{ left: "7%", top: "12%", fontSize: 18 }}>✦</Doodle>
        <Doodle color={COLORS.gold} delay={1} style={{ right: "8%", top: "18%", fontSize: 20 }}>●</Doodle>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 sm:mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 bg-white px-3 py-1.5 shadow-sm" style={{ borderColor: `${COLORS.emerald}25` }}>
            <Sparkles className="h-3.5 w-3.5" style={{ color: COLORS.emerald }} />
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: COLORS.emerald }}>
              Learning can be fun
            </span>
          </div>

          <h2 className="max-w-3xl text-[2.25rem] font-black leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-5xl">
            Three ways to make
            <span className="relative mx-2 inline-block" style={{ color: COLORS.emerald }}>
              little minds
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 150 12" fill="none" aria-hidden="true">
                <path d="M3 8C38 2 110 12 147 4" stroke={COLORS.gold} strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <br className="hidden sm:block" />
            go "ohhh!"
          </h2>
        </motion.div>

        {/* Thumb-friendly navigation */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:mb-6 sm:gap-3">
          {SERVICES.map((item, i) => {
            const ItemIcon = item.Icon;
            const selected = i === active;
            return (
              <button
                key={item.id}
                onClick={() => setActive(i)}
                className="relative flex min-w-[126px] shrink-0 items-center gap-2.5 rounded-2xl border-2 px-4 py-3 text-left transition-all active:scale-95 sm:min-w-[155px] sm:px-5"
                style={{
                  background: selected ? "#fff" : "rgba(255,255,255,.58)",
                  borderColor: selected ? `${item.color}55` : "rgba(15,23,42,.07)",
                  boxShadow: selected ? `0 8px 24px ${item.color}18` : "none",
                  color: selected ? item.color : COLORS.textMuted
                }}
              >
                <ItemIcon className="h-5 w-5 shrink-0" />
                <span>
                  <span className="block text-xs font-black">{item.label}</span>
                  <span className="block text-[9px] font-bold opacity-60">{item.age}</span>
                </span>
                {selected && <motion.span layoutId="active-dot" className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: item.color }} />}
              </button>
            );
          })}
        </div>

        {/* Main playful canvas */}
        <div className="overflow-hidden rounded-[32px] border-2 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:rounded-[40px]" style={{ borderColor: `${service.color}25` }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div className="order-2 p-6 sm:p-9 lg:order-1 lg:p-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: service.color }}>
                      {service.eyebrow}
                    </span>
                  </div>
                  <span className="rounded-full px-3 py-1.5 text-[9px] font-black" style={{ background: service.light, color: service.color }}>
                    {service.age}
                  </span>
                </div>

                <h3 className="mt-6 max-w-md text-[2rem] font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                  {service.copy}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.examples.map((item) => (
                    <span key={item} className="flex items-center gap-1.5 rounded-full border-2 bg-white px-3 py-1.5 text-[10px] font-black text-slate-500" style={{ borderColor: `${service.color}20` }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.color }} />
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={service.route}
                  className="group mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-xs font-black text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
                  style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.glowEmer }}
                >
                  Explore {service.label}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </div>

              <div className="order-1 p-2.5 sm:p-3 lg:order-2">
                <Scene service={service} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t-2 border-slate-100 bg-slate-50/70 px-5 py-3.5 sm:px-8">
            <div className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5" style={{ color: COLORS.gold }} />
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Built for curious kids</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
              Swipe to explore <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-center">
          <Wand2 className="h-4 w-4" style={{ color: COLORS.pink }} />
          <p className="text-xs font-bold text-slate-400">
            Not sure where to start? We’ll help you find the right fit.
          </p>
        </div>
      </div>
    </section>
  );
}

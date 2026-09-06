import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  TerminalSquare,
  Calculator,
  BookOpenCheck,
  Sparkles,
  Users,
  Brain,
  Trophy,
} from "lucide-react";

const PROGRAMS = [
  {
    id: "coding",
    number: "01",
    title: "Kids Coding",
    eyebrow: "BUILD • CREATE • THINK",
    subtitle: "From first blocks to real code.",
    description:
      "Project-based coding for ages 5–15. Kids learn logic first, then move into Scratch, Python and web development when they are ready.",
    color: "#10B981",
    soft: "#ECFDF5",
    icon: TerminalSquare,
    route: "/services/education",
    tags: ["Ages 5–15", "Scratch → Python", "Real projects"],
    stat: "3 levels",
  },
  {
    id: "math",
    number: "02",
    title: "Maths",
    eyebrow: "UNDERSTAND • SOLVE • MASTER",
    subtitle: "Make maths finally click.",
    description:
      "Concept-first maths that turns difficult topics into something children can understand, visualise and solve with confidence.",
    color: "#C9A84C",
    soft: "#FFF9E8",
    icon: Calculator,
    route: "/mathsclasses",
    tags: ["Ages 5–15", "Concept focused", "Problem solving"],
    stat: "Confidence first",
  },
  {
    id: "academic",
    number: "03",
    title: "Academic Tuition",
    eyebrow: "LEARN • PRACTISE • SCORE",
    subtitle: "School support without the stress.",
    description:
      "Live tuition for Classes 1–12 with structured lessons, doubt support, tests and exam preparation across major boards.",
    color: "#0EA5E9",
    soft: "#EFF9FF",
    icon: BookOpenCheck,
    route: "/services/academic-tuition",
    tags: ["Classes 1–12", "All major boards", "Exam ready"],
    stat: "Small groups",
  },
];

const ServicesOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("coding");

  const selected = PROGRAMS.find((p) => p.id === active) || PROGRAMS[0];
  const SelectedIcon = selected.icon;

  return (
    <section
      id="programs"
      ref={ref}
      className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32"
      style={{ background: "#F8FAFC" }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "#D1FAE5" }}
        />
        <div
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "#DBEAFE" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em]"
              style={{
                color: "#059669",
                background: "#ECFDF5",
                borderColor: "#BBF7D0",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              What your child can learn
            </div>

            <h2
              className="font-black leading-[0.98] tracking-[-0.045em]"
              style={{
                color: "#0F172A",
                fontSize: "clamp(2.5rem, 5vw, 4.6rem)",
              }}
            >
              One place.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#0EA5E9,#10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Three ways to grow.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-7 text-slate-500 md:pb-1">
            Whether your child wants to create, understand or improve, start
            with the path that fits them best.
          </p>
        </motion.div>

        {/* Main interactive composition */}
        <div className="grid gap-5 lg:grid-cols-[1.05fr_1.95fr]">
          {/* Left — program navigator */}
          <div className="relative">
            <div
              className="relative h-full overflow-hidden rounded-[2.5rem] p-3"
              style={{
                background: "#0F172A",
                boxShadow: "0 30px 80px rgba(15,23,42,.13)",
              }}
            >
              {/* Decorative rings */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />

              <div className="relative flex h-full min-h-[520px] flex-col">
                <div className="px-5 pb-5 pt-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
                    Choose a learning path
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  {PROGRAMS.map((program, i) => {
                    const Icon = program.icon;
                    const isActive = active === program.id;

                    return (
                      <motion.button
                        key={program.id}
                        type="button"
                        onMouseEnter={() => setActive(program.id)}
                        onFocus={() => setActive(program.id)}
                        onClick={() => setActive(program.id)}
                        initial={{ opacity: 0, x: -18 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.1 + 0.15 }}
                        className="group relative flex min-h-[130px] w-full items-center gap-4 overflow-hidden rounded-[1.8rem] border p-5 text-left transition-all duration-300"
                        style={{
                          background: isActive
                            ? "rgba(255,255,255,.09)"
                            : "rgba(255,255,255,.025)",
                          borderColor: isActive
                            ? `${program.color}70`
                            : "rgba(255,255,255,.07)",
                        }}
                      >
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                          style={{
                            color: program.color,
                            background: `${program.color}18`,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span
                              className="text-[9px] font-black"
                              style={{ color: program.color }}
                            >
                              {program.number}
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">
                              {program.eyebrow.split(" • ")[0]}
                            </span>
                          </div>

                          <h3 className="text-lg font-black text-white">
                            {program.title}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-white/40">
                            {program.subtitle}
                          </p>
                        </div>

                        <motion.div
                          animate={{
                            x: isActive ? 0 : 8,
                            opacity: isActive ? 1 : 0.25,
                          }}
                        >
                          <ArrowUpRight
                            className="h-5 w-5"
                            style={{ color: program.color }}
                          />
                        </motion.div>

                        {isActive && (
                          <motion.div
                            layoutId="activeRail"
                            className="absolute bottom-5 left-0 top-5 w-1 rounded-r-full"
                            style={{ background: program.color }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-3 rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <Users className="h-4 w-4 text-white/60" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Not sure where to start?
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/35">
                        We help you choose the right level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — selected program showcase */}
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border bg-white"
            style={{
              borderColor: `${selected.color}35`,
              boxShadow: `0 30px 80px ${selected.color}12`,
            }}
          >
            {/* Large colour field */}
            <div
              className="absolute right-0 top-0 h-full w-[58%] opacity-80"
              style={{
                background: `radial-gradient(circle at 65% 35%, ${selected.color}28, transparent 55%), linear-gradient(135deg, transparent 20%, ${selected.soft} 100%)`,
              }}
            />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `linear-gradient(${selected.color} 1px,transparent 1px),linear-gradient(90deg,${selected.color} 1px,transparent 1px)`,
                backgroundSize: "34px 34px",
                maskImage:
                  "linear-gradient(to right, transparent, black 45%, black)",
              }}
            />

            {/* Giant number */}
            <div
              className="pointer-events-none absolute -right-2 top-0 font-black leading-none"
              style={{
                fontSize: "clamp(10rem, 22vw, 20rem)",
                color: `${selected.color}0C`,
              }}
            >
              {selected.number}
            </div>

            <div className="relative flex h-full flex-col justify-between p-7 md:p-10">
              <div>
                <div className="flex items-start justify-between gap-5">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-[1.4rem]"
                    style={{
                      color: selected.color,
                      background: selected.soft,
                      boxShadow: `0 12px 30px ${selected.color}18`,
                    }}
                  >
                    <SelectedIcon className="h-7 w-7" />
                  </div>

                  <div
                    className="rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-widest"
                    style={{
                      color: selected.color,
                      borderColor: `${selected.color}30`,
                      background: `${selected.color}08`,
                    }}
                  >
                    {selected.stat}
                  </div>
                </div>

                <p
                  className="mt-10 text-[10px] font-black uppercase tracking-[0.22em]"
                  style={{ color: selected.color }}
                >
                  {selected.eyebrow}
                </p>

                <h3
                  className="mt-3 max-w-xl font-black tracking-[-0.04em]"
                  style={{
                    color: "#0F172A",
                    fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                    lineHeight: 0.98,
                  }}
                >
                  {selected.subtitle}
                </h3>

                <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-slate-500 md:text-base">
                  {selected.description}
                </p>
              </div>

              <div className="mt-12">
                <div className="mb-6 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-2 text-[10px] font-bold text-slate-600"
                      style={{
                        background: "#fff",
                        borderColor: `${selected.color}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Brain
                      className="h-4 w-4"
                      style={{ color: selected.color }}
                    />
                    Learn at their own pace
                  </div>

                  <a
                    href={selected.route}
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-3.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
                    style={{
                      background: selected.color,
                      boxShadow: `0 12px 28px ${selected.color}35`,
                    }}
                  >
                    Explore {selected.title}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Floating visual marker */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-28 right-[10%] hidden h-20 w-20 items-center justify-center rounded-[1.5rem] border bg-white/80 shadow-xl backdrop-blur md:flex"
              style={{ borderColor: `${selected.color}20` }}
            >
              <Trophy
                className="h-7 w-7"
                style={{ color: selected.color }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom conversion strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-5 flex flex-col items-start justify-between gap-4 rounded-[2rem] border bg-white px-6 py-5 shadow-sm md:flex-row md:items-center md:px-8"
        >
          <div>
            <p className="text-sm font-black text-slate-900">
              Every child starts somewhere different.
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              We find the level first — then build from there.
            </p>
          </div>

          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-900 transition-all hover:gap-3"
          >
            See all learning options
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
export { ServicesOverview };

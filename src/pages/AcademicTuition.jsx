import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Calculator, FlaskConical, Globe, MessageSquare, Monitor,
  Atom, Microscope, DollarSign, ScrollText, Map, Building2, BarChart2,
  Briefcase, GraduationCap, Target, Users, TrendingUp, Clock,
  CheckCircle2, Award, ArrowRight, ChevronDown, Wallet, Heart,
  Star, Zap, Sparkles, Play, UserRound, CalendarDays, FileText
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { getWhatsAppLink } from "../utils/whatsapp";

const CLASS_BANDS = [
  {
    id: "foundation",
    label: "Classes 1–7",
    short: "Foundation",
    fee: "₹250",
    note: "per 1-hour session",
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
    Icon: BookOpen,
    focus: "Build strong basics",
    subjects: [
      ["English", BookOpen],
      ["Mathematics", Calculator],
      ["Science", FlaskConical],
      ["Social Studies", Globe],
      ["Hindi", MessageSquare],
      ["Computer Basics", Monitor],
    ],
  },
  {
    id: "middle",
    label: "Classes 8–10",
    short: "Board Focus",
    fee: "₹300",
    note: "per 1-hour session",
    color: COLORS.cyan,
    light: COLORS.cyanLight,
    Icon: Target,
    focus: "Learn. Practise. Prepare.",
    subjects: [
      ["English", BookOpen],
      ["Mathematics", Calculator],
      ["Physics · Chemistry · Biology", FlaskConical],
      ["History · Geography · Civics", Globe],
      ["Hindi / Regional Language", MessageSquare],
      ["Computer Science", Monitor],
      ["Accountancy", BarChart2],
    ],
  },
  {
    id: "senior",
    label: "Classes 11–12",
    short: "Senior School",
    fee: "₹350",
    note: "per 1-hour session",
    color: COLORS.indigo,
    light: COLORS.indigoLight,
    Icon: GraduationCap,
    focus: "Go deeper with confidence",
    subjects: [
      ["Physics", Atom],
      ["Chemistry", FlaskConical],
      ["Mathematics", Calculator],
      ["Biology", Microscope],
      ["English", BookOpen],
      ["Economics", DollarSign],
      ["History", ScrollText],
      ["Geography", Map],
      ["Civics / Political Science", Building2],
      ["Computer Science", Monitor],
      ["Accountancy", BarChart2],
      ["Business Studies", Briefcase],
    ],
  },
];

const BOARDS = [
  ["CBSE", "Central Board", COLORS.emerald],
  ["ICSE", "School curriculum", COLORS.cyan],
  ["ISC", "Senior school", COLORS.indigo],
  ["IGCSE", "International", COLORS.gold],
  ["State Boards", "Across India", COLORS.bronze],
];

const SUPPORT = [
  [Users, "Small batches", "1:1 or 2–3 students"],
  [Target, "Board aligned", "Your exact syllabus"],
  [TrendingUp, "Progress reports", "Clear monthly updates"],
  [Clock, "Flexible slots", "Weekdays or weekends"],
  [CheckCircle2, "Doubt support", "Quick help when needed"],
  [Award, "Certificates", "Celebrate completion"],
];

const FAQS = [
  {
    q: "Which boards do you support?",
    a: "CBSE, ICSE, ISC, IGCSE and State Boards across India.",
  },
  {
    q: "Can I choose more than one subject?",
    a: "Yes. Choose the subjects your child needs and arrange them around your preferred schedule.",
  },
  {
    q: "How does pricing work?",
    a: "Classes 1–7 are ₹250/session, Classes 8–10 are ₹300/session and Classes 11–12 are ₹350/session. Each session is 1 hour.",
  },
  {
    q: "What happens in the first class?",
    a: "We understand the student's level, identify gaps and use that to plan the right learning path.",
  },
  {
    q: "What if my child misses a class?",
    a: "Sessions are recorded, and free rescheduling is available with advance notice.",
  },
];

const SubjectChip = ({ name, Icon, color, light }) => (
  <div
    className="flex items-center gap-2.5 rounded-2xl border-2 bg-white px-3 py-3"
    style={{ borderColor: `${color}22` }}
  >
    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: light, color }}
    >
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-[11px] font-black leading-tight">{name}</span>
  </div>
);

const AcademicTuition = ({ openDemoModal }) => {
  const [activeBand, setActiveBand] = useState("foundation");
  const [openFaq, setOpenFaq] = useState(null);

  const active = CLASS_BANDS.find((item) => item.id === activeBand);

  return (
    <main
      className="min-h-screen overflow-hidden"
      style={{ background: COLORS.bgSecondary, color: COLORS.ink }}
    >
      {/* HERO */}
      <section className="relative pt-48 sm:pt-48 pb-10 sm:pb-14">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ background: COLORS.emeraldLight }}
          />
          <div
            className="absolute top-72 -left-48 w-[25rem] h-[25rem] rounded-full blur-3xl"
            style={{ background: COLORS.cyanLight }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              {/* <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-black tracking-widest"
                style={{
                  color: COLORS.emerald,
                  background: COLORS.emeraldLight,
                  border: `1px solid ${COLORS.emerald}25`,
                }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                ACADEMIC TUITION
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.94] mt-4"
                style={{ letterSpacing: "-0.065em" }}
              >
                School work,
                <br />
                <span
                  style={{
                    background: GRADIENTS.textGlow,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  made simpler.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.16 }}
                className="max-w-xl mx-auto lg:mx-0 mt-5 text-sm sm:text-base font-medium leading-relaxed"
                style={{ color: COLORS.textSecondary }}
              >
                Live, personalised tuition aligned to your child's school
                curriculum — with the right teacher and the right pace.
              </motion.p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2.5 mt-6">
                <button
                  onClick={() => openDemoModal?.("academic_hero")}
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
                  href="#subjects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 bg-white text-sm font-black"
                  style={{
                    color: COLORS.emerald,
                    borderColor: `${COLORS.emerald}30`,
                  }}
                >
                  Explore subjects
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-5">
                {[
                  [UserRound, "1:1 / 2–3 students", COLORS.emerald],
                  [Target, "Board aligned", COLORS.cyan],
                  [CalendarDays, "Flexible slots", COLORS.goldDeep],
                ].map(([Icon, label, color]) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-white"
                    style={{
                      borderColor: COLORS.border,
                      boxShadow: SHADOWS.sm,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-[10px] font-black">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HANDMADE STUDY DESK VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="relative max-w-[500px] w-full mx-auto"
            >
              <div
                className="relative rounded-[2.5rem] border-2 bg-white p-4 sm:p-5"
                style={{
                  borderColor: `${COLORS.emerald}22`,
                  boxShadow: SHADOWS.lg,
                }}
              >
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <div
                      className="text-[9px] font-black tracking-widest"
                      style={{ color: COLORS.textMuted }}
                    >
                      TODAY'S STUDY DESK
                    </div>
                    <div className="text-lg font-black mt-1">
                      Let's get this one.
                    </div>
                  </div>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: COLORS.emeraldLight,
                      color: COLORS.emerald,
                    }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                <div
                  className="rounded-3xl border-2 p-4"
                  style={{
                    borderColor: COLORS.border,
                    background: COLORS.bgSecondary,
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="px-2.5 py-1.5 rounded-lg text-[9px] font-black"
                      style={{
                        background: COLORS.cyanLight,
                        color: COLORS.cyan,
                      }}
                    >
                      MATHS
                    </div>
                    <div
                      className="text-[9px] font-black"
                      style={{ color: COLORS.textMuted }}
                    >
                      PRACTICE 04
                    </div>
                  </div>

                  <div className="text-center py-2">
                    <div
                      className="font-black text-4xl sm:text-5xl"
                      style={{ letterSpacing: "-0.06em" }}
                    >
                      3x + 7 = 22
                    </div>
                    <div
                      className="text-xs font-bold mt-3"
                      style={{ color: COLORS.textMuted }}
                    >
                      Find x
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-5">
                    {["x = 3", "x = 5", "x = 7"].map((answer, i) => (
                      <div
                        key={answer}
                        className="rounded-xl border-2 bg-white py-2.5 text-center text-[10px] font-black"
                        style={{
                          borderColor:
                            i === 1
                              ? `${COLORS.emerald}55`
                              : COLORS.border,
                          color:
                            i === 1
                              ? COLORS.emerald
                              : COLORS.textSecondary,
                        }}
                      >
                        {answer}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div
                    className="rounded-2xl p-3 border-2 bg-white"
                    style={{ borderColor: `${COLORS.gold}25` }}
                  >
                    <div className="text-[8px] font-black tracking-wider" style={{ color: COLORS.goldDeep }}>
                      NEXT UP
                    </div>
                    <div className="text-xs font-black mt-1">Science</div>
                  </div>
                  <div
                    className="rounded-2xl p-3 border-2 bg-white"
                    style={{ borderColor: `${COLORS.cyan}25` }}
                  >
                    <div className="text-[8px] font-black tracking-wider" style={{ color: COLORS.cyan }}>
                      PROGRESS
                    </div>
                    <div className="text-xs font-black mt-1">2 concepts done ✓</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -left-2 sm:-left-5 top-10 px-3 py-2 rounded-xl bg-white border-2 -rotate-3"
                style={{
                  borderColor: `${COLORS.cyan}30`,
                  boxShadow: SHADOWS.sm,
                }}
              >
                <div className="text-[9px] font-black" style={{ color: COLORS.cyan }}>
                  ONE STEP AT A TIME
                </div>
              </div>

              <div
                className="absolute -right-2 sm:-right-5 bottom-12 px-3 py-2 rounded-xl bg-white border-2 rotate-3"
                style={{
                  borderColor: `${COLORS.gold}35`,
                  boxShadow: SHADOWS.sm,
                }}
              >
                <div className="text-[9px] font-black" style={{ color: COLORS.goldDeep }}>
                  NICE WORK!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLASS BAND + PRICING */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{
                color: COLORS.goldDeep,
                background: COLORS.goldLight,
              }}
            >
              <Wallet className="w-3.5 h-3.5" />
              SIMPLE PRICING
            </div>
            <h2
              className="font-black text-3xl sm:text-5xl mt-3"
              style={{ letterSpacing: "-0.055em" }}
            >
              Pick the right starting point.
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {CLASS_BANDS.map((band) => {
              const selected = activeBand === band.id;
              return (
                <button
                  key={band.id}
                  onClick={() => setActiveBand(band.id)}
                  className="shrink-0 min-w-[150px] text-left rounded-2xl border-2 p-3.5 transition-all"
                  style={{
                    background: selected ? band.color : COLORS.white,
                    color: selected ? COLORS.white : COLORS.ink,
                    borderColor: selected ? band.color : COLORS.border,
                    boxShadow: selected ? SHADOWS.card : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      {band.short}
                    </span>
                    <band.Icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-black mt-2">{band.label}</div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4 grid lg:grid-cols-[0.75fr_1.25fr] gap-4"
            >
              <div
                className="rounded-[2rem] border-2 bg-white p-5 sm:p-6"
                style={{
                  borderColor: `${active.color}28`,
                  boxShadow: SHADOWS.card,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: active.light,
                    color: active.color,
                  }}
                >
                  <active.Icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-black tracking-widest mt-5" style={{ color: active.color }}>
                  {active.short}
                </div>
                <div className="font-black text-2xl mt-1">{active.label}</div>
                <div
                  className="text-xs font-bold mt-2"
                  style={{ color: COLORS.textSecondary }}
                >
                  {active.focus}
                </div>

                <div className="flex items-end gap-2 mt-7">
                  <span className="font-black text-4xl" style={{ color: active.color }}>
                    {active.fee}
                  </span>
                  <span className="text-[10px] font-bold mb-1" style={{ color: COLORS.textMuted }}>
                    {active.note}
                  </span>
                </div>

                <button
                  onClick={() => openDemoModal?.(`academic-${active.id}`)}
                  className="w-full mt-5 py-3.5 rounded-2xl text-sm font-black text-white inline-flex items-center justify-center gap-2"
                  style={{ background: active.color }}
                >
                  Try a free class
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div
                id="subjects"
                className="rounded-[2rem] border-2 bg-white p-5 sm:p-6"
                style={{
                  borderColor: COLORS.border,
                  boxShadow: SHADOWS.card,
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-[9px] font-black tracking-widest" style={{ color: COLORS.textMuted }}>
                      SUBJECTS
                    </div>
                    <div className="font-black text-xl mt-1">
                      What can we work on?
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: active.light, color: active.color }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {active.subjects.map(([name, Icon]) => (
                    <SubjectChip
                      key={name}
                      name={name}
                      Icon={Icon}
                      color={active.color}
                      light={active.light}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="mt-3 rounded-2xl border bg-white px-4 py-3 flex items-center justify-center gap-2 text-[10px] font-black"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: COLORS.goldDeep }} />
            Bundle sessions and save up to 20%
          </div>
        </div>
      </section>

      {/* BOARDS */}
      <section className="relative py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.cyan, background: COLORS.cyanLight }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              BOARD ALIGNED
            </div>
            <h2
              className="font-black text-3xl sm:text-4xl mt-3"
              style={{ letterSpacing: "-0.045em" }}
            >
              The syllabus comes with you.
            </h2>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {BOARDS.map(([name, sub, color]) => (
              <div
                key={name}
                className="shrink-0 min-w-[145px] rounded-2xl border-2 bg-white p-4"
                style={{
                  borderColor: `${color}25`,
                  boxShadow: SHADOWS.sm,
                }}
              >
                <div className="font-black text-lg" style={{ color }}>
                  {name}
                </div>
                <div
                  className="text-[9px] font-bold mt-1"
                  style={{ color: COLORS.textMuted }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-7">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.emerald, background: COLORS.emeraldLight }}
            >
              <Heart className="w-3.5 h-3.5" />
              THE PEARLX WAY
            </div>
            <h2
              className="font-black text-3xl sm:text-4xl mt-3"
              style={{ letterSpacing: "-0.045em" }}
            >
              Support that actually helps.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {SUPPORT.map(([Icon, title, sub], index) => {
              const color = [COLORS.emerald, COLORS.cyan, COLORS.goldDeep, COLORS.indigo][index % 4];
              const light = [COLORS.emeraldLight, COLORS.cyanLight, COLORS.goldLight, COLORS.indigoLight][index % 4];

              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border-2 bg-white p-4"
                  style={{ borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: light, color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-black text-sm mt-3">{title}</div>
                  <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
                    {sub}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SMALL FAQ */}
      <section className="relative py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{ color: COLORS.cyan, background: COLORS.cyanLight }}
            >
              <FileText className="w-3.5 h-3.5" />
              QUICK ANSWERS
            </div>
            <h2
              className="font-black text-3xl sm:text-4xl mt-3"
              style={{ letterSpacing: "-0.045em" }}
            >
              A few things parents ask.
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border-2 bg-white overflow-hidden"
                  style={{
                    borderColor: isOpen ? `${COLORS.cyan}45` : COLORS.border,
                    boxShadow: isOpen ? SHADOWS.sm : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-4 py-4"
                  >
                    <span className="text-xs sm:text-sm font-black">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      style={{ color: COLORS.cyan }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-4 pb-4 text-[11px] leading-relaxed"
                          style={{ color: COLORS.textSecondary }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden rounded-[2.4rem] border-2 bg-white p-7 sm:p-10 text-center"
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
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
              style={{
                background: COLORS.emeraldLight,
                color: COLORS.emerald,
              }}
            >
              <Zap className="w-7 h-7" />
            </div>

            <h2
              className="font-black text-3xl sm:text-5xl mt-4"
              style={{ letterSpacing: "-0.055em" }}
            >
              Let's make school feel easier.
            </h2>

            <p
              className="text-sm mt-3"
              style={{ color: COLORS.textSecondary }}
            >
              Start with one free class. We'll take it from there.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-2.5 mt-5">
              <button
                onClick={() => openDemoModal?.("academic_cta")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black text-white"
                style={{
                  background: GRADIENTS.primary,
                  boxShadow: SHADOWS.lg,
                }}
              >
                Book a Free Class
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppLink("Hi! I'd like to know more about Pearlx Academic Tuition.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 text-sm font-black"
                style={{
                  color: COLORS.emerald,
                  borderColor: `${COLORS.emerald}30`,
                }}
              >
                Ask us
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AcademicTuition;

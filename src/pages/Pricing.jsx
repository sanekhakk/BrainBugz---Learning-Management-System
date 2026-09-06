import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Calculator, GraduationCap, BookOpen, Users, Sparkles,
  Check, ChevronDown, ChevronUp, Gift, MessageCircle, Play,
  Video, BarChart3, RefreshCw, PlayCircle, Award, ShieldCheck,
  Zap, ArrowRight, Clock, Layers3, Heart, Star
} from "lucide-react";

import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { getWhatsAppLink } from "../utils/whatsapp";

const TABS = [
  {
    id: "coding",
    label: "Kids Coding",
    icon: Code2,
    color: COLORS.indigo,
    light: COLORS.indigoLight,
  },
  {
    id: "maths",
    label: "Maths Classes",
    icon: Calculator,
    color: COLORS.bronze,
    light: COLORS.bronzeLight,
  },
  {
    id: "courses",
    label: "Courses",
    icon: GraduationCap,
    color: COLORS.cyan,
    light: COLORS.cyanLight,
  },
  {
    id: "academic",
    label: "Academic Tuition",
    icon: BookOpen,
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
  },
];

const CODING_TIERS = [
  {
    label: "Little Pearls",
    tagline: "First steps into coding — playful & visual",
    hourly: 350, monthly: 2800, grpHourly: 210, grpMonthly: 1680,
    packages: [
      { c: 30, p: 8499, d: 19, label: "Starter" },
      { c: 45, p: 12499, d: 21, label: "Explorer" },
      { c: 90, p: 23499, d: 23, label: "Builder" },
      { c: 150, p: 37499, d: 27, label: "Champion", popular: true },
    ],
    grpPackages: [
      { c: 30, p: 5499, d: 13, label: "Starter" },
      { c: 45, p: 8499, d: 10, label: "Explorer" },
      { c: 90, p: 17499, d: 7, label: "Builder" },
      { c: 150, p: 28999, d: 8, label: "Champion", popular: true },
    ],
  },
  {
    label: "Bright Pearls",
    tagline: "Deeper logic & first real projects",
    hourly: 400, monthly: 3200, grpHourly: 240, grpMonthly: 1920,
    packages: [
      { c: 30, p: 9499, d: 21, label: "Starter" },
      { c: 45, p: 14499, d: 19, label: "Explorer" },
      { c: 90, p: 27499, d: 24, label: "Builder" },
      { c: 150, p: 43999, d: 27, label: "Champion", popular: true },
    ],
    grpPackages: [
      { c: 30, p: 6499, d: 10, label: "Starter" },
      { c: 45, p: 9999, d: 7, label: "Explorer" },
      { c: 90, p: 19999, d: 7, label: "Builder" },
      { c: 150, p: 33499, d: 7, label: "Champion", popular: true },
    ],
  },
  {
    label: "Rising Pearls",
    tagline: "Advanced coding, apps & real-world projects",
    hourly: 500, monthly: 4000, grpHourly: 300, grpMonthly: 2400,
    packages: [
      { c: 30, p: 11999, d: 20, label: "Starter" },
      { c: 45, p: 17999, d: 20, label: "Explorer" },
      { c: 90, p: 33999, d: 24, label: "Builder" },
      { c: 150, p: 54999, d: 27, label: "Champion", popular: true },
    ],
    grpPackages: [
      { c: 30, p: 7999, d: 11, label: "Starter" },
      { c: 45, p: 12499, d: 7, label: "Explorer" },
      { c: 90, p: 24999, d: 7, label: "Builder" },
      { c: 150, p: 41999, d: 7, label: "Champion", popular: true },
    ],
  },
];

const MATHS_TIERS = [
  {
    label: "Little Pearls",
    tagline: "Number sense through play & pictures",
    hourly: 350, monthly: 2800, grpHourly: 210, grpMonthly: 1680,
    packages: [
      { c: 30, p: 8499, d: 19, label: "Starter" },
      { c: 45, p: 12499, d: 21, label: "Explorer" },
      { c: 90, p: 23499, d: 23, label: "Builder" },
      { c: 150, p: 37499, d: 27, label: "Champion", popular: true },
    ],
    grpPackages: [
      { c: 30, p: 5499, d: 13, label: "Starter" },
      { c: 45, p: 8499, d: 10, label: "Explorer" },
      { c: 90, p: 17499, d: 7, label: "Builder" },
      { c: 150, p: 28999, d: 8, label: "Champion", popular: true },
    ],
  },
  {
    label: "Bright Pearls",
    tagline: "Arithmetic, fractions & first geometry",
    hourly: 400, monthly: 3200, grpHourly: 240, grpMonthly: 1920,
    packages: [
      { c: 30, p: 9499, d: 21, label: "Starter" },
      { c: 45, p: 14499, d: 19, label: "Explorer" },
      { c: 90, p: 27499, d: 24, label: "Builder" },
      { c: 150, p: 43999, d: 27, label: "Champion", popular: true },
    ],
    grpPackages: [
      { c: 30, p: 6499, d: 10, label: "Starter" },
      { c: 45, p: 9999, d: 7, label: "Explorer" },
      { c: 90, p: 19999, d: 7, label: "Builder" },
      { c: 150, p: 33499, d: 7, label: "Champion", popular: true },
    ],
  },
  {
    label: "Rising Pearls",
    tagline: "Algebra, advanced geometry & olympiad math",
    hourly: 500, monthly: 4000, grpHourly: 300, grpMonthly: 2400,
    packages: [
      { c: 30, p: 11999, d: 20, label: "Starter" },
      { c: 45, p: 17999, d: 20, label: "Explorer" },
      { c: 90, p: 33999, d: 24, label: "Builder" },
      { c: 150, p: 54999, d: 27, label: "Champion", popular: true },
    ],
    grpPackages: [
      { c: 30, p: 7999, d: 11, label: "Starter" },
      { c: 45, p: 12499, d: 7, label: "Explorer" },
      { c: 90, p: 24999, d: 7, label: "Builder" },
      { c: 150, p: 41999, d: 7, label: "Champion", popular: true },
    ],
  },
];

const ACADEMIC_TIERS = [
  {
    label: "Classes 1–7",
    boards: "CBSE · ICSE · State Boards",
    hourly: 250, monthly: 2000, grpHourly: 150, grpMonthly: 1200,
  },
  {
    label: "Classes 8–10",
    boards: "CBSE · ICSE · IGCSE · State Boards",
    hourly: 300, monthly: 2400, grpHourly: 180, grpMonthly: 1440,
  },
  {
    label: "Classes 11–12",
    boards: "CBSE · ISC · IGCSE · State Boards",
    hourly: 350, monthly: 2800, grpHourly: 210, grpMonthly: 1680,
  },
];

const ACADEMIC_SUBJECTS = [
  "Mathematics", "Science", "English", "Social Science",
  "Computer Science", "Informatics Practices", "Accountancy",
  "Economics", "Business Studies", "Second Language",
];

const CS_COURSES = [
  {
    lang: "Python",
    bootcamp: {
      name: "Python Launchpad Bootcamp",
      duration: "2 Months",
      price: 4999,
      offerPrice: 3999,
      discount: 20,
    },
    intense: { name: "Python Pro Intensive Program", duration: "6 Months" },
    color: COLORS.cyan,
    light: COLORS.cyanLight,
  },
  {
    lang: "Java",
    bootcamp: {
      name: "Java Kickstart Bootcamp",
      duration: "2 Months",
      price: 4999,
      offerPrice: 3999,
      discount: 20,
    },
    intense: { name: "Java Mastery Intensive Program", duration: "6 Months" },
    color: COLORS.indigo,
    light: COLORS.indigoLight,
  },
  {
    lang: "Web Development",
    bootcamp: {
      name: "Web Dev Launchpad Bootcamp",
      duration: "2 Months",
      price: 5999,
      offerPrice: 4799,
      discount: 20,
    },
    intense: { name: "Full Stack Intensive Program", duration: "6 Months" },
    color: COLORS.emerald,
    light: COLORS.emeraldLight,
  },
];

const INCLUDED = [
  [Video, "Live classes"],
  [BarChart3, "Monthly reports"],
  [RefreshCw, "Free rescheduling"],
  [PlayCircle, "Session recordings"],
  [Award, "Certificate"],
  [MessageCircle, "WhatsApp support"],
];

const FAQS = [
  ["Is there a registration fee?", "No. There are no registration or material fees. You only pay for the sessions or programme you choose."],
  ["Can I try before paying?", "Yes. Book a free 30-minute demo class with no payment or commitment."],
  ["What happens if a class is missed?", "Sessions are recorded, and free rescheduling is available with advance notice."],
  ["Do you support groups?", "Yes. Group pricing is available for 2–3 students."],
  ["Which boards do you support?", "CBSE, ICSE, ISC, IGCSE and State Boards are supported across the relevant academic programmes."],
];

const money = (value) => `₹${value.toLocaleString("en-IN")}`;

function Pill({ children, color, light }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black"
      style={{ color, background: light, border: `1px solid ${color}25` }}
    >
      {children}
    </span>
  );
}

function IncludedStrip() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {INCLUDED.map(([Icon, label]) => (
        <div
          key={label}
          className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border-2 bg-white"
          style={{ borderColor: COLORS.border }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: COLORS.emerald }} />
          <span className="text-[10px] font-black whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  );
}

function PackageGrid({ packages, color }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {packages.map((pkg) => (
        <div
          key={`${pkg.label}-${pkg.c}`}
          className="relative rounded-2xl border-2 bg-white p-3.5 text-center"
          style={{
            borderColor: pkg.popular ? `${color}65` : COLORS.border,
            boxShadow: pkg.popular ? SHADOWS.sm : "none",
          }}
        >
          {pkg.popular && (
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[8px] font-black text-white whitespace-nowrap"
              style={{ background: color }}
            >
              BEST VALUE
            </div>
          )}
          <div className="text-[9px] font-black uppercase tracking-wider mt-1" style={{ color }}>
            {pkg.label}
          </div>
          <div className="font-black text-lg mt-2">{money(pkg.p)}</div>
          <div className="text-[9px] font-bold mt-0.5" style={{ color: COLORS.textMuted }}>
            {pkg.c} sessions
          </div>
          <div className="text-[9px] font-black mt-2" style={{ color }}>
            Save {pkg.d}%
          </div>
        </div>
      ))}
    </div>
  );
}

function TierCard({ tier, color, mode, open, onToggle, index }) {
  const solo = mode === "solo";
  const hourly = solo ? tier.hourly : tier.grpHourly;
  const monthly = solo ? tier.monthly : tier.grpMonthly;
  const packages = solo ? tier.packages : tier.grpPackages;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-[1.5rem] border-2 bg-white overflow-hidden"
      style={{ borderColor: open ? `${color}65` : COLORS.border }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-4 sm:p-5 flex items-center gap-3"
      >
        <div className="w-2 h-10 rounded-full shrink-0" style={{ background: color }} />
        <div className="min-w-0 flex-1">
          <div className="font-black text-sm sm:text-base">{tier.label}</div>
          <div className="text-[10px] sm:text-xs font-bold mt-1 truncate" style={{ color: COLORS.textMuted }}>
            {tier.tagline || tier.boards}
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-black text-lg sm:text-xl" style={{ color }}>
            {money(hourly)}
            <span className="text-[9px] font-bold" style={{ color: COLORS.textMuted }}>/session</span>
          </div>
          <div className="text-[9px] font-bold" style={{ color: COLORS.textMuted }}>
            {money(monthly)} / 8 sessions
          </div>
        </div>

        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}12`, color }}
        >
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && packages && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 sm:px-5 pb-5 pt-4 border-t-2"
              style={{ borderColor: `${color}18` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Layers3 className="w-3.5 h-3.5" style={{ color }} />
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: COLORS.textMuted }}>
                  Package savings
                </span>
              </div>
              <PackageGrid packages={packages} color={color} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TierList({ tiers, color }) {
  const [mode, setMode] = useState("solo");
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: COLORS.textMuted }}>
          Choose class format
        </div>

        <div className="flex p-1 rounded-full border-2 bg-white" style={{ borderColor: COLORS.border }}>
          {[
            ["solo", "1:1"],
            ["group", "Group · 2–3"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className="px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{
                background: mode === id ? color : "transparent",
                color: mode === id ? COLORS.white : COLORS.textMuted,
              }}
            >
              <Users className="w-3 h-3 inline mr-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {tiers.map((tier, index) => (
          <TierCard
            key={tier.label}
            tier={tier}
            color={color}
            mode={mode}
            index={index}
            open={open === index}
            onToggle={() => setOpen(open === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

function CodingMaths({ type, openDemoModal }) {
  const coding = type === "coding";
  const color = coding ? COLORS.indigo : COLORS.bronze;
  const light = coding ? COLORS.indigoLight : COLORS.bronzeLight;
  const tiers = coding ? CODING_TIERS : MATHS_TIERS;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: light, color }}>
          {coding ? <Code2 className="w-6 h-6" /> : <Calculator className="w-6 h-6" />}
        </div>
        <div>
          <div className="font-black text-xl">{coding ? "Kids Coding" : "Maths Classes"}</div>
          <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
            {coding ? "Three Pearlx levels. Same simple pricing." : "Three Pearlx levels. Learn at the right pace."}
          </div>
        </div>
      </div>

      <TierList tiers={tiers} color={color} />

      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={() => openDemoModal?.(`pricing_${type}`)}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-black text-white"
          style={{ background: color }}
        >
          <Play className="w-4 h-4 fill-current" />
          Try a free class
        </button>
        <a
          href={getWhatsAppLink(`Hi! I'd like to know more about Pearlx ${coding ? "Kids Coding" : "Maths Classes"} pricing.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 bg-white text-sm font-black"
          style={{ borderColor: `${color}35`, color }}
        >
          Ask us
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

function AcademicPricing({ openDemoModal }) {
  const [mode, setMode] = useState("solo");

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}>
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <div className="font-black text-xl">Academic Tuition</div>
          <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
            One clear rate for the class band. Subjects can be mixed.
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border-2 bg-white p-3.5 mb-4"
        style={{ borderColor: `${COLORS.emerald}25` }}
      >
        <div className="flex flex-wrap gap-1.5">
          {ACADEMIC_SUBJECTS.map((subject) => (
            <span
              key={subject}
              className="px-2.5 py-1.5 rounded-full text-[9px] font-black"
              style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex p-1 rounded-full border-2 bg-white" style={{ borderColor: COLORS.border }}>
          {[
            ["solo", "1:1"],
            ["group", "Group · 2–3"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className="px-3 py-1.5 rounded-full text-[10px] font-black"
              style={{
                background: mode === id ? COLORS.emerald : "transparent",
                color: mode === id ? COLORS.white : COLORS.textMuted,
              }}
            >
              <Users className="w-3 h-3 inline mr-1" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {ACADEMIC_TIERS.map((tier, index) => {
          const hourly = mode === "solo" ? tier.hourly : tier.grpHourly;
          const monthly = mode === "solo" ? tier.monthly : tier.grpMonthly;

          return (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[1.5rem] border-2 bg-white p-5"
              style={{ borderColor: `${COLORS.emerald}28`, boxShadow: SHADOWS.sm }}
            >
              <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: COLORS.emerald }}>
                {tier.label}
              </div>
              <div className="font-black text-2xl mt-2">{money(hourly)}</div>
              <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
                per session
              </div>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.border }}>
                <div className="text-[10px] font-black">{money(monthly)} / 8 sessions</div>
                <div className="text-[9px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
                  {tier.boards}
                </div>
              </div>
              <button
                onClick={() => openDemoModal?.(`pricing_academic_${index}`)}
                className="w-full mt-4 py-3 rounded-xl text-[11px] font-black text-white"
                style={{ background: COLORS.emerald }}
              >
                Try a free class
              </button>
            </motion.div>
          );
        })}
      </div>

      <div
        className="mt-3 rounded-2xl px-4 py-3 flex items-center gap-2.5"
        style={{ background: COLORS.emeraldLight, color: COLORS.emerald }}
      >
        <Gift className="w-4 h-4 shrink-0" />
        <span className="text-[10px] font-black">Bundle 2+ subjects and save up to 20%.</span>
      </div>
    </div>
  );
}

function CoursePricing() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: COLORS.cyanLight, color: COLORS.cyan }}>
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <div className="font-black text-xl">Computer Science Courses</div>
          <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
            Bootcamp pricing is shown upfront. Intensive programmes are enquiry based.
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border-2 p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3"
        style={{ borderColor: `${COLORS.emerald}30`, background: COLORS.emeraldLight }}
      >
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5" style={{ color: COLORS.emerald }} />
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-black">2026 +2 Passed Students</div>
          <div className="text-[10px] font-bold mt-0.5" style={{ color: COLORS.textSecondary }}>
            Get 20% OFF all bootcamps.
          </div>
        </div>
        <a
          href={getWhatsAppLink("Hi! I'd like to claim the 20% OFF bootcamp offer for +2 passed students at Pearlx.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-[10px] font-black text-white"
          style={{ background: GRADIENTS.primary }}
        >
          Claim offer
        </a>
      </div>

      <div className="space-y-3">
        {CS_COURSES.map((course) => (
          <div
            key={course.lang}
            className="rounded-[1.5rem] border-2 bg-white overflow-hidden"
            style={{ borderColor: `${course.color}30` }}
          >
            <div className="px-4 sm:px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: course.light, color: course.color }}>
                <span className="font-black text-xs">{course.lang === "Web Development" ? "</>" : course.lang.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="font-black text-sm">{course.lang}</div>
            </div>

            <div className="grid md:grid-cols-2 border-t-2" style={{ borderColor: `${course.color}18` }}>
              <div className="p-4 sm:p-5">
                <Pill color={course.color} light={course.light}>
                  <Zap className="w-3 h-3" /> BOOTCAMP · {course.bootcamp.duration}
                </Pill>
                <div className="flex items-end gap-2 mt-3">
                  <span className="text-xs line-through" style={{ color: COLORS.textMuted }}>
                    {money(course.bootcamp.price)}
                  </span>
                  <span className="font-black text-2xl">{money(course.bootcamp.offerPrice)}</span>
                  <span className="text-[9px] font-black px-2 py-1 rounded-full text-white" style={{ background: course.color }}>
                    {course.bootcamp.discount}% OFF
                  </span>
                </div>
                <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
                  {course.bootcamp.name}
                </div>
              </div>

              <div className="p-4 sm:p-5 border-t-2 md:border-t-0 md:border-l-2" style={{ borderColor: `${course.color}18`, background: `${course.color}06` }}>
                <Pill color={COLORS.goldDeep} light={COLORS.goldLight}>
                  <Clock className="w-3 h-3" /> INTENSIVE · {course.intense.duration}
                </Pill>
                <div className="font-black text-xl mt-3">Custom pricing</div>
                <div className="text-[10px] font-bold mt-1" style={{ color: COLORS.textMuted }}>
                  {course.intense.name}
                </div>
                <a
                  href={getWhatsAppLink(`Hi! I'm interested in ${course.intense.name} at Pearlx. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 px-4 py-2.5 rounded-xl border-2 text-[10px] font-black"
                  style={{ borderColor: `${course.color}45`, color: course.color }}
                >
                  Enquire <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Pricing({ openDemoModal }) {
  const [activeTab, setActiveTab] = useState("coding");
  const [openFaq, setOpenFaq] = useState(null);

  const activeTabData = TABS.find((tab) => tab.id === activeTab);

  return (
    <main
      className="min-h-screen overflow-hidden pt-48 sm:pt-48 pb-16"
      style={{ background: COLORS.bgSecondary, color: COLORS.ink }}
    >
      <section className="relative">
        <div
          className="absolute -top-32 right-[-8rem] w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: COLORS.cyanLight }}
        />
        <div
          className="absolute top-64 left-[-10rem] w-[26rem] h-[26rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: COLORS.emeraldLight }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* HERO */}
          <div className="text-center max-w-3xl mx-auto">
            {/* <Pill color={COLORS.goldDeep} light={COLORS.goldLight}>
              <Sparkles className="w-3 h-3" />
              PEARLX PRICING
            </Pill> */}

            <h1
              className="font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mt-4"
              style={{ letterSpacing: "-0.065em" }}
            >
              Pick a plan.
              <br />
              <span
                style={{
                  background: GRADIENTS.textGlow,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Keep learning.
              </span>
            </h1>

            <p
              className="text-sm sm:text-base font-medium max-w-xl mx-auto mt-5 leading-relaxed"
              style={{ color: COLORS.textSecondary }}
            >
              Clear prices, flexible formats and no surprise charges.
              Choose what fits your child and change it when you need to.
            </p>

            <div className="mt-6">
              <IncludedStrip />
            </div>
          </div>

          {/* CATEGORY PICKER */}
          <div className="mt-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="shrink-0 min-w-[145px] sm:min-w-0 sm:flex-1 rounded-2xl border-2 p-3.5 text-left transition-all"
                    style={{
                      background: active ? tab.light : COLORS.white,
                      borderColor: active ? tab.color : COLORS.border,
                      boxShadow: active ? SHADOWS.sm : "none",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: active ? `${tab.color}18` : tab.light, color: tab.color }}
                      >
                        <tab.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-[11px]">{tab.label}</div>
                        <div className="text-[9px] font-bold mt-0.5" style={{ color: COLORS.textMuted }}>
                          {tab.id === "courses" ? "Bootcamps & intensives" : tab.id === "academic" ? "School subjects" : "Flexible classes"}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE PRICING */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-5 rounded-[2rem] border-2 bg-white p-4 sm:p-6 lg:p-7"
            style={{
              borderColor: `${activeTabData.color}25`,
              boxShadow: SHADOWS.card,
            }}
          >
            {activeTab === "coding" && (
              <CodingMaths type="coding" openDemoModal={openDemoModal} />
            )}
            {activeTab === "maths" && (
              <CodingMaths type="maths" openDemoModal={openDemoModal} />
            )}
            {activeTab === "courses" && <CoursePricing />}
            {activeTab === "academic" && (
              <AcademicPricing openDemoModal={openDemoModal} />
            )}
          </motion.div>

          {/* VALUE NOTE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
            {[
              [ShieldCheck, "No hidden fees", "What you see is what you pay", COLORS.emerald, COLORS.emeraldLight],
              [Heart, "Free demo", "Try before you commit", COLORS.cyan, COLORS.cyanLight],
              [Star, "Flexible learning", "Solo or small group", COLORS.goldDeep, COLORS.goldLight],
            ].map(([Icon, title, sub, color, light]) => (
              <div
                key={title}
                className="rounded-2xl border-2 bg-white p-4 flex items-center gap-3"
                style={{ borderColor: COLORS.border }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: light, color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black">{title}</div>
                  <div className="text-[9px] font-bold mt-1" style={{ color: COLORS.textMuted }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto mt-16">
            <div className="text-center mb-6">
              <Pill color={COLORS.cyan} light={COLORS.cyanLight}>
                <MessageCircle className="w-3 h-3" />
                QUICK ANSWERS
              </Pill>
              <h2 className="font-black text-3xl sm:text-4xl mt-3" style={{ letterSpacing: "-0.05em" }}>
                Pricing questions, answered.
              </h2>
            </div>

            <div className="space-y-2.5">
              {FAQS.map(([question, answer], index) => {
                const open = openFaq === index;
                return (
                  <div
                    key={question}
                    className="rounded-2xl border-2 bg-white overflow-hidden"
                    style={{ borderColor: open ? `${COLORS.cyan}45` : COLORS.border }}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-4 text-left"
                    >
                      <span className="text-xs sm:text-sm font-black">{question}</span>
                      <ChevronDown
                        className="w-4 h-4 shrink-0 transition-transform"
                        style={{
                          color: COLORS.cyan,
                          transform: open ? "rotate(180deg)" : "none",
                        }}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div
                            className="px-4 pb-4 text-[11px] leading-relaxed"
                            style={{ color: COLORS.textSecondary }}
                          >
                            {answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="mt-12">
            <div
              className="relative overflow-hidden rounded-[2.3rem] border-2 bg-white p-7 sm:p-10 text-center"
              style={{ borderColor: `${COLORS.gold}30`, boxShadow: SHADOWS.lg }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ background: GRADIENTS.primary }}
              />

              <div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
                style={{ background: COLORS.goldLight, color: COLORS.goldDeep }}
              >
                <Gift className="w-7 h-7" />
              </div>

              <h2 className="font-black text-3xl sm:text-5xl mt-4" style={{ letterSpacing: "-0.055em" }}>
                Not sure where to start?
              </h2>

              <p className="text-sm mt-3" style={{ color: COLORS.textSecondary }}>
                Try one free class. We'll help you pick the right fit.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-2.5 mt-5">
                <button
                  onClick={() => openDemoModal?.("pricing_cta_bottom")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-black text-white"
                  style={{ background: GRADIENTS.primary }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Book Free Demo
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppLink("Hi! I'd like to know more about Pearlx pricing and book a free demo class.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 bg-white text-sm font-black"
                  style={{ color: COLORS.ink, borderColor: COLORS.border }}
                >
                  Chat on WhatsApp
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

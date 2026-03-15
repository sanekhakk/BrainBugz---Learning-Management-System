// src/pages/Pricing.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, GraduationCap, Globe, Check, ArrowRight,
  Users, User, Zap, Star, Package, ChevronDown, ExternalLink,
  Layout, Rocket, Shield, BookOpen
} from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";

// ── DATA ─────────────────────────────────────────────────────────

const CODING_GRADES = [
  {
    label: "Grades 1–3",
    hourly: 400,
    monthly: 3200,
    grpHourly: 240,
    grpMonthly: 1920,
    packages: [
      { classes: 30,  price: 9999,  savings: 2001, disc: 17 },
      { classes: 45,  price: 15800, savings: 2200, disc: 12 },
      { classes: 90,  price: 28800, savings: 7200, disc: 20 },
      { classes: 150, price: 43800, savings: 16200,disc: 27 },
    ],
  },
  {
    label: "Grades 4–6",
    hourly: 500,
    monthly: 4000,
    grpHourly: 300,
    grpMonthly: 2400,
    packages: [
      { classes: 30,  price: 12999, savings: 2001, disc: 13 },
      { classes: 45,  price: 19800, savings: 2700, disc: 12 },
      { classes: 90,  price: 36000, savings: 9000, disc: 20 },
      { classes: 150, price: 54800, savings: 20200,disc: 27 },
    ],
  },
  {
    label: "Grades 7+",
    hourly: 650,
    monthly: 5200,
    grpHourly: 390,
    grpMonthly: 3120,
    packages: [
      { classes: 30,  price: 15999, savings: 3501, disc: 18 },
      { classes: 45,  price: 25700, savings: 3550, disc: 12 },
      { classes: 90,  price: 46800, savings: 11700,disc: 20 },
      { classes: 150, price: 71200, savings: 26300,disc: 27 },
    ],
  },
];

const CS_GRADES = [
  { label: "Grades 5–8",  hourly: 200, monthly: 1600, grpHourly: 120, grpMonthly: 960  },
  { label: "Grades 9–10", hourly: 250, monthly: 2000, grpHourly: 150, grpMonthly: 1200 },
  { label: "Grades 11–12",hourly: 300, monthly: 2400, grpHourly: 180, grpMonthly: 1440 },
];

const WEB_SERVICES = [
  { icon: Layout,  title: "UI / UX Design",        desc: "Custom, conversion-focused designs tailored to your brand — wireframes, prototypes, and pixel-perfect delivery." },
  { icon: Code2,   title: "Website Development",   desc: "React, Node.js, or custom CMS. Built fast, built to scale, with clean code and modern architecture." },
  { icon: Rocket,  title: "Deployment & SEO",      desc: "Domain, hosting, SSL certificate, Google Search Console setup, and basic on-page SEO — fully handled." },
  { icon: Shield,  title: "Support & Maintenance", desc: "Ongoing care packages: security patches, content updates, performance monitoring, and priority support." },
  { icon: BookOpen,title: "E-commerce Stores",     desc: "Full shopping experiences with product management, payment gateways, order tracking, and admin panels." },
  { icon: Globe,   title: "Web Applications",      desc: "Custom dashboards, portals, SaaS tools — whatever your business needs built to run reliably at scale." },
];

// ── SUB-COMPONENTS ───────────────────────────────────────────────

const TabBtn = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className="relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 whitespace-nowrap"
    style={{
      background: active ? COLORS.ink : "transparent",
      color: active ? "#fff" : COLORS.textMuted,
      letterSpacing: "0.02em",
    }}
  >
    {active && (
      <motion.span
        layoutId="tab-bg"
        className="absolute inset-0 rounded-xl"
        style={{ background: COLORS.ink, zIndex: -1 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      />
    )}
    {children}
  </button>
);

const GradeBadge = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
    style={{
      background: active ? COLORS.goldLight : COLORS.white,
      borderColor: active ? COLORS.gold : COLORS.border,
      color: active ? COLORS.goldDeep : COLORS.textSecondary,
      boxShadow: active ? `0 2px 12px rgba(201,168,76,0.2)` : "none",
    }}
  >
    {label}
  </button>
);

const SessionTag = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.textSecondary }}>
    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: accent || COLORS.gold }} />
    <span>{label}: <strong style={{ color: COLORS.ink }}>{value}</strong></span>
  </div>
);

// ── CODING CLASSES SECTION ───────────────────────────────────────

const CodingSection = () => {
  const [gradeIdx, setGradeIdx] = useState(1);
  const [mode, setMode] = useState("monthly"); // monthly | package
  const g = CODING_GRADES[gradeIdx];

  return (
    <div>
      {/* Grade selector */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CODING_GRADES.map((gr, i) => (
          <GradeBadge key={i} active={gradeIdx === i} onClick={() => setGradeIdx(i)} label={gr.label} />
        ))}
      </div>

      {/* Mode toggle */}
      <div className="inline-flex items-center gap-1 p-1 rounded-2xl border mb-8"
        style={{ background: COLORS.bgSecondary, borderColor: COLORS.border }}>
        <TabBtn active={mode === "monthly"} onClick={() => setMode("monthly")}>Monthly Plan</TabBtn>
        <TabBtn active={mode === "package"} onClick={() => setMode("package")}>Class Packages</TabBtn>
      </div>

      <AnimatePresence mode="wait">
        {mode === "monthly" ? (
          <motion.div key="monthly"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* 1-on-1 */}
              <div className="rounded-3xl border p-7"
                style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.card }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: COLORS.goldLight }}>
                    <User className="w-4 h-4" style={{ color: COLORS.gold }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>1-on-1</div>
                    <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>Personal Mentorship</div>
                  </div>
                </div>
                <div className="mb-1">
                  <span className="font-bold" style={{ fontSize: "2.4rem", color: COLORS.ink, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.03em" }}>
                    ₹{g.monthly.toLocaleString()}
                  </span>
                  <span className="text-sm ml-1" style={{ color: COLORS.textMuted }}>/month</span>
                </div>
                <div className="text-xs mb-6" style={{ color: COLORS.textMuted }}>₹{g.hourly}/hr · 8 sessions/month · 2 per week</div>
                <div className="space-y-2.5 mb-6">
                  {["Fully personalised curriculum","Flexible scheduling","WhatsApp support between classes","Weekly progress report for parents"].map((f,i)=>(
                    <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: COLORS.textSecondary }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />{f}
                    </div>
                  ))}
                </div>
                <a href="https://wa.link/5pk793"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border transition-all duration-200"
                  style={{ color: COLORS.goldDeep, borderColor: "rgba(201,168,76,0.35)", background: COLORS.goldLight, letterSpacing: "0.02em" }}
                  onMouseEnter={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.color = "#0E0E0E"; e.currentTarget.style.borderColor = COLORS.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.background = COLORS.goldLight; e.currentTarget.style.color = COLORS.goldDeep; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; }}
                >
                  Book a Free Demo <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Group */}
              <div className="rounded-3xl border p-7 relative overflow-hidden"
                style={{ background: "linear-gradient(160deg, #0E0E0E, #1A1A1A)", borderColor: "rgba(201,168,76,0.35)", boxShadow: "0 0 0 1px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.3)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, #C9A84C, #E2BA5F, #C9A84C)" }} />
                <div className="absolute -top-3 right-5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)", color: "#0E0E0E", letterSpacing: "0.04em" }}>
                  ★ Best Value
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.2)" }}>
                    <Users className="w-4 h-4" style={{ color: COLORS.gold }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>Group</div>
                    <div className="text-sm font-semibold text-white">3–6 Students per Batch</div>
                  </div>
                </div>
                <div className="mb-1">
                  <span className="font-bold text-white" style={{ fontSize: "2.4rem", fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.03em" }}>
                    ₹{g.grpMonthly.toLocaleString()}
                  </span>
                  <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.5)" }}>/month</span>
                </div>
                <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>₹{g.grpHourly}/hr per student · 8 sessions/month</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold mb-6"
                  style={{ background: "rgba(201,168,76,0.12)", color: COLORS.gold, border: "1px solid rgba(201,168,76,0.2)" }}>
                  <Zap className="w-3 h-3" /> Save ₹{(g.monthly - g.grpMonthly).toLocaleString()} vs 1-on-1
                </div>
                <div className="space-y-2.5 mb-6">
                  {["3–6 students, same grade & board","Collaborative peer learning","Shared mini projects & presentations","WhatsApp group support"].map((f,i)=>(
                    <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />{f}
                    </div>
                  ))}
                </div>
                <a href="https://wa.link/5pk793"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all duration-200"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)", color: "#0E0E0E", letterSpacing: "0.02em" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,168,76,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  Book a Free Demo <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="package"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
              Prepay for a block of classes and save big. Sessions never expire. Use at your own pace.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {g.packages.map((pkg, i) => {
                const isPopular = i === 2; // 90-class package
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="relative rounded-2xl border p-5 flex flex-col"
                    style={{
                      background: isPopular ? "linear-gradient(160deg,#0E0E0E,#1A1A1A)" : COLORS.white,
                      borderColor: isPopular ? "rgba(201,168,76,0.4)" : COLORS.border,
                      boxShadow: isPopular ? "0 0 0 1px rgba(201,168,76,0.12), 0 16px 40px rgba(0,0,0,0.25)" : SHADOWS.card,
                    }}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                        style={{ background: "linear-gradient(90deg,#C9A84C,#E2BA5F,#C9A84C)" }} />
                    )}
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap"
                        style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)", color: "#0E0E0E" }}>
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-4 h-4" style={{ color: isPopular ? COLORS.gold : COLORS.textMuted }} />
                      <span className="font-bold text-2xl"
                        style={{ color: isPopular ? COLORS.gold : COLORS.ink, fontFamily: "'Cormorant Garamond',Georgia,serif", letterSpacing: "-0.02em" }}>
                        {pkg.classes}
                      </span>
                      <span className="text-sm" style={{ color: isPopular ? "rgba(255,255,255,0.5)" : COLORS.textMuted }}>classes</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-bold" style={{ fontSize: "1.7rem", color: isPopular ? "#fff" : COLORS.ink, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs mb-3" style={{ color: isPopular ? "rgba(255,255,255,0.4)" : COLORS.textMuted }}>
                      ₹{Math.round(pkg.price/pkg.classes)}/class
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold self-start mb-4"
                      style={{ background: isPopular ? "rgba(201,168,76,0.15)" : COLORS.goldLight, color: COLORS.gold, border: `1px solid ${isPopular ? "rgba(201,168,76,0.25)" : "rgba(201,168,76,0.2)"}` }}>
                      Save {pkg.disc}% · ₹{pkg.savings.toLocaleString()} off
                    </div>
                    <a href="https://wa.link/5pk793"
                      className="mt-auto flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: isPopular ? "linear-gradient(135deg,#C9A84C,#A07830)" : COLORS.goldLight,
                        color: isPopular ? "#0E0E0E" : COLORS.goldDeep,
                        border: isPopular ? "none" : `1px solid rgba(201,168,76,0.25)`,
                      }}>
                      Book Now <ArrowRight className="w-3 h-3" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── CS TUITION SECTION ───────────────────────────────────────────

const CSTuitionSection = () => {
  const [gradeIdx, setGradeIdx] = useState(0);
  const g = CS_GRADES[gradeIdx];

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        {CS_GRADES.map((gr, i) => (
          <GradeBadge key={i} active={gradeIdx === i} onClick={() => setGradeIdx(i)} label={gr.label} />
        ))}
      </div>

      {/* Boards covered */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["CBSE","ICSE / ISC","IGCSE (Cambridge)","State Boards"].map((b,i)=>(
          <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: COLORS.goldLight, color: COLORS.goldDeep, border: "1px solid rgba(201,168,76,0.2)" }}>
            {b}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* 1-on-1 */}
        <AnimatePresence mode="wait">
          <motion.div key={`1on1-${gradeIdx}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-3xl border p-7"
            style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.card }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: COLORS.goldLight }}>
                <User className="w-4 h-4" style={{ color: COLORS.gold }} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>1-on-1</div>
                <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>Personal Tuition</div>
              </div>
            </div>
            <div className="mb-1">
              <span className="font-bold" style={{ fontSize: "2.4rem", color: COLORS.ink, fontFamily: "'Cormorant Garamond',Georgia,serif", letterSpacing: "-0.03em" }}>
                ₹{g.monthly.toLocaleString()}
              </span>
              <span className="text-sm ml-1" style={{ color: COLORS.textMuted }}>/month</span>
            </div>
            <div className="text-xs mb-6" style={{ color: COLORS.textMuted }}>₹{g.hourly}/hr · 8 sessions/month · 2 per week</div>
            <div className="space-y-2.5 mb-6">
              {["Board-specific syllabus (CBSE/ICSE/IGCSE)","Past papers & exam pattern coaching","Concepts built from the ground up","Doubt clearing between sessions"].map((f,i)=>(
                <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: COLORS.textSecondary }}>
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />{f}
                </div>
              ))}
            </div>
            <a href="https://wa.link/5pk793"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold border transition-all duration-200"
              style={{ color: COLORS.goldDeep, borderColor: "rgba(201,168,76,0.35)", background: COLORS.goldLight, letterSpacing: "0.02em" }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.color = "#0E0E0E"; e.currentTarget.style.borderColor = COLORS.gold; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.goldLight; e.currentTarget.style.color = COLORS.goldDeep; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; }}
            >
              Book a Free Demo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Group */}
        <AnimatePresence mode="wait">
          <motion.div key={`grp-${gradeIdx}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-3xl border p-7 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg,#0E0E0E,#1A1A1A)", borderColor: "rgba(201,168,76,0.35)", boxShadow: "0 0 0 1px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.3)" }}>
            <div className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg,#C9A84C,#E2BA5F,#C9A84C)" }} />
            <div className="absolute -top-3 right-5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)", color: "#0E0E0E" }}>
              ★ Best Value
            </div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.2)" }}>
                <Users className="w-4 h-4" style={{ color: COLORS.gold }} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>Group</div>
                <div className="text-sm font-semibold text-white">3–6 Students per Batch</div>
              </div>
            </div>
            <div className="mb-1">
              <span className="font-bold text-white" style={{ fontSize: "2.4rem", fontFamily: "'Cormorant Garamond',Georgia,serif", letterSpacing: "-0.03em" }}>
                ₹{g.grpMonthly.toLocaleString()}
              </span>
              <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.5)" }}>/month</span>
            </div>
            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>₹{g.grpHourly}/hr per student · 8 sessions/month</div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold mb-6"
              style={{ background: "rgba(201,168,76,0.12)", color: COLORS.gold, border: "1px solid rgba(201,168,76,0.2)" }}>
              <Zap className="w-3 h-3" /> Save ₹{(g.monthly - g.grpMonthly).toLocaleString()} vs 1-on-1
            </div>
            <div className="space-y-2.5 mb-6">
              {["Same board & grade batch only","Peer learning accelerates understanding","Shared mock exams & practice sessions","Progress shared with parents monthly"].map((f,i)=>(
                <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />{f}
                </div>
              ))}
            </div>
            <a href="https://wa.link/5pk793"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)", color: "#0E0E0E", letterSpacing: "0.02em" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,168,76,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
            >
              Book a Free Demo <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subjects covered */}
      <div className="mt-8 p-6 rounded-2xl border" style={{ background: COLORS.bgSecondary, borderColor: COLORS.border }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>Subjects we cover</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { name: "Computer Science", boards: "CBSE Class 10 & 12, IGCSE" },
            { name: "Computer Applications", boards: "ICSE Class 10" },
            { name: "Information Practices", boards: "CBSE Class 11 & 12" },
            { name: "Computer Studies / ICT", boards: "IGCSE / O-Level" },
            { name: "Information Technology", boards: "CBSE Class 10 & 12" },
            { name: "Custom / State Board", boards: "On request" },
          ].map((s,i) => (
            <div key={i} className="flex gap-2.5 p-3 rounded-xl border bg-white" style={{ borderColor: COLORS.border }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: COLORS.gold }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: COLORS.ink }}>{s.name}</div>
                <div className="text-xs" style={{ color: COLORS.textMuted }}>{s.boards}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── WEB DEV SECTION ──────────────────────────────────────────────

const WebDevSection = () => (
  <div>
    {/* Starting price hero */}
    <div className="relative rounded-3xl overflow-hidden p-8 mb-8"
      style={{ background: "linear-gradient(135deg,#0E0E0E,#1A1A1A)" }}>
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg,#C9A84C,#E2BA5F,#C9A84C)" }} />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-8"
        style={{ background: "radial-gradient(circle,#C9A84C,transparent)", transform: "translate(30%,-30%)" }} />
      <div className="relative z-10">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>Web Studio · Pricing</p>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Starting from</span>
              <span className="font-bold text-white" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontFamily: "'Cormorant Garamond',Georgia,serif", letterSpacing: "-0.03em" }}>₹4,999</span>
            </div>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Final pricing depends on scope, complexity, and features. Every project gets a custom quote.
            </p>
          </div>
        </div>
        <motion.a href="https://wa.link/ctfbjv"
          whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.4)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold"
          style={{
            background: "linear-gradient(135deg,#C9A84C,#A07830)",
            color: "#0E0E0E",
            boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
            letterSpacing: "0.03em",
          }}>
          Get a Free Quote <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </div>

    {/* What's included */}
    <h3 className="font-bold mb-5"
      style={{ color: COLORS.ink, fontFamily: "'Cormorant Garamond',Georgia,serif", fontStyle: "italic", fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
      What we build
    </h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {WEB_SERVICES.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="p-5 rounded-2xl border transition-all duration-200"
          style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.sm }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)"; e.currentTarget.style.boxShadow = SHADOWS.hover; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.boxShadow = SHADOWS.sm; }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
            style={{ background: COLORS.goldLight }}>
            <s.icon className="w-4 h-4" style={{ color: COLORS.gold }} />
          </div>
          <h4 className="font-semibold text-sm mb-1.5" style={{ color: COLORS.ink }}>{s.title}</h4>
          <p className="text-xs leading-relaxed" style={{ color: COLORS.textMuted, lineHeight: 1.7 }}>{s.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* What's always included */}
    <div className="p-6 rounded-2xl border" style={{ background: COLORS.bgSecondary, borderColor: COLORS.border }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>Always included in every project</p>
      <div className="grid sm:grid-cols-2 gap-2.5">
        {[
          "Mobile-responsive design","SSL certificate setup","Domain & hosting guidance",
          "Google Search Console","Basic on-page SEO","Source code handover",
          "1 month post-launch support","Revision rounds included",
        ].map((f,i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm" style={{ color: COLORS.textSecondary }}>
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.gold }} />{f}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── MAIN PAGE ─────────────────────────────────────────────────────

const tabs = [
  { id: "coding",  label: "Coding Classes",     icon: Code2,         subtitle: "For kids & teens" },
  { id: "cs",      label: "CS / CA / IP Tuition",icon: GraduationCap, subtitle: "School exam prep" },
  { id: "web",     label: "Web Development",    icon: Globe,         subtitle: "For brands & startups" },
];

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("coding");

  return (
    <section className="min-h-screen pt-28 pb-24" style={{ background: COLORS.bgPrimary }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: COLORS.gold, letterSpacing: "0.12em" }}>
            Transparent Pricing
          </p>
          <h1 className="font-bold mb-4"
            style={{
              color: COLORS.ink,
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.1,
            }}>
            Simple, honest{" "}
            <em style={{ color: COLORS.gold }}>fee details</em>
          </h1>
          <p className="text-sm max-w-md leading-relaxed" style={{ color: COLORS.textMuted, lineHeight: 1.8 }}>
            No hidden charges. No registration fees. Pay only for the sessions you book.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {tabs.map((tab) => (
            <motion.button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-250"
              style={{
                background: activeTab === tab.id ? COLORS.ink : COLORS.white,
                borderColor: activeTab === tab.id ? COLORS.ink : COLORS.border,
                boxShadow: activeTab === tab.id ? SHADOWS.lg : SHADOWS.sm,
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: activeTab === tab.id ? "rgba(201,168,76,0.15)" : COLORS.goldLight,
                  border: activeTab === tab.id ? "1px solid rgba(201,168,76,0.25)" : "none",
                }}>
                <tab.icon className="w-5 h-5" style={{ color: COLORS.gold }} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: activeTab === tab.id ? "#fff" : COLORS.ink }}>
                  {tab.label}
                </div>
                <div className="text-xs" style={{ color: activeTab === tab.id ? "rgba(255,255,255,0.45)" : COLORS.textMuted }}>
                  {tab.subtitle}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}>
            {activeTab === "coding" && <CodingSection />}
            {activeTab === "cs"     && <CSTuitionSection />}
            {activeTab === "web"    && <WebDevSection />}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border text-center"
          style={{ background: COLORS.bgSecondary, borderColor: COLORS.border }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: COLORS.gold, letterSpacing: "0.1em" }}>
            Not sure which plan to pick?
          </p>
          <h3 className="font-bold mb-2"
            style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.8rem", color: COLORS.ink, letterSpacing: "-0.02em" }}>
            Book a <em style={{ color: COLORS.gold }}>free demo class</em>
          </h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: COLORS.textMuted }}>
            Try a free 30-min demo session — no commitment, no payment. We'll understand your board, grade, and goals and show you exactly how we teach.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.a href="https://wa.link/5pk793"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-2xl text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)", color: "#0E0E0E", boxShadow: "0 4px 20px rgba(201,168,76,0.25)", letterSpacing: "0.03em" }}>
              Book Free Demo →
            </motion.a>
            <motion.a href="https://wa.link/5pk793"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-2xl text-sm font-bold border transition-all"
              style={{ color: COLORS.ink, borderColor: COLORS.borderMed, background: COLORS.white, letterSpacing: "0.03em" }}>
              Chat on WhatsApp
            </motion.a>
            <motion.a href="mailto:support@pearlx.in"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-2xl text-sm font-bold border transition-all"
              style={{ color: COLORS.textMuted, borderColor: COLORS.border, background: COLORS.white, letterSpacing: "0.03em" }}>
              Email us
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Pricing;
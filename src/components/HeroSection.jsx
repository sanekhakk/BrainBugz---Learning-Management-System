// src/components/HeroSection.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MonitorPlay, Sparkles, ArrowRight } from "lucide-react";
import kid2 from "../assets/kids/KID2.webp"

const BLOCK_SNIPPETS = [
  { emoji: "🔁", label: "repeat 10 times", color: "#10B981", x: "8%", y: "22%" },
  { emoji: "❓", label: "if touching edge?", color: "#0EA5E9", x: "72%", y: "15%" },
  { emoji: "📢", label: 'say "Hello!"', color: "#6366F1", x: "80%", y: "60%" },
  { emoji: "🖱️", label: "when flag clicked", color: "#10B981", x: "5%", y: "68%" },
  { emoji: "➡️", label: "move 10 steps", color: "#0EA5E9", x: "60%", y: "80%" },
  { emoji: "⚡", label: "if / else block", color: "#6366F1", x: "35%", y: "88%" },
];

const CYCLING_PHRASES = [
  "Start with block coding 🧱",
  "Build real logic 🧠",
  "Create Scratch games 🎮",
  "Excel in school CS 📚",
  "Transition to Python 🐍",
];

const STATS = [
  { value: "50+", label: "Students Taught" },
  { value: "3", label: "Structured Categories" },
  { value: "132", label: "Lessons" },
];

// Shared noise/grain SVG overlay
const GrainOverlay = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] z-0" style={{ mixBlendMode: "overlay" }}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

const HeroSection = () => {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 400], [0, -60]);
  const bgY = useTransform(scrollY, [0, 600], [0, 120]);

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % CYCLING_PHRASES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const particles = useMemo(() =>
    Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      size: Math.random() * 14 + 4,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#0EA5E9" : "#6366F1",
      blur: Math.random() * 5 + 3,
    })), []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white">
      <GrainOverlay />

      {/* ── LAYERED BACKGROUND ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient gradient orbs */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.12, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[15%] -right-[8%] w-[65vw] h-[65vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.18, 1] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] -left-[12%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="absolute bottom-[-5%] left-[35%] w-[40vw] h-[40vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(50px)" }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, left: p.left, top: p.top, backgroundColor: p.color, filter: `blur(${p.blur}px)` }}
            animate={{ y: [0, -120, 0], x: [0, (p.id % 2 === 0 ? 1 : -1) * (Math.random() * 40 + 10), 0], opacity: [0.08, 0.28, 0.08] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Floating code blocks */}
        {BLOCK_SNIPPETS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl border hidden lg:flex"
            style={{ color: b.color, left: b.x, top: b.y, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", borderColor: `${b.color}25`, zIndex: 5 }}
            animate={{ y: [0, -24 + (i * 4) % 12, 0], rotate: [0, i % 2 === 0 ? 4 : -3, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 10 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          >
            <span className="text-lg">{b.emoji}</span>
            <span style={{ color: "#0F172A", opacity: 0.75 }}>{b.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div style={{ y: contentY }} className="max-w-7xl mx-auto px-6 w-full py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Content ── */}
          <div className="relative">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold mb-8 bg-white border border-slate-200 text-slate-700 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              Coding for Kids · Academic CS Tuition
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="font-extrabold leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)", color: "#0F172A" }}
            >
              Master logic.{" "}
              <br />
              <span
                className="relative inline-block"
                style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Create with code.
                {/* Underline glow */}
                <motion.span
                  animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                  style={{ background: "linear-gradient(90deg, #0EA5E9, #10B981)", filter: "blur(4px)" }}
                />
              </span>
            </motion.h1>

            {/* Cycling phrase */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-8">
              <div className="relative overflow-hidden h-10 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIdx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center px-5 py-2 rounded-full text-sm font-bold text-white shadow-lg"
                    style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)" }}
                  >
                    {CYCLING_PHRASES[phraseIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-lg leading-relaxed mb-10 max-w-lg font-medium"
              style={{ color: "#475569" }}
            >
              We start with <strong className="text-emerald-600">visual block coding</strong> so kids build logic effortlessly.
              Plus, dedicated <strong className="text-slate-900">CS & IP Tuition</strong> for Classes 6–12 to ace board exams.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a
                href="https://wa.link/5pk793"
                whileHover={{ scale: 1.05, boxShadow: "0 16px 40px rgba(16,185,129,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white"
                style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)", boxShadow: "0 8px 28px rgba(16,185,129,0.3)" }}
              >
                🚀 Book Free Trial
              </motion.a>
              <motion.a
                href="#curriculum"
                whileHover={{ scale: 1.05, borderColor: "#0EA5E9" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold border-2 transition-colors"
                style={{ color: "#0EA5E9", borderColor: "rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.04)" }}
              >
                <MonitorPlay className="w-5 h-5" /> View Programs
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex gap-8 pt-8 border-t border-slate-100"
            >
              {STATS.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold" style={{ color: "#0F172A" }}>{s.value}</div>
                  <div className="text-xs font-semibold" style={{ color: "#64748B" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Visual Panel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[520px] lg:h-[640px] flex items-center justify-center"
          >
            {/* Spinning rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-2 border-dashed"
              style={{ borderColor: "rgba(16,185,129,0.2)", zIndex:20 }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-16 rounded-full border-2 border-dashed"
              style={{ borderColor: "rgba(14,165,233,0.2)" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-28 rounded-full border border-dashed"
              style={{ borderColor: "rgba(99,102,241,0.15)" }}
            />

            {/* Central glow */}
            <div className="absolute inset-32 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, rgba(16,185,129,0.06) 50%, transparent 80%)", filter: "blur(20px)" }} />

            {/* Hero image */}
            <div className="relative z-20 w-full max-w-[440px]">
              <img
                src={kid2}
                alt="Kid Coding"
                className="w-full h-auto object-contain"
                style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.1))" }}
              />
            </div>

            {/* Floating info cards */}
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] right-[0%] z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white flex items-center gap-3"
            >
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl text-2xl">🏆</div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Board Excellence</div>
                <div className="text-xs text-slate-500 font-medium">Classes 6–12</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[12%] left-[-2%] z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white flex items-center gap-3"
            >
              <div className="bg-cyan-100 text-cyan-600 p-3 rounded-xl text-2xl">🧱</div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Block to Text</div>
                <div className="text-xs text-slate-500 font-medium">Smooth Progression</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[35%] right-[-4%] z-30 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-extrabold text-slate-900">6+ modules · 132 Lessons</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
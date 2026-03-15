// src/components/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { COLORS, SHADOWS } from "../utils/theme";
import { GraduationCap, Laptop, Star, Users, ArrowRight, ChevronRight } from "lucide-react";
import PearlxLogo from "../assets/PearlxLogo.png";
import image1 from "../assets/heroimage1.png";
import image2 from "../assets/heroimage2.png";
import image3 from "../assets/heroimage3.png";
import image4 from "../assets/heroimage4.png";
import image5 from "../assets/heroimage5.png";
import image6 from "../assets/heroimage6.png";

// All 6 images in the pool
const ALL_IMAGES = [image1, image2, image3, image4, image5, image6];

// Pick 3 unique random indices from the pool, avoiding conflicts with current indices
function getNextIndex(currentIndexes, slotIndex, pool) {
  const others = currentIndexes.filter((_, i) => i !== slotIndex);
  const available = pool.map((_, i) => i).filter(i => !others.includes(i));
  const filtered = available.filter(i => i !== currentIndexes[slotIndex]);
  const pick = filtered.length > 0 ? filtered : available;
  return pick[Math.floor(Math.random() * pick.length)];
}

// Hook: manages 3 image slots, each rotating at its own interval
function useRotatingImages(allImages, intervals = [3000, 4000, 5000]) {
  const [indexes, setIndexes] = useState([0, 1, 2]);

  useEffect(() => {
    const timers = intervals.map((ms, slot) =>
      setInterval(() => {
        setIndexes(prev => {
          const next = [...prev];
          next[slot] = getNextIndex(prev, slot, allImages);
          return next;
        });
      }, ms)
    );
    return () => timers.forEach(clearInterval);
  }, []);

  return indexes.map(i => allImages[i]);
}

const subjects = ["Python", "Java", "CBSE CS", "ICSE CS", "Web Dev", "DSA", "IGCSE"];

const HeroSection = () => {
  const [subjectIdx, setSubjectIdx] = useState(0);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 500], [0, 60]);

  // 3 slots rotating at 2s, 3s, 4s
  const [img0, img1, img2] = useRotatingImages(ALL_IMAGES, [4000, 6000, 8000]);

  useEffect(() => {
    const t = setInterval(() => setSubjectIdx(i => (i + 1) % subjects.length), 2200);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { n: "50+", label: "Students taught" },
    { n: "4.9★", label: "Average rating" },
    { n: "100%", label: "Board coverage" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-start lg:items-center overflow-hidden pt-20"
      style={{ background: "linear-gradient(160deg, #F9F7F4 0%, #F0EDE7 50%, #F9F7F4 100%)" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }} />

      {/* Subtle radial glow — gold */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)" }} />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,14,14,0.04) 0%, transparent 70%)" }} />

      {/* Fine horizontal rule lines — editorial detail */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(201,168,76,0.2)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 pb-20 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="relative z-10">
            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-7 border"
              style={{
                background: "rgba(201,168,76,0.08)",
                borderColor: "rgba(201,168,76,0.25)",
                color: COLORS.goldDeep,
                letterSpacing: "0.05em",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.gold }} />
              Online Tuition · CBSE · ICSE · IGCSE
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display leading-[1.03] font-bold mb-6"
              style={{
                color: COLORS.ink,
                letterSpacing: "-0.035em",
                fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              }}
            >
              Learn{" "}
              <em style={{ color: COLORS.gold, fontStyle: "italic" }}>CS</em>
              <br />
              from{" "}
              <span className="relative inline-block">
                real
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 120 6" preserveAspectRatio="none">
                  <path d="M2 4 Q30 1 60 3.5 Q90 6 118 2.5" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              {" "}developers
            </motion.h1>

            {/* Rotating subject pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="text-sm font-medium" style={{ color: COLORS.textMuted }}>Currently teaching →</span>
              <div className="relative overflow-hidden h-8 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span key={subjectIdx}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C 0%, #E2BA5F 100%)",
                      color: "#0E0E0E",
                      boxShadow: "0 2px 12px rgba(201,168,76,0.35)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {subjects[subjectIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base leading-relaxed mb-9 max-w-md"
              style={{ color: COLORS.textSecondary, lineHeight: 1.8 }}
            >
              Computer Science tuition for CBSE, ICSE & IGCSE students — and coding courses for beginners.
              Taught by developers who build production software.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-11"
            >
              <motion.a
                href="https://wa.link/5pk793"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(201,168,76,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
                  color: "#0E0E0E",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
                  letterSpacing: "0.03em",
                }}
              >
                <GraduationCap className="w-4 h-4" />
                Join CS Classes
              </motion.a>
              <motion.a
                href="https://wa.link/ctfbjv"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold tracking-wide border"
                style={{
                  color: COLORS.ink,
                  borderColor: COLORS.borderStrong,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  letterSpacing: "0.03em",
                }}
              >
                <Laptop className="w-4 h-4" />
                Get a Website Built
              </motion.a>
              <motion.a
                href="https://wa.link/5pk793"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold tracking-wide border"
                style={{
                  color: COLORS.goldDeep,
                  borderColor: "rgba(201,168,76,0.4)",
                  background: COLORS.goldLight,
                  letterSpacing: "0.03em",
                }}
              >
                <ChevronRight className="w-4 h-4" />
                Book a Free Demo
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-bold text-2xl"
                    style={{
                      color: COLORS.ink,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      letterSpacing: "-0.02em",
                    }}>
                    {s.n}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: COLORS.textMuted, letterSpacing: "0.04em" }}>{s.label}</div>
                </div>
              ))}
              <div className="w-px h-10 hidden sm:block" style={{ background: COLORS.smoke }} />
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#C9A84C","#8E9AAB","#3D3D3D","#B87333"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
                      style={{ background: c, color: i === 2 ? "#fff" : "#0E0E0E" }}>
                      {["A","R","S","K"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-xs" style={{ color: COLORS.textMuted, letterSpacing: "0.03em" }}>Students enrolled</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Rotating Image Collage ── */}
          <motion.div
            className="relative w-full mb-16 lg:mb-0"
            style={{ y: imgY, height: "min(540px, 80vw)" }}
          >
            {/* Decorative frame */}
            <div className="absolute rounded-3xl border hidden lg:block"
              style={{ borderColor: "rgba(201,168,76,0.2)", top: "12px", right: "-12px", width: "42%", height: "58%" }} />

            {/* Slot 0 — large left card */}
            <motion.div
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute rounded-3xl overflow-hidden"
              style={{
                boxShadow: SHADOWS.float,
                left: "4%", top: "0%",
                width: "48%", height: "58%",
                rotate: -2,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={img0}
                  src={img0}
                  alt="Student learning"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(14,14,14,0.5) 100%)" }} />
              <div className="absolute bottom-4 left-4 z-10">
                <p className="text-white font-semibold italic"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.75rem, 2vw, 1rem)" }}>
                  Class in session
                </p>
              </div>
            </motion.div>

            {/* Slot 1 — top right card */}
            <motion.div
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute rounded-3xl overflow-hidden"
              style={{
                boxShadow: SHADOWS.float,
                right: "0%", top: "8%",
                width: "42%", height: "46%",
                rotate: 3,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={img1}
                  src={img1}
                  alt="Group study"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
            </motion.div>

            {/* Slot 2 — bottom card */}
            <motion.div
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute rounded-3xl overflow-hidden"
              style={{
                boxShadow: SHADOWS.float,
                left: "14%", bottom: "0%",
                width: "44%", height: "36%",
                rotate: -1,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={img2}
                  src={img2}
                  alt="Learning"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
            </motion.div>

            {/* Floating badge — rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute z-20"
              style={{ top: "6%", right: "4%" }}
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border"
                style={{ background: COLORS.white, borderColor: COLORS.borderGold, boxShadow: SHADOWS.lg }}>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-2.5 h-2.5 fill-current" style={{ color: COLORS.gold }} />
                  ))}
                </div>
                <span className="text-xs font-bold" style={{ color: COLORS.ink }}>4.9 Rating</span>
              </div>
            </motion.div>

            {/* Floating badge — live class */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute z-20"
              style={{ bottom: "30%", right: "2%" }}
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl"
                style={{ background: COLORS.ink, boxShadow: SHADOWS.lg }}>
                <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: "#5A8A6A" }} />
                <span className="text-xs font-bold text-white tracking-wide whitespace-nowrap">Live Class Now</span>
              </div>
            </motion.div>

            {/* Floating badge — students */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute z-20"
              style={{ bottom: "4%", right: "26%" }}
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border"
                style={{ background: COLORS.white, borderColor: COLORS.border, boxShadow: SHADOWS.md }}>
                <Users className="w-3 h-3 flex-shrink-0" style={{ color: COLORS.gold }} />
                <span className="text-xs font-bold whitespace-nowrap" style={{ color: COLORS.ink }}>50+ Students</span>
              </div>
            </motion.div>

            {/* Dot grid */}
            <div className="absolute -top-6 -left-4 grid grid-cols-5 gap-2 opacity-25 hidden sm:grid">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.gold }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subject marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-3 border-t overflow-hidden"
        style={{ background: COLORS.ink, borderColor: "rgba(201,168,76,0.2)" }}>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-inner { display: flex; animation: marquee 30s linear infinite; width: max-content; }
        `}</style>
        <div className="marquee-inner flex gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-8">
              {["Python", "Java", "CBSE Board", "ICSE Board", "IGCSE", "Web Development", "Data Structures", "Computer Applications", "SQL & DBMS", "React & Node", "Algorithms", "IT Fundamentals"].map((s, i) => (
                <span key={i} className="text-sm font-medium flex items-center gap-3" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
                  <span className="w-1 h-1 rounded-full inline-block" style={{ background: COLORS.gold }} />
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
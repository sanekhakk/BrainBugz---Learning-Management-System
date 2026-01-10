// src/components/HeroSection.jsx - Ultra Modern Hero
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import BrainBugzLogo from "./../assets/BrainBugzLogo.png";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { Sparkles, ArrowRight, Zap, Code2, Cpu } from "lucide-react";

const FloatingParticle = ({ delay, duration, x, y }) => (
  <motion.div
    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: [0, 0.8, 0],
      x: [x, x + Math.random() * 100 - 50],
      y: [y, y - 200],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(${COLORS.accentCyan}20 1px, transparent 1px),
        linear-gradient(90deg, ${COLORS.accentCyan}20 1px, transparent 1px)
      `,
      backgroundSize: "100px 100px",
      animation: "gridMove 20s linear infinite",
    }} />
  </div>
);

const HeroSection = () => {
  const { openLoginModal } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-48 -left-48 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: GRADIENTS.primary,
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
        />
        <motion.div
          className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: GRADIENTS.secondary,
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
          }}
        />
        
        {/* Animated Grid */}
        <AnimatedGrid />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            duration={3 + Math.random() * 2}
            x={Math.random() * window.innerWidth}
            y={window.innerHeight}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border backdrop-blur-xl mb-8 group hover:scale-105 transition-transform cursor-pointer"
          style={{
            background: COLORS.glassBg,
            borderColor: COLORS.glassBorder,
            boxShadow: SHADOWS.md,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>
          <span className="text-xs font-medium text-gray-300 tracking-[0.2em] uppercase">
            The Future of CS Learning
          </span>
          <Zap className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotateY: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-50"
              style={{ background: GRADIENTS.primary }}
            />
            <img
              src={BrainBugzLogo}
              alt="BrainBugz Logo"
              className="h-36 w-36 md:h-48 md:w-48 relative z-10"
            />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter"
        >
          <span className="text-white">BRAIN</span>
          <motion.span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: GRADIENTS.primary }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            BUGZ
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-4xl font-light mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="text-cyan-400 font-medium">Precision Mentoring.</span>
          <span className="text-white italic"> Elite Results.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Transform your Computer Science journey with personalized 1-on-1 mentorship from industry experts
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.button
            onClick={() => openLoginModal("student")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full overflow-hidden font-bold text-lg shadow-xl"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            <span className="relative z-10 flex items-center text-white">
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={false}
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-full backdrop-blur-xl border font-semibold text-lg transition-all"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
            }}
          >
            <span className="flex items-center text-white">
              Explore Curriculum
              <Code2 className="ml-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
        >
          {[
            { value: "500+", label: "Students" },
            { value: "98%", label: "Success Rate" },
            { value: "50+", label: "Expert Tutors" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl backdrop-blur-xl border"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: GRADIENTS.primary }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
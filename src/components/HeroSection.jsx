// src/components/HeroSection.jsx
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import PearlxLogo from "../assets/PearlxLogo.png"
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Laptop,
  GraduationCap,
} from "lucide-react";

/* Floating Particle */
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

/* Animated Grid */
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(${COLORS.accentCyan}20 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.accentCyan}20 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px",
        animation: "gridMove 20s linear infinite",
      }}
    />
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
      {/* Background */}
      <div className="absolute inset-0 z-0">
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

        <AnimatedGrid />

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

      {/* Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border backdrop-blur-xl mb-8"
          style={{
            background: COLORS.glassBg,
            borderColor: COLORS.glassBorder,
            boxShadow: SHADOWS.md,
          }}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-medium text-gray-300 tracking-[0.2em] uppercase">
            Web Studio & Tech Academy
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-50"
              style={{ background: GRADIENTS.primary }}
            />
            <img
              src={PearlxLogo}
              alt="Pearlx Web Studio"
              className="h-36 md:h-44  relative z-10"
            />
          </motion.div>
        </motion.div>

        

        <p className="text-xl md:text-2xl text-gray-300 mb-6">
          Building modern websites & shaping future developers
        </p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-3xl font-light mb-6"
        >
          <span className="text-cyan-400 font-medium">
            Design. Develop. Deploy.
          </span>{" "}
          <span className="text-white italic">Learn Along the Way.</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          We craft high-performance websites for startups and brands, and offer
          structured Computer Science classes guided by real-world development
          experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <motion.a
            href="https://wa.link/ctfbjv"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-full font-bold text-lg text-white shadow-xl flex items-center"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            Get a Website Built
            <Laptop className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="https://wa.link/5pk793"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full backdrop-blur-xl border font-semibold text-lg text-white flex items-center"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
            }}
          >
            Join CS Classes
            <GraduationCap className="ml-2 w-5 h-5" />
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
            { value: "10+", label: "Web Projects" },
            { value: "50+", label: "Students Trained" },
            { value: "100%", label: "Custom Built" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl backdrop-blur-xl border"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <div
                className="text-3xl font-bold text-transparent bg-clip-text"
                style={{ backgroundImage: GRADIENTS.primary }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
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

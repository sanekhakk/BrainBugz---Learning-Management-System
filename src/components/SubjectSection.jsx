// src/components/SubjectSection.jsx - Ultra Modern Subjects
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { BookOpen, Code, Database, Sparkles } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const SubjectCard = ({ subject, icon: Icon, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group"
    >
      {/* Glow Effect on Hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
        style={{ background: GRADIENTS.primary }}
      />

      {/* Card Content */}
      <div
        className="relative h-full p-8 rounded-2xl border backdrop-blur-xl overflow-hidden"
        style={{
          background: COLORS.glassBg,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.lg,
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                ${COLORS.accentCyan}20 0px,
                ${COLORS.accentCyan}20 2px,
                transparent 2px,
                transparent 12px
              )
            `
          }} />
        </div>

        {/* Icon Container */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6 inline-flex p-4 rounded-2xl"
          style={{
            background: `${GRADIENTS.primary}15`,
            border: `1px solid ${COLORS.glassBorder}`,
          }}
        >
          <Icon className="w-8 h-8 text-cyan-400 relative z-10" />
          
          {/* Icon Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg"
            style={{ background: GRADIENTS.primary }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-3  group-hover:bg-clip-text transition-all duration-300"
             >
            {subject}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {description}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap gap-2">
            {["Core Concepts", "Projects", "Live Coding"].map((feature, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                style={{
                  background: COLORS.glassBg,
                  borderColor: COLORS.glassBorder,
                  color: COLORS.accentCyan,
                }}
              >
                {feature}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Corner Accent */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: GRADIENTS.primary }}
        />
      </div>
    </motion.div>
  );
};

const SubjectSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const subjects = [
    {
      name: "Computer Science",
      icon: Code,
      description: "Master fundamental CS concepts, algorithms, data structures, and problem-solving techniques with hands-on projects.",
    },
    {
      name: "IT (Information Technology)",
      icon: Database,
      description: "Comprehensive IT curriculum covering networks, databases, cybersecurity, and system administration.",
    },
    {
      name: "Computer Applications",
      icon: BookOpen,
      description: "Practical application development, software engineering principles, and real-world project experience.",
    },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div style={{ background: GRADIENTS.secondary, width: "100%", height: "100%" }} />
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-xl mb-6"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">
              Our Curriculum
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Master Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: GRADIENTS.primary }}
            >
              Computer Science
            </span>
            {" "}Subjects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Comprehensive support for school students covering all key CS concepts and practical applications
          </motion.p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={index}
              subject={subject.name}
              icon={subject.icon}
              description={subject.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            All courses include personalized curriculum, progress tracking, and expert mentorship
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-bold text-white"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            Explore Full Curriculum
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SubjectSection;
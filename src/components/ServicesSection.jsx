// src/components/ServicesSection.jsx - Ultra Modern Services
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { GraduationCap, Users, Code, Check, ArrowRight, Sparkles } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const ServiceCard = ({ icon: Icon, title, desc, features, gradient, delay, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group h-full"
    >
      {/* Background gradient glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
        style={{ background: gradient }}
      />

      {/* Card content */}
      <div
        className="relative h-full p-8 rounded-3xl border backdrop-blur-xl overflow-hidden"
        style={{
          background: COLORS.glassBg,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.lg,
        }}
      >
        {/* Decorative corner element */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: gradient }}
        />

        {/* Icon container */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6 inline-flex p-4 rounded-2xl"
          style={{
            // background: `${gradient}15`,
            border: `1px solid ${COLORS.glassBorder}`,
          }}
        >
          <Icon className="w-8 h-8 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg"
            style={{ background: gradient }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4  group-hover:bg-clip-text transition-all duration-300"
            >
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          {desc}
        </p>

        {/* Features list */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.1 * i }}
              className="flex items-start text-sm text-gray-300 group-hover:text-white transition-colors"
            >
              <div
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5"
                style={{
                  background: `${gradient}20`,
                  border: `1px solid ${COLORS.glassBorder}`,
                }}
              >
                <Check className="w-3 h-3 text-cyan-400" />
              </div>
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white border group/btn transition-all"
          style={{
            background: COLORS.glassBg,
            borderColor: COLORS.glassBorder,
          }}
        >
          Learn More
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
        </motion.button>

        {/* Card number badge */}
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl text-white/5 group-hover:text-white/10 transition-colors"
             style={{ fontFamily: 'monospace' }}>
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const services = [
    {
      icon: GraduationCap,
      title: "Private Mentorship",
      desc: "One-on-one high-intensity sessions for rapid concept mastery with personalized learning paths.",
      features: [
        "Tailored Curriculum Design",
        "Priority Scheduling & Flexibility",
        "24/7 Slack Support Channel",
        "Weekly Progress Reports"
      ],
      gradient: GRADIENTS.primary,
    },
    {
      icon: Users,
      title: "Masterclass Groups",
      desc: "Collaborative elite learning circles for peer-driven growth and competitive excellence.",
      features: [
        "Weekly Team Projects",
        "Real-time Competency Tracking",
        "Interactive Group Workshops",
        "Peer Code Reviews"
      ],
      gradient: GRADIENTS.secondary,
    },
    {
      icon: Code,
      title: "Coding Labs",
      desc: "Advanced practical labs focusing on industry-standard architecture and modern frameworks.",
      features: [
        "Full-stack Development Focus",
        "Production-ready Projects",
        "Industry Best Practices",
        "Coming Q3 2024"
      ],
      gradient: GRADIENTS.purple,
    },
  ];

  return (
    <section ref={ref} id="services" className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div style={{ background: GRADIENTS.primary, width: "100%", height: "100%" }} />
        </motion.div>
        <motion.div
          style={{ y: useTransform(y, (value) => -value) }}
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        >
          <div style={{ background: GRADIENTS.secondary, width: "100%", height: "100%" }} />
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
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
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Bespoke Educational{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: GRADIENTS.primary }}
            >
              Paths
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Choose the learning experience that matches your ambition
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
              delay={index * 0.2}
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
            Not sure which path is right for you?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-semibold border backdrop-blur-xl transition-all"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              color: COLORS.white,
            }}
          >
            Schedule a Free Consultation
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
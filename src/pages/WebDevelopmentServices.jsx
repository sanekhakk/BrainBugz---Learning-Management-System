import { motion } from "framer-motion";
import {
  Laptop,
  Layout,
  Code,
  Rocket,
  Shield,
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const services = [
  {
    title: "UI / UX Design",
    desc: "Clean, modern, conversion-focused designs.",
    icon: Layout,
  },
  {
    title: "Website Development",
    desc: "Fast, scalable websites using modern tech stacks.",
    icon: Code,
  },
  {
    title: "Deployment & Hosting",
    desc: "Domain setup, hosting, SEO basics, and go-live.",
    icon: Rocket,
  },
  {
    title: "Maintenance & Support",
    desc: "Updates, security, and long-term support.",
    icon: Shield,
  },
];

const WebDevelopmentServices = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black mb-6"
        >
          <span className="text-white">Web Development </span>
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: GRADIENTS.primary }}
          >
            Services
          </span>
        </motion.h1>

        <p className="text-gray-400 max-w-3xl mx-auto mb-20">
          We design, develop, and maintain high-performance websites for brands,
          startups, and professionals.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl backdrop-blur-xl border text-left"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
                boxShadow: SHADOWS.md,
              }}
            >
              <s.icon className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                {s.title}
              </h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <a href="https://wa.link/ctfbjv"
            className="px-8 py-4 rounded-full text-white font-bold"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            Get a Website Built
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebDevelopmentServices;

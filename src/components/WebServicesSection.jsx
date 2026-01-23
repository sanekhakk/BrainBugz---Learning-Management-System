import { motion } from "framer-motion";
import { Code2, Layout, Rocket, Shield } from "lucide-react";
import { COLORS, GRADIENTS } from "../utils/theme";

const services = [
  {
    icon: Layout,
    title: "UI / UX Design",
    desc: "Clean, modern, user-focused interfaces designed for conversion.",
  },
  {
    icon: Code2,
    title: "Website Development",
    desc: "Custom websites using modern stacks — fast, scalable, and secure.",
  },
  {
    icon: Rocket,
    title: "Deployment & SEO",
    desc: "Domain setup, hosting, SEO basics, and Google-ready launch.",
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    desc: "Ongoing updates, security, performance monitoring & support.",
  },
];

const WebServicesSection = () => {
  return (
    <section id="services" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-4"
        >
          <span className="text-white">Web Development</span>{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: GRADIENTS.primary }}
          >
            Services
          </span>
        </motion.h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          Everything you need to build, launch, and scale a professional online
          presence.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-6 rounded-2xl backdrop-blur-xl border text-left"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <s.icon className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebServicesSection;

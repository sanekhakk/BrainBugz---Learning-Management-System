import { motion } from "framer-motion";
import { Star, Users, Cpu } from "lucide-react";
import { COLORS } from "../utils/theme";

const points = [
  {
    icon: Star,
    title: "Quality Over Quantity",
    desc: "We take limited projects to ensure top-tier results.",
  },
  {
    icon: Cpu,
    title: "Developer-Led Studio",
    desc: "Built by real developers, not sales teams.",
  },
  {
    icon: Users,
    title: "Education-Driven Thinking",
    desc: "We don’t just build — we explain and empower.",
  },
];

const WhyPearlxSection = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl backdrop-blur-xl border"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <p.icon className="w-7 h-7 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPearlxSection;

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Code, CheckCircle } from "lucide-react";
import { GRADIENTS } from "../utils/theme";

const steps = [
  { icon: MessageSquare, title: "Discuss", desc: "Understand your goals & brand." },
  { icon: PenTool, title: "Design", desc: "Create wireframes & UI concepts." },
  { icon: Code, title: "Develop", desc: "Build with clean, scalable code." },
  { icon: CheckCircle, title: "Launch", desc: "Deploy, test & go live." },
];

const ProcessSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-12 text-white">
          Our{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: GRADIENTS.primary }}
          >
            Process
          </span>
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl border backdrop-blur-xl"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <step.icon className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

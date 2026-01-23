import { motion } from "framer-motion";
import { GraduationCap, Laptop, ArrowRight } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black mb-6"
        >
          <span className="text-white">Our </span>
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: GRADIENTS.primary }}
          >
            Services
          </span>
        </motion.h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-20">
          Choose what you’re here for — learning Computer Science or building a
          professional website.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* TUITION */}
          <motion.div
            whileHover={{ y: -10 }}
            onClick={() => navigate("/services/education")}
            className="p-10 rounded-3xl backdrop-blur-xl border text-left cursor-pointer"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              boxShadow: SHADOWS.md,
            }}
          >
            <GraduationCap className="w-10 h-10 text-cyan-400 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Computer Science Classes
            </h2>
            <p className="text-gray-400 mb-8">
              Concept-focused tuition for school students and beginners, guided
              by real developers.
            </p>
            <div className="flex items-center text-cyan-400 font-semibold">
              Explore Tuition
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </motion.div>

          {/* WEB DEV */}
          <motion.div
            whileHover={{ y: -10 }}
            onClick={() => navigate("/services/web-development")}
            className="p-10 rounded-3xl backdrop-blur-xl border text-left cursor-pointer"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              boxShadow: SHADOWS.md,
            }}
          >
            <Laptop className="w-10 h-10 text-cyan-400 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Web Development Services
            </h2>
            <p className="text-gray-400 mb-8">
              High-performance websites designed, developed, and maintained for
              brands and startups.
            </p>
            <div className="flex items-center text-cyan-400 font-semibold">
              Explore Web Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;

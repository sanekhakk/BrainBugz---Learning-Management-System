import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  Code2,
  Laptop,
  Cpu,
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const boards = [
  "CBSE",
  "ICSE",
  "IGCSE",
  "State Board (All)",
];

const customCourses = [
  "Web Development",
  "Python Programming",
  "Java Programming",
  "Computer Basics",
  "Data Structures (Beginner)",
];

const ComputerScienceClasses = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black mb-6 text-center"
        >
          <span className="text-white">Computer Science </span>
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: GRADIENTS.primary }}
          >
            Classes
          </span>
        </motion.h1>

        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-20">
          Concept-focused Computer Science tuition for school students and
          beginners, guided by real developers with industry experience.
        </p>

        {/* Academic CS */}
        <div
          className="p-10 rounded-3xl backdrop-blur-xl border mb-12"
          style={{
            background: COLORS.glassBg,
            borderColor: COLORS.glassBorder,
            boxShadow: SHADOWS.md,
          }}
        >
          <div className="flex items-center mb-6">
            <School className="w-8 h-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">
              Academic Computer Science
            </h2>
          </div>

          <p className="text-gray-400 mb-6">
            We offer structured tuition for the academic Computer Science
            subject across all major boards, focusing on clarity, logic, and
            exam confidence.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {boards.map((board, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border text-center text-white"
                style={{
                  borderColor: COLORS.glassBorder,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {board}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Courses */}
        <div
          className="p-10 rounded-3xl backdrop-blur-xl border"
          style={{
            background: COLORS.glassBg,
            borderColor: COLORS.glassBorder,
            boxShadow: SHADOWS.md,
          }}
        >
          <div className="flex items-center mb-6">
            <Code2 className="w-8 h-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white">
              Custom Computer Science Courses
            </h2>
          </div>

          <p className="text-gray-400 mb-6">
            Learn practical Computer Science skills beyond textbooks through
            hands-on, project-based courses.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {customCourses.map((course, i) => (
              <div
                key={i}
                className="flex items-center p-4 rounded-xl border text-white"
                style={{
                  borderColor: COLORS.glassBorder,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <Cpu className="w-5 h-5 text-cyan-400 mr-3" />
                {course}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="https://wa.link/5pk793"
            className="px-8 py-4 rounded-full text-white font-bold"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            Join CS Classes
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComputerScienceClasses;

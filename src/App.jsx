// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { motion } from "framer-motion";
import { COLORS, GRADIENTS } from "./utils/theme";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import ServicesSection from "./components/ServicesSection";
import SubjectSection from "./components/SubjectSection";
import WebServicesSection from "./components/WebServicesSection";
import ProcessSection from "./components/ProcessSection";
import WhyPearlxSection from "./components/WhyPearlxSection";
import AuthModal from "./components/AuthModal";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";

import ComputerScienceClasses from "./pages/ComputerScienceClasses";
import WebDevelopmentServices from "./pages/WebDevelopmentServices";

/* Floating Particle Component */
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

/* Global Background Component */
const GlobalBackground = ({ mousePosition }) => (
  <div className="fixed inset-0 z-0 pointer-events-none">
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
);

function GuestHome() {
  return (
    <>
      <HeroSection />
      <WebServicesSection />
      <ProcessSection />
      <WhyPearlxSection />
      <ServicesSection />
      <SubjectSection />
    </>
  );
}

function MainApp() {
  const { role, isAuthReady } = useAuth();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isAuthReady) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{ backgroundColor: "#081023" }}
      >
        Loading...
      </div>
    );
  }

  // 🔐 Dashboards
  if (role === "admin") return <AdminDashboard />;
  if (role === "tutor") return <TutorDashboard />;
  if (role === "student") return <StudentDashboard />;

  // 🌐 Guest Pages
  return (
    <>
      {/* Global Background with Particles */}
      <GlobalBackground mousePosition={mousePosition} />
      
      <div className="relative z-10">
        <NavBar />

        <main className="pt-20">
          <Routes>
            <Route path="/" element={<GuestHome />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/services/education"
              element={<ComputerScienceClasses />}
            />
            <Route
              path="/services/web-development"
              element={<WebDevelopmentServices />}
            />
          </Routes>
        </main>

        <Footer />
        <AuthModal />
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
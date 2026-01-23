// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

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

  // 🌍 Guest Pages
  return (
    <>
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

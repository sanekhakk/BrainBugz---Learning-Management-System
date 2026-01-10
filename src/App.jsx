// src/App.jsx
import React, { useContext } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import SubjectSection from "./components/SubjectSection";
import AuthModal from "./components/AuthModal";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";

function MainApp() {
  const { role, isAuthReady } = useAuth();

  if (!isAuthReady) return (
    <div className="min-h-screen flex items-center justify-center text-white" style={{ backgroundColor: "#081023" }}>
      <div>Loading...</div>
    </div>
  );

  // guest: show public content
  if (role === "guest") {
    return (
      <div style={{ backgroundColor: "#081023", minHeight: "100vh" }}>
        <NavBar />
        <main className="pt-5">
          <HeroSection />
          <ServicesSection />
          <SubjectSection />
        </main>
        <Footer />
        <AuthModal />
      </div>
    );
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "tutor") return <TutorDashboard />;
  if (role === "student") return <StudentDashboard />;

  return <div>Unknown role</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

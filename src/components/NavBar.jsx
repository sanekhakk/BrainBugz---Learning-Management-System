// src/components/NavBar.jsx - Ultra Modern Navigation
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import BrainBugzLogo from "../assets/BrainBugzLogo.png";
import { Menu, X, Mail, Briefcase, ChevronRight } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const NavBar = () => {
  const { role = "guest", logout, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "Career", href: "https://forms.gle/YOUR_GOOGLE_FORM_LINK", external: true, icon: Briefcase },
  ];

  const handleLoginClick = (targetRole) => {
    setIsOpen(false);
    openLoginModal(targetRole);
  };

  const isAdmin = role === "admin";

  return (
    <>
      {/* Main NavBar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-full border backdrop-blur-2xl px-6 py-3"
            style={{
              background: scrolled
                ? "rgba(8, 16, 35, 0.95)"
                : COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              boxShadow: scrolled ? SHADOWS.lg : SHADOWS.md,
            }}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.a
                href="#"
                onClick={() => (window.location.hash = "")}
                className="flex items-center space-x-3 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full blur-lg opacity-50"
                    style={{ background: GRADIENTS.primary }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <img
                    src={BrainBugzLogo}
                    alt="BrainBugz"
                    className="h-10 w-10 relative z-10"
                  />
                </div>
                <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  BrainBugz
                </span>
              </motion.a>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : ""}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center"
                  >
                    {item.icon && <item.icon className="w-4 h-4 mr-1.5" />}
                    {item.name}
                  </motion.a>
                ))}

                {isAdmin && (
                  <motion.a
                    href="#admin"
                    onClick={() => (window.location.hash = "#admin")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full text-sm font-bold border ml-2"
                    style={{
                      borderColor: COLORS.accentCyan,
                      color: COLORS.accentCyan,
                    }}
                  >
                    Admin Portal
                  </motion.a>
                )}
              </nav>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                {role === "guest" ? (
                  <>
                    <motion.button
                      onClick={() => handleLoginClick("tutor")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-full text-sm font-semibold border transition-all"
                      style={{
                        borderColor: COLORS.glassBorder,
                        color: COLORS.white,
                      }}
                    >
                      Tutor Login
                    </motion.button>
                    <motion.button
                      onClick={() => handleLoginClick("student")}
                      whileHover={{ scale: 1.05, boxShadow: SHADOWS.glow }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 rounded-full text-sm font-bold text-white relative overflow-hidden group"
                      style={{
                        background: GRADIENTS.primary,
                        boxShadow: SHADOWS.md,
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        Student Login
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={logout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full text-sm font-semibold border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    Logout ({role})
                  </motion.button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <Menu className="h-6 w-6 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-[70] shadow-2xl"
              style={{
                background: `linear-gradient(180deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 100%)`,
                borderLeft: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: COLORS.glassBorder }}>
                <div className="flex items-center space-x-3">
                  <img src={BrainBugzLogo} alt="BrainBugz" className="h-10 w-10" />
                  <span className="text-white font-bold text-xl">BrainBugz</span>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </motion.button>
              </div>

              {/* Navigation */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : ""}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center">
                      {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </motion.a>
                ))}

                {isAdmin && (
                  <motion.a
                    href="#admin"
                    onClick={() => {
                      setIsOpen(false);
                      window.location.hash = "#admin";
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="flex items-center px-4 py-3 rounded-xl font-bold border mt-4"
                    style={{
                      borderColor: COLORS.accentCyan,
                      color: COLORS.accentCyan,
                    }}
                  >
                    Admin Portal
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </motion.a>
                )}
              </div>

              {/* Auth Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{ borderColor: COLORS.glassBorder }}>
                <div className="space-y-3">
                  {role === "guest" ? (
                    <>
                      <motion.button
                        onClick={() => handleLoginClick("tutor")}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 rounded-xl text-white font-semibold border transition-all"
                        style={{
                          borderColor: COLORS.glassBorder,
                          background: COLORS.glassBg,
                        }}
                      >
                        Login as Tutor
                      </motion.button>
                      <motion.button
                        onClick={() => handleLoginClick("student")}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 rounded-xl text-white font-bold"
                        style={{
                          background: GRADIENTS.primary,
                          boxShadow: SHADOWS.glow,
                        }}
                      >
                        Login as Student
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-3 rounded-xl font-semibold border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      Logout ({role})
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Mail, Briefcase } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import PearlxLogo from "../assets/logo.png";

const NavBar = () => {
  const { role = "guest", logout, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Contact", to: "#contact", icon: Mail },
    {
      name: "Career",
      href: "https://forms.gle/YOUR_GOOGLE_FORM_LINK",
      external: true,
      icon: Briefcase,
    },
  ];

  const handleLoginClick = (targetRole) => {
    setIsOpen(false);
    openLoginModal(targetRole);
  };

  const isAdmin = role === "admin";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="rounded-full border backdrop-blur-2xl px-6 py-3 flex items-center justify-between"
            style={{
              background: scrolled
                ? "rgba(8,16,35,0.95)"
                : COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              boxShadow: scrolled ? SHADOWS.lg : SHADOWS.md,
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src={PearlxLogo} alt="Pearlx" className="h-10 w-10" />
              <span className="text-xl font-bold text-white">
                Pearlx Web Studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center"
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4 mr-1.5" />
                    )}
                    {item.name}
                  </a>
                ) : item.to?.startsWith("#") ? (
                  <a
                    key={item.name}
                    href={item.to}
                    className="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {item.name}
                  </Link>
                )
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-full text-sm font-bold border ml-2"
                  style={{
                    borderColor: COLORS.accentCyan,
                    color: COLORS.accentCyan,
                  }}
                >
                  Admin Portal
                </Link>
              )}
            </nav>

            {/* Auth (Desktop) */}
            <div className="hidden lg:block">
              {role === "guest" ? (
                <button
                  onClick={() => handleLoginClick("student")}
                  className="px-5 py-2 rounded-full text-sm font-bold text-white"
                  style={{
                    background: GRADIENTS.primary,
                    boxShadow: SHADOWS.md,
                  }}
                >
                  Academy login
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-full text-sm text-red-400 border border-red-500/40"
                >
                  Logout ({role})
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 p-6"
              style={{
                background: "linear-gradient(180deg, #0b1430 0%, #081023 100%)",
                borderLeft: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-white font-bold text-lg">Menu</span>
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-white w-6 h-6" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                >
                  Home
                </Link>

                <Link
                  to="/services"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                >
                  Services
                </Link>

                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
                >
                  Contact
                </a>
              </div>

              {/* Auth (Mobile) */}
              <div className="absolute bottom-6 left-6 right-6">
                {role === "guest" ? (
                  <button
                    onClick={() => handleLoginClick("student")}
                    className="w-full py-3 rounded-xl text-white font-bold"
                    style={{
                      background: GRADIENTS.primary,
                      boxShadow: SHADOWS.glow,
                    }}
                  >
                    Academy login
                  </button>
                ) : (
                  <button
                    onClick={logout}
                    className="w-full py-3 rounded-xl border border-red-500/40 text-red-400"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;

// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { COLORS, SHADOWS } from "../utils/theme";
import PearlxLogo from "../assets/logo.png";

const NavBar = () => {
  const { role = "guest", logout, openLoginModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "CS Classes", to: "/services/education" },
    { label: "Web Dev", to: "/services/web-development" },
    { label: "Services", to: "/services" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-400"
            style={{
              background: scrolled ? "rgba(249,247,244,0.95)" : "rgba(249,247,244,0.75)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: scrolled ? `${SHADOWS.md}, inset 0 1px 0 rgba(255,255,255,0.8)` : "none",
              border: `1px solid ${scrolled ? "rgba(201,168,76,0.18)" : COLORS.border}`,
            }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <img src={PearlxLogo} alt="Pearlx" className="h-8 w-8 rounded-xl object-cover" />
              </div>
              <span style={{
                color: COLORS.ink,
                fontWeight: 700,
                fontSize: "1.1rem",
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                letterSpacing: "0.02em",
              }}>
                Pearlx
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.label} to={link.to}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 group"
                  style={{ color: COLORS.textSecondary, letterSpacing: "0.02em" }}
                  onMouseEnter={e => e.currentTarget.style.color = COLORS.ink}
                  onMouseLeave={e => e.currentTarget.style.color = COLORS.textSecondary}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                    style={{ background: COLORS.gold }} />
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="hidden md:flex items-center gap-3">
              {role === "guest" ? (
                <>
                  <button
                    onClick={() => openLoginModal("student")}
                    className="text-sm font-medium transition-colors px-3 py-2"
                    style={{ color: COLORS.textSecondary, letterSpacing: "0.02em" }}
                    onMouseEnter={e => e.currentTarget.style.color = COLORS.ink}
                    onMouseLeave={e => e.currentTarget.style.color = COLORS.textSecondary}
                  >
                    Log in
                  </button>
                  <motion.a href="https://wa.link/5pk793"
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(201,168,76,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
                      color: "#0E0E0E",
                      boxShadow: "0 2px 12px rgba(201,168,76,0.25)",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Start Learning →
                  </motion.a>
                </>
              ) : (
                <button onClick={logout}
                  className="px-4 py-2 rounded-xl text-sm font-medium border"
                  style={{ color: COLORS.textMuted, borderColor: COLORS.borderMed }}
                >
                  Logout ({role})
                </button>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-xl"
              style={{ background: COLORS.bgSecondary, color: COLORS.ink }}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-5"
            style={{
              background: "rgba(249,247,244,0.98)",
              border: `1px solid rgba(201,168,76,0.2)`,
              boxShadow: SHADOWS.xl,
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="space-y-1 mb-5">
              {navLinks.map(link => (
                <Link key={link.label} to={link.to} onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: COLORS.textSecondary, letterSpacing: "0.02em" }}
                  onMouseEnter={e => { e.currentTarget.style.background = COLORS.goldLight; e.currentTarget.style.color = COLORS.goldDeep; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.textSecondary; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a href="https://wa.link/5pk793"
              className="block w-full text-center py-3.5 rounded-xl text-sm font-bold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
                color: "#0E0E0E",
                letterSpacing: "0.03em",
              }}
              onClick={() => setIsOpen(false)}
            >
              Start Learning →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
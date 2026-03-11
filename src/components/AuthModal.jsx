// src/components/AuthModal.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { X, LogIn, Loader2, Mail, Lock, AlertCircle, CheckCircle2, GraduationCap } from "lucide-react";
import { DARK } from "../utils/theme";

const D = DARK;

const AuthModal = () => {
  const { showLoginModal, modalRole, closeLoginModal, loginUser, sendPasswordReset } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [resetMode, setResetMode] = useState(false);

  useEffect(() => {
    setEmail(""); setPassword(""); setError(null); setSuccess(null); setLoading(false);
    if (!showLoginModal) setResetMode(false);
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  const handleLogin = async (e) => {
    e.preventDefault(); setError(null); setLoading(true);
    const res = await loginUser(email, password);
    setLoading(false);
    if (!res.success) setError(res.error || "Login failed");
  };

  const handleReset = async (e) => {
    e.preventDefault(); setError(null); setLoading(true);
    const res = await sendPasswordReset(email);
    setLoading(false);
    if (res.success) { setSuccess(res.message); setTimeout(() => setResetMode(false), 3000); }
    else setError(res.error);
  };

  const subtitle = modalRole === "tutor" ? "Access your teaching dashboard" : "Continue your learning journey";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
        onClick={closeLoginModal}
      >
        <motion.div
          initial={{ scale: 0.92, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 24, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          className="relative w-full max-w-md"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: D.surface,
              border: `1px solid ${D.borderMed}`,
              boxShadow: D.shadowXl,
            }}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ background: D.gradPrimary }} />

            <div className="p-8">
              {/* Close */}
              <motion.button
                onClick={e => { e.stopPropagation(); closeLoginModal(); }}
                whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 p-2 rounded-full transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", color: D.textSecondary }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                  style={{ background: D.indigoMuted, border: `1px solid ${D.borderMed}` }}
                >
                  <GraduationCap className="w-8 h-8" style={{ color: D.indigo }} />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: D.textPrimary }}>
                  {resetMode ? "Reset Password" : "Welcome back"}
                </h2>
                <p className="text-sm" style={{ color: D.textMuted }}>
                  {resetMode ? "Enter your email to receive a reset link" : subtitle}
                </p>
              </div>

              {/* Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-3 p-4 mb-5 rounded-2xl"
                    style={{ background: D.redMuted, border: `1px solid ${D.red}30` }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: D.red }} />
                    <p className="text-sm" style={{ color: D.red }}>{error}</p>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-3 p-4 mb-5 rounded-2xl"
                    style={{ background: D.greenMuted, border: `1px solid ${D.green}30` }}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: D.green }} />
                    <p className="text-sm" style={{ color: D.green }}>{success}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={resetMode ? handleReset : handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: D.textSecondary }}>
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: D.textMuted }} />
                    <input
                      type="email" required value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: D.surfaceAlt,
                        border: `1px solid ${D.border}`,
                        color: D.textPrimary,
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = D.indigo}
                      onBlur={e => e.currentTarget.style.borderColor = D.border}
                    />
                  </div>
                </div>

                {/* Password */}
                {!resetMode && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: D.textSecondary }}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: D.textMuted }} />
                      <input
                        type="password" required value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: D.surfaceAlt,
                          border: `1px solid ${D.border}`,
                          color: D.textPrimary,
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = D.indigo}
                        onBlur={e => e.currentTarget.style.borderColor = D.border}
                      />
                    </div>
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit" disabled={loading}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-semibold text-white text-sm mt-2 flex items-center justify-center gap-2"
                  style={{ background: D.gradPrimary, boxShadow: D.shadowGlow }}
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : resetMode ? "Send Reset Link" : "Log In"
                  }
                </motion.button>
              </form>

              {/* Footer toggle */}
              <div className="mt-5 text-center">
                <button
                  onClick={() => { setResetMode(!resetMode); setError(null); setSuccess(null); }}
                  className="text-sm font-medium transition-colors"
                  style={{ color: D.indigo }}
                  onMouseEnter={e => e.currentTarget.style.color = D.cyan}
                  onMouseLeave={e => e.currentTarget.style.color = D.indigo}
                >
                  {resetMode ? "← Back to login" : "Forgot password?"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
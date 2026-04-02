// src/components/AuthModal.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { X, LogIn, Loader2, Mail, Lock, AlertCircle, CheckCircle2, GraduationCap } from "lucide-react";

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
    if (res.success) { 
      setSuccess(res.message); 
      setTimeout(() => setResetMode(false), 3000); 
    } else {
      setError(res.error);
    }
  };

  const subtitle = modalRole === "tutor" ? "Access your teaching dashboard" : "Continue your learning journey";

  return (
    <AnimatePresence>
      {showLoginModal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(12px)" }}
          onClick={closeLoginModal}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100">
              
              {/* Top gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 z-20" />

              {/* ── LIVE MODAL BACKGROUND EFFECTS ── */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-60" />
                <motion.div animate={{ rotate: -360, scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-[60px] opacity-60" />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
              </div>

              <div className="p-8 relative z-10">
                {/* Close Button */}
                <motion.button
                  onClick={e => { e.stopPropagation(); closeLoginModal(); }}
                  whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 bg-gradient-to-br from-cyan-50 to-emerald-50 border border-emerald-100 shadow-sm">
                    {resetMode ? (
                      <Lock className="w-8 h-8 text-cyan-600" />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-emerald-600" />
                    )}
                  </div>
                  <h2 className="text-2xl font-extrabold mb-2 text-slate-900 tracking-tight">
                    {resetMode ? "Reset Password" : "Welcome back"}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    {resetMode ? "Enter your email to receive a reset link" : subtitle}
                  </p>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-start gap-3 p-4 mb-5 rounded-2xl bg-red-50 border border-red-100 overflow-hidden"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                      <p className="text-sm font-semibold text-red-700">{error}</p>
                    </motion.div>
                  )}
                  {success && (
                    <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-start gap-3 p-4 mb-5 rounded-2xl bg-emerald-50 border border-emerald-100 overflow-hidden"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                      <p className="text-sm font-semibold text-emerald-700">{success}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={resetMode ? handleReset : handleLogin} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700">Email address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                      <input
                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  {!resetMode && (
                    <div>
                      <label className="block text-sm font-bold mb-2 text-slate-700">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                        <input
                          type="password" required value={password} onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-bold text-white text-sm mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_12px_25px_rgba(16,185,129,0.4)] transition-shadow"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : resetMode ? "Send Reset Link" : "Log In"}
                  </motion.button>
                </form>

                {/* Footer Toggle */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => { setResetMode(!resetMode); setError(null); setSuccess(null); }}
                    className="text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors"
                  >
                    {resetMode ? "← Back to login" : "Forgot your password?"}
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
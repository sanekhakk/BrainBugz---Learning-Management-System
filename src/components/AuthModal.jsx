// src/components/AuthModal.jsx - Ultra Modern Auth Modal
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { X, LogIn, Loader2, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const AuthModal = () => {
  const { showLoginModal, modalRole, closeLoginModal, loginUser, sendPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetMode, setIsPasswordResetMode] = useState(false);

  // Clear content when modal open/close
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(null);
    setSuccessMessage(null);
    setIsLoading(false);
    if (!showLoginModal) setIsPasswordResetMode(false);
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  const modalTitle = modalRole === "tutor" ? "Tutor Login" : "Student Login";
  const modalSubtitle = modalRole === "tutor" 
    ? "Access your teaching dashboard" 
    : "Continue your learning journey";

  // LOGIN HANDLER
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const result = await loginUser(email, password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  // PASSWORD RESET HANDLER
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const result = await sendPasswordReset(email);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => setIsPasswordResetMode(false), 3000);
    } else {
      setError(result.error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeLoginModal}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Modal Card */}
          <div
            className="relative p-8 rounded-3xl border overflow-hidden"
            style={{
              background: COLORS.bgSecondary,
              borderColor: COLORS.glassBorder,
              boxShadow: SHADOWS.xl,
            }}
          >
            {/* Background Gradient Effect */}
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ background: GRADIENTS.primary }}
            />

            {/* Close Button */}
            <motion.button
              onClick={closeLoginModal}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </motion.button>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex p-4 rounded-2xl mb-4"
                style={{
                  background: `${GRADIENTS.primary}15`,
                  border: `1px solid ${COLORS.glassBorder}`,
                }}
              >
                <LogIn className="w-8 h-8 text-cyan-400" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {isPasswordResetMode ? "Reset Password" : modalTitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-400"
              >
                {isPasswordResetMode
                  ? "Enter your email to receive a reset link"
                  : modalSubtitle}
              </motion.p>
            </div>

            {/* Error / Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start p-4 mb-6 rounded-xl bg-green-500/10 border border-green-500/30"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-300">{successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form
              onSubmit={isPasswordResetMode ? handlePasswordReset : handleLoginSubmit}
              className="space-y-5 relative z-10"
            >
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    style={{
                      background: COLORS.glassBg,
                      borderColor: COLORS.glassBorder,
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              {!isPasswordResetMode && (
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      style={{
                        background: COLORS.glassBg,
                        borderColor: COLORS.glassBorder,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-4 py-4 rounded-xl font-bold text-white disabled:opacity-50 group"
                style={{
                  background: GRADIENTS.primary,
                  boxShadow: SHADOWS.glow,
                }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isPasswordResetMode ? "Send Reset Link" : "Log In"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer Actions */}
            <div className="mt-6 text-center relative z-10">
              <button
                onClick={() => {
                  setIsPasswordResetMode(!isPasswordResetMode);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {isPasswordResetMode ? "Back to Login" : "Forgot Password?"}
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1 opacity-50" style={{ background: GRADIENTS.primary }} />
          </div>

          {/* Additional Info Card */}
          {!isPasswordResetMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 rounded-2xl border text-center"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <p className="text-xs text-gray-400">
                By logging in, you agree to our{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
// src/components/AuthModal.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  X,
  LogIn,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const AuthModal = () => {
  const {
    showLoginModal,
    modalRole,
    closeLoginModal,
    loginUser,
    sendPasswordReset,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetMode, setIsPasswordResetMode] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(null);
    setSuccessMessage(null);
    setIsLoading(false);
    if (!showLoginModal) setIsPasswordResetMode(false);
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  const modalTitle = "Login";
  const modalSubtitle =
    modalRole === "tutor"
      ? "Access your teaching dashboard"
      : "Continue your learning journey";

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await loginUser(email, password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
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
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
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
          <div
            className="relative p-8 rounded-3xl border overflow-hidden"
            style={{
              background: COLORS.bgSecondary,
              borderColor: COLORS.glassBorder,
              boxShadow: SHADOWS.xl,
            }}
          >
            {/* Close Button — FIXED */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                closeLoginModal();
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </motion.button>

            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex p-4 rounded-2xl mb-4"
                style={{
                  background: `${GRADIENTS.primary}15`,
                  border: `1px solid ${COLORS.glassBorder}`,
                }}
              >
                <LogIn className="w-8 h-8 text-cyan-400" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                {isPasswordResetMode ? "Reset Password" : modalTitle}
              </h2>
              <p className="text-sm text-gray-400">
                {isPasswordResetMode
                  ? "Enter your email to receive a reset link"
                  : modalSubtitle}
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="flex items-start p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="flex items-start p-4 mb-6 rounded-xl bg-green-500/10 border border-green-500/30">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                <p className="text-sm text-green-300">{successMessage}</p>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={
                isPasswordResetMode
                  ? handlePasswordReset
                  : handleLoginSubmit
              }
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-white"
                    style={{
                      background: COLORS.glassBg,
                      border: `1px solid ${COLORS.glassBorder}`,
                    }}
                  />
                </div>
              </div>

              {!isPasswordResetMode && (
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl text-white"
                      style={{
                        background: COLORS.glassBg,
                        border: `1px solid ${COLORS.glassBorder}`,
                      }}
                    />
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl font-bold text-white"
                style={{
                  background: GRADIENTS.primary,
                  boxShadow: SHADOWS.glow,
                }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  isPasswordResetMode ? "Send Reset Link" : "Log In"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsPasswordResetMode(!isPasswordResetMode)}
                className="text-sm font-semibold text-cyan-400"
              >
                {isPasswordResetMode ? "Back to Login" : "Forgot Password?"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;

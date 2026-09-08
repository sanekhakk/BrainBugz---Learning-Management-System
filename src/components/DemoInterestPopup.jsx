import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const KID_IMAGE = "/assets/kids/demo-popup.webp";

const BENEFITS = [
  "Meet the tutor",
  "Try a real class",
  "See if they enjoy it",
];

const DemoInterestPopup = ({ onBookDemo, delay = 5000 }) => {
  const [visible, setVisible] = useState(false);

  // First appearance happens after `delay` (5 seconds by default).
  // After the visitor dismisses the popup, it can appear again after
  // two minutes if they are still on the website.
  const timerRef = useRef(null);
  const stoppedRef = useRef(false);
  const REPEAT_DELAY = 1 * 60 * 1000;

  const schedulePopup = (wait) => {
    if (typeof window === "undefined" || stoppedRef.current) return;

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      if (!stoppedRef.current) {
        setVisible(true);
      }
    }, wait);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // No session/local storage flag is used.
    // Every fresh page refresh starts the 5-second timer again.
    stoppedRef.current = false;
    schedulePopup(delay);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  // Blur the actual application root while the popup is open.
  // This also catches fixed/sticky navbars that otherwise can sit above
  // a backdrop because of their own stacking context.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const appRoot = document.getElementById("root");
    if (!appRoot) return;

    if (visible) {
      appRoot.style.filter = "blur(7px)";
      appRoot.style.transition = "filter 180ms ease";
      appRoot.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    } else {
      appRoot.style.filter = "";
      appRoot.style.transition = "";
      appRoot.style.pointerEvents = "";
      document.body.style.overflow = "";
    }

    return () => {
      appRoot.style.filter = "";
      appRoot.style.transition = "";
      appRoot.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [visible]);

  const close = () => {
    setVisible(false);

    // If they are still browsing, show the popup again after 2 minutes.
    schedulePopup(REPEAT_DELAY);
  };

  const handleBookDemo = () => {
    // Booking the demo means the visitor has already taken the action,
    // so stop future repeat popups for this page visit.
    stoppedRef.current = true;

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setVisible(false);

    // Give the popup exit animation a moment before opening the real modal.
    window.setTimeout(() => {
      onBookDemo?.("demo_interest_popup");
    }, 220);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483647,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "rgba(15, 23, 42, 0.48)",
            isolation: "isolate",
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pearlx-demo-popup-title"
            className="pearlx-demo-popup-card"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            style={{
              position: "relative",
              width: "min(640px, calc(100vw - 40px))",
              minHeight: "340px",
              overflow: "hidden",
              borderRadius: "30px",
              border: `2px solid ${COLORS.white}`,
              background: COLORS.white,
              boxShadow: SHADOWS.lg,
            }}
          >
            {/* Tiny playful decorations */}
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                right: "-45px",
                top: "-45px",
                borderRadius: "999px",
                background: COLORS.cyanLight,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "70px",
                height: "70px",
                left: "-35px",
                bottom: "-35px",
                borderRadius: "999px",
                background: COLORS.emeraldLight,
                pointerEvents: "none",
              }}
            />

            {/* Close */}
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 5,
                width: "30px",
                height: "30px",
                borderRadius: "999px",
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
                color: COLORS.textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: SHADOWS.sm,
              }}
            >
              <X size={15} strokeWidth={2.5} />
            </button>

            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1.05fr 0.95fr",
                minHeight: "340px",
              }}
            >
              {/* LEFT: compact message */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "34px 12px 30px 36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    width: "fit-content",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: COLORS.emeraldLight,
                    color: COLORS.emerald,
                    fontSize: "9px",
                    lineHeight: 1,
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  
                  Free Demo
                </div>

                <h2
                  id="pearlx-demo-popup-title"
                  style={{
                    margin: 0,
                    maxWidth: "300px",
                    color: COLORS.ink,
                    fontSize: "36px",
                    lineHeight: 0.98,
                    fontWeight: 900,
                    letterSpacing: "-0.045em",
                  }}
                >
                  Let them
                  <br />
                  <span
                    style={{
                      background: GRADIENTS.textGlow,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    try Pearlx.
                  </span>
                </h2>

                <p
                  style={{
                    margin: "9px 0 0",
                    maxWidth: "285px",
                    color: COLORS.textSecondary,
                    fontSize: "13px",
                    lineHeight: 1.45,
                    fontWeight: 600,
                  }}
                >
                  One real class. No pressure.
                  <br />
                  Just see how they like it.
                </p>

                <div
                  style={{
                    marginTop: "17px",
                    display: "grid",
                    gap: "6px",
                  }}
                >
                  {BENEFITS.map((benefit) => (
                    <div
                      key={benefit}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        color: COLORS.textPrimary,
                        fontSize: "10.5px",
                        lineHeight: 1.2,
                        fontWeight: 800,
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          flex: "0 0 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "999px",
                          background: COLORS.emeraldLight,
                          color: COLORS.emerald,
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {benefit}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                    marginTop: "20px",
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={handleBookDemo}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      border: 0,
                      borderRadius: "13px",
                      padding: "11px 14px",
                      background: GRADIENTS.primary,
                      color: COLORS.white,
                      fontSize: "11px",
                      fontWeight: 900,
                      cursor: "pointer",
                      boxShadow: SHADOWS.hover,
                    }}
                  >
                    Book free demo
                    <ArrowRight size={14} strokeWidth={2.8} />
                  </motion.button>

                  <button
                    type="button"
                    onClick={close}
                    style={{
                      border: 0,
                      background: "transparent",
                      padding: 0,
                      color: COLORS.textMuted,
                      fontSize: "10px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Maybe later
                  </button>
                </div>
              </div>

              {/* RIGHT: kid illustration — no separate image box */}
              <div
                style={{
                  position: "relative",
                  minWidth: 0,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  background: GRADIENTS.lightBg,
                  clipPath: "ellipse(90% 82% at 100% 50%)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "33px",
                    right: "30px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: COLORS.gold,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "63px",
                    left: "25px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: COLORS.emerald,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "28px",
                    left: "52px",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: COLORS.cyan,
                  }}
                />

                <motion.img
                  src={KID_IMAGE}
                  alt="Child learning with Pearlx"
                  initial={{ y: 8 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "block",
                    width: "118%",
                    height: "100%",
                    minHeight: "340px",
                    objectFit: "contain",
                    objectPosition: "center bottom",
                    alignSelf: "flex-end",
                  }}
                />
              </div>
            </div>

            {/* Mobile layout */}
            <style>{`
              @media (max-width: 560px) {
                .pearlx-demo-popup-card {
                  width: min(410px, calc(100vw - 24px)) !important;
                  min-height: 270px !important;
                }

                .pearlx-demo-popup-card > div:last-of-type {
                  min-height: 270px !important;
                }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default DemoInterestPopup;

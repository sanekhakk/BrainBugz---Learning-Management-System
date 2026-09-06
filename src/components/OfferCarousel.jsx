import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { COLORS, GRADIENTS } from "../utils/theme";

const WHATSAPP_LINK = "https://wa.link/2sqe3g";
const AUTO_PLAY_MS = 6500;

const OFFERS = [
  {
    id: "new-year",
    mark: "20% OFF",
    kicker: "2026 BATCH",
    title: "New year. New skills.",
    detail: "Python & Java Bootcamps",
    action: "Claim offer",
    href: WHATSAPP_LINK,
    accent: COLORS.emerald,
    icon: "whatsapp",
  },
  {
    id: "package",
    mark: "SAVE ₹1,393+",
    kicker: "PACKAGE DEAL",
    title: "Pay once. Learn for months.",
    detail: "Python / Java package from ₹3,999",
    action: "See packages",
    href: "/pricing",
    accent: COLORS.gold,
  },
];

export default function OfferCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [closed, setClosed] = useState(false);
  const timer = useRef(null);

  const restart = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setActive((current) => (current + 1) % OFFERS.length);
    }, AUTO_PLAY_MS);
  };

  useEffect(() => {
    if (!paused) restart();
    return () => clearInterval(timer.current);
  }, [paused]);

  if (closed) return null;

  const offer = OFFERS[active];

  const go = (index) => {
    setActive(index);
    restart();
  };

  const handleAction = () => {
    if (offer.href.startsWith("http")) {
      window.open(offer.href, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = offer.href;
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="h-[3px] w-full"
        style={{ background: COLORS.borderDark }}
      >
        <motion.div
          key={`${offer.id}-${active}`}
          className="h-full"
          style={{ background: offer.accent }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: AUTO_PLAY_MS / 1000,
            ease: "linear",
          }}
        />
      </div>

      <div
        className="border-b"
        style={{
          background: GRADIENTS.navBg,
          borderColor: COLORS.borderDark,
        }}
      >
        <div
          className="
            mx-auto flex h-[56px] w-full max-w-[1500px] items-center
            px-3 sm:px-5 lg:px-8
          "
        >
          {/* Offer ticket */}
          <motion.div
            key={`mark-${offer.id}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="relative mr-3 flex h-[38px] shrink-0 items-center rounded-lg px-3 font-black tracking-tight"
            style={{
              background: offer.accent,
              color: COLORS.navDark,
            }}
          >
            <span className="text-[11px] sm:text-xs whitespace-nowrap">
              {offer.mark}
            </span>

            <span
              className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
              style={{ background: COLORS.navDark }}
            />
          </motion.div>

          {/* Main message — deliberately kept to ONE compact line */}
          <AnimatePresence mode="wait">
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
              className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
            >
              <span
                className="hidden md:inline text-[9px] font-extrabold tracking-[0.14em] uppercase whitespace-nowrap"
                style={{ color: offer.accent }}
              >
                {offer.kicker}
              </span>

              <span className="text-white text-[13px] sm:text-[14px] lg:text-[15px] font-extrabold whitespace-nowrap">
                {offer.title}
              </span>

              <span
                className="hidden sm:inline text-[12px] lg:text-[13px] font-medium truncate"
                style={{ color: COLORS.silver }}
              >
                {offer.detail}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Desktop action */}
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAction}
            className="ml-3 hidden sm:flex h-[38px] shrink-0 items-center gap-2 rounded-lg px-4 text-[11px] font-extrabold"
            style={{
              background: offer.accent,
              color: COLORS.navDark,
              boxShadow: `0 5px 18px ${offer.accent}25`,
            }}
          >
            {offer.icon === "whatsapp" && (
              <MessageCircle className="h-3.5 w-3.5" />
            )}
            {offer.action}
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.button>

          {/* Mobile action */}
          <button
            type="button"
            onClick={handleAction}
            aria-label={offer.action}
            className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:hidden"
            style={{
              background: offer.accent,
              color: COLORS.navDark,
            }}
          >
            {offer.icon === "whatsapp" ? (
              <MessageCircle className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Minimal carousel control */}
          <div className="ml-3 hidden items-center gap-1.5 md:flex">
            {OFFERS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show ${item.kicker}`}
                onClick={() => go(index)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: index === active ? 18 : 5,
                  height: 5,
                  background:
                    index === active ? offer.accent : COLORS.silver,
                  opacity: index === active ? 1 : 0.35,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="Close offers"
            className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg opacity-50 transition-opacity hover:opacity-100"
            style={{ color: COLORS.white }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

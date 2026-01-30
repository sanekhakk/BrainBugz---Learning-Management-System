// src/utils/theme.js - Enhanced Professional Theme System

export const COLORS = {
  // Dark Background Palette
  bgPrimary: "#081023",
  bgSecondary: "#0a1628",
  bgTertiary: "#0d1b2e",

  // Accent Colors (light blue replaced)
  accentCyan: "#38BDF8",
  accentCyanDark: "#0EA5E9",
  accentGold: "#FCD34D",
  accentGoldDark: "#F59E0B",
  accentPurple: "#A78BFA",
  accentGreen: "#34D399",
  accentRed: "#F87171",

  // Neutral Colors
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Glass Effects
  glassBg: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassHover: "rgba(255, 255, 255, 0.06)",
};

export const GRADIENTS = {
  primary: "linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)",
  secondary: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
  purple: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)",
  dark: "linear-gradient(180deg, #0a1628 0%, #081023 100%)",
  glow: "radial-gradient(circle at center, rgba(195, 182, 174, 0.12) 0%, transparent 70%)",
};

export const SHADOWS = {
  sm: "0 2px 8px rgba(0, 0, 0, 0.15)",
  md: "0 4px 16px rgba(0, 0, 0, 0.2)",
  lg: "0 8px 32px rgba(0, 0, 0, 0.3)",
  xl: "0 16px 48px rgba(0, 0, 0, 0.4)",
  glow: "0 0 40px rgba(195, 182, 174, 0.35)",
  glowGold: "0 0 40px rgba(252, 211, 77, 0.3)",
  inner: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
};

export const ANIMATIONS = {
  // Transition Durations
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",

  // Easing Functions
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeIn: "cubic-bezier(0.7, 0, 0.84, 0)",
  easeInOut: "cubic-bezier(0.87, 0, 0.13, 1)",
  spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

export const SPACING = {
  xs: "0.25rem",    // 4px
  sm: "0.5rem",     // 8px
  md: "1rem",       // 16px
  lg: "1.5rem",     // 24px
  xl: "2rem",       // 32px
  "2xl": "3rem",    // 48px
  "3xl": "4rem",    // 64px
};

export const TYPOGRAPHY = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const BORDERS = {
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  width: {
    thin: "1px",
    normal: "2px",
    thick: "3px",
  },
};

// Utility function to create glassmorphism styles
export const glassEffect = (opacity = 0.03) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${COLORS.glassBorder}`,
});

// Utility function for hover glow effects
export const hoverGlow = (color = COLORS.accentCyan) => ({
  transition: `all ${ANIMATIONS.normal} ${ANIMATIONS.easeOut}`,
  "&:hover": {
    boxShadow: `0 0 32px ${color}40`,
    transform: "translateY(-2px)",
  },
});

// Legacy exports for backward compatibility
export const BG_DARK = COLORS.bgPrimary;
export const ACCENT_CYAN = COLORS.accentCyan;
export const ACCENT_GOLD = COLORS.accentGold;
export const GLASS_BG = COLORS.glassBg;
export const GLASS_BORDER = COLORS.glassBorder;

export default {
  COLORS,
  GRADIENTS,
  SHADOWS,
  ANIMATIONS,
  SPACING,
  TYPOGRAPHY,
  BORDERS,
  glassEffect,
  hoverGlow,
};

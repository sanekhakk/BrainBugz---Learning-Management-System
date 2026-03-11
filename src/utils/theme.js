// src/utils/theme.js — Pearlx Full Theme (Pearl · Silver · Charcoal · Gold)

// ─────────────────────────────────────────────────────────────
// PUBLIC WEBSITE — Warm Pearl Editorial Light Theme
// Pearl lustre = soft warm whites, champagne, ink charcoal, gold
// ─────────────────────────────────────────────────────────────
export const COLORS = {
  bgPrimary:    "#F9F7F4",       // warm pearl white
  bgSecondary:  "#F0EDE7",       // champagne cream
  bgTertiary:   "#E8E4DC",       // warm stone
  ink:          "#0E0E0E",       // deep charcoal black
  inkLight:     "#1A1A1A",       // rich dark
  inkMuted:     "#3D3D3D",       // medium charcoal
  // Primary accent — gold / champagne
  gold:         "#C9A84C",       // warm antique gold
  goldBright:   "#E2BA5F",       // lighter gold
  goldLight:    "#FBF5E6",       // pale gold tint
  goldDeep:     "#A07830",       // deep bronze gold
  // Secondary accent — cool silver
  silver:       "#8E9AAB",       // silver blue
  silverBright: "#B0BCC8",       // light silver
  silverLight:  "#EEF1F5",       // pale silver
  silverDeep:   "#5A6473",       // deep slate
  // Status / highlight
  pearl:        "#F5F2ED",       // pearl surface
  pearlSheen:   "#E8E2D9",       // pearl mid
  smoke:        "#D4CFC9",       // warm smoke
  // Text
  textPrimary:  "#0E0E0E",
  textSecondary:"#3D3D3D",
  textMuted:    "#767676",
  textLight:    "#A8A8A8",
  // Borders
  border:       "rgba(14,14,14,0.08)",
  borderMed:    "rgba(14,14,14,0.14)",
  borderStrong: "rgba(14,14,14,0.22)",
  borderGold:   "rgba(201,168,76,0.25)",
  white:        "#FFFFFF",
  // Legacy compat
  indigo:       "#C9A84C",       // remap: gold replaces indigo
  amber:        "#C9A84C",       // remap: gold
  coral:        "#B87333",       // copper accent
  emerald:      "#5A8A6A",       // muted sage green
  glassBg:      "#1A1A1A",
  glassBorder:  "rgba(255,255,255,0.08)",
};

export const GRADIENTS = {
  gold:        "linear-gradient(135deg, #C9A84C 0%, #E2BA5F 50%, #A07830 100%)",
  goldSoft:    "linear-gradient(135deg, #FBF5E6 0%, #F0E8D0 100%)",
  silver:      "linear-gradient(135deg, #8E9AAB 0%, #B0BCC8 100%)",
  dark:        "linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 100%)",
  darkDeep:    "linear-gradient(160deg, #0E0E0E 0%, #1C1C1C 60%, #0E0E0E 100%)",
  pearl:       "linear-gradient(160deg, #F9F7F4 0%, #EEF1F5 55%, #F9F7F4 100%)",
  hero:        "linear-gradient(160deg, #F9F7F4 0%, #F0EDE7 55%, #F9F7F4 100%)",
  inkGold:     "linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 80%, #2A2218 100%)",
  warm:        "linear-gradient(135deg, #F9F7F4 0%, #F0EDE7 100%)",
  // Legacy compat
  primary:     "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
  secondary:   "linear-gradient(135deg, #8E9AAB 0%, #5A6473 100%)",
  purple:      "linear-gradient(135deg, #8E9AAB 0%, #5A6473 100%)",
  indigo:      "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
  amber:       "linear-gradient(135deg, #C9A84C 0%, #E2BA5F 100%)",
  emerald:     "linear-gradient(135deg, #5A8A6A 0%, #3D6B50 100%)",
};

export const SHADOWS = {
  sm:        "0 1px 3px rgba(14,14,14,0.08), 0 1px 2px rgba(14,14,14,0.04)",
  md:        "0 4px 12px rgba(14,14,14,0.10), 0 2px 4px rgba(14,14,14,0.06)",
  lg:        "0 12px 32px rgba(14,14,14,0.12), 0 4px 8px rgba(14,14,14,0.06)",
  xl:        "0 24px 48px rgba(14,14,14,0.14), 0 8px 16px rgba(14,14,14,0.08)",
  card:      "0 2px 8px rgba(14,14,14,0.07), 0 8px 24px rgba(14,14,14,0.05)",
  hover:     "0 8px 30px rgba(201,168,76,0.18), 0 2px 8px rgba(14,14,14,0.08)",
  float:     "0 20px 60px rgba(14,14,14,0.15), 0 4px 12px rgba(14,14,14,0.08)",
  gold:      "0 4px 20px rgba(201,168,76,0.35)",
  goldBig:   "0 20px 60px rgba(201,168,76,0.25)",
  indigoBig: "0 20px 60px rgba(201,168,76,0.25)", // legacy compat
  glow:      "0 0 20px rgba(201,168,76,0.4)",     // legacy compat
};

export const ANIMATIONS = {
  fast:    "150ms",
  normal:  "300ms",
  slow:    "500ms",
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ─────────────────────────────────────────────────────────────
// DASHBOARDS — Deep Charcoal Dark Theme
// ─────────────────────────────────────────────────────────────
export const DARK = {
  bg:        "#0A0A0A",
  surface:   "#111111",
  surfaceAlt:"#1A1A1A",
  border:    "rgba(255,255,255,0.07)",
  borderMed: "rgba(255,255,255,0.12)",
  borderActive: "rgba(201,168,76,0.45)",

  textPrimary:   "#F1EDE8",
  textSecondary: "#A09890",
  textMuted:     "#686460",

  gold:      "#C9A84C",
  goldMuted: "rgba(201,168,76,0.15)",
  silver:    "#8E9AAB",
  silverMuted:"rgba(142,154,171,0.15)",
  green:     "#5A8A6A",
  greenMuted:"rgba(90,138,106,0.12)",
  red:       "#C25C4A",
  redMuted:  "rgba(194,92,74,0.12)",
  amber:     "#C9A84C",
  amberMuted:"rgba(201,168,76,0.12)",

  gradPrimary:  "linear-gradient(135deg, #C9A84C 0%, #A07830 100%)",
  gradSecondary:"linear-gradient(135deg, #8E9AAB 0%, #5A6473 100%)",
  gradGreen:    "linear-gradient(135deg, #5A8A6A 0%, #3D6B50 100%)",
  gradRed:      "linear-gradient(135deg, #C25C4A 0%, #A04535 100%)",
  gradAmber:    "linear-gradient(135deg, #C9A84C 0%, #E2BA5F 100%)",

  shadowSm:  "0 1px 3px rgba(0,0,0,0.5)",
  shadowMd:  "0 4px 16px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)",
  shadowLg:  "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
  shadowXl:  "0 20px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.45)",
  shadowGlow:"0 0 24px rgba(201,168,76,0.35)",
};

export const glassBg = DARK.surface;
export const glassBorder = DARK.border;

export default { COLORS, GRADIENTS, SHADOWS, ANIMATIONS, DARK };
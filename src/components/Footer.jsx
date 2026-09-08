import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Mail,
  Phone,
  Sparkles,
  Code2,
  Calculator,
  BookOpenCheck,
  Rocket,
  Heart,
} from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const SERVICES = [
  { label: "Coding", subtitle: "Make & code", to: "/services/education", Icon: Code2, color: COLORS.emerald, light: COLORS.emeraldLight },
  { label: "Maths", subtitle: "Think & solve", to: "/mathsclasses", Icon: Calculator, color: COLORS.gold, light: COLORS.goldLight },
  { label: "Academic Tuition", subtitle: "Learn & grow", to: "/services/academic-tuition", Icon: BookOpenCheck, color: COLORS.cyan, light: COLORS.cyanLight },
  { label: "Courses", subtitle: "Go deeper", to: "/courses", Icon: Rocket, color: COLORS.indigo, light: COLORS.indigoLight },
];

const LEVELS = [
  { label: "Little Pearls", to: "/services/education" },
  { label: "Bright Pearls", to: "/services/education" },
  { label: "Rising Pearls", to: "/services/education" },
];

const COMPANY = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact us", href: "https://wa.link/5pk793" },
];

const FooterLink = ({ item }) => {
  const className = "group inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200";

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}
        style={{ color: COLORS.silver }}
        onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.white)}
        onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.silver)}>
        {item.label}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    );
  }

  return (
    <Link to={item.to} className={className}
      style={{ color: COLORS.silver }}
      onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.white)}
      onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.silver)}>
      {item.label}
    </Link>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: COLORS.navDark, color: COLORS.white }}>
      <div className="h-1 w-full" style={{ background: GRADIENTS.primary }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* CTA */}
        <div className="py-10 sm:py-12">
          <div className="relative overflow-hidden rounded-[28px] border p-6 sm:p-8 lg:p-10"
            style={{ borderColor: COLORS.borderDark, background: COLORS.ink, boxShadow: SHADOWS.card }}>
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ background: COLORS.cyan }} aria-hidden="true" />
            <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full opacity-15 blur-3xl"
              style={{ background: COLORS.emerald }} aria-hidden="true" />

            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em]"
                  style={{ color: COLORS.emerald }}>
                  Ready when they are
                </div>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                  Find their thing. Let them run with it.
                </h2>
                <p className="mt-2 max-w-lg text-sm font-medium leading-6" style={{ color: COLORS.silver }}>
                  Coding, maths, academics and deeper courses — one place to keep learning moving.
                </p>
              </div>

              <motion.a href="https://wa.link/5pk793" target="_blank" rel="noreferrer"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black"
                style={{ background: GRADIENTS.primary, color: COLORS.white, boxShadow: SHADOWS.hover }}>
                <Phone className="h-4 w-4" />
                Talk to a mentor
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid gap-10 border-t py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
          style={{ borderColor: COLORS.borderDark }}>
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block" aria-label="Pearlx home">
              <img src="/pearlxlogodark.webp" alt="Pearlx" className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm font-medium leading-6" style={{ color: COLORS.silver }}>
              A playful place for kids to build skills, solve problems and discover what they love learning.
            </p>
            <a href="mailto:pearlxsupport@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition-colors"
              style={{ color: COLORS.silverBright }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.cyan)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.silverBright)}>
              <Mail className="h-4 w-4" />
              pearlxsupport@gmail.com
            </a>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.16em]">Explore</h3>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map(({ label, subtitle, to, Icon, color, light }) => (
                <Link key={label} to={to}
                  className="group rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: COLORS.borderDark, background: COLORS.inkLight }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.background = light;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.borderDark;
                    e.currentTarget.style.background = COLORS.inkLight;
                  }}>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: light, color }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-black">{label}</div>
                  <div className="mt-0.5 text-xs font-semibold" style={{ color: COLORS.silver }}>{subtitle}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.16em]">Pearls</h3>
            <div className="flex flex-col gap-3">
              {LEVELS.map((item) => <FooterLink key={item.label} item={item} />)}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.16em]">Pearlx</h3>
            <div className="flex flex-col gap-3">
              {COMPANY.map((item) => <FooterLink key={item.label} item={item} />)}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: COLORS.borderDark }}>
          <p className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: COLORS.silver }}>
            © {year} Pearlx Academy
            <span style={{ color: COLORS.silverBright }}>•</span>
            Made for curious young minds
            <Heart className="ml-0.5 h-3.5 w-3.5" style={{ color: COLORS.emerald, fill: COLORS.emerald }} />
          </p>

          <a href="https://wa.link/5pk793" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-black transition-colors"
            style={{ color: COLORS.silverBright }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.emerald)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.silverBright)}>
            Need help choosing?
            <span style={{ color: COLORS.emerald }}>Chat with us</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Target,
  Laptop,
  Clock3,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Users,
    title: "Small batches",
    text: "More attention. More interaction. Less sitting quietly in a crowd.",
  },
  {
    icon: Target,
    title: "Learning that fits",
    text: "Lessons are adjusted to your child's level, pace, and goals.",
  },
  {
    icon: Laptop,
    title: "Learn by doing",
    text: "Coding, maths, and academics become practical—not just another class.",
  },
  {
    icon: Clock3,
    title: "Flexible classes",
    text: "Choose timings that work around school and family life.",
  },
  {
    icon: BadgeCheck,
    title: "Progress you can see",
    text: "Regular practice, projects, and feedback keep learning moving forward.",
  },
];

const WhyPearlxSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600"
            >
              Why Pearlx
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl"
            >
              Good learning feels{" "}
              <span className="text-emerald-500">simple.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm text-sm font-medium leading-6 text-slate-500"
          >
            No complicated systems. Just the right teacher, the right pace,
            and classes your child actually enjoys.
          </motion.p>
        </div>

        {/* Main feature + benefits */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.45 }}
            className="relative min-h-[330px] overflow-hidden rounded-[2rem] bg-emerald-50 p-7 md:p-9"
          >
            {/* Simple decorative shape */}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[28px] border-white/70" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-emerald-100/70" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                </div>

                <div className="max-w-md">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                    We teach the child,
                    <br />
                    not just the subject.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
                    Every child learns differently. Our classes keep that
                    difference at the centre of the experience.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 text-sm font-bold text-emerald-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                Built around your child
              </div>
            </div>
          </motion.div>

          {/* Benefit list */}
          <div className="divide-y divide-slate-100 rounded-[2rem] border border-slate-100 bg-white px-5 shadow-[0_12px_40px_rgba(15,23,42,0.05)] md:px-7">
            {BENEFITS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="group flex gap-4 py-5"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-emerald-50">
                    <Icon className="h-4.5 w-4.5 text-slate-500 transition-colors group-hover:text-emerald-500" />
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Small bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-5 py-4"
        >
          <p className="text-sm font-semibold text-slate-700">
            One simple goal: make your child better at learning.
          </p>
          <span className="text-xs font-bold text-slate-400">THE PEARLX WAY</span>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPearlxSection;
export { WhyPearlxSection };

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, UserRoundCheck, GraduationCap, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: CalendarCheck,
    n: "01",
    title: "Book a free trial",
    text: "Tell us your child's age, interests and goals.",
    color: "#10B981",
  },
  {
    icon: UserRoundCheck,
    n: "02",
    title: "Find the right class",
    text: "We match the child to the right level and teacher.",
    color: "#0EA5E9",
  },
  {
    icon: GraduationCap,
    n: "03",
    title: "Learn & build",
    text: "Live sessions, practice and projects keep learning active.",
    color: "#7C3AED",
  },
  {
    icon: TrendingUp,
    n: "04",
    title: "See the progress",
    text: "Track understanding, confidence and the next milestone.",
    color: "#D97706",
  },
];

const ProcessSection = ({ openDemoModal }) => (
  <section id="how-it-works" className="bg-slate-50 py-20 sm:py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600 mb-3">
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] text-slate-950">
          Getting started is easy.
        </h2>
        <p className="mt-4 text-slate-500">
          No complicated onboarding. Just a simple first step.
        </p>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] border-t border-dashed border-slate-300" />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative z-10 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-7">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${step.color}15`, color: step.color }}
                >
                  <Icon size={21} />
                </div>
                <span className="text-xs font-black text-slate-300">{step.n}</span>
              </div>
              <h3 className="font-black text-lg text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{step.text}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 rounded-[1.75rem] bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-7 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h3 className="font-black text-xl text-white">Ready to see if Pearlx is right for your child?</h3>
          <p className="mt-1 text-sm text-slate-400">Try a class before you decide.</p>
        </div>
        <button
          onClick={() => openDemoModal("process")}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white hover:bg-emerald-400 transition"
        >
          Book free trial <ArrowRight size={17} />
        </button>
      </div>
    </div>
  </section>
);

export default ProcessSection;

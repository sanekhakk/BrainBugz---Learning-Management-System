// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import {
  BookOpen, User, Loader2, CheckCircle, XCircle, TrendingUp,
  Calendar, Clock, LogOut, Award, Target, Menu, X, Video, ArrowRight,
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { DARK as D } from "../utils/theme";
import { getDisplayTime } from "../utils/timeUtils";

// ── Helpers ──────────────────────────────────────────────────
const statusCfg = {
  upcoming: {
    border: D.borderMed, gradient: D.gradPrimary,
    badgeBg: D.indigoMuted, badgeColor: "#818CF8", label: "Upcoming",
    icon: Calendar,
  },
  completed: {
    border: `${D.green}35`, gradient: D.gradGreen,
    badgeBg: D.greenMuted, badgeColor: D.green, label: "Completed",
    icon: CheckCircle,
  },
  missed: {
    border: `${D.red}35`, gradient: D.gradRed,
    badgeBg: D.redMuted, badgeColor: D.red, label: "Missed",
    icon: XCircle,
  },
};

// ── Compact Stat Card ─────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, gradient }) => (
  <motion.div whileHover={{ scale: 1.04, y: -2 }}
    className="relative rounded-2xl p-4 border flex-shrink-0 min-w-[130px]"
    style={{ background: D.surface, borderColor: D.border, boxShadow: D.shadowSm }}>
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 rounded-lg" style={{ background: gradient || D.gradPrimary }}>
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
    </div>
    <div className="text-2xl font-bold mb-0.5" style={{ color: D.textPrimary }}>{value}</div>
    <div className="text-xs" style={{ color: D.textMuted }}>{label}</div>
  </motion.div>
);

// ── Class Card ────────────────────────────────────────────────
const ClassCard = ({ cls, type, permanentClassLink, timezone }) => {
  const cfg = statusCfg[type];
  const Icon = cfg.icon;
  const time = getDisplayTime(cls.classDate, cls.classTime, timezone);
  const date = cls.classDate
    ? new Date(cls.classDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "TBD";

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl p-5 border overflow-hidden"
      style={{ background: D.surface, borderColor: cfg.border, boxShadow: D.shadowSm }}
      whileHover={{ y: -3, boxShadow: D.shadowMd, transition: { duration: 0.2 } }}
    >
      {cls.isRescheduled && (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: D.amberMuted, color: D.amber, border: `1px solid ${D.amber}30` }}>
          RESCHEDULED
        </span>
      )}

      <div className="flex gap-4">
        {/* Time badge */}
        <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-white"
          style={{ background: cfg.gradient, boxShadow: `0 4px 16px rgba(0,0,0,0.35)` }}>
          <Clock className="w-4 h-4 mb-0.5 opacity-75" />
          <span className="text-base font-bold leading-tight">{time.split(":")[0]}</span>
          <span className="text-[11px] font-semibold opacity-80">
            :{time.split(":")[1]?.split(" ")[0] || "00"} {time.split(" ")[1] || ""}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-base truncate" style={{ color: D.textPrimary }}>{cls.subject}</h3>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 border"
              style={{ background: cfg.badgeBg, color: cfg.badgeColor, borderColor: `${cfg.badgeColor}30` }}>
              <Icon className="w-3 h-3" />{cfg.label}
            </span>
          </div>
          <p className="text-sm flex items-center gap-1.5 mb-1" style={{ color: D.textSecondary }}>
            <User className="w-3.5 h-3.5" />with {cls.tutorName}
          </p>
          <p className="text-sm flex items-center gap-1.5 mb-3" style={{ color: D.textMuted }}>
            <Calendar className="w-3.5 h-3.5" />{date}
          </p>

          {/* Summary */}
          {cls.summary && (type === "completed" || type === "missed") && (
            <div className="px-3 py-2 rounded-xl text-xs mb-3"
              style={{ background: cfg.badgeBg, color: cfg.badgeColor, border: `1px solid ${cfg.badgeColor}20` }}>
              {type === "completed" ? "📋 " : "⚠️ "}{cls.summary}
            </div>
          )}

          {/* Join button for upcoming */}
          {type === "upcoming" && permanentClassLink && (
            <motion.a href={permanentClassLink} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: D.gradPrimary, boxShadow: D.shadowGlow }}>
              <Video className="w-3.5 h-3.5" />Join Class <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ── Progress Card ─────────────────────────────────────────────
const ProgressCard = ({ assignment, progressData }) => {
  const data = progressData[assignment.subject] || { completedChapters: [] };
  const completed = data.completedChapters?.length || 0;

  return (
    <div className="p-5 rounded-2xl border" style={{ background: D.surface, borderColor: D.border }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm" style={{ color: D.textPrimary }}>{assignment.subject}</h3>
          <p className="text-xs mt-0.5" style={{ color: D.textMuted }}>with {assignment.tutorName}</p>
        </div>
        <span className="text-2xl font-bold" style={{ color: D.indigo }}>{completed}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {data.completedChapters?.map((ch, i) => (
          <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{ background: D.greenMuted, color: D.green, border: `1px solid ${D.green}25` }}>
            ✓ {ch}
          </span>
        ))}
        {completed === 0 && (
          <p className="text-xs" style={{ color: D.textMuted }}>No chapters completed yet</p>
        )}
      </div>
    </div>
  );
};

// ── Mobile Drawer ─────────────────────────────────────────────
const MobileDrawer = ({ isOpen, onClose, activeTab, setActiveTab, tabs }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
        <motion.div
          initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden border-r"
          style={{ background: D.surface, borderColor: D.border, boxShadow: D.shadowXl }}
        >
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: D.border }}>
            <span className="font-bold text-base" style={{ color: D.textPrimary }}>Menu</span>
            <button onClick={onClose} className="p-2 rounded-xl transition-colors"
              style={{ background: D.surfaceAlt }}>
              <X className="w-4 h-4" style={{ color: D.textSecondary }} />
            </button>
          </div>
          <div className="p-3 space-y-1">
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              return (
                <motion.button key={tab.id} whileTap={{ scale: 0.97 }}
                  onClick={() => { setActiveTab(tab.id); onClose(); }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: active ? D.indigoMuted : "transparent",
                    border: `1px solid ${active ? D.borderActive : "transparent"}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="w-4 h-4" style={{ color: active ? D.indigo : D.textMuted }} />
                    <span className="text-sm font-medium" style={{ color: active ? D.textPrimary : D.textSecondary }}>
                      {tab.label}
                    </span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: D.indigoMuted, color: D.indigo }}>
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ── Main ──────────────────────────────────────────────────────
export default function StudentDashboard() {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();

  const [studentProfile, setStudentProfile]   = useState(null);
  const [loadingProfile, setLoadingProfile]   = useState(true);
  const [upcomingClasses, setUpcoming]         = useState([]);
  const [completedClasses, setCompleted]       = useState([]);
  const [missedClasses, setMissed]             = useState([]);
  const [loadingClasses, setLoadingClasses]    = useState(true);
  const [progressData, setProgressData]        = useState({});
  const [activeTab, setActiveTab]              = useState("upcoming");
  const [drawerOpen, setDrawerOpen]            = useState(false);

  useEffect(() => {
    if (!userId) return;
    const unsub = onSnapshot(doc(db, "userSummaries", userId), snap => {
      if (snap.exists()) setStudentProfile({ uid: snap.id, ...snap.data() });
      setLoadingProfile(false);
    });
    return () => unsub();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setLoadingClasses(true);
    const q = query(collection(db, "classes"), where("studentId", "==", userId));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => new Date(a.classDate + " " + a.classTime) - new Date(b.classDate + " " + b.classTime));
      setUpcoming(arr.filter(c => c.status === "scheduled" || c.status === "pending"));
      setCompleted(arr.filter(c => c.status === "completed"));
      setMissed(arr.filter(c => c.status === "missed"));
      setLoadingClasses(false);
    });
    return () => unsub();
  }, [userId]);

  useEffect(() => {
    if (!userId || !studentProfile) return;
    const subjects = (studentProfile.assignments || []).map(a => a.subject);
    const unsubs = subjects.map(sub => {
      return onSnapshot(getProgressRef(userId, sub), snap => {
        setProgressData(prev => ({
          ...prev,
          [sub]: snap.exists() ? snap.data() : { completedChapters: [] },
        }));
      });
    });
    return () => unsubs.forEach(u => u());
  }, [userId, studentProfile]);

  const assignments = studentProfile?.assignments || [];
  const permanentClassLink = studentProfile?.permanentClassLink || "";
  const totalModules = Object.values(progressData).reduce((s, p) => s + (p.completedChapters?.length || 0), 0);

  const tabs = [
    { id: "upcoming",  label: "Upcoming",  icon: Calendar,  count: upcomingClasses.length },
    { id: "progress",  label: "Progress",  icon: TrendingUp },
    { id: "completed", label: "Completed", icon: CheckCircle, count: completedClasses.length },
    { id: "missed",    label: "Missed",    icon: XCircle,   count: missedClasses.length },
  ];

  return (
    <div className="min-h-screen pb-10" style={{ background: D.bg }}>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Header */}
      <div className="sticky top-0 z-30 border-b" style={{ background: `${D.surface}ee`, borderColor: D.border, backdropFilter: "blur(20px)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)}
              className="p-2 rounded-xl lg:hidden"
              style={{ background: D.surfaceAlt, border: `1px solid ${D.border}` }}>
              <Menu className="w-5 h-5" style={{ color: D.textSecondary }} />
            </button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg text-white"
              style={{ background: D.gradPrimary }}>
              {studentProfile?.name?.charAt(0) || "S"}
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: D.textPrimary }}>
                {studentProfile?.name || "Student"}
              </p>
              <p className="text-xs" style={{ color: D.textMuted }}>
                {studentProfile?.customId || "Loading..."}
              </p>
            </div>
          </div>
          <motion.button onClick={async () => { await logout(); navigate("/"); }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
            style={{ background: D.redMuted, border: `1px solid ${D.red}30`, color: D.red }}>
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        {loadingProfile ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin" style={{ color: D.indigo }} />
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="flex gap-3 overflow-x-auto pb-3 mb-7 scrollbar-hide">
              <StatCard icon={Calendar}  label="Upcoming"  value={upcomingClasses.length} gradient={D.gradPrimary} />
              <StatCard icon={Target}    label="Modules"   value={totalModules}           gradient={D.gradSecondary} />
              <StatCard icon={CheckCircle} label="Completed" value={completedClasses.length} gradient={D.gradGreen} />
              <StatCard icon={Award}     label="Subjects"  value={assignments.length}     gradient="linear-gradient(135deg,#8B5CF6,#7C3AED)" />
            </div>

            {/* Desktop tabs */}
            <div className="hidden lg:flex gap-2 mb-7">
              {tabs.map(tab => {
                const active = activeTab === tab.id;
                return (
                  <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all"
                    style={{
                      background: active ? D.indigoMuted : D.surface,
                      borderColor: active ? D.borderActive : D.border,
                      color: active ? D.textPrimary : D.textSecondary,
                      boxShadow: active ? D.shadowGlow : "none",
                    }}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: active ? D.indigo : D.surfaceAlt, color: active ? "#fff" : D.textMuted }}>
                        {tab.count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile section header */}
            <div className="flex items-center gap-3 mb-5 lg:hidden">
              {(() => { const t = tabs.find(x => x.id === activeTab); return t ? (
                <>
                  <div className="p-2 rounded-xl" style={{ background: D.gradPrimary }}>
                    <t.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-base" style={{ color: D.textPrimary }}>{t.label}</p>
                    {t.count !== undefined && <p className="text-xs" style={{ color: D.textMuted }}>{t.count} items</p>}
                  </div>
                </>
              ) : null; })()}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {activeTab === "upcoming" && (
                <motion.div key="upcoming" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-4">
                  {loadingClasses
                    ? <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: D.indigo }} /></div>
                    : upcomingClasses.length === 0
                      ? <Empty icon={Calendar} msg="No upcoming classes scheduled" />
                      : upcomingClasses.map(cls => (
                          <ClassCard key={cls.id} cls={cls} type="upcoming"
                            permanentClassLink={permanentClassLink} timezone={studentProfile?.timezone} />
                        ))
                  }
                </motion.div>
              )}

              {activeTab === "progress" && (
                <motion.div key="progress" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="grid gap-4 md:grid-cols-2">
                  {assignments.length === 0
                    ? <div className="col-span-2"><Empty icon={TrendingUp} msg="No progress data available" /></div>
                    : assignments.map((a, i) => <ProgressCard key={i} assignment={a} progressData={progressData} />)
                  }
                </motion.div>
              )}

              {activeTab === "completed" && (
                <motion.div key="completed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-4">
                  {completedClasses.length === 0
                    ? <Empty icon={CheckCircle} msg="No completed classes yet" />
                    : completedClasses.map(cls => (
                        <ClassCard key={cls.id} cls={cls} type="completed"
                          permanentClassLink={permanentClassLink} timezone={studentProfile?.timezone} />
                      ))
                  }
                </motion.div>
              )}

              {activeTab === "missed" && (
                <motion.div key="missed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-4">
                  {missedClasses.length === 0
                    ? <Empty icon={CheckCircle} msg="No missed classes — great work! 🎉" color={D.green} />
                    : missedClasses.map(cls => (
                        <ClassCard key={cls.id} cls={cls} type="missed"
                          permanentClassLink={permanentClassLink} timezone={studentProfile?.timezone} />
                      ))
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

const Empty = ({ icon: Icon, msg, color }) => (
  <div className="text-center py-20 rounded-2xl border" style={{ background: D.surface, borderColor: D.border }}>
    <Icon className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: color || D.textMuted }} />
    <p className="text-sm" style={{ color: D.textMuted }}>{msg}</p>
  </div>
);

const D_gradSecondary = "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)";
StudentDashboard.displayName = "StudentDashboard";
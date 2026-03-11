// src/pages/TutorDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import {
  Loader2, User, CheckCircle, XCircle, X, Trash2, Calendar, Clock,
  TrendingUp, LogOut, Users, AlertCircle, Video, ArrowRight, Menu, BookOpen,
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { DARK as D } from "../utils/theme";
import { getDisplayTime } from "../utils/timeUtils";

// ── Shared Empty State ────────────────────────────────────────
const Empty = ({ icon: Icon, msg }) => (
  <div className="text-center py-16 rounded-2xl border" style={{ background: D.surface, borderColor: D.border }}>
    <Icon className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: D.textMuted }} />
    <p className="text-sm" style={{ color: D.textMuted }}>{msg}</p>
  </div>
);

// ── Stat Card ─────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, gradient }) => (
  <motion.div whileHover={{ scale: 1.04, y: -2 }}
    className="rounded-2xl p-4 border flex-shrink-0 min-w-[130px]"
    style={{ background: D.surface, borderColor: D.border }}>
    <div className="flex items-center gap-2 mb-3">
      <div className="p-1.5 rounded-lg" style={{ background: gradient || D.gradPrimary }}>
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
    </div>
    <div className="text-2xl font-bold mb-0.5" style={{ color: D.textPrimary }}>{value}</div>
    <div className="text-xs" style={{ color: D.textMuted }}>{label}</div>
  </motion.div>
);

// ── Tab Button ────────────────────────────────────────────────
const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <motion.button onClick={onClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all whitespace-nowrap"
    style={{
      background: active ? D.indigoMuted : D.surface,
      borderColor: active ? D.borderActive : D.border,
      color: active ? D.textPrimary : D.textSecondary,
      boxShadow: active ? D.shadowGlow : "none",
    }}
  >
    <Icon className="w-4 h-4" />
    {label}
    {count !== undefined && (
      <span className="px-2 py-0.5 rounded-full text-xs font-bold"
        style={{ background: active ? D.indigo : D.surfaceAlt, color: active ? "#fff" : D.textMuted }}>
        {count}
      </span>
    )}
  </motion.button>
);

// ── Student Card ──────────────────────────────────────────────
const StudentCard = ({ student, openProgressModal }) => {
  const progress = student.progress || {};
  const totalDone = Object.values(progress).reduce((s, p) => s + (p.completedChapters?.length || 0), 0);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: D.shadowMd }}
      className="rounded-2xl border p-5 transition-all"
      style={{ background: D.surface, borderColor: D.border }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
          style={{ background: D.gradPrimary }}>
          {student.name?.charAt(0) || "S"}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: D.textPrimary }}>{student.name}</p>
          <p className="text-xs" style={{ color: D.textMuted }}>{student.customId} · Grade {student.classLevel}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-lg font-bold" style={{ color: D.indigo }}>{totalDone}</p>
          <p className="text-xs" style={{ color: D.textMuted }}>modules</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(student.assignments || []).map((a, i) => (
          <motion.button key={i} onClick={() => openProgressModal(student, a)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all"
            style={{ background: D.indigoMuted, color: D.indigo, borderColor: `${D.indigo}25` }}
            onMouseEnter={e => { e.currentTarget.style.background = D.indigo; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = D.indigoMuted; e.currentTarget.style.color = D.indigo; }}
          >
            {a.subject} →
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// ── Attendance Modal ──────────────────────────────────────────
const AttendanceModal = ({ classItem, onClose, markAttendance, timezone }) => {
  const [status, setStatus]   = useState("completed");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null);
    if (!summary.trim() && status === "completed") { setError("Class summary is required."); return; }
    setLoading(true);
    const res = await markAttendance(classItem.id, classItem.studentId, status, summary);
    setLoading(false);
    if (res.success) { alert(res.message); onClose(); }
    else setError(res.error);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background: D.surface, border: `1px solid ${D.borderMed}`, boxShadow: D.shadowXl }}
        onClick={e => e.stopPropagation()}>

        <div className="h-1 w-full" style={{ background: D.gradPrimary }} />
        <div className="p-7">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full transition-colors"
            style={{ background: D.surfaceAlt, color: D.textSecondary }}
            onMouseEnter={e => e.currentTarget.style.background = D.borderMed}
            onMouseLeave={e => e.currentTarget.style.background = D.surfaceAlt}>
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-xl font-bold mb-1" style={{ color: D.textPrimary }}>Mark Attendance</h3>
          <p className="text-sm mb-6" style={{ color: D.textMuted }}>
            <span style={{ color: D.cyan, fontWeight: 600 }}>{classItem.subject}</span> with{" "}
            <span style={{ color: D.textSecondary, fontWeight: 600 }}>{classItem.studentName}</span>
          </p>

          {error && (
            <div className="flex items-start gap-3 p-3.5 mb-5 rounded-2xl"
              style={{ background: D.redMuted, border: `1px solid ${D.red}30` }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: D.red }} />
              <p className="text-sm" style={{ color: D.red }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: D.textSecondary }}>Status</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "completed", label: "Present", icon: CheckCircle, color: D.green, bg: D.greenMuted },
                  { val: "missed",    label: "Absent",  icon: XCircle,    color: D.red,   bg: D.redMuted },
                ].map(opt => {
                  const active = status === opt.val;
                  return (
                    <motion.button key={opt.val} type="button" onClick={() => setStatus(opt.val)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-2 py-4 rounded-2xl border font-semibold text-sm transition-all"
                      style={{
                        background: active ? opt.bg : D.surfaceAlt,
                        borderColor: active ? `${opt.color}50` : D.border,
                        color: active ? opt.color : D.textMuted,
                        boxShadow: active ? `0 0 16px ${opt.color}20` : "none",
                      }}>
                      <opt.icon className="w-5 h-5" />{opt.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: D.textSecondary }}>
                {status === "completed" ? "Topics Covered" : "Reason (optional)"}
                {status === "completed" && <span style={{ color: D.red }}> *</span>}
              </label>
              <textarea
                value={summary} onChange={e => setSummary(e.target.value)} rows={4}
                placeholder={status === "completed" ? "Describe topics covered..." : "Optional reason..."}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={{ background: D.surfaceAlt, border: `1px solid ${D.border}`, color: D.textPrimary }}
                onFocus={e => e.currentTarget.style.borderColor = D.indigo}
                onBlur={e => e.currentTarget.style.borderColor = D.border}
              />
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: D.gradPrimary, boxShadow: D.shadowGlow }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Attendance"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Progress Update Modal ─────────────────────────────────────
const ProgressUpdateModal = ({ student, assignment, onClose, tutorUpdateChapterProgress, tutorDeleteChapterProgress }) => {
  const [chapter, setChapter]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [progress, setProgress] = useState({ completedChapters: [] });

  useEffect(() => {
    const ref = getProgressRef(student.uid, assignment.subject);
    const unsub = onSnapshot(ref, snap => {
      setProgress(snap.exists() ? snap.data() : { completedChapters: [] });
    });
    return () => unsub();
  }, [student.uid, assignment.subject]);

  const handleAdd = async (e) => {
    e.preventDefault(); if (!chapter.trim()) return;
    setLoading(true);
    const res = await tutorUpdateChapterProgress(student.uid, assignment.subject, chapter.trim());
    setLoading(false);
    if (res.success) setChapter("");
    else setError(res.error);
  };

  const handleDelete = async (ch) => {
    setLoading(true);
    await tutorDeleteChapterProgress(student.uid, assignment.subject, ch);
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background: D.surface, border: `1px solid ${D.borderMed}`, boxShadow: D.shadowXl }}
        onClick={e => e.stopPropagation()}>

        <div className="h-1 w-full" style={{ background: D.gradGreen }} />
        <div className="p-7">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full"
            style={{ background: D.surfaceAlt, color: D.textSecondary }}>
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-xl font-bold mb-1" style={{ color: D.textPrimary }}>Update Progress</h3>
          <p className="text-sm mb-6" style={{ color: D.textMuted }}>
            {assignment.subject} — <span style={{ color: D.textSecondary }}>{student.name}</span>
          </p>

          {error && (
            <div className="p-3.5 mb-5 rounded-2xl flex items-center gap-2"
              style={{ background: D.redMuted, border: `1px solid ${D.red}30` }}>
              <AlertCircle className="w-4 h-4" style={{ color: D.red }} />
              <p className="text-sm" style={{ color: D.red }}>{error}</p>
            </div>
          )}

          {/* Add chapter */}
          <form onSubmit={handleAdd} className="flex gap-2 mb-6">
            <input value={chapter} onChange={e => setChapter(e.target.value)}
              placeholder="Chapter or topic name"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{ background: D.surfaceAlt, border: `1px solid ${D.border}`, color: D.textPrimary }}
              onFocus={e => e.currentTarget.style.borderColor = D.green}
              onBlur={e => e.currentTarget.style.borderColor = D.border}
            />
            <motion.button type="submit" disabled={loading || !chapter.trim()}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 rounded-xl font-semibold text-white text-sm disabled:opacity-40"
              style={{ background: D.gradGreen }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "+ Add"}
            </motion.button>
          </form>

          {/* Chapters list */}
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {(progress.completedChapters || []).length === 0
              ? <p className="text-sm text-center py-8" style={{ color: D.textMuted }}>No chapters added yet</p>
              : (progress.completedChapters || []).map((ch, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5 rounded-xl border"
                    style={{ background: D.surfaceAlt, borderColor: D.border }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" style={{ color: D.green }} />
                      <span className="text-sm" style={{ color: D.textPrimary }}>{ch}</span>
                    </div>
                    <motion.button onClick={() => handleDelete(ch)} disabled={loading}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ background: D.redMuted }}>
                      <Trash2 className="w-3.5 h-3.5" style={{ color: D.red }} />
                    </motion.button>
                  </div>
                ))
            }
          </div>
        </div>
      </motion.div>
    </motion.div>
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
            <span className="font-bold" style={{ color: D.textPrimary }}>Menu</span>
            <button onClick={onClose} className="p-2 rounded-xl" style={{ background: D.surfaceAlt }}>
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
                      style={{ background: D.indigoMuted, color: D.indigo }}>{tab.count}</span>
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
export default function TutorDashboard() {
  const { userId, logout, tutorMarkAttendance, tutorUpdateChapterProgress, tutorDeleteChapterProgress } = useAuth();

  const [tutorData, setTutorData]           = useState(null);
  const [myStudents, setMyStudents]         = useState([]);
  const [studentsProgress, setStudentsProgress] = useState({});
  const [classes, setClasses]               = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [activeTab, setActiveTab]           = useState("students");
  const [drawerOpen, setDrawerOpen]         = useState(false);
  const [showAttendanceModal, setShowAttendance] = useState(false);
  const [showProgressModal, setShowProgress]     = useState(false);
  const [selectedClassToMark, setSelClass]       = useState(null);
  const [selectedProgressToUpdate, setSelProgress] = useState(null);

  // Fetch tutor profile
  useEffect(() => {
    if (!userId) return;
    const unsub = onSnapshot(doc(db, "userSummaries", userId), snap => {
      if (snap.exists()) setTutorData({ uid: snap.id, ...snap.data() });
    });
    return () => unsub();
  }, [userId]);

  // Fetch students
  useEffect(() => {
    if (!userId) return;
    setLoadingStudents(true);
    const q = query(collection(db, "userSummaries"), where("role", "==", "student"));
    const unsub = onSnapshot(q, snap => {
      const all = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
      const mine = all.filter(s => (s.assignments || []).some(a => a.tutorId === userId));
      setMyStudents(mine);
      setLoadingStudents(false);
    });
    return () => unsub();
  }, [userId]);

  // Fetch classes for tutor
  useEffect(() => {
    if (!userId) return;
    setLoadingClasses(true);
    const q = query(collection(db, "classes"), where("tutorId", "==", userId));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => new Date(a.classDate + " " + a.classTime) - new Date(b.classDate + " " + b.classTime));
      setClasses(arr);
      setLoadingClasses(false);
    });
    return () => unsub();
  }, [userId]);

  // Fetch progress for each student
  useEffect(() => {
    const unsubs = myStudents.flatMap(student =>
      (student.assignments || []).map(a => {
        const ref = getProgressRef(student.uid, a.subject);
        return onSnapshot(ref, snap => {
          setStudentsProgress(prev => ({
            ...prev,
            [student.uid]: {
              ...(prev[student.uid] || {}),
              [a.subject]: snap.exists() ? snap.data() : { completedChapters: [] },
            },
          }));
        });
      })
    );
    return () => unsubs.forEach(u => u());
  }, [myStudents]);

  const studentsWithProgress = myStudents.map(s => ({ ...s, progress: studentsProgress[s.uid] || {} }));
  const studentLinkMap = studentsWithProgress.reduce((acc, s) => { acc[s.uid] = s.permanentClassLink || null; return acc; }, {});

  const activeClasses    = classes.filter(c => c.status === "scheduled" || c.status === "pending");
  const completedClasses = classes.filter(c => c.status === "completed");
  const missedClasses    = classes.filter(c => c.status === "missed");

  const isClassDue = (cls) => {
    const d = new Date(`${cls.classDate}T${cls.classTime}:00+05:30`);
    return !isNaN(d.getTime()) && new Date() > d;
  };

  const tabs = [
    { id: "students",      label: "Students",       icon: Users,    count: studentsWithProgress.length },
    { id: "activeClasses", label: "Active Classes", icon: Calendar, count: activeClasses.length },
    { id: "history",       label: "History",        icon: Clock,    count: completedClasses.length + missedClasses.length },
  ];
  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen pb-10" style={{ background: D.bg }}>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Header */}
      <div className="sticky top-0 z-30 border-b" style={{ background: `${D.surface}ee`, borderColor: D.border, backdropFilter: "blur(20px)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-xl lg:hidden"
              style={{ background: D.surfaceAlt, border: `1px solid ${D.border}` }}>
              <Menu className="w-5 h-5" style={{ color: D.textSecondary }} />
            </button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: D.gradPrimary }}>
              {tutorData?.name?.charAt(0) || "T"}
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: D.textPrimary }}>{tutorData?.name || "Tutor"}</p>
              <p className="text-xs" style={{ color: D.textMuted }}>{tutorData?.customId || "Loading..."}</p>
            </div>
          </div>
          <motion.button onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
            style={{ background: D.redMuted, border: `1px solid ${D.red}30`, color: D.red }}>
            <LogOut className="w-4 h-4" /><span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-7">
        {/* Stats */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-7 scrollbar-hide">
          <StatCard icon={Users}       label="My Students"    value={studentsWithProgress.length} gradient={D.gradPrimary} />
          <StatCard icon={Calendar}    label="Active Classes" value={activeClasses.length}         gradient={D.gradSecondary} />
          <StatCard icon={CheckCircle} label="Completed"      value={completedClasses.length}       gradient={D.gradGreen} />
        </div>

        {/* Desktop tabs */}
        <div className="hidden lg:flex gap-2 mb-7">
          {tabs.map(tab => <TabButton key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}
            icon={tab.icon} label={tab.label} count={tab.count} />)}
        </div>

        {/* Mobile section header */}
        <div className="flex items-center gap-3 mb-5 lg:hidden">
          {currentTab && (
            <>
              <div className="p-2 rounded-xl" style={{ background: D.gradPrimary }}>
                <currentTab.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-base" style={{ color: D.textPrimary }}>{currentTab.label}</p>
                {currentTab.count !== undefined && <p className="text-xs" style={{ color: D.textMuted }}>{currentTab.count} items</p>}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "students" && (
            <motion.div key="students" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {loadingStudents
                ? <div className="col-span-3 flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: D.indigo }} /></div>
                : studentsWithProgress.length === 0
                  ? <div className="col-span-3"><Empty icon={Users} msg="No students assigned yet" /></div>
                  : studentsWithProgress.map(s => (
                      <StudentCard key={s.uid} student={s}
                        openProgressModal={(st, a) => { setSelProgress({ student: st, assignment: a }); setShowProgress(true); }} />
                    ))
              }
            </motion.div>
          )}

          {activeTab === "activeClasses" && (
            <motion.div key="active" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-4">
              {loadingClasses
                ? <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin" style={{ color: D.indigo }} /></div>
                : activeClasses.length === 0
                  ? <Empty icon={Calendar} msg="No active classes" />
                  : activeClasses.map(cls => {
                      const due = isClassDue(cls);
                      const time = getDisplayTime(cls.classDate, cls.classTime, tutorData?.timezone);
                      const date = cls.classDate
                        ? new Date(cls.classDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                        : "TBD";
                      const classLink = studentLinkMap[cls.studentId] || "";

                      return (
                        <motion.div key={cls.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -3 }}
                          className="relative rounded-2xl border p-5 overflow-hidden"
                          style={{ background: D.surface, borderColor: due ? `${D.red}40` : D.border, boxShadow: due ? `0 0 20px ${D.red}10` : "none" }}>

                          {due && (
                            <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                              style={{ background: D.redMuted, color: D.red, border: `1px solid ${D.red}30` }}>
                              <AlertCircle className="w-3 h-3" /> ATTENDANCE DUE
                            </span>
                          )}
                          {cls.isRescheduled && !due && (
                            <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
                              style={{ background: D.amberMuted, color: D.amber, border: `1px solid ${D.amber}30` }}>
                              RESCHEDULED
                            </span>
                          )}

                          <div className="flex gap-4">
                            {/* Time block */}
                            <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-white"
                              style={{ background: D.gradPrimary }}>
                              <Clock className="w-4 h-4 mb-0.5 opacity-70" />
                              <span className="text-base font-bold">{time.split(":")[0]}</span>
                              <span className="text-[11px] opacity-80">:{time.split(":")[1]?.substring(0, 2) || "00"} {time.includes("AM") ? "AM" : "PM"}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base mb-1 truncate" style={{ color: D.textPrimary }}>{cls.subject}</h3>
                              <p className="text-sm flex items-center gap-1.5 mb-1" style={{ color: D.textSecondary }}>
                                <User className="w-3.5 h-3.5" />
                                Student: <span style={{ color: D.cyan }}>{cls.studentName}</span>
                              </p>
                              <p className="text-sm flex items-center gap-1.5 mb-4" style={{ color: D.textMuted }}>
                                <Calendar className="w-3.5 h-3.5" />{date}
                              </p>

                              <div className="flex flex-col sm:flex-row gap-2">
                                {classLink ? (
                                  <motion.a href={classLink} target="_blank" rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                                    style={{ background: D.gradPrimary }}>
                                    <Video className="w-4 h-4" />Join Class <ArrowRight className="w-3.5 h-3.5" />
                                  </motion.a>
                                ) : (
                                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border"
                                    style={{ color: D.red, background: D.redMuted, borderColor: `${D.red}30` }}>
                                    No Link Available
                                  </div>
                                )}
                                <motion.button
                                  onClick={() => { setSelClass(cls); setShowAttendance(true); }}
                                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all"
                                  style={{ borderColor: D.border, background: D.surfaceAlt, color: D.textSecondary }}
                                  onMouseEnter={e => { e.currentTarget.style.background = D.indigoMuted; e.currentTarget.style.color = D.indigo; e.currentTarget.style.borderColor = D.borderActive; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = D.surfaceAlt; e.currentTarget.style.color = D.textSecondary; e.currentTarget.style.borderColor = D.border; }}
                                >
                                  Mark Attendance
                                </motion.button>
                              </div>

                              {cls.isRescheduled && cls.originalClassDate && (
                                <p className="text-xs mt-2" style={{ color: D.textMuted }}>Originally: {cls.originalClassDate}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
              }
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-6">
              {/* Completed */}
              <div>
                <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: D.textPrimary }}>
                  <CheckCircle className="w-4 h-4" style={{ color: D.green }} />
                  Completed ({completedClasses.length})
                </h3>
                <div className="space-y-3">
                  {completedClasses.length === 0 ? <p className="text-sm py-8 text-center" style={{ color: D.textMuted }}>No completed classes</p>
                    : completedClasses.map(cls => (
                        <motion.div key={cls.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="p-4 rounded-2xl border"
                          style={{ background: D.surface, borderColor: `${D.green}25` }}>
                          <p className="text-xs mb-0.5" style={{ color: D.textMuted }}>{cls.studentName}</p>
                          <p className="font-semibold text-sm mb-0.5" style={{ color: D.textPrimary }}>{cls.subject}</p>
                          <p className="text-xs mb-2" style={{ color: D.textMuted }}>{cls.classDate}</p>
                          {cls.summary && (
                            <p className="text-xs px-3 py-2 rounded-xl"
                              style={{ background: D.greenMuted, color: D.green }}>{cls.summary}</p>
                          )}
                        </motion.div>
                      ))
                  }
                </div>
              </div>

              {/* Missed */}
              <div>
                <h3 className="font-bold text-base mb-4 flex items-center gap-2" style={{ color: D.textPrimary }}>
                  <XCircle className="w-4 h-4" style={{ color: D.red }} />
                  Missed ({missedClasses.length})
                </h3>
                <div className="space-y-3">
                  {missedClasses.length === 0 ? <p className="text-sm py-8 text-center" style={{ color: D.textMuted }}>No missed classes</p>
                    : missedClasses.map(cls => (
                        <motion.div key={cls.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="p-4 rounded-2xl border"
                          style={{ background: D.surface, borderColor: `${D.red}25` }}>
                          <p className="text-xs mb-0.5" style={{ color: D.textMuted }}>{cls.studentName}</p>
                          <p className="font-semibold text-sm mb-0.5" style={{ color: D.textPrimary }}>{cls.subject}</p>
                          <p className="text-xs mb-2" style={{ color: D.textMuted }}>{cls.classDate}</p>
                          {cls.summary && (
                            <p className="text-xs px-3 py-2 rounded-xl"
                              style={{ background: D.redMuted, color: D.red }}>{cls.summary}</p>
                          )}
                        </motion.div>
                      ))
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAttendanceModal && selectedClassToMark && (
          <AttendanceModal classItem={selectedClassToMark} timezone={tutorData?.timezone}
            onClose={() => { setShowAttendance(false); setSelClass(null); }}
            markAttendance={tutorMarkAttendance} />
        )}
        {showProgressModal && selectedProgressToUpdate && (
          <ProgressUpdateModal
            student={selectedProgressToUpdate.student}
            assignment={selectedProgressToUpdate.assignment}
            onClose={() => { setShowProgress(false); setSelProgress(null); }}
            tutorUpdateChapterProgress={tutorUpdateChapterProgress}
            tutorDeleteChapterProgress={tutorDeleteChapterProgress}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
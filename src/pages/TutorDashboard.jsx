// src/pages/TutorDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import {
  Loader2, User, CheckCircle, XCircle, X, Trash2, Calendar, Clock,
  TrendingUp, LogOut, Users, AlertCircle, Video, ArrowRight, Menu,
  Home, BarChart2, Bell, Award, Phone,
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { getDisplayTime } from "../utils/timeUtils";
import PearlxLogo from "../assets/flat_logo.webp";

const C = {
  bg: "#F4F6FB",
  sidebar: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E5E9F2",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  emerald: "#10B981",
  emeraldLight: "#ECFDF5",
  emeraldDark: "#059669",
  cyan: "#0EA5E9",
  cyanLight: "#E0F2FE",
  indigo: "#6366F1",
  indigoLight: "#EEF2FF",
  red: "#EF4444",
  redLight: "#FEF2F2",
  amber: "#F59E0B",
  amberLight: "#FFFBEB",
  violet: "#8B5CF6",
  violetLight: "#F5F3FF",
  gradPrimary: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)",
  gradEmerald: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  gradIndigo: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
  gradRed: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
  gradAmber: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  shadowCard: "0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
  shadowHover: "0 8px 24px rgba(15,23,42,0.1)",
  shadowModal: "0 24px 64px rgba(15,23,42,0.18)",
};

const isClassDue = (cls) => {
  if (!cls.classDate || !cls.classTime) return false;
  if (cls.status !== "scheduled" && cls.status !== "pending") return false;
  return new Date(`${cls.classDate}T${cls.classTime}:00+05:30`) < new Date();
};

const Empty = ({ icon: Icon, msg, color }) => (
  <div style={{ textAlign: "center", padding: "40px 20px", borderRadius: 16, background: C.bg, border: `1px solid ${C.border}` }}>
    <div style={{ width: 52, height: 52, borderRadius: 14, background: color ? `${color}15` : "#F0F2F8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
      <Icon style={{ width: 24, height: 24, color: color || C.textMuted, opacity: 0.5 }} />
    </div>
    <p style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>{msg}</p>
  </div>
);

const StatCard = ({ icon: Icon, label, value, light, iconColor, onClick, badge }) => (
  <motion.div whileHover={{ y: -2, boxShadow: C.shadowHover }} onClick={onClick}
    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", boxShadow: C.shadowCard, cursor: onClick ? "pointer" : "default", position: "relative", overflow: "hidden", transition: "box-shadow 0.2s" }}>
    {badge && <div style={{ position: "absolute", top: 12, right: 12, background: C.red, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>{badge}</div>}
    <div style={{ width: 40, height: 40, borderRadius: 12, background: light, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
      <Icon style={{ width: 20, height: 20, color: iconColor }} />
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: C.textPrimary, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 500, marginTop: 4 }}>{label}</div>
  </motion.div>
);

const SideNavItem = ({ tab, active, onClick }) => (
  <motion.button onClick={onClick} whileTap={{ scale: 0.97 }}
    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, border: `1px solid ${active ? C.emerald + "30" : "transparent"}`, background: active ? C.emeraldLight : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
    <div style={{ width: 34, height: 34, borderRadius: 10, background: active ? C.emerald : C.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <tab.icon style={{ width: 16, height: 16, color: active ? "#fff" : C.textMuted }} />
    </div>
    <span style={{ fontSize: 13, fontWeight: 600, color: active ? C.textPrimary : C.textSecondary, flex: 1, textAlign: "left" }}>{tab.label}</span>
    {tab.count !== undefined && (
      <span style={{ background: active ? C.emerald : C.border, color: active ? "#fff" : C.textMuted, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{tab.count}</span>
    )}
  </motion.button>
);

const AttendanceModal = ({ classItem, onClose, markAttendance }) => {
  const [status, setStatus] = useState("completed");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null);
    if (!summary.trim() && status === "completed") { setError("Class summary is required."); return; }
    setLoading(true);
    const res = await markAttendance(classItem.id, classItem.studentId, status, summary);
    setLoading(false);
    if (res.success) { setSuccess(res.message); setTimeout(onClose, 1500); } else setError(res.error);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(15,23,42,0.45)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 16 }}
        style={{ background: C.card, borderRadius: 24, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: C.shadowModal, position: "relative" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ height: 4, background: C.gradPrimary }} />
        <div style={{ padding: 28 }}>
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: C.bg, border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X style={{ width: 16, height: 16, color: C.textMuted }} />
          </button>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.textPrimary, marginBottom: 4 }}>Mark Attendance</h3>
          <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>
            <span style={{ color: C.emerald, fontWeight: 700 }}>{classItem.subject}</span> · {classItem.studentName}
          </p>
          {error && <div style={{ background: C.redLight, borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.red, display: "flex", gap: 8, alignItems: "center" }}><AlertCircle style={{ width: 15, height: 15 }} />{error}</div>}
          {success && <div style={{ background: C.emeraldLight, borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.emerald, fontWeight: 600 }}>✓ {success}</div>}
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.textSecondary, marginBottom: 10 }}>Status</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              {[{ val: "completed", label: "Present ✓", color: C.emerald, bg: C.emeraldLight }, { val: "missed", label: "Absent ✗", color: C.red, bg: C.redLight }].map(opt => {
                const active = status === opt.val;
                return <button key={opt.val} type="button" onClick={() => setStatus(opt.val)}
                  style={{ padding: "14px 10px", borderRadius: 14, border: `2px solid ${active ? opt.color : C.border}`, background: active ? opt.bg : C.bg, color: active ? opt.color : C.textMuted, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: active ? `0 0 0 3px ${opt.color}15` : "none" }}>
                  {opt.label}
                </button>;
              })}
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textSecondary, display: "block", marginBottom: 8 }}>{status === "completed" ? "Topics Covered *" : "Reason (optional)"}</label>
            <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4}
              placeholder={status === "completed" ? "Describe what was taught today..." : "Optional reason for absence..."}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, fontSize: 13, color: C.textPrimary, resize: "none", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              onFocus={e => { e.target.style.borderColor = C.emerald; }} onBlur={e => { e.target.style.borderColor = C.border; }} />
            <button type="submit" disabled={loading}
              style={{ width: "100%", marginTop: 16, padding: 14, borderRadius: 14, border: "none", background: C.gradPrimary, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? <Loader2 style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} /> : "Submit Attendance"}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProgressUpdateModal = ({ student, assignment, onClose, tutorUpdateChapterProgress, tutorDeleteChapterProgress }) => {
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ completedChapters: [] });

  useEffect(() => {
    const unsub = onSnapshot(getProgressRef(student.uid, assignment.subject), snap => {
      setProgress(snap.exists() ? snap.data() : { completedChapters: [] });
    });
    return () => unsub();
  }, [student.uid, assignment.subject]);

  const handleAdd = async (e) => {
    e.preventDefault(); if (!chapter.trim()) return;
    setLoading(true);
    const res = await tutorUpdateChapterProgress(student.uid, assignment.subject, chapter.trim());
    setLoading(false);
    if (res.success) setChapter(""); else setError(res.error);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(15,23,42,0.45)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }}
        style={{ background: C.card, borderRadius: 24, width: "100%", maxWidth: 460, overflow: "hidden", boxShadow: C.shadowModal, position: "relative" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ height: 4, background: C.gradEmerald }} />
        <div style={{ padding: 28 }}>
          <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: C.bg, border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X style={{ width: 16, height: 16, color: C.textMuted }} />
          </button>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.textPrimary, marginBottom: 4 }}>Update Progress</h3>
          <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}><span style={{ color: C.emerald, fontWeight: 700 }}>{assignment.subject}</span> — {student.name}</p>
          {error && <div style={{ background: C.redLight, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.red }}>{error}</div>}
          <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input value={chapter} onChange={e => setChapter(e.target.value)} placeholder="Chapter or topic name"
              style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, fontSize: 13, color: C.textPrimary, outline: "none", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            <button type="submit" disabled={!chapter.trim()}
              style={{ padding: "10px 18px", borderRadius: 12, border: "none", background: C.gradEmerald, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", opacity: !chapter.trim() ? 0.4 : 1 }}>+ Add</button>
          </form>
          <div style={{ maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {(progress.completedChapters || []).length === 0
              ? <p style={{ textAlign: "center", padding: "24px 0", fontSize: 13, color: C.textMuted }}>No chapters added yet</p>
              : (progress.completedChapters || []).map((ch, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle style={{ width: 15, height: 15, color: C.emerald }} />
                    <span style={{ fontSize: 13, color: C.textPrimary }}>{ch}</span>
                  </div>
                  <button onClick={() => tutorDeleteChapterProgress(student.uid, assignment.subject, ch)}
                    style={{ background: C.redLight, border: "none", borderRadius: 8, padding: "5px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <Trash2 style={{ width: 14, height: 14, color: C.red }} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ClassCard = ({ cls, onMark, studentLinkMap, timezone }) => {
  const due = isClassDue(cls);
  const time = getDisplayTime(cls.classDate, cls.classTime, timezone);
  const date = cls.classDate ? new Date(cls.classDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "TBD";
  const classLink = studentLinkMap[cls.studentId] || "";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: C.shadowHover }}
      style={{ background: C.card, border: `1px solid ${due ? C.red + "50" : C.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: C.shadowCard, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 12, bottom: 12, width: 3, borderRadius: "0 4px 4px 0", background: due ? C.gradRed : C.gradPrimary }} />
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingLeft: 12 }}>
        <div style={{ width: 58, height: 58, borderRadius: 16, background: due ? C.gradRed : C.gradIndigo, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
          <Clock style={{ width: 14, height: 14, opacity: 0.8, marginBottom: 2 }} />
          <span style={{ fontSize: 13, fontWeight: 800 }}>{time.split(" ")[0]}</span>
          <span style={{ fontSize: 10, opacity: 0.8 }}>{time.split(" ")[1] || ""}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary }}>{cls.subject}</span>
            {due && <span style={{ background: C.red, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 20 }}>ATTENDANCE DUE</span>}
            {cls.isRescheduled && !due && <span style={{ background: C.amberLight, color: C.amber, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>RESCHEDULED</span>}
          </div>
          <p style={{ fontSize: 13, color: C.cyan, fontWeight: 600, marginBottom: 2 }}>{cls.studentName}</p>
          <p style={{ fontSize: 12, color: C.textMuted }}>{date}</p>
          {/* Action buttons inline on mobile for better layout */}
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            {classLink ? (
              <a href={classLink} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: C.gradPrimary, color: "#fff", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>
                <Video style={{ width: 14, height: 14 }} /> Join
              </a>
            ) : (
              <span style={{ padding: "8px 12px", borderRadius: 10, background: C.redLight, color: C.red, fontSize: 12, fontWeight: 600 }}>No Link</span>
            )}
            <button onClick={() => onMark(cls)}
              style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg, color: C.indigo, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.indigoLight; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.bg; }}>
              Mark Attendance
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TutorDashboard() {
  const { userId, logout, tutorMarkAttendance, tutorUpdateChapterProgress, tutorDeleteChapterProgress } = useAuth();

  const [tutorData, setTutorData]           = useState(null);
  const [students, setStudents]             = useState([]);
  const [studentsWP, setStudentsWP]         = useState([]);
  const [activeClasses, setActiveClasses]   = useState([]);
  const [completedClasses, setCompleted]    = useState([]);
  const [missedClasses, setMissed]          = useState([]);
  const [studentLinkMap, setLinkMap]        = useState({});
  const [loadingStudents, setLS]            = useState(true);
  const [loadingClasses, setLC]             = useState(true);
  const [activeTab, setActiveTab]           = useState("overview");
  const [showAttendance, setShowAttendance] = useState(false);
  const [selClass, setSelClass]             = useState(null);
  const [showProgress, setShowProgress]     = useState(false);
  const [selProgress, setSelProgress]       = useState(null);
  const [isMobile, setIsMobile]             = useState(false);
  const [sidebarOpen, setSidebarOpen]       = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!userId) return;
    return onSnapshot(doc(db, "userSummaries", userId), snap => {
      if (snap.exists()) setTutorData({ uid: snap.id, ...snap.data() });
    });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setLS(true);
    return onSnapshot(query(collection(db, "userSummaries"), where("role", "==", "student")), snap => {
      const mine = snap.docs.map(d => ({ uid: d.id, ...d.data() })).filter(s => (s.assignments || []).some(a => a.tutorId === userId));
      setStudents(mine);
      const map = {}; mine.forEach(s => { if (s.permanentClassLink) map[s.uid] = s.permanentClassLink; });
      setLinkMap(map); setLS(false);
    });
  }, [userId]);

  useEffect(() => {
    if (!students.length) { setStudentsWP([]); return; }
    const unsubs = {}; const prog = {};
    students.forEach(st => {
      prog[st.uid] = {};
      (st.assignments || []).forEach(a => {
        unsubs[`${st.uid}_${a.subject}`] = onSnapshot(getProgressRef(st.uid, a.subject), snap => {
          prog[st.uid][a.subject] = snap.exists() ? snap.data() : { completedChapters: [] };
          setStudentsWP(students.map(s => ({ ...s, progress: { ...(prog[s.uid] || {}) } })));
        });
      });
    });
    return () => Object.values(unsubs).forEach(u => u());
  }, [students]);

  useEffect(() => {
    if (!userId) return;
    setLC(true);
    return onSnapshot(query(collection(db, "classes"), where("tutorId", "==", userId)), snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => new Date(a.classDate + " " + a.classTime) - new Date(b.classDate + " " + b.classTime));
      setActiveClasses(arr.filter(c => c.status === "scheduled" || c.status === "pending"));
      setCompleted(arr.filter(c => c.status === "completed"));
      setMissed(arr.filter(c => c.status === "missed"));
      setLC(false);
    });
  }, [userId]);

  const dueCount = activeClasses.filter(isClassDue).length;
  const totalModules = studentsWP.reduce((s, st) => s + Object.values(st.progress || {}).reduce((s2, p) => s2 + (p.completedChapters?.length || 0), 0), 0);

  const tabs = [
    { id: "overview",       label: "Overview",         icon: Home },
    { id: "students",       label: "My Students",      icon: Users,      count: students.length },
    { id: "activeClasses",  label: "Active Classes",   icon: Calendar,   count: activeClasses.length },
    { id: "history",        label: "Class History",    icon: BarChart2 },
    { id: "progress",       label: "Progress Tracker", icon: TrendingUp },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src={PearlxLogo} alt="Pearlx" style={{ height: 40, width: "auto", objectFit: "contain" }} />
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)} style={{ background: C.bg, border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X style={{ width: 16, height: 16, color: C.textMuted }} />
          </button>
        )}
      </div>

      <div style={{ padding: "16px 14px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: C.gradEmerald, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 17, flexShrink: 0 }}>
            {tutorData?.name?.charAt(0) || "T"}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tutorData?.name || "Tutor"}</p>
            <p style={{ fontSize: 12, color: C.textMuted }}>Tutor</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ padding: "9px 6px", borderRadius: 10, background: C.emeraldLight, textAlign: "center" }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: C.emerald }}>{students.length}</p>
            <p style={{ fontSize: 11, color: C.textMuted }}>Students</p>
          </div>
          <div style={{ padding: "9px 6px", borderRadius: 10, background: dueCount > 0 ? C.redLight : C.indigoLight, textAlign: "center" }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: dueCount > 0 ? C.red : C.indigo }}>{dueCount}</p>
            <p style={{ fontSize: 11, color: C.textMuted }}>Due</p>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "10px 10px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 6px 8px" }}>MAIN MENU</p>
        {tabs.map(tab => <SideNavItem key={tab.id} tab={tab} active={activeTab === tab.id} onClick={() => handleTabChange(tab.id)} />)}
      </nav>

      <div style={{ padding: "12px 10px", borderTop: `1px solid ${C.border}` }}>
        <motion.button onClick={logout} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 12, border: `1px solid ${C.red}20`, background: C.redLight, color: C.red, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <LogOut style={{ width: 16, height: 16 }} /> Logout
        </motion.button>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── MOBILE BACKDROP ── */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 999, backdropFilter: "blur(4px)" }} />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <motion.div
        initial={false}
        animate={isMobile ? { x: sidebarOpen ? 0 : -280 } : { x: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        style={{
          width: 256, minWidth: 256, height: "100vh",
          background: C.sidebar, borderRight: `1px solid ${C.border}`,
          display: "flex", flexDirection: "column", flexShrink: 0,
          position: isMobile ? "fixed" : "relative",
          zIndex: isMobile ? 1000 : "auto",
          top: 0, left: 0,
        }}>
        <SidebarContent />
      </motion.div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ height: 62, background: "rgba(244,246,251,0.96)", borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0, gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                <Menu style={{ width: 18, height: 18, color: C.textPrimary }} />
              </button>
            )}
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 800, color: C.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tabs.find(t => t.id === activeTab)?.label}</h1>
              <p style={{ fontSize: 12, color: C.textMuted }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {dueCount > 0 && (
              <motion.button initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={() => handleTabChange("activeClasses")}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: isMobile ? "7px 10px" : "7px 14px", borderRadius: 20, background: C.redLight, border: `1px solid ${C.red}25`, color: C.red, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                <Bell style={{ width: 14, height: 14 }} />
                {!isMobile && `${dueCount} attendance${dueCount > 1 ? "s" : ""} due`}
                {isMobile && <span style={{ fontSize: 11, fontWeight: 800 }}>{dueCount}</span>}
              </motion.button>
            )}
            <div style={{ width: 36, height: 36, borderRadius: 11, background: C.gradEmerald, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>
              {tutorData?.name?.charAt(0) || "T"}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? 16 : 24 }}>
          <AnimatePresence mode="wait">

            {activeTab === "overview" && (
              <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {/* Banner */}
                <div style={{ borderRadius: 20, padding: isMobile ? "20px 20px" : "24px 28px", marginBottom: 24, background: C.gradEmerald, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", right: -20, top: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
                  <div style={{ position: "absolute", right: 30, bottom: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Hello, {tutorData?.name?.split(" ")[0] || "Tutor"}! 🎓</h2>
                    <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(255,255,255,0.85)" }}>
                      {activeClasses.length} active {activeClasses.length === 1 ? "class" : "classes"} · {students.length} {students.length === 1 ? "student" : "students"} assigned
                      {dueCount > 0 && <span style={{ color: "#FDE68A", fontWeight: 700 }}> · ⚠️ {dueCount} attendance{dueCount > 1 ? "s" : ""} pending!</span>}
                    </p>
                    {dueCount > 0 && (
                      <button onClick={() => handleTabChange("activeClasses")}
                        style={{ marginTop: 12, padding: "9px 18px", borderRadius: 12, border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                        Mark Attendance Now →
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary stats — 4 col desktop, 2 col mobile */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 10 : 14, marginBottom: 14 }}>
                  <StatCard icon={Users} label="My Students" value={students.length} light={C.emeraldLight} iconColor={C.emerald} onClick={() => handleTabChange("students")} />
                  <StatCard icon={Calendar} label="Active Classes" value={activeClasses.length} light={C.indigoLight} iconColor={C.indigo} onClick={() => handleTabChange("activeClasses")} />
                  <StatCard icon={CheckCircle} label="Completed" value={completedClasses.length} light={C.emeraldLight} iconColor={C.emeraldDark} />
                  <StatCard icon={AlertCircle} label="Attendance Due" value={dueCount} light={dueCount > 0 ? C.redLight : C.bg} iconColor={dueCount > 0 ? C.red : C.textMuted} badge={dueCount > 0 ? "!" : null} onClick={dueCount > 0 ? () => handleTabChange("activeClasses") : null} />
                </div>
                {/* Secondary stats — 3 col desktop, 2+1 on mobile */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: isMobile ? 10 : 14, marginBottom: 24 }}>
                  <StatCard icon={TrendingUp} label="Modules Taught" value={totalModules} light={C.violetLight} iconColor={C.violet} />
                  <StatCard icon={XCircle} label="Missed Classes" value={missedClasses.length} light={C.amberLight} iconColor={C.amber} />
                  <StatCard icon={Award} label="Unique Subjects" value={[...new Set(activeClasses.map(c => c.subject))].length} light={C.cyanLight} iconColor={C.cyan} />
                </div>

                {/* Two cols */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
                  <div style={{ background: C.card, borderRadius: 18, padding: 20, border: `1px solid ${C.border}`, boxShadow: C.shadowCard }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary, display: "flex", alignItems: "center", gap: 6 }}><Calendar style={{ width: 15, height: 15, color: C.indigo }} />Upcoming Classes</h3>
                      <button onClick={() => handleTabChange("activeClasses")} style={{ fontSize: 12, color: C.indigo, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
                    </div>
                    {loadingClasses ? <div style={{ display: "flex", justifyContent: "center", padding: 24 }}><Loader2 style={{ width: 22, height: 22, color: C.emerald, animation: "spin 1s linear infinite" }} /></div>
                      : activeClasses.length === 0 ? <Empty icon={Calendar} msg="No active classes" /> : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {activeClasses.slice(0, 4).map(cls => {
                            const time = getDisplayTime(cls.classDate, cls.classTime, tutorData?.timezone);
                            const due = isClassDue(cls);
                            return (
                              <div key={cls.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: due ? C.redLight : C.bg, border: `1px solid ${due ? C.red + "30" : C.border}` }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: due ? C.gradRed : C.gradIndigo, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <Clock style={{ width: 16, height: 16, color: "#fff" }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{cls.subject}</p>
                                  <p style={{ fontSize: 12, color: C.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cls.studentName} · {time}</p>
                                </div>
                                {due && <span style={{ background: C.red, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 20, flexShrink: 0 }}>DUE</span>}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>

                  <div style={{ background: C.card, borderRadius: 18, padding: 20, border: `1px solid ${C.border}`, boxShadow: C.shadowCard }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary, display: "flex", alignItems: "center", gap: 6 }}><Users style={{ width: 15, height: 15, color: C.emerald }} />My Students</h3>
                      <button onClick={() => handleTabChange("students")} style={{ fontSize: 12, color: C.emerald, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
                    </div>
                    {loadingStudents ? <div style={{ display: "flex", justifyContent: "center", padding: 24 }}><Loader2 style={{ width: 22, height: 22, color: C.emerald, animation: "spin 1s linear infinite" }} /></div>
                      : students.length === 0 ? <Empty icon={Users} msg="No students assigned" /> : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {studentsWP.slice(0, 4).map(s => {
                            const total = Object.values(s.progress || {}).reduce((sum, p) => sum + (p.completedChapters?.length || 0), 0);
                            return (
                              <div key={s.uid} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: C.bg }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.gradPrimary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{s.name?.charAt(0)}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</p>
                                  <p style={{ fontSize: 12, color: C.textMuted }}>Grade {s.classLevel}</p>
                                </div>
                                <span style={{ background: C.emeraldLight, color: C.emerald, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20, flexShrink: 0 }}>{total} done</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "students" && (
              <motion.div key="st" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                {loadingStudents
                  ? <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "center", padding: 60 }}><Loader2 style={{ width: 28, height: 28, color: C.emerald, animation: "spin 1s linear infinite" }} /></div>
                  : studentsWP.length === 0 ? <div style={{ gridColumn: "1/-1" }}><Empty icon={Users} msg="No students assigned yet" /></div>
                  : studentsWP.map(s => {
                    const progress = s.progress || {};
                    const totalDone = Object.values(progress).reduce((sum, p) => sum + (p.completedChapters?.length || 0), 0);
                    return (
                      <motion.div key={s.uid} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3, boxShadow: C.shadowHover }}
                        style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, boxShadow: C.shadowCard }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 14, background: C.gradPrimary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{s.name?.charAt(0)}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</p>
                            <p style={{ fontSize: 12, color: C.textMuted }}>{s.customId} · Grade {s.classLevel}</p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: 22, fontWeight: 800, color: C.emerald }}>{totalDone}</p>
                            <p style={{ fontSize: 11, color: C.textMuted }}>modules</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: s.contactNumber ? 10 : 0 }}>
                          {(s.assignments || []).map((a, i) => {
                            const done = (progress[a.subject]?.completedChapters?.length) || 0;
                            return (
                              <button key={i} onClick={() => { setSelProgress({ student: s, assignment: a }); setShowProgress(true); }}
                                style={{ padding: "5px 12px", borderRadius: 20, background: C.indigoLight, color: C.indigo, border: `1px solid ${C.indigo}20`, fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                                onMouseEnter={e => { e.currentTarget.style.background = C.indigo; e.currentTarget.style.color = "#fff"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = C.indigoLight; e.currentTarget.style.color = C.indigo; }}>
                                {a.subject} · {done}
                              </button>
                            );
                          })}
                        </div>
                        {s.contactNumber && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.textMuted, marginTop: 8 }}>
                            <Phone style={{ width: 12, height: 12 }} />{s.contactNumber}
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                }
              </motion.div>
            )}

            {activeTab === "activeClasses" && (
              <motion.div key="ac" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {loadingClasses
                  ? <div style={{ display: "flex", justifyContent: "center", padding: 60 }}><Loader2 style={{ width: 28, height: 28, color: C.emerald, animation: "spin 1s linear infinite" }} /></div>
                  : activeClasses.length === 0 ? <Empty icon={Calendar} msg="No active classes" />
                  : activeClasses.map(cls => (
                      <ClassCard key={cls.id} cls={cls} timezone={tutorData?.timezone} studentLinkMap={studentLinkMap} onMark={c => { setSelClass(c); setShowAttendance(true); }} />
                    ))
                }
              </motion.div>
            )}

            {activeTab === "progress" && (
              <motion.div key="pr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
                {studentsWP.length === 0 ? <div style={{ gridColumn: "1/-1" }}><Empty icon={TrendingUp} msg="No progress data" /></div>
                  : studentsWP.map(s => (
                    <div key={s.uid} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, boxShadow: C.shadowCard }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 12, background: C.gradPrimary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>{s.name?.charAt(0)}</div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary }}>{s.name}</p>
                          <p style={{ fontSize: 12, color: C.textMuted }}>Grade {s.classLevel}</p>
                        </div>
                      </div>
                      {(s.assignments || []).map((a, i) => {
                        const done = s.progress?.[a.subject]?.completedChapters || [];
                        return (
                          <div key={i} style={{ marginBottom: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: C.textSecondary }}>{a.subject}</span>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: C.emerald }}>{done.length} ch</span>
                                <button onClick={() => { setSelProgress({ student: s, assignment: a }); setShowProgress(true); }}
                                  style={{ padding: "3px 10px", borderRadius: 20, background: C.indigoLight, color: C.indigo, border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Edit</button>
                              </div>
                            </div>
                            <div style={{ height: 6, borderRadius: 6, background: C.emeraldLight, overflow: "hidden" }}>
                              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, done.length * 10)}%` }} transition={{ duration: 0.7 }}
                                style={{ height: "100%", borderRadius: 6, background: C.gradEmerald }} />
                            </div>
                            {done.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                                {done.map((ch, ci) => <span key={ci} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: C.emeraldLight, color: C.emerald, fontWeight: 600 }}>✓ {ch}</span>)}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div key="hi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 24 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <CheckCircle style={{ width: 16, height: 16, color: C.emerald }} />Completed ({completedClasses.length})
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {completedClasses.length === 0 ? <Empty icon={CheckCircle} msg="No completed classes" /> :
                      completedClasses.map(cls => (
                        <div key={cls.id} style={{ background: C.card, border: `1px solid ${C.emerald}25`, borderRadius: 14, padding: "14px 16px", boxShadow: C.shadowCard }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                            <p style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary }}>{cls.subject}</p>
                            <span style={{ background: C.emeraldLight, color: C.emerald, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>Done</span>
                          </div>
                          <p style={{ fontSize: 13, color: C.textSecondary, marginBottom: 2 }}>{cls.studentName}</p>
                          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: cls.summary ? 8 : 0 }}>{cls.classDate}</p>
                          {cls.summary && <p style={{ fontSize: 12, padding: "8px 12px", borderRadius: 10, background: C.emeraldLight, color: C.emerald }}>📋 {cls.summary}</p>}
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: C.textPrimary, display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <XCircle style={{ width: 16, height: 16, color: C.red }} />Missed ({missedClasses.length})
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {missedClasses.length === 0 ? <Empty icon={XCircle} msg="No missed classes" color={C.red} /> :
                      missedClasses.map(cls => (
                        <div key={cls.id} style={{ background: C.card, border: `1px solid ${C.red}25`, borderRadius: 14, padding: "14px 16px", boxShadow: C.shadowCard }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                            <p style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary }}>{cls.subject}</p>
                            <span style={{ background: C.redLight, color: C.red, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>Missed</span>
                          </div>
                          <p style={{ fontSize: 13, color: C.textSecondary, marginBottom: 2 }}>{cls.studentName}</p>
                          <p style={{ fontSize: 12, color: C.textMuted, marginBottom: cls.summary ? 8 : 0 }}>{cls.classDate}</p>
                          {cls.summary && <p style={{ fontSize: 12, padding: "8px 12px", borderRadius: 10, background: C.redLight, color: C.red }}>⚠️ {cls.summary}</p>}
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAttendance && selClass && (
          <AttendanceModal classItem={selClass} timezone={tutorData?.timezone}
            onClose={() => { setShowAttendance(false); setSelClass(null); }}
            markAttendance={tutorMarkAttendance} />
        )}
        {showProgress && selProgress && (
          <ProgressUpdateModal student={selProgress.student} assignment={selProgress.assignment}
            onClose={() => { setShowProgress(false); setSelProgress(null); }}
            tutorUpdateChapterProgress={tutorUpdateChapterProgress}
            tutorDeleteChapterProgress={tutorDeleteChapterProgress} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px}
      `}</style>
    </div>
  );
}
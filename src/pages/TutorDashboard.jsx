// src/pages/TutorDashboard.jsx - Ultra Modern Tutor Dashboard
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc as firebaseDoc } from "firebase/firestore";
import {
  Loader2,
  User,
  Link,
  CheckCircle,
  XCircle,
  X,
  ChevronsUp,
  Trash2,
  Calendar,
  Clock,
  TrendingUp,
  LogOut,
  Award,
  Target,
  Users,
  AlertCircle,
  Video,
  ArrowRight,
  Menu,
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { InputField } from "../components/FormFields";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { getDisplayTime } from "../utils/timeUtils";


// ====================================================================
// ATTENDANCE MODAL
// ====================================================================
const AttendanceModal = ({ classItem, onClose, markAttendance, timezone }) => {
  const [status, setStatus] = useState("completed");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!summary.trim() && status === "completed") {
      setError("Class summary is required for a completed class.");
      return;
    }

    setIsLoading(true);
    const result = await markAttendance(classItem.id, classItem.studentId, status, summary);
    setIsLoading(false);

    if (result.success) {
      alert(result.message);
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg p-8 rounded-3xl border"
        style={{
          background: COLORS.bgSecondary,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.xl,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Mark Attendance</h3>
          <p className="text-gray-400 text-sm">
            <span style={{ color: COLORS.accentCyan }} className="font-semibold">{classItem.subject}</span> with{" "}
            <span className="text-white font-semibold">{classItem.studentName}</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {classItem.classDate} @  @{" "}
  {getDisplayTime(
    classItem.classDate,
    classItem.classTime,
    timezone
  )}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 rounded-xl border text-sm"
            style={{
              background: `${COLORS.accentRed}10`,
              borderColor: `${COLORS.accentRed}30`,
              color: COLORS.accentRed,
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Attendance Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={() => setStatus("completed")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-4 rounded-xl font-bold transition-all ${
                  status === "completed"
                    ? "text-white border-2"
                    : "text-gray-400 border"
                }`}
                style={{
                  background: status === "completed" ? GRADIENTS.primary : COLORS.glassBg,
                  borderColor: status === "completed" ? "transparent" : COLORS.glassBorder,
                  boxShadow: status === "completed" ? SHADOWS.glow : "none",
                }}
              >
                <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                Present
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setStatus("missed")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-4 rounded-xl font-bold transition-all ${
                  status === "missed"
                    ? "text-white border-2"
                    : "text-gray-400 border"
                }`}
                style={{
                  background: status === "missed" ? `${COLORS.accentRed}20` : COLORS.glassBg,
                  borderColor: status === "missed" ? COLORS.accentRed : COLORS.glassBorder,
                }}
              >
                <XCircle className="w-5 h-5 mx-auto mb-1" />
                Absent
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {status === "completed" ? "Topics Covered" : "Reason for Absence"}{" "}
              {status === "completed" && <span style={{ color: COLORS.accentRed }}>*</span>}
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows="4"
              placeholder={
                status === "completed"
                  ? "Describe the key topics covered in the class..."
                  : "Optional: Reason for absence..."
              }
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 transition-all"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
                focusRing: COLORS.accentCyan,
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 mx-auto animate-spin" />
            ) : (
              "Confirm Attendance"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ====================================================================
// PROGRESS UPDATE MODAL
// ====================================================================
const ProgressUpdateModal = ({
  student,
  assignment,
  onClose,
  tutorUpdateChapterProgress,
  tutorDeleteChapterProgress,
}) => {
  const { subject } = assignment;
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const progressData = student.progress?.[subject]?.completedChapters || [];

  const handleUpdate = async (e) => {
    e.preventDefault();

    const number = chapterNumber.trim();
    const name = chapterName.trim();

    if (!number || !name) {
      setError("Both Chapter Number and Chapter Name are required.");
      return;
    }

    const chapterString = `Ch ${number}: ${name}`;
    setIsLoading(true);
    setError(null);

    const result = await tutorUpdateChapterProgress(student.uid, subject, chapterString);
    setIsLoading(false);

    if (result.success) {
      alert(result.message);
      setChapterNumber("");
      setChapterName("");
    } else {
      setError(result.error);
    }
  };

  const handleDelete = async (chapterString) => {
    if (!window.confirm(`Remove "${chapterString}" from completed list?`)) return;

    setIsLoading(true);
    setError(null);

    const result = await tutorDeleteChapterProgress(student.uid, subject, chapterString);
    setIsLoading(false);

    if (result.success) {
      alert(result.message);
    } else {
      setError(result.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-md p-8 rounded-3xl border overflow-y-auto max-h-[90vh]"
        style={{
          background: COLORS.bgSecondary,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.xl,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Update Progress</h3>
          <p className="text-gray-400 text-sm">
            <span className="text-white font-semibold">{student.name}</span> •{" "}
            <span style={{ color: COLORS.accentCyan }}>{subject}</span>
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 rounded-xl border text-sm"
            style={{
              background: `${COLORS.accentRed}10`,
              borderColor: `${COLORS.accentRed}30`,
              color: COLORS.accentRed,
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6 pb-6 mb-6 border-b" style={{ borderColor: COLORS.glassBorder }}>
          <div className="p-4 rounded-xl" style={{ background: COLORS.glassBg, border: `1px solid ${COLORS.glassBorder}` }}>
            <p className="text-sm font-semibold text-white mb-1">Current Status</p>
            <p className="text-gray-400 text-xs">
              Total Chapters: <span style={{ color: COLORS.accentCyan }} className="font-bold">{progressData.length}</span>
            </p>
            {progressData.length > 0 && (
              <p className="text-gray-500 text-xs mt-1">
                Latest: {progressData[progressData.length - 1]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Ch. No."
              name="chapterNumber"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              type="number"
              required
            />
            <InputField
              label="Chapter Name"
              name="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              required
              placeholder="e.g., Python Basics"
            />
          </div>

          {chapterNumber && chapterName && (
            <div className="p-3 rounded-xl border text-sm" style={{
              background: `${COLORS.accentCyan}10`,
              borderColor: `${COLORS.accentCyan}30`,
              color: COLORS.accentCyan,
            }}>
              Will be saved as: <span className="font-bold">Ch {chapterNumber}: {chapterName}</span>
            </div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading || !chapterNumber || !chapterName}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-50"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.md,
            }}
          >
            {isLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : "Mark Chapter Completed"}
          </motion.button>
        </form>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">
            Completed Chapters ({progressData.length})
          </h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {progressData.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">No chapters marked yet</p>
            ) : (
              [...progressData].reverse().map((chapterString, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl border hover:bg-white/5 transition-colors"
                  style={{
                    background: COLORS.glassBg,
                    borderColor: COLORS.glassBorder,
                  }}
                >
                  <span className="text-sm text-white font-medium">{chapterString}</span>
                  <motion.button
                    onClick={() => handleDelete(chapterString)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 rounded-full transition-colors disabled:opacity-50"
                    style={{
                      background: `${COLORS.accentRed}20`,
                    }}
                    onMouseEnter={(e) => e.target.style.background = `${COLORS.accentRed}30`}
                    onMouseLeave={(e) => e.target.style.background = `${COLORS.accentRed}20`}
                  >
                    <Trash2 className="w-4 h-4" style={{ color: COLORS.accentRed }} />
                  </motion.button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ====================================================================
// STUDENT CARD
// ====================================================================
const StudentCard = ({ student, tutorId, openProgressModal }) => {
  const assignments = (student.assignments || []).filter((a) => a.tutorId === tutorId);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="p-5 rounded-2xl border backdrop-blur-xl group"
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgTertiary} 100%)`,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl" style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.glow }}>
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{student.name}</h3>
            <p className="text-xs" style={{ color: COLORS.gray400 }}>
              Grade {student.classLevel} • {student.customId || "No ID"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t pt-4" style={{ borderColor: COLORS.glassBorder }}>
        {assignments.map((assignment, index) => {
          const completed = student.progress?.[assignment.subject]?.completedChapters || [];
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: COLORS.gray300 }}>{assignment.subject}</p>
                <p className="text-xs text-gray-500">
                  {completed.length > 0 ? completed[completed.length - 1] : "No progress yet"}
                </p>
              </div>
              <motion.button
                onClick={() => openProgressModal(student, assignment)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all"
                style={{
                  color: COLORS.accentCyan,
                  borderColor: `${COLORS.accentCyan}30`,
                }}
                onMouseEnter={(e) => e.target.style.background = `${COLORS.accentCyan}10`}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Update ({completed.length})
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ====================================================================
// STAT CARD
// ====================================================================
const StatCard = ({ icon: Icon, label, value, gradient }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative p-6 rounded-2xl border backdrop-blur-xl overflow-hidden group"
    style={{
      background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgTertiary} 100%)`,
      borderColor: COLORS.glassBorder,
      boxShadow: SHADOWS.md,
    }}
  >
    <div className="relative z-10">
      <div
        className="p-3 rounded-xl inline-block mb-4"
        style={{
          background: gradient,
          boxShadow: SHADOWS.glow,
        }}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm" style={{ color: COLORS.gray400 }}>{label}</p>
    </div>
  </motion.div>
);

// ====================================================================
// TAB BUTTON
// ====================================================================
const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all border ${
      active ? "text-white shadow-lg" : "hover:text-white"
    }`}
    style={{
      background: active
        ? `linear-gradient(135deg, ${COLORS.accentCyan}20 0%, ${COLORS.accentCyanDark}20 100%)`
        : COLORS.bgTertiary,
      borderColor: active ? COLORS.accentCyan : COLORS.glassBorder,
      color: active ? COLORS.white : COLORS.gray400,
      boxShadow: active ? SHADOWS.glow : 'none',
    }}
  >
    <span className="flex items-center">
      <Icon className="w-4 h-4 mr-2" />
      {label}
      {count !== undefined && (
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold`}
          style={{
            background: active ? COLORS.accentCyan : COLORS.glassBg,
            color: active ? COLORS.bgPrimary : COLORS.gray300,
          }}
        >
          {count}
        </span>
      )}
    </span>
  </motion.button>
);

// ====================================================================
// MOBILE DRAWER
// ====================================================================
const MobileDrawer = ({ isOpen, onClose, activeTab, setActiveTab, tabs }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 bottom-0 w-80 z-50 lg:hidden border-r"
          style={{
            background: COLORS.bgPrimary,
            borderColor: COLORS.glassBorder,
            boxShadow: SHADOWS.xl,
          }}
        >
          <div className="p-6 border-b" style={{ borderColor: COLORS.glassBorder }}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-white">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(tab.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "border shadow-lg"
                    : "hover:border border-transparent"
                }`}
                style={{
                  background: activeTab === tab.id 
                    ? `linear-gradient(135deg, ${COLORS.accentCyan}20 0%, ${COLORS.accentCyanDark}20 100%)`
                    : 'transparent',
                  borderColor: activeTab === tab.id ? COLORS.accentCyan : 'transparent',
                  boxShadow: activeTab === tab.id ? SHADOWS.glow : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                  <span className={`font-medium ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                    {tab.label}
                  </span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: COLORS.accentCyan,
                      color: COLORS.bgPrimary,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ====================================================================
// TUTOR DASHBOARD
// ====================================================================
export default function TutorDashboard() {
  const { userId, logout, tutorMarkAttendance, tutorUpdateChapterProgress, tutorDeleteChapterProgress } = useAuth();

  const [tutorData, setTutorData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [myStudents, setMyStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [studentsProgress, setStudentsProgress] = useState({});

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClassToMark, setSelectedClassToMark] = useState(null);

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedProgressToUpdate, setSelectedProgressToUpdate] = useState(null);

  const [activeTab, setActiveTab] = useState("students");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch tutor data
  useEffect(() => {
    if (!userId) return;
    const ref = firebaseDoc(db, "userSummaries", userId);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setTutorData(snap.data());
      }
    });
    return () => unsub();
  }, [userId]);

  // Fetch classes
  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, "classes"), where("tutorId", "==", userId));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => ({
        id: d.id,
        status: d.data().status || "scheduled",
        isRescheduled: d.data().isRescheduled || false,
        ...d.data(),
      }));
      setClasses(
        arr.sort(
          (a, b) =>
            new Date(a.classDate + "T" + a.classTime) - new Date(b.classDate + "T" + b.classTime)
        )
      );
      setLoadingClasses(false);
    });
    return () => unsub();
  }, [userId]);

  // Fetch students & progress
  useEffect(() => {
    if (!userId) {
      setMyStudents([]);
      setLoadingStudents(false);
      return;
    }

    setLoadingStudents(true);
    const secureStudentsQuery = query(
      collection(db, "userSummaries"),
      where("tutorUids", "array-contains", userId)
    );

    const studentsUnsub = onSnapshot(
      secureStudentsQuery,
      (snap) => {
        const students = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
        const filteredStudents = students.filter(
          (u) =>
            u.role === "student" &&
            u.assignments &&
            u.assignments.some((a) => a.tutorId === userId)
        );
        filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
        setMyStudents(filteredStudents);
        setLoadingStudents(false);

        const studentsAndSubjects = filteredStudents.flatMap((student) => {
          const relevantAssignments = (student.assignments || []).filter(
            (a) => a.tutorId === userId
          );
          return relevantAssignments.map((a) => ({
            studentId: student.uid,
            subject: a.subject,
          }));
        });

        const progressUnsubs = studentsAndSubjects.map(({ studentId, subject }) => {
          const docRef = getProgressRef(studentId, subject);
          return onSnapshot(docRef, (docSnap) => {
            setStudentsProgress((prev) => {
              let updatedProgress = { ...prev };
              if (!updatedProgress[studentId]) {
                updatedProgress[studentId] = {};
              }
              if (docSnap.exists()) {
                updatedProgress[studentId][subject] = docSnap.data();
              } else {
                updatedProgress[studentId][subject] = { completedChapters: [] };
              }
              return updatedProgress;
            });
          });
        });

        return () => progressUnsubs.forEach((unsub) => unsub());
      },
      (error) => {
        console.error("Failed to fetch students:", error);
        setLoadingStudents(false);
      }
    );

    return () => studentsUnsub();
  }, [userId]);

  const studentsWithProgress = myStudents.map((student) => ({
    ...student,
    progress: studentsProgress[student.uid] || {},
  }));

  const studentLinkMap = studentsWithProgress.reduce((acc, student) => {
    acc[student.uid] = student.permanentClassLink || null;
    return acc;
  }, {});

  const now = new Date();
  const activeClasses = classes.filter(
    (cls) => cls.status === "scheduled" || cls.status === "pending"
  );
  const completedClasses = classes.filter((cls) => cls.status === "completed");
  const missedClasses = classes.filter((cls) => cls.status === "missed");

  const isClassDue = (cls) => {
  // Create the IST date object correctly
  const istDateTimeString = `${cls.classDate}T${cls.classTime}:00+05:30`;
  const classDate = new Date(istDateTimeString);
  
  if (isNaN(classDate.getTime())) return false;
  return new Date() > classDate; 
};

  const tabs = [
    { id: "students", label: "Students", icon: Users, count: studentsWithProgress.length },
    { id: "activeClasses", label: "Active Classes", icon: Calendar, count: activeClasses.length },
    { id: "history", label: "History", icon: Clock, count: completedClasses.length + missedClasses.length },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen pb-8" style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Header */}
      <div
        className="sticky top-0 z-30 backdrop-blur-xl border-b"
        style={{
          background: `${COLORS.bgPrimary}cc`,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.md,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-xl transition-colors lg:hidden"
                style={{
                  background: COLORS.glassBg,
                  border: `1px solid ${COLORS.glassBorder}`,
                }}
              >
                <Menu className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{
                    background: GRADIENTS.primary,
                    boxShadow: SHADOWS.glow,
                  }}
                >
                  {tutorData?.name?.charAt(0) || "T"}
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-white">
                    {tutorData?.name || "Tutor"}
                  </h1>
                  <p className="text-xs sm:text-sm" style={{ color: COLORS.gray400 }}>
                    {tutorData?.customId || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-semibold text-white border transition-all text-sm"
              style={{
                borderColor: `${COLORS.accentRed}50`,
                background: `${COLORS.accentRed}10`,
              }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="My Students"
            value={studentsWithProgress.length}
            gradient={GRADIENTS.primary}
          />
          <StatCard
            icon={Calendar}
            label="Active Classes"
            value={activeClasses.length}
            gradient={GRADIENTS.secondary}
          />
          <StatCard
            icon={CheckCircle}
            label="Completed"
            value={completedClasses.length}
            gradient={`linear-gradient(135deg, ${COLORS.accentGreen} 0%, #10b981 100%)`}
          />
          <StatCard
            icon={Target}
            label="Success Rate"
            value="98%"
            gradient={GRADIENTS.purple}
          />
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-4 mb-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
              label={tab.label}
              count={tab.count}
            />
          ))}
        </div>

        {/* Mobile Section Header */}
        <div className="flex items-center gap-3 mb-6 lg:hidden">
          <div
            className="p-2 rounded-xl"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          >
            {currentTab && <currentTab.icon className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{currentTab?.label}</h2>
            {currentTab?.count !== undefined && (
              <p className="text-sm" style={{ color: COLORS.gray400 }}>
                {currentTab.count} {currentTab.count === 1 ? "item" : "items"}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "students" && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {loadingStudents ? (
                <div className="col-span-3 flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.accentCyan }} />
                </div>
              ) : studentsWithProgress.length === 0 ? (
                <div className="col-span-3 text-center py-20" style={{ color: COLORS.gray400 }}>
                  No students assigned yet
                </div>
              ) : (
                studentsWithProgress.map((student) => (
                  <StudentCard
                    key={student.uid}
                    student={student}
                    tutorId={userId}
                    openProgressModal={(s, a) => {
                      setSelectedProgressToUpdate({ student: s, assignment: a });
                      setShowProgressModal(true);
                    }}
                  />
                ))
              )}
            </motion.div>
          )}

          {activeTab === "activeClasses" && (
            <motion.div
              key="activeClasses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {loadingClasses ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.accentCyan }} />
                </div>
              ) : activeClasses.length === 0 ? (
                <div
                  className="text-center py-20 rounded-2xl border"
                  style={{
                    background: COLORS.bgSecondary,
                    borderColor: COLORS.glassBorder,
                  }}
                >
                  <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.gray500 }} />
                  <p className="text-lg" style={{ color: COLORS.gray400 }}>
                    No active classes
                  </p>
                </div>
              ) : (
                activeClasses.map((cls) => {
                  const classLink = studentLinkMap[cls.studentId] || "";
                  const isDue = isClassDue(cls);
                  const timeDisplay = getDisplayTime(
                    cls.classDate,
                     cls.classTime,
                     tutorData?.timezone
                    );

                  const dateDisplay = cls.classDate
                    ? new Date(cls.classDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    : "Date TBD";

                  return (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative overflow-hidden rounded-2xl p-6 border"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgTertiary} 100%)`,
                        borderColor: COLORS.glassBorder,
                        boxShadow: SHADOWS.md,
                      }}
                    >
                      {/* Due Badge */}
                      {isDue && (
                        <div
                          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold z-10 flex items-center gap-1"
                          style={{
                            background: COLORS.accentRed,
                            color: COLORS.white,
                          }}
                        >
                          <AlertCircle className="w-3 h-3" />
                          ATTENDANCE DUE
                        </div>
                      )}

                      {/* Rescheduled Badge */}
                      {cls.isRescheduled && !isDue && (
                        <div
                          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold z-10"
                          style={{
                            background: COLORS.accentGold,
                            color: COLORS.bgPrimary,
                          }}
                        >
                          RESCHEDULED
                        </div>
                      )}

                      <div className="flex gap-4">
                        {/* Time Display */}
                        <div
                          className="flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg"
                          style={{
                            background: GRADIENTS.primary,
                            boxShadow: SHADOWS.glow,
                          }}
                        >
                          <Clock className="w-5 h-5 mb-1 opacity-80" />
                          <div className="text-2xl font-bold leading-tight">
                            {timeDisplay.split(":")[0]}
                            <span className="text-sm">:{timeDisplay.split(":")[1]?.substring(0, 2) || "00"}</span>
                          </div>
                          <div className="text-xs opacity-90 mt-1">
                            {timeDisplay.includes("AM") ? "AM" : timeDisplay.includes("PM") ? "PM" : ""}
                          </div>
                          <div className="text-xs font-medium mt-1 opacity-90">
                            {dateDisplay.split(",")[0]}
                          </div>
                        </div>

                        {/* Class Details */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-3">
                            <h3 className="text-xl font-bold text-white mb-1 truncate">
                              {cls.subject}
                            </h3>
                            <p className="text-sm mb-1 flex items-center gap-2" style={{ color: COLORS.gray400 }}>
                              <User className="w-4 h-4" />
                              Student: <span style={{ color: COLORS.accentCyan }}>{cls.studentName}</span>
                            </p>
                            <p className="text-sm font-medium flex items-center gap-2" style={{ color: COLORS.gray300 }}>
                              <Calendar className="w-4 h-4" />
                              {dateDisplay}
                            </p>
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            {classLink ? (
                              <motion.a
                                href={classLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white shadow-lg transition-all"
                                style={{
                                  background: GRADIENTS.primary,
                                  boxShadow: SHADOWS.glow,
                                }}
                              >
                                <Video className="w-4 h-4" />
                                Join Class
                                <ArrowRight className="w-4 h-4" />
                              </motion.a>
                            ) : (
                              <div className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold border text-sm"
                                style={{
                                  color: COLORS.accentRed,
                                  background: `${COLORS.accentRed}10`,
                                  borderColor: `${COLORS.accentRed}30`,
                                }}
                              >
                                No Link Available
                              </div>
                            )}
                            <motion.button
                              onClick={() => {
                                setSelectedClassToMark(cls);
                                setShowAttendanceModal(true);
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold border text-white transition-all"
                              style={{
                                borderColor: COLORS.glassBorder,
                                background: COLORS.glassBg,
                              }}
                            >
                              Mark Attendance
                            </motion.button>
                          </div>

                          {/* Original date for rescheduled */}
                          {cls.isRescheduled && cls.originalClassDate && (
                            <div className="mt-3 text-xs" style={{ color: COLORS.gray500 }}>
                              Originally: {cls.originalClassDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Completed */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" style={{ color: COLORS.accentGreen }} />
                    Completed ({completedClasses.length})
                  </h3>
                  <div className="space-y-4">
                    {completedClasses.length === 0 ? (
                      <div className="text-center py-10" style={{ color: COLORS.gray400 }}>
                        No completed classes
                      </div>
                    ) : (
                      completedClasses.map((cls) => (
                        <motion.div
                          key={cls.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 5 }}
                          className="p-4 rounded-xl border backdrop-blur-xl"
                          style={{
                            background: COLORS.glassBg,
                            borderColor: COLORS.glassBorder,
                          }}
                        >
                          <p className="text-sm mb-1" style={{ color: COLORS.gray400 }}>
                            {cls.studentName}
                          </p>
                          <p className="text-lg font-bold text-white mb-1">{cls.subject}</p>
                          <p className="text-xs text-gray-500 mb-2">{cls.classDate}</p>
                          <p className="text-sm px-3 py-2 rounded-lg" style={{
                            color: COLORS.accentGreen,
                            background: `${COLORS.accentGreen}10`,
                          }}>
                            {cls.summary || "N/A"}
                          </p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Missed */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" style={{ color: COLORS.accentRed }} />
                    Missed ({missedClasses.length})
                  </h3>
                  <div className="space-y-4">
                    {missedClasses.length === 0 ? (
                      <div className="text-center py-10" style={{ color: COLORS.gray400 }}>
                        No missed classes
                      </div>
                    ) : (
                      missedClasses.map((cls) => (
                        <motion.div
                          key={cls.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ x: -5 }}
                          className="p-4 rounded-xl border backdrop-blur-xl"
                          style={{
                            background: COLORS.glassBg,
                            borderColor: COLORS.glassBorder,
                          }}
                        >
                          <p className="text-sm mb-1" style={{ color: COLORS.gray400 }}>
                            {cls.studentName}
                          </p>
                          <p className="text-lg font-bold text-white mb-1">{cls.subject}</p>
                          <p className="text-xs text-gray-500 mb-2">{cls.classDate}</p>
                          <p className="text-sm px-3 py-2 rounded-lg" style={{
                            color: COLORS.accentRed,
                            background: `${COLORS.accentRed}10`,
                          }}>
                            {cls.summary || "N/A"}
                          </p>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAttendanceModal && selectedClassToMark && (
          <AttendanceModal
            classItem={selectedClassToMark}
            timezone={tutorData?.timezone}
            onClose={() => {
              setShowAttendanceModal(false);
              setSelectedClassToMark(null);
            }}
            markAttendance={tutorMarkAttendance}
          />
        )}

        {showProgressModal && selectedProgressToUpdate && (
          <ProgressUpdateModal
            student={selectedProgressToUpdate.student}
            assignment={selectedProgressToUpdate.assignment}
            onClose={() => {
              setShowProgressModal(false);
              setSelectedProgressToUpdate(null);
            }}
            tutorUpdateChapterProgress={tutorUpdateChapterProgress}
            tutorDeleteChapterProgress={tutorDeleteChapterProgress}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
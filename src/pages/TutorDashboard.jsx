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
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { InputField } from "../components/FormFields";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

// ====================================================================
// ATTENDANCE MODAL
// ====================================================================
const AttendanceModal = ({ classItem, onClose, markAttendance }) => {
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
            <span className="text-cyan-400 font-semibold">{classItem.subject}</span> with{" "}
            <span className="text-white font-semibold">{classItem.studentName}</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {classItem.classDate} @ {classItem.classTime}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
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
                    ? "bg-red-500/20 text-red-400 border-2 border-red-500"
                    : "text-gray-400 border"
                }`}
                style={{
                  background: status === "missed" ? "rgba(239, 68, 68, 0.2)" : COLORS.glassBg,
                  borderColor: status === "missed" ? "#EF4444" : COLORS.glassBorder,
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
              {status === "completed" && <span className="text-red-400">*</span>}
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
              className="w-full px-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
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
            <span className="text-cyan-400">{subject}</span>
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6 pb-6 mb-6 border-b" style={{ borderColor: COLORS.glassBorder }}>
          <div className="p-4 rounded-xl" style={{ background: COLORS.glassBg, border: `1px solid ${COLORS.glassBorder}` }}>
            <p className="text-sm font-semibold text-white mb-1">Current Status</p>
            <p className="text-gray-400 text-xs">
              Total Chapters: <span className="text-cyan-400 font-bold">{progressData.length}</span>
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
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm">
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
                    className="p-1.5 rounded-full bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
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
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl" style={{ background: GRADIENTS.primary }}>
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{student.name}</h3>
            <p className="text-xs text-gray-400">
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
                <p className="text-sm font-semibold text-gray-300">{assignment.subject}</p>
                <p className="text-xs text-gray-500">
                  {completed.length > 0 ? completed[completed.length - 1] : "No progress yet"}
                </p>
              </div>
              <motion.button
                onClick={() => openProgressModal(student, assignment)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
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
      background: COLORS.glassBg,
      borderColor: COLORS.glassBorder,
      boxShadow: SHADOWS.md,
    }}
  >
    <div
      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
      style={{ background: gradient }}
    />
    <div className="relative z-10">
      <div
        className="p-3 rounded-xl inline-block mb-4"
        style={{
          background: `${gradient}15`,
          border: `1px solid ${COLORS.glassBorder}`,
        }}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </motion.div>
);

// ====================================================================
// TAB BUTTON
// ====================================================================
const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
      active ? "text-white" : "text-gray-400 hover:text-gray-300"
    }`}
    style={{
      background: active ? GRADIENTS.primary : COLORS.glassBg,
      border: `1px solid ${active ? "transparent" : COLORS.glassBorder}`,
      boxShadow: active ? SHADOWS.glow : "none",
    }}
  >
    <span className="flex items-center">
      <Icon className="w-4 h-4 mr-2" />
      {label}
      {count !== undefined && (
        <span
          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            active ? "bg-white/20" : "bg-white/5"
          }`}
        >
          {count}
        </span>
      )}
    </span>
  </motion.button>
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
    const dateParts = cls.classDate.split("-").map(Number);
    const timeParts = cls.classTime.split(":").map(Number);
    const classDateTime = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2],
      timeParts[0],
      timeParts[1]
    );
    if (isNaN(classDateTime.getTime())) return false;
    return now.getTime() > classDateTime.getTime();
  };

  const tabs = [
    { id: "students", label: "Students", icon: Users, count: studentsWithProgress.length },
    { id: "activeClasses", label: "Active Classes", icon: Calendar, count: activeClasses.length },
    { id: "history", label: "History", icon: Clock, count: completedClasses.length + missedClasses.length },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Header */}
      <div
        className="border-b backdrop-blur-xl sticky top-0 z-40"
        style={{ borderColor: COLORS.glassBorder, background: `${COLORS.bgPrimary}95` }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-xl" style={{ background: GRADIENTS.primary }}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{tutorData?.name || "Tutor"}</h1>
              <p className="text-sm text-gray-400">{tutorData?.customId || "Loading..."}</p>
            </div>
          </div>
          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 rounded-xl font-semibold text-white border border-red-500/50 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            gradient={GRADIENTS.purple}
          />
          <StatCard
            icon={Target}
            label="Success Rate"
            value="98%"
            gradient={GRADIENTS.primary}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
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
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                </div>
              ) : studentsWithProgress.length === 0 ? (
                <div className="col-span-3 text-center py-20 text-gray-400">
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
              className="grid gap-6"
            >
              {loadingClasses ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                </div>
              ) : activeClasses.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No active classes</div>
              ) : (
                activeClasses.map((cls) => {
                  const classLink = studentLinkMap[cls.studentId] || "";
                  const isDue = isClassDue(cls);

                  return (
                    <motion.div
                      key={cls.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -3 }}
                      className="p-6 rounded-2xl border backdrop-blur-xl"
                      style={{
                        background: COLORS.glassBg,
                        borderColor: COLORS.glassBorder,
                        boxShadow: SHADOWS.md,
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          {isDue && (
                            <motion.span
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 mb-2"
                            >
                              <AlertCircle className="w-3 h-3 mr-1" />
                              ATTENDANCE DUE
                            </motion.span>
                          )}
                          {cls.isRescheduled && (
                            <span className="inline-block px-2 py-1 rounded-lg text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 mb-2 ml-2">
                              RESCHEDULED
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-white mb-1">{cls.subject}</h3>
                          <p className="text-sm text-gray-400">
                            Student: <span className="text-cyan-400">{cls.studentName}</span>
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {cls.classDate}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {cls.classTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        {classLink ? (
                          <motion.a
                            href={classLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white"
                            style={{
                              background: GRADIENTS.primary,
                              boxShadow: SHADOWS.md,
                            }}
                          >
                            <Link className="w-4 h-4 mr-2" />
                            Join Class
                          </motion.a>
                        ) : (
                          <div className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-red-400 bg-red-500/10 border border-red-500/30">
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
                          className="px-4 py-3 rounded-xl font-semibold border text-white hover:bg-white/5 transition-all"
                          style={{
                            borderColor: COLORS.glassBorder,
                          }}
                        >
                          Mark Attendance
                        </motion.button>
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
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Completed ({completedClasses.length})
                  </h3>
                  <div className="space-y-4">
                    {completedClasses.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">No completed classes</div>
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
                          <p className="text-sm text-gray-400 mb-1">
                            {cls.studentName}
                          </p>
                          <p className="text-lg font-bold text-white mb-1">{cls.subject}</p>
                          <p className="text-xs text-gray-500 mb-2">{cls.classDate}</p>
                          <p className="text-sm text-green-300 bg-green-500/10 px-3 py-2 rounded-lg">
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
                    <XCircle className="w-5 h-5 mr-2 text-red-400" />
                    Missed ({missedClasses.length})
                  </h3>
                  <div className="space-y-4">
                    {missedClasses.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">No missed classes</div>
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
                          <p className="text-sm text-gray-400 mb-1">
                            {cls.studentName}
                          </p>
                          <p className="text-lg font-bold text-white mb-1">{cls.subject}</p>
                          <p className="text-xs text-gray-500 mb-2">{cls.classDate}</p>
                          <p className="text-sm text-red-300 bg-red-500/10 px-3 py-2 rounded-lg">
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
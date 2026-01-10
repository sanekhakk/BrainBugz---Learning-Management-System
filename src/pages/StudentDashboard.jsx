// src/pages/StudentDashboard.jsx - Ultra Modern Student Dashboard
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import {
  BookOpen,
  User,
  Loader2,
  Link,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
  Clock,
  LogOut,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

const StatCard = ({ icon: Icon, label, value, gradient, trend }) => (
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
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{
            background: `${gradient}15`,
            border: `1px solid ${COLORS.glassBorder}`,
          }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-green-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </motion.div>
);

const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
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
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
          active ? "bg-white/20" : "bg-white/5"
        }`}>
          {count}
        </span>
      )}
    </span>
  </motion.button>
);

const ClassCard = ({ cls, type, permanentClassLink }) => {
  const isUpcoming = type === "upcoming";
  const isCompleted = type === "completed";
  const isMissed = type === "missed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -3 }}
      className="p-5 rounded-2xl border backdrop-blur-xl group"
      style={{
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {cls.isRescheduled && (
            <span className="inline-block px-2 py-1 rounded-lg text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 mb-2">
              RESCHEDULED
            </span>
          )}
          <h3 className="text-lg font-bold text-white mb-1">{cls.subject}</h3>
          <p className="text-sm text-gray-400">
            with <span className="text-cyan-400">{cls.tutorName}</span>
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isCompleted
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : isMissed
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
          }`}
        >
          {isCompleted ? "Completed" : isMissed ? "Missed" : "Upcoming"}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {cls.classDate}
        </span>
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {cls.classTime}
        </span>
      </div>

      {(isCompleted || isMissed) && cls.summary && (
        <div className={`p-3 rounded-xl text-sm mb-4 ${
          isCompleted
            ? "bg-green-500/10 text-green-300 border border-green-500/20"
            : "bg-red-500/10 text-red-300 border border-red-500/20"
        }`}>
          <p className="font-semibold mb-1">
            {isCompleted ? "Topics Covered:" : "Reason:"}
          </p>
          <p>{cls.summary}</p>
        </div>
      )}

      {isUpcoming && permanentClassLink && (
        <motion.a
          href={permanentClassLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white"
          style={{
            background: GRADIENTS.primary,
            boxShadow: SHADOWS.md,
          }}
        >
          <Link className="w-4 h-4 mr-2" />
          Join Class
        </motion.a>
      )}
    </motion.div>
  );
};

const ProgressCard = ({ assignment, progressData }) => {
  const completed = progressData[assignment.subject]?.completedChapters || [];
  const progress = Math.min((completed.length / 10) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl border backdrop-blur-xl group"
      style={{
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            {assignment.subject}
          </h3>
          <p className="text-sm text-gray-400">
            Tutor: {assignment.tutorName}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: GRADIENTS.primary }}>
            {completed.length}
          </div>
          <div className="text-xs text-gray-400">Modules</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 rounded-full overflow-hidden mb-4" style={{ background: COLORS.glassBg }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: GRADIENTS.primary }}
        />
      </div>

      {/* Latest chapters */}
      {completed.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 mb-2">Recent Progress:</p>
          {completed.slice(-3).map((chapter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center px-3 py-2 rounded-lg text-xs"
              style={{
                background: COLORS.glassBg,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              <CheckCircle className="w-3 h-3 mr-2 text-green-400 flex-shrink-0" />
              <span className="text-gray-300 truncate">{chapter}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function StudentDashboard() {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [completedClasses, setCompletedClasses] = useState([]);
  const [missedClasses, setMissedClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  const [progressData, setProgressData] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch student profile
  useEffect(() => {
    if (!userId) return;
    const profileRef = doc(db, "users", userId);
    const unsub = onSnapshot(
      profileRef,
      (snap) => {
        if (snap.exists()) {
          setStudentProfile(snap.data());
        }
        setLoadingProfile(false);
      },
      (error) => {
        console.error("Error fetching student profile:", error);
        setLoadingProfile(false);
      }
    );
    return () => unsub();
  }, [userId]);

  // Fetch classes
  useEffect(() => {
    if (!userId) {
      setLoadingClasses(false);
      return;
    }
    const q = query(collection(db, "classes"), where("studentId", "==", userId));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr = snap.docs.map((d) => ({
          id: d.id,
          status: d.data().status || "scheduled",
          ...d.data(),
        }));
        arr.sort(
          (a, b) =>
            new Date(a.classDate + " " + a.classTime) -
            new Date(b.classDate + " " + b.classTime)
        );

        const active = arr.filter(
          (cls) => cls.status === "scheduled" || cls.status === "pending"
        );
        const completed = arr.filter((cls) => cls.status === "completed");
        const missed = arr.filter((cls) => cls.status === "missed");

        setUpcomingClasses(active);
        setCompletedClasses(completed);
        setMissedClasses(missed);
        setLoadingClasses(false);
      },
      (error) => {
        console.error("Error fetching classes:", error);
        setLoadingClasses(false);
      }
    );
    return () => unsub();
  }, [userId]);

  // Fetch progress
  useEffect(() => {
    if (!userId || !studentProfile) {
      setLoadingProgress(false);
      return;
    }

    const assignments = studentProfile.assignments || [];
    const subjects = assignments.map((a) => a.subject);

    const progressUnsubs = subjects.map((subject) => {
      const docRef = getProgressRef(userId, subject);
      return onSnapshot(
        docRef,
        (docSnap) => {
          setProgressData((prev) => {
            if (docSnap.exists()) {
              return { ...prev, [subject]: docSnap.data() };
            } else {
              return { ...prev, [subject]: { completedChapters: [] } };
            }
          });
          setLoadingProgress(false);
        },
        (error) => {
          console.error(`Error fetching progress for ${subject}:`, error);
          setLoadingProgress(false);
        }
      );
    });

    setLoadingProgress(false);
    return () => progressUnsubs.forEach((unsub) => unsub());
  }, [userId, studentProfile]);

  const assignments = studentProfile?.assignments || [];
  const permanentClassLink = studentProfile?.permanentClassLink || "";
  const totalModules = Object.values(progressData).reduce(
    (sum, p) => sum + (p.completedChapters?.length || 0),
    0
  );

  const tabs = [
    { id: "upcoming", label: "Upcoming", icon: Calendar, count: upcomingClasses.length },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "completed", label: "Completed", icon: CheckCircle, count: completedClasses.length },
    { id: "missed", label: "Missed", icon: XCircle, count: missedClasses.length },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Header */}
      <div className="border-b backdrop-blur-xl sticky top-0 z-40" style={{ borderColor: COLORS.glassBorder, background: `${COLORS.bgPrimary}95` }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-xl" style={{ background: GRADIENTS.primary }}>
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {studentProfile?.name || "Student"}
              </h1>
              <p className="text-sm text-gray-400">
                {studentProfile?.customId || "Loading..."}
              </p>
            </div>
          </div>
          <motion.button
            onClick={async () => {
              await logout();
              navigate("/");
            }}
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
        {loadingProfile ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={BookOpen}
                label="Active Classes"
                value={upcomingClasses.length}
                gradient={GRADIENTS.primary}
                trend="+2 this week"
              />
              <StatCard
                icon={Award}
                label="Completed"
                value={completedClasses.length}
                gradient={GRADIENTS.secondary}
              />
              <StatCard
                icon={Target}
                label="Total Modules"
                value={totalModules}
                gradient={GRADIENTS.purple}
                trend="+5 this month"
              />
              <StatCard
                icon={Zap}
                label="Subjects"
                value={assignments.length}
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
              {activeTab === "upcoming" && (
                <motion.div
                  key="upcoming"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {loadingClasses ? (
                    <div className="col-span-2 flex justify-center py-20">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                    </div>
                  ) : upcomingClasses.length === 0 ? (
                    <div className="col-span-2 text-center py-20 text-gray-400">
                      No upcoming classes scheduled
                    </div>
                  ) : (
                    upcomingClasses.map((cls) => (
                      <ClassCard
                        key={cls.id}
                        cls={cls}
                        type="upcoming"
                        permanentClassLink={permanentClassLink}
                      />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {assignments.map((assignment, i) => (
                    <ProgressCard
                      key={i}
                      assignment={assignment}
                      progressData={progressData}
                    />
                  ))}
                </motion.div>
              )}

              {activeTab === "completed" && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {completedClasses.length === 0 ? (
                    <div className="col-span-2 text-center py-20 text-gray-400">
                      No completed classes yet
                    </div>
                  ) : (
                    completedClasses.map((cls) => (
                      <ClassCard key={cls.id} cls={cls} type="completed" />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "missed" && (
                <motion.div
                  key="missed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-6 md:grid-cols-2"
                >
                  {missedClasses.length === 0 ? (
                    <div className="col-span-2 text-center py-20 text-gray-400">
                      No missed classes
                    </div>
                  ) : (
                    missedClasses.map((cls) => (
                      <ClassCard key={cls.id} cls={cls} type="missed" />
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
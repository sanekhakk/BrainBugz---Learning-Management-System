// src/pages/StudentDashboard.jsx - Mobile-First Student Dashboard
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
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
  Menu,
  X,
  ChevronRight,
  Video,
  ArrowRight,
} from "lucide-react";
import { getProgressRef } from "../utils/paths";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";
import { getDisplayTime } from "../utils/timeUtils";


// Compact Stats Card for mobile
const CompactStatCard = ({ icon: Icon, label, value, trend, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    className="relative overflow-hidden rounded-xl p-4 border border-[#1e293b] min-w-[140px]"
    style={{
      background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgTertiary} 100%)`,
      boxShadow: SHADOWS.md,
    }}
  >
    <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
      <Icon className="w-full h-full" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="p-1.5 rounded-lg"
          style={{
            background: gradient || GRADIENTS.primary,
            boxShadow: SHADOWS.glow,
          }}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm" style={{ color: COLORS.gray400 }}>
        {label}
      </div>
      {trend && (
        <div className="text-xs mt-2 flex items-center gap-1" style={{ color: COLORS.accentGreen }}>
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
  </motion.div>
);

// Mobile Drawer Menu
const MobileDrawer = ({ isOpen, onClose, activeTab, setActiveTab, tabs }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />

        {/* Drawer */}
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
          {/* Drawer Header */}
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

          {/* Drawer Content */}
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

// Enhanced Class Card - ORIGINAL UI DESIGN (from image 2)
const EnhancedClassCard = ({ cls, type, permanentClassLink, timezone }) => {
  const isUpcoming = type === "upcoming";
  const isCompleted = type === "completed";
  const isMissed = type === "missed";

  // Parse time to show in better format
  const timeDisplay = getDisplayTime(
  cls.classDate,
  cls.classTime,
  timezone
);
  const dateDisplay = cls.classDate
    ? new Date(cls.classDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Date TBD";

  const statusConfig = {
    upcoming: {
      bg: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgTertiary} 100%)`,
      border: COLORS.glassBorder,
      timeBg: GRADIENTS.primary,
      badge: COLORS.white,
      badgeBg: `${COLORS.accentCyan}20`,
      badgeBorder: `${COLORS.accentCyan}30`,
      icon: Calendar,
    },
    completed: {
      bg: `linear-gradient(135deg, ${COLORS.accentGreen}10 0%, ${COLORS.accentGreen}05 100%)`,
      border: `${COLORS.accentGreen}30`,
      timeBg: `linear-gradient(135deg, ${COLORS.accentGreen} 0%, #10b981 100%)`,
      badge: COLORS.white,
      badgeBg: `${COLORS.accentGreen}20`,
      badgeBorder: `${COLORS.accentGreen}30`,
      icon: CheckCircle,
    },
    missed: {
      bg: `linear-gradient(135deg, ${COLORS.accentRed}10 0%, ${COLORS.accentRed}05 100%)`,
      border: `${COLORS.accentRed}30`,
      timeBg: `linear-gradient(135deg, ${COLORS.accentRed} 0%, #ef4444 100%)`,
      badge: COLORS.white,
      badgeBg: `${COLORS.accentRed}20`,
      badgeBorder: `${COLORS.accentRed}30`,
      icon: XCircle,
    },
  };

  const config = statusConfig[type];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl p-6 border"
      style={{
        background: config.bg,
        borderColor: config.border,
        boxShadow: SHADOWS.md,
      }}
    >
      {/* Rescheduled Badge */}
      {cls.isRescheduled && (
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
        {/* Time Display - Original Rounded Square Design */}
        <div
          className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-black shadow-lg"
          style={{
            background: config.timeBg,
            boxShadow: SHADOWS.glow,
          }}
        >
          <Clock className="w-5 h-5 mb-1 opacity-80" />
          <div className="text-2xl font-bold leading-tight">
            {timeDisplay.split(":")[0]}
            <span className="text-sm">:{timeDisplay.split(":")[1]?.substring(0, 2) || "00"} {timeDisplay.includes("AM") ? "AM" : timeDisplay.includes("PM") ? "PM" : ""}</span>
             
          </div>
          <div className="text-xs font-medium mt-1 opacity-90">
            {dateDisplay.split(",")[0]}
          </div>
        </div>

        {/* Class Details */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold text-white truncate">
                {cls.subject}
              </h3>
              {/* Status Badge - Top Right */}
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-lg border whitespace-nowrap flex-shrink-0"
                style={{
                  background: config.badgeBg,
                  borderColor: config.badgeBorder,
                  color: config.badge,
                }}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">
                  {isCompleted ? "Upcoming" : isMissed ? "Upcoming" : "Upcoming"}
                </span>
              </div>
            </div>
            
            <p className="text-sm mb-1 flex items-center gap-2" style={{ color: COLORS.gray400 }}>
              <User className="w-4 h-4" />
              with {cls.tutorName}
            </p>
            <p className="text-sm font-medium flex items-center gap-2" style={{ color: COLORS.gray300 }}>
              <Calendar className="w-4 h-4" />
              {dateDisplay}
            </p>
          </div>

          {/* Summary for completed/missed */}
          {(isCompleted || isMissed) && cls.summary && (
            <div
              className="mt-3 p-3 rounded-xl border"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: COLORS.gray300 }}>
                {isCompleted ? "Topics Covered:" : "Reason:"}
              </p>
              <p className="text-sm" style={{ color: COLORS.gray400 }}>
                {cls.summary}
              </p>
            </div>
          )}

          {/* Join Class Button - Full Width for Mobile, Compact for Desktop */}
          {isUpcoming && permanentClassLink && (
            <motion.a
              href={permanentClassLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-black shadow-lg transition-all"
              style={{
                background: GRADIENTS.primary,
                boxShadow: SHADOWS.glow,
              }}
            >
              <Video className="w-5 h-5" />
              Join Class
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          )}

          {/* Original date for rescheduled classes */}
          {cls.isRescheduled && cls.originalClassDate && (
            <div className="mt-3 text-xs" style={{ color: COLORS.gray500 }}>
              Originally: {cls.originalClassDate}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Progress Card
const ProgressCard = ({ assignment, progressData }) => {
  const completed = progressData[assignment.subject]?.completedChapters || [];
  const progress = Math.min((completed.length / 10) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 border"
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgSecondary} 0%, ${COLORS.bgTertiary} 100%)`,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            {assignment.subject}
          </h3>
          <p className="text-sm" style={{ color: COLORS.gray400 }}>
            Tutor: {assignment.tutorName}
          </p>
        </div>
        <div
          className="px-4 py-2 rounded-xl text-center"
          style={{
            background: GRADIENTS.primary,
            boxShadow: SHADOWS.glow,
          }}
        >
          <div className="text-2xl font-bold text-white">{completed.length}</div>
          <div className="text-xs text-white opacity-80">Modules</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span style={{ color: COLORS.gray400 }}>Progress</span>
          <span className="font-semibold text-white">{Math.round(progress)}%</span>
        </div>
        <div
          className="h-3 rounded-full overflow-hidden"
          style={{
            background: COLORS.glassBg,
            border: `1px solid ${COLORS.glassBorder}`,
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background: GRADIENTS.primary,
              boxShadow: SHADOWS.glow,
            }}
          />
        </div>
      </div>

      {/* Recent Chapters */}
      {completed.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2" style={{ color: COLORS.gray300 }}>
            Recent Progress:
          </p>
          <div className="flex flex-wrap gap-2">
            {completed.slice(-3).map((chapter, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border"
                style={{
                  background: COLORS.glassBg,
                  borderColor: COLORS.glassBorder,
                  color: COLORS.gray300,
                }}
              >
                {chapter}
              </span>
            ))}
          </div>
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
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Fetch classes - Filter out completed classes from upcoming
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

        // Only scheduled/pending classes appear in upcoming
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
    {
      id: "upcoming",
      label: "Upcoming Classes",
      icon: Calendar,
      count: upcomingClasses.length,
    },
    { id: "progress", label: "My Progress", icon: TrendingUp },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: completedClasses.length,
    },
    {
      id: "missed",
      label: "Missed",
      icon: XCircle,
      count: missedClasses.length,
    },
  ];

  // Get current tab info
  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background: COLORS.bgPrimary,
      }}
    >
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />

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
          {/* Menu Button + Profile */}
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
                  {studentProfile?.name?.charAt(0) || "S"}
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-white">
                    {studentProfile?.name || "Student"}
                  </h1>
                  <p className="text-xs sm:text-sm" style={{ color: COLORS.gray400 }}>
                    {studentProfile?.customId || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <motion.button
              onClick={async () => {
                await logout();
                navigate("/");
              }}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingProfile ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.accentCyan }} />
          </div>
        ) : (
          <>
            {/* Compact Stats - Single Row on Mobile */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
              <CompactStatCard
                icon={Calendar}
                label="Upcoming"
                value={upcomingClasses.length}
                gradient={GRADIENTS.primary}
              />
              <CompactStatCard
                icon={Target}
                label="Modules Done"
                value={totalModules}
                gradient={GRADIENTS.secondary}
              />
              <CompactStatCard
                icon={CheckCircle}
                label="Completed"
                value={completedClasses.length}
                gradient={`linear-gradient(135deg, ${COLORS.accentGreen} 0%, #10b981 100%)`}
              />
              <CompactStatCard
                icon={Award}
                label="Subjects"
                value={assignments.length}
                gradient={GRADIENTS.purple}
              />
            </div>

            {/* Desktop Tabs (Hidden on Mobile) */}
            <div className="hidden lg:flex gap-4 mb-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap border ${
                    activeTab === tab.id
                      ? "text-white shadow-lg"
                      : "hover:text-white"
                  }`}
                  style={{
                    background: activeTab === tab.id
                      ? `linear-gradient(135deg, ${COLORS.accentCyan}20 0%, ${COLORS.accentCyanDark}20 100%)`
                      : COLORS.bgTertiary,
                    borderColor: activeTab === tab.id ? COLORS.accentCyan : COLORS.glassBorder,
                    color: activeTab === tab.id ? COLORS.white : COLORS.gray400,
                    boxShadow: activeTab === tab.id ? SHADOWS.glow : 'none',
                  }}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: activeTab === tab.id ? COLORS.accentCyan : COLORS.glassBg,
                        color: activeTab === tab.id ? COLORS.bgPrimary : COLORS.gray300,
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </motion.button>
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
            {activeTab === "upcoming" && (
              <div className="space-y-4">
                {loadingClasses ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.accentCyan }} />
                  </div>
                ) : upcomingClasses.length === 0 ? (
                  <div
                    className="text-center py-20 rounded-2xl border"
                    style={{
                      background: COLORS.bgSecondary,
                      borderColor: COLORS.glassBorder,
                    }}
                  >
                    <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.gray500 }} />
                    <p className="text-lg" style={{ color: COLORS.gray400 }}>
                      No upcoming classes scheduled
                    </p>
                  </div>
                ) : (
                  upcomingClasses.map((cls) => (
                    <EnhancedClassCard
                      key={cls.id}
                      cls={cls}
                      type="upcoming"
                      permanentClassLink={permanentClassLink}
                      timezone={studentProfile?.timezone}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "progress" && (
              <div className="grid gap-4 md:grid-cols-2">
                {assignments.length === 0 ? (
                  <div
                    className="col-span-2 text-center py-20 rounded-2xl border"
                    style={{
                      background: COLORS.bgSecondary,
                      borderColor: COLORS.glassBorder,
                    }}
                  >
                    <TrendingUp className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.gray500 }} />
                    <p className="text-lg" style={{ color: COLORS.gray400 }}>
                      No progress data available
                    </p>
                  </div>
                ) : (
                  assignments.map((assignment, i) => (
                    <ProgressCard
                      key={i}
                      assignment={assignment}
                      progressData={progressData}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "completed" && (
              <div className="space-y-4">
                {completedClasses.length === 0 ? (
                  <div
                    className="text-center py-20 rounded-2xl border"
                    style={{
                      background: COLORS.bgSecondary,
                      borderColor: COLORS.glassBorder,
                    }}
                  >
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.gray500 }} />
                    <p className="text-lg" style={{ color: COLORS.gray400 }}>
                      No completed classes yet
                    </p>
                  </div>
                ) : (
                  completedClasses.map((cls) => (
                    <EnhancedClassCard
                      key={cls.id}
                      cls={cls}
                      type="completed"
                      permanentClassLink={permanentClassLink}
                       timezone={studentProfile?.timezone}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === "missed" && (
              <div className="space-y-4">
                {missedClasses.length === 0 ? (
                  <div
                    className="text-center py-20 rounded-2xl border"
                    style={{
                      background: COLORS.bgSecondary,
                      borderColor: COLORS.glassBorder,
                    }}
                  >
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.accentGreen }} />
                    <p className="text-lg" style={{ color: COLORS.gray400 }}>
                      No missed classes - Great job!
                    </p>
                  </div>
                ) : (
                  missedClasses.map((cls) => (
                    <EnhancedClassCard
                      key={cls.id}
                      cls={cls}
                      type="missed"
                      permanentClassLink={permanentClassLink}
                      timezone={studentProfile?.timezone}
                    />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
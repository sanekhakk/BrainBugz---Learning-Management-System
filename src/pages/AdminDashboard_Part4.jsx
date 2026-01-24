// CREATE THIS NEW FILE: src/pages/AdminDashboard_Part4.jsx
// This file contains the comprehensive Classes Management view organized by student

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Trash2,
  User,
  BookOpen,
  Loader2,
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

// ====================================================================
// STAT CARD FOR CLASSES OVERVIEW
// ====================================================================
const ClassStatCard = ({ icon: Icon, label, value, gradient }) => (
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
// CLASS CARD COMPONENT
// ====================================================================
const ClassCard = ({ cls, onDelete, isDeleting }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "missed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "scheduled":
      case "pending":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "missed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -3 }}
      className="p-5 rounded-2xl border backdrop-blur-xl"
      style={{
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {/* Rescheduled Badge */}
          {cls.isRescheduled && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                RESCHEDULED
              </span>
              {cls.originalClassDate && (
                <p className="text-xs text-gray-400 mt-1">
                  Original: <span className="text-yellow-400">{cls.originalClassDate}</span>
                </p>
              )}
            </div>
          )}

          {/* Subject */}
          <h3 className="text-lg font-bold text-white mb-1">{cls.subject}</h3>

          {/* Tutor Info */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400 flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              Tutor: <span className="text-purple-400 ml-1">{cls.tutorName}</span>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center ${getStatusColor(
              cls.status
            )}`}
          >
            {getStatusIcon(cls.status)}
            <span className="ml-1 capitalize">{cls.status || "scheduled"}</span>
          </span>
        </div>
      </div>

      {/* Date and Time */}
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

      {/* Summary (if exists) */}
      {cls.summary && (
        <div
          className={`p-3 rounded-xl text-sm mb-4 ${
            cls.status === "completed"
              ? "bg-green-500/10 text-green-300 border border-green-500/20"
              : "bg-red-500/10 text-red-300 border border-red-500/20"
          }`}
        >
          <p className="font-semibold mb-1">
            {cls.status === "completed" ? "Topics Covered:" : "Reason:"}
          </p>
          <p>{cls.summary}</p>
        </div>
      )}

      {/* Delete Button */}
      <motion.button
        onClick={() => onDelete(cls)}
        disabled={isDeleting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-red-400 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all disabled:opacity-50"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Class
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

// ====================================================================
// STUDENT CARD COMPONENT
// ====================================================================
const StudentCard = ({ student, classCount, onSelect }) => {
  const stats = classCount[student.uid] || { total: 0, scheduled: 0, completed: 0, missed: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, x: 5 }}
      onClick={() => onSelect(student)}
      className="p-6 rounded-2xl border backdrop-blur-xl cursor-pointer group"
      style={{
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.md,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="p-3 rounded-xl"
            style={{
              background: GRADIENTS.primary,
            }}
          >
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{student.name}</h3>
            <p className="text-xs text-gray-400">
              {student.customId} • Grade {student.classLevel}
            </p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
      </div>

      {/* Subjects */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(student.assignments || []).map((assignment, idx) => (
          <span
            key={idx}
            className="px-2 py-1 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
          >
            {assignment.subject}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center p-2 rounded-lg" style={{ background: COLORS.glassBg }}>
          <p className="text-lg font-bold text-white">{stats.total}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: COLORS.glassBg }}>
          <p className="text-lg font-bold text-cyan-400">{stats.scheduled}</p>
          <p className="text-xs text-gray-400">Due</p>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: COLORS.glassBg }}>
          <p className="text-lg font-bold text-green-400">{stats.completed}</p>
          <p className="text-xs text-gray-400">Done</p>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: COLORS.glassBg }}>
          <p className="text-lg font-bold text-red-400">{stats.missed}</p>
          <p className="text-xs text-gray-400">Missed</p>
        </div>
      </div>
    </motion.div>
  );
};

// ====================================================================
// STUDENT DETAIL VIEW (Class History)
// ====================================================================
const StudentDetailView = ({ student, classes, onBack, onDeleteClass, isDeletingId }) => {
  const [filterStatus, setFilterStatus] = useState("all");

  const studentClasses = classes.filter((cls) => cls.studentId === student.uid);

  const filtered = studentClasses.filter((cls) => {
    if (filterStatus === "all") return true;
    return cls.status === filterStatus;
  });

  const stats = {
    total: studentClasses.length,
    scheduled: studentClasses.filter((c) => c.status === "scheduled" || c.status === "pending").length,
    completed: studentClasses.filter((c) => c.status === "completed").length,
    missed: studentClasses.filter((c) => c.status === "missed").length,
    rescheduled: studentClasses.filter((c) => c.isRescheduled).length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl border hover:bg-white/5 transition-colors"
            style={{ borderColor: COLORS.glassBorder }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </motion.button>
          <div>
            <h2 className="text-2xl font-bold text-white">{student.name}'s Classes</h2>
            <p className="text-sm text-gray-400">
              {student.customId} • Grade {student.classLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <ClassStatCard
          icon={Calendar}
          label="Total Classes"
          value={stats.total}
          gradient={GRADIENTS.primary}
        />
        <ClassStatCard
          icon={Clock}
          label="Scheduled"
          value={stats.scheduled}
          gradient={GRADIENTS.secondary}
        />
        <ClassStatCard
          icon={CheckCircle}
          label="Completed"
          value={stats.completed}
          gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
        />
        <ClassStatCard
          icon={XCircle}
          label="Missed"
          value={stats.missed}
          gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
        />
        <ClassStatCard
          icon={TrendingUp}
          label="Rescheduled"
          value={stats.rescheduled}
          gradient={GRADIENTS.purple}
        />
      </div>

      {/* Filter */}
      <div
        className="p-6 rounded-2xl border backdrop-blur-xl"
        style={{
          background: COLORS.glassBg,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.lg,
        }}
      >
        <div className="flex items-center space-x-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border text-white focus:ring-2 focus:ring-cyan-500"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
            }}
          >
            <option value="all">All Status ({stats.total})</option>
            <option value="scheduled">Scheduled ({stats.scheduled})</option>
            <option value="completed">Completed ({stats.completed})</option>
            <option value="missed">Missed ({stats.missed})</option>
          </select>
        </div>
      </div>

      {/* Classes Grid */}
      <div
        className="p-6 rounded-2xl border backdrop-blur-xl"
        style={{
          background: COLORS.glassBg,
          borderColor: COLORS.glassBorder,
          boxShadow: SHADOWS.lg,
        }}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-1">No classes found</p>
            <p className="text-sm">
              {filterStatus !== "all"
                ? "Try changing the filter"
                : "No classes scheduled for this student yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cls) => (
              <ClassCard
                key={cls.id}
                cls={cls}
                onDelete={onDeleteClass}
                isDeleting={isDeletingId === cls.id}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ====================================================================
// MAIN CLASSES OVERVIEW COMPONENT
// ====================================================================
export function ClassesOverview({ setActiveView, adminDeleteClass }) {
  const [allClasses, setAllClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDeletingId, setIsDeletingId] = useState(null);

  // Fetch all classes
  useEffect(() => {
    setIsLoadingClasses(true);
    const q = query(collection(db, "classes"), orderBy("classDate", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const classes = snapshot.docs.map((doc) => ({
          id: doc.id,
          status: doc.data().status || "scheduled",
          ...doc.data(),
        }));
        setAllClasses(classes);
        setIsLoadingClasses(false);
      },
      (err) => {
        console.error("Error fetching classes:", err);
        setError("Failed to load classes");
        setIsLoadingClasses(false);
      }
    );

    return () => unsub();
  }, []);

  // Fetch all students
  useEffect(() => {
    setIsLoadingStudents(true);
    const q = query(collection(db, "userSummaries"), where("role", "==", "student"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const studentList = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        studentList.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(studentList);
        setIsLoadingStudents(false);
      },
      (err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
        setIsLoadingStudents(false);
      }
    );

    return () => unsub();
  }, []);

  // Filter students by search
  const filteredStudents = students.filter((student) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (student.name || "").toLowerCase().includes(q) ||
      (student.customId || "").toLowerCase().includes(q)
    );
  });

  // Calculate class count per student
  const classCountPerStudent = {};
  students.forEach((student) => {
    const studentClasses = allClasses.filter((cls) => cls.studentId === student.uid);
    classCountPerStudent[student.uid] = {
      total: studentClasses.length,
      scheduled: studentClasses.filter((c) => c.status === "scheduled" || c.status === "pending").length,
      completed: studentClasses.filter((c) => c.status === "completed").length,
      missed: studentClasses.filter((c) => c.status === "missed").length,
    };
  });

  // Handle delete
  const handleDelete = async (cls) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this class?\n\nSubject: ${cls.subject}\nDate: ${cls.classDate}\n\nThis action cannot be undone.`
      )
    )
      return;

    setIsDeletingId(cls.id);
    const result = await adminDeleteClass(cls.id);
    setIsDeletingId(null);

    if (result.success) {
      alert(`Class deleted successfully`);
    } else {
      alert(`Failed to delete class: ${result.error}`);
    }
  };

  const isLoading = isLoadingClasses || isLoadingStudents;

  return (
    <AnimatePresence mode="wait">
      {selectedStudent ? (
        <StudentDetailView
          key="detail"
          student={selectedStudent}
          classes={allClasses}
          onBack={() => setSelectedStudent(null)}
          onDeleteClass={handleDelete}
          isDeletingId={isDeletingId}
        />
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Classes Management</h2>
              <p className="text-gray-400">Select a student to view their class history</p>
            </div>
            <motion.button
              onClick={() => setActiveView("list")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 rounded-xl font-semibold text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </motion.button>
          </div>

          {/* Search */}
          <div
            className="p-6 rounded-2xl border backdrop-blur-xl"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              boxShadow: SHADOWS.lg,
            }}
          >
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students by name or ID..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
                style={{
                  background: COLORS.glassBg,
                  borderColor: COLORS.glassBorder,
                }}
              />
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>

          {/* Students Grid */}
          <div
            className="p-6 rounded-2xl border backdrop-blur-xl"
            style={{
              background: COLORS.glassBg,
              borderColor: COLORS.glassBorder,
              boxShadow: SHADOWS.lg,
            }}
          >
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              </div>
            ) : error ? (
              <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                {error}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-1">No students found</p>
                <p className="text-sm">
                  {search ? "Try adjusting your search" : "No students registered yet"}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                  <StudentCard
                    key={student.uid}
                    student={student}
                    classCount={classCountPerStudent}
                    onSelect={setSelectedStudent}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
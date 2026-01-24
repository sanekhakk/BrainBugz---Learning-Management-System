// CREATE THIS NEW FILE: src/pages/AdminDashboard_Part3.jsx
// This file contains the Class Scheduling components

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  X, 
  Search, 
  ChevronRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { InputField, SelectField } from "../components/FormFields";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

// ====================================================================
// STUDENT SELECTION VIEW
// ====================================================================
export function StudentSelectionView({ students, onSelectStudent, setActiveView }) {
  const [search, setSearch] = useState("");

  const filtered = students.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (s.name || "").toLowerCase().includes(q) || 
           (s.customId || "").toLowerCase().includes(q);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 rounded-2xl border backdrop-blur-xl"
      style={{
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.lg,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Select Student to Schedule Class</h2>
        <motion.button
          onClick={() => setActiveView("list")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by name or ID..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
            style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No students found</div>
        ) : (
          filtered.map((student) => (
            <motion.div
              key={student.uid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
              onClick={() => onSelectStudent(student)}
              className="p-5 rounded-xl border backdrop-blur-xl cursor-pointer group"
              style={{
                background: COLORS.glassBg,
                borderColor: COLORS.glassBorder,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{student.name}</h3>
                  <p className="text-sm text-gray-400">
                    ID: {student.customId} • Class: {student.classLevel}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(student.assignments || []).map((assignment, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      >
                        {assignment.subject}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

// ====================================================================
// CLASS SCHEDULING FORM
// ====================================================================
export function ClassSchedulingForm({ 
  selectedStudent, 
  onBack, 
  adminScheduleClass,
  setActiveView 
}) {
  const [form, setForm] = useState({
    subject: "",
    classDate: "",
    classTime: "",
    isRescheduled: false,
    originalClassDate: ""
  });

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [missedClasses, setMissedClasses] = useState([]);
  const [loadingMissed, setLoadingMissed] = useState(false);

  const assignments = selectedStudent.assignments || [];

  // Load missed classes when reschedule is checked
  useEffect(() => {
    if (form.isRescheduled && selectedStudent.uid && form.subject) {
      setLoadingMissed(true);
      const q = query(
        collection(db, "classes"),
        where("studentId", "==", selectedStudent.uid),
        where("subject", "==", form.subject),
        where("status", "==", "missed")
      );

      const unsub = onSnapshot(q, (snap) => {
        const missed = snap.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));
        setMissedClasses(missed);
        setLoadingMissed(false);
      });

      return () => unsub();
    } else {
      setMissedClasses([]);
      setForm(prev => ({ ...prev, originalClassDate: "" }));
    }
  }, [form.isRescheduled, form.subject, selectedStudent.uid]);

  const handleSubjectChange = (e) => {
    const subjectValue = e.target.value;
    setForm(prev => ({ ...prev, subject: subjectValue }));

    // Find the assigned tutor for this subject
    const assignment = assignments.find(a => a.subject === subjectValue);
    if (assignment) {
      setSelectedTutor({
        id: assignment.tutorId,
        name: assignment.tutorName
      });
    } else {
      setSelectedTutor(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const isFormValid = () => {
    if (!form.subject || !form.classDate || !form.classTime || !selectedTutor) {
      return false;
    }
    if (form.isRescheduled && !form.originalClassDate) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!isFormValid()) {
      setStatus({ ok: false, msg: "Please fill all required fields." });
      return;
    }

    setIsLoading(true);

    const classData = {
      studentId: selectedStudent.uid,
      studentName: selectedStudent.name,
      tutorId: selectedTutor.id,
      tutorName: selectedTutor.name,
      subject: form.subject,
      classDate: form.classDate,
      classTime: form.classTime,
      status: "scheduled",
      isRescheduled: form.isRescheduled,
      originalClassDate: form.isRescheduled ? form.originalClassDate : "",
      createdAt: new Date()
    };

    try {
      const result = await adminScheduleClass(classData);
      setIsLoading(false);

      if (result && result.success) {
        alert(`SUCCESS! Class scheduled for ${selectedStudent.name}`);
        setStatus({ ok: true, msg: result.message || "Class scheduled successfully" });
        setTimeout(() => {
          setActiveView("list");
        }, 1000);
      } else {
        alert(`ERROR: ${result?.error || "Failed to schedule class"}`);
        setStatus({ ok: false, msg: result?.error || "Failed to schedule class" });
      }
    } catch (err) {
      alert(`ERROR: ${err?.message || "Server error"}`);
      setIsLoading(false);
      setStatus({ ok: false, msg: err?.message || "Server error" });
    }
  };

  const subjectOptions = assignments.map(a => ({
    value: a.subject,
    label: a.subject
  }));

  const missedClassOptions = missedClasses.map(cls => ({
    value: cls.classDate,
    label: `${cls.classDate} at ${cls.classTime}`
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 rounded-2xl border backdrop-blur-xl"
      style={{
        background: COLORS.glassBg,
        borderColor: COLORS.glassBorder,
        boxShadow: SHADOWS.lg,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Schedule Class</h2>
          <p className="text-sm text-gray-400 mt-1">
            Student: <span className="text-cyan-400 font-semibold">{selectedStudent.name}</span> • 
            ID: {selectedStudent.customId}
          </p>
        </div>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-4 rounded-xl ${
              status.ok
                ? "bg-green-500/10 border border-green-500/30 text-green-300"
                : "bg-red-500/10 border border-red-500/30 text-red-300"
            }`}
          >
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject Selection */}
        <SelectField
          label="Subject"
          name="subject"
          value={form.subject}
          onChange={handleSubjectChange}
          options={subjectOptions}
          required
        />

        {/* Auto-selected Tutor Display */}
        {selectedTutor && (
          <div className="p-4 rounded-xl border" style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Assigned Tutor
            </label>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-white font-semibold">{selectedTutor.name}</span>
            </div>
          </div>
        )}

        {/* Date and Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Class Date"
            name="classDate"
            type="date"
            value={form.classDate}
            onChange={handleFormChange}
            required
          />
          <InputField
            label="Class Time"
            name="classTime"
            type="time"
            value={form.classTime}
            onChange={handleFormChange}
            required
          />
        </div>

        {/* Reschedule Checkbox */}
        <div className="p-4 rounded-xl border" style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isRescheduled"
              checked={form.isRescheduled}
              onChange={handleFormChange}
              className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
            />
            <span className="ml-3 text-sm font-semibold text-white">
              This is a rescheduled class
            </span>
          </label>
          {form.isRescheduled && (
            <p className="text-xs text-gray-400 mt-2">
              Select the original missed class date below
            </p>
          )}
        </div>

        {/* Original Missed Class Selection */}
        {form.isRescheduled && (
          <div>
            {loadingMissed ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                <span className="ml-2 text-sm text-gray-400">Loading missed classes...</span>
              </div>
            ) : missedClasses.length === 0 ? (
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                No missed classes found for {form.subject}
              </div>
            ) : (
              <SelectField
                label="Original Missed Class Date"
                name="originalClassDate"
                value={form.originalClassDate}
                onChange={handleFormChange}
                options={missedClassOptions}
                required
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        <motion.button
          disabled={!isFormValid() || isLoading}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50"
          style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.glow }}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            <>
              <Calendar className="w-5 h-5 inline mr-2" />
              Schedule Class
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
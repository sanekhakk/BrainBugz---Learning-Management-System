// CREATE THIS NEW FILE: src/pages/AdminDashboard_Part2.jsx
// This file contains the Registration and Edit panels

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Loader2, XCircle, X } from "lucide-react";
import { InputField, SelectField } from "../components/FormFields";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

// ====================================================================
// REGISTRATION PANEL
// ====================================================================
export function RegistrationPanel({
  form,
  regRole,
  regStatus,
  regLoading,
  handleFormChange,
  setRegRole,
  setActiveView,
  setRegStatus,
  tutors,
  setForm,
  initialFormState,
  adminRegisterUser,
  setRegLoading,
}) {
  const [currentSubjectInput, setCurrentSubjectInput] = useState("");
  const [selectedTutor, setSelectedTutor] = useState({ id: "", name: "" });
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  const tutorOptions = tutors.map((t) => ({
    value: t.uid,
    label: `${t.name} (${t.subjects.join(", ") || "Any"})`,
  }));

  const handleAddAssignment = () => {
    if (currentSubjectInput.trim() && selectedTutor.id) {
      setAssignedSubjects((prev) => [
        ...prev,
        {
          subject: currentSubjectInput.trim(),
          tutorId: selectedTutor.id,
          tutorName: selectedTutor.name,
        },
      ]);
      setCurrentSubjectInput("");
      setSelectedTutor({ id: "", name: "" });
    } else {
      setRegStatus({ ok: false, msg: "Please enter Subject and select Tutor." });
      setTimeout(() => setRegStatus(null), 3000);
    }
  };

  const handleRemoveAssignment = (index) => {
    setAssignedSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const localIsFormValid = () => {
    const baseValid = form.name?.trim() && form.email?.trim() && form.password?.trim() && form.contactNumber?.trim();
    if (!baseValid) return false;

    if (regRole === "student") {
      return (
        form.classLevel?.trim() &&
        form.emergencyContact?.trim() &&
        form.permanentClassLink?.trim() &&
        assignedSubjects.length > 0
      );
    }
    if (regRole === "tutor") {
      return form.qualifications?.trim() && form.hourlyRate?.trim() && form.subjects.length > 0;
    }
    return true;
  };

  const localHandleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegStatus(null);
    setRegLoading(true);

    if (!localIsFormValid()) {
      setRegLoading(false);
      setRegStatus({ ok: false, msg: "Please fill all required fields." });
      return;
    }

    const finalForm = {
      ...Object.fromEntries(
        Object.entries(form).map(([key, value]) =>
          typeof value === "string" ? [key, value.trim()] : [key, value]
        )
      ),
      role: regRole,
      subjects: regRole === "student" ? assignedSubjects.map((a) => a.subject) : form.subjects || [],
      assignments: regRole === "student" ? assignedSubjects : [],
      permanentClassLink: regRole === "student" ? form.permanentClassLink : "",
    };

    try {
      const res = await adminRegisterUser(finalForm, regRole);
      setRegLoading(false);

      if (res && res.success) {
        alert(`SUCCESS! ${res.message || `${regRole} created`}. Navigating to list.`);
        setRegStatus({ ok: true, msg: res.message || `${regRole} created.` });

        setAssignedSubjects([]);
        setCurrentSubjectInput("");
        setSelectedTutor({ id: "", name: "" });
        setForm(initialFormState);

        setTimeout(() => {
          setRegStatus(null);
          setActiveView("list");
        }, 900);
      } else {
        const errorMessage = res?.error || "Registration failed";
        alert(`ERROR: ${errorMessage}`);
        setRegStatus({ ok: false, msg: errorMessage });
      }
    } catch (err) {
      const networkError = err?.message || "Failed to connect to server.";
      alert(`CRITICAL ERROR: ${networkError}`);
      setRegLoading(false);
      setRegStatus({ ok: false, msg: `Error: ${networkError}` });
    }
  };

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
        <h2 className="text-2xl font-bold text-white">Register New User</h2>
        <motion.button
          onClick={() => {
            setActiveView("list");
            setRegStatus(null);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex gap-3 mb-6">
        {["student", "tutor"].map((role) => (
          <motion.button
            key={role}
            onClick={() => {
              setRegRole(role);
              setForm(initialFormState);
              setAssignedSubjects([]);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
              regRole === role ? "text-white" : "text-gray-400"
            }`}
            style={{
              background: regRole === role ? GRADIENTS.primary : COLORS.glassBg,
              border: `1px solid ${regRole === role ? "transparent" : COLORS.glassBorder}`,
              boxShadow: regRole === role ? SHADOWS.md : "none",
            }}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {regStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-4 rounded-xl ${
              regStatus.ok
                ? "bg-green-500/10 border border-green-500/30 text-green-300"
                : "bg-red-500/10 border border-red-500/30 text-red-300"
            }`}
          >
            {regStatus.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={localHandleRegisterSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Full name" name="name" value={form.name} onChange={handleFormChange} required />
          <InputField label="Email" name="email" value={form.email} onChange={handleFormChange} type="email" required />
          <InputField label="Temp password" name="password" value={form.password} onChange={handleFormChange} type="password" required />
          <InputField label="Contact number" name="contactNumber" value={form.contactNumber} onChange={handleFormChange} required />

          {regRole === "student" && (
            <>
              <InputField label="Class / Grade" name="classLevel" value={form.classLevel} onChange={handleFormChange} required />
              <InputField label="Emergency contact" name="emergencyContact" value={form.emergencyContact} onChange={handleFormChange} required />
              <InputField
                label="Permanent Class Link"
                name="permanentClassLink"
                value={form.permanentClassLink}
                onChange={handleFormChange}
                type="url"
                required
                placeholder="https://meet.google.com/xyz"
              />
            </>
          )}

          {regRole === "tutor" && (
            <>
              <InputField label="Qualifications" name="qualifications" value={form.qualifications} onChange={handleFormChange} required />
              <InputField label="Hourly rate" name="hourlyRate" value={form.hourlyRate} onChange={handleFormChange} required />
              <InputField
                label="Subjects (comma separated)"
                name="subjects"
                value={form.subjects.join(", ")}
                onChange={(e) =>
                  handleFormChange({
                    target: {
                      name: "subjects",
                      value: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                required
              />
            </>
          )}
        </div>

        {regRole === "student" && (
          <div className="p-6 rounded-xl border-2 border-dashed" style={{ borderColor: COLORS.glassBorder }}>
            <label className="block text-base font-bold text-white mb-4">
              Assign Tutors & Subjects <span className="text-red-400">*</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 mb-4 items-end">
              <InputField
                label="Subject Name"
                name="currentSubject"
                value={currentSubjectInput}
                onChange={(e) => setCurrentSubjectInput(e.target.value)}
                placeholder="e.g., Python, Physics"
              />
              <SelectField
                label="Choose Tutor"
                name="selectedTutor"
                value={selectedTutor.id}
                onChange={(e) => {
                  const tutorId = e.target.value;
                  const tutor = tutors.find((t) => t.uid === tutorId);
                  setSelectedTutor({ id: tutorId, name: tutor ? tutor.name : "" });
                }}
                options={tutorOptions}
              />
              <motion.button
                type="button"
                onClick={handleAddAssignment}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2.5 px-4 h-[44px] rounded-xl font-bold text-white"
                style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.md }}
              >
                <PlusCircle className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {assignedSubjects.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4 border-t" style={{ borderColor: COLORS.glassBorder }}>
                  No subjects assigned yet
                </p>
              ) : (
                assignedSubjects.map((assignment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center p-3 rounded-xl border"
                    style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}
                  >
                    <div>
                      <span className="font-semibold text-white">{assignment.subject}</span>
                      <span className="text-xs text-cyan-400 ml-3">• {assignment.tutorName}</span>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveAssignment(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30"
                    >
                      <XCircle className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        <motion.button
          disabled={!localIsFormValid() || regLoading}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50"
          style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.glow }}
        >
          {regLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : `Create ${regRole}`}
        </motion.button>
      </form>
    </motion.div>
  );
}

// ====================================================================
// EDIT USER PANEL
// ====================================================================
export function EditUserPanel({ user, setActiveView, tutors, adminUpdateUser }) {
  const {
    uid, name, email, role, contactNumber = "", emergencyContact = "", classLevel = "",
    subjects = [], qualifications = "", hourlyRate = "", permanentClassLink = "",
    assignments: initialAssignments = [], syllabus = "",
  } = user;

  const [form, setForm] = useState({
    name, email, contactNumber, emergencyContact, classLevel, qualifications,
    hourlyRate, permanentClassLink, syllabus,
    tutorSubjectsString: role === "tutor" ? subjects.join(", ") : "",
  });

  const [assignedSubjects, setAssignedSubjects] = useState(initialAssignments);
  const [currentSubjectInput, setCurrentSubjectInput] = useState("");
  const [selectedTutor, setSelectedTutor] = useState({ id: "", name: "" });
  const [updateStatus, setUpdateStatus] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const tutorOptions = tutors.map((t) => ({
    value: t.uid,
    label: `${t.name} (${t.subjects.join(", ") || "Any"})`,
  }));

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAssignment = () => {
    if (currentSubjectInput.trim() && selectedTutor.id) {
      setAssignedSubjects((prev) => [
        ...prev,
        { subject: currentSubjectInput.trim(), tutorId: selectedTutor.id, tutorName: selectedTutor.name },
      ]);
      setCurrentSubjectInput("");
      setSelectedTutor({ id: "", name: "" });
    }
  };

  const handleRemoveAssignment = (index) => {
    setAssignedSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const localIsFormValid = () => {
    if (role === "student" && assignedSubjects.length === 0) return false;
    if (!form.name || !form.email || !form.contactNumber) return false;
    if (role === "student" && (!form.classLevel || !form.emergencyContact || !form.permanentClassLink)) return false;
    if (role === "tutor" && (!form.qualifications || !form.hourlyRate)) return false;
    return true;
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus(null);
    setUpdateLoading(true);

    if (!localIsFormValid()) {
      setUpdateLoading(false);
      setUpdateStatus({ ok: false, msg: "Fill all required fields." });
      return;
    }

    const tutorSubjectsArray = form.tutorSubjectsString
      ? form.tutorSubjectsString.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const finalForm = {
      ...form,
      role: role,
      subjects: role === "tutor" ? tutorSubjectsArray : assignedSubjects.map((a) => a.subject),
      assignments: role === "student" ? assignedSubjects : [],
    };

    try {
      const res = await adminUpdateUser(uid, finalForm);
      setUpdateLoading(false);

      if (res && res.success) {
        alert(`SUCCESS! ${res.message || `${role} updated`}`);
        setUpdateStatus({ ok: true, msg: res.message || `${role} updated.` });
        setTimeout(() => {
          setUpdateStatus(null);
          setActiveView("list");
        }, 900);
      } else {
        alert(`ERROR: ${res?.error || "Update failed"}`);
        setUpdateStatus({ ok: false, msg: res?.error || "Update failed" });
      }
    } catch (err) {
      alert(`ERROR: ${err?.message || "Failed"}`);
      setUpdateLoading(false);
      setUpdateStatus({ ok: false, msg: `Error: ${err?.message}` });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-8 rounded-2xl border backdrop-blur-xl"
      style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder, boxShadow: SHADOWS.lg }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Edit {role.charAt(0).toUpperCase() + role.slice(1)}: {name}
        </h2>
        <motion.button onClick={() => setActiveView("list")} whileHover={{ scale: 1.05 }}>
          <X className="w-5 h-5 text-gray-400 hover:text-white" />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {updateStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-4 rounded-xl ${
              updateStatus.ok ? "bg-green-500/10 border border-green-500/30 text-green-300" : 
              "bg-red-500/10 border border-red-500/30 text-red-300"
            }`}
          >
            {updateStatus.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleUpdateSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Full Name" name="name" value={form.name} onChange={handleFormChange} required />
          <InputField label="Email (Read-only)" name="email" value={form.email} readOnly disabled />
          <InputField label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleFormChange} required />

          {role === "student" && (
            <>
              <InputField label="Class / Grade" name="classLevel" value={form.classLevel} onChange={handleFormChange} required />
              <InputField label="Emergency Contact" name="emergencyContact" value={form.emergencyContact} onChange={handleFormChange} required />
              <InputField label="Permanent Class Link" name="permanentClassLink" value={form.permanentClassLink} onChange={handleFormChange} type="url" required />
              <InputField label="Syllabus" name="syllabus" value={form.syllabus} onChange={handleFormChange} />
            </>
          )}

          {role === "tutor" && (
            <>
              <InputField label="Qualifications" name="qualifications" value={form.qualifications} onChange={handleFormChange} required />
              <InputField label="Hourly Rate" name="hourlyRate" value={form.hourlyRate} onChange={handleFormChange} required />
              <InputField label="Subjects Taught" name="tutorSubjectsString" value={form.tutorSubjectsString} onChange={handleFormChange} required />
            </>
          )}
        </div>

        {role === "student" && (
          <div className="p-6 rounded-xl border-2 border-dashed" style={{ borderColor: COLORS.glassBorder }}>
            <label className="block text-base font-bold text-white mb-4">
              Assign Subjects <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 mb-4 items-end">
              <InputField label="Subject Name" name="currentSubject" value={currentSubjectInput}
                onChange={(e) => setCurrentSubjectInput(e.target.value)} />
              <SelectField label="Choose Tutor" name="selectedTutor" value={selectedTutor.id}
                onChange={(e) => {
                  const tutorId = e.target.value;
                  const tutor = tutors.find((t) => t.uid === tutorId);
                  setSelectedTutor({ id: tutorId, name: tutor ? tutor.name : "" });
                }}
                options={tutorOptions} />
              <motion.button type="button" onClick={handleAddAssignment} whileHover={{ scale: 1.05 }}
                className="py-2.5 px-4 h-[44px] rounded-xl font-bold text-white"
                style={{ background: GRADIENTS.primary }}>
                <PlusCircle className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {assignedSubjects.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No subjects assigned</p>
              ) : (
                assignedSubjects.map((assignment, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-xl border"
                    style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
                    <div>
                      <span className="font-semibold text-white">{assignment.subject}</span>
                      <span className="text-xs text-cyan-400 ml-3">• {assignment.tutorName}</span>
                    </div>
                    <motion.button type="button" onClick={() => handleRemoveAssignment(index)}
                      whileHover={{ scale: 1.1 }} className="p-1.5 rounded-lg bg-red-500/20">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <motion.button disabled={updateLoading || !localIsFormValid()} type="submit"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50"
          style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.glow }}>
          {updateLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : `Update ${role}`}
        </motion.button>
      </form>
    </motion.div>
  );
}
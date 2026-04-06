// src/pages/AdminDashboard_Part5.jsx
// Curriculum Manager — Admin can add / edit / delete modules & lessons
// for each of the 3 student categories.

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle, Pencil, Trash2, ChevronDown, ChevronRight,
  BookOpen, Loader2, CheckCircle, XCircle, X, Database, AlertCircle,
} from "lucide-react";
import {
  collection, query, where, onSnapshot, addDoc, updateDoc,
  deleteDoc, doc, serverTimestamp, orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { CATEGORIES, seedCurriculumToFirestore } from "../utils/curriculumData";

const C = {
  bg: "#F4F6FB", card: "#FFFFFF", border: "#E5E9F2",
  textPrimary: "#0F172A", textSecondary: "#475569", textMuted: "#94A3B8",
  emerald: "#10B981", emeraldLight: "#ECFDF5", emeraldDark: "#059669",
  cyan: "#0EA5E9", cyanLight: "#E0F2FE",
  indigo: "#6366F1", indigoLight: "#EEF2FF",
  red: "#EF4444", redLight: "#FEF2F2",
  amber: "#F59E0B", amberLight: "#FFFBEB",
  violet: "#8B5CF6", violetLight: "#F5F3FF",
  gradPrimary: "linear-gradient(135deg, #0EA5E9 0%, #10B981 100%)",
  gradEmerald: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  shadowCard: "0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
  shadowModal: "0 24px 64px rgba(15,23,42,0.18)",
};

const fieldStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 10, border: `1px solid ${C.border}`,
  background: C.bg, fontSize: 13, color: C.textPrimary, outline: "none",
  fontFamily: "inherit", boxSizing: "border-box",
};

const catColor = {
  little_pearls: { bg: "#FFF7ED", border: "#FB923C", text: "#EA580C", light: "#FED7AA" },
  bright_pearls: { bg: "#F0FDF4", border: "#22C55E", text: "#16A34A", light: "#BBF7D0" },
  rising_pearls: { bg: "#EFF6FF", border: "#60A5FA", text: "#2563EB", light: "#BFDBFE" },
};

// ── Tiny helpers ──────────────────────────────────────────────
const Banner = ({ status }) => {
  if (!status) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
      style={{ padding: "10px 14px", borderRadius: 10, marginBottom: 12, fontSize: 13, fontWeight: 600,
        background: status.ok ? C.emeraldLight : C.redLight, color: status.ok ? C.emerald : C.red,
        display: "flex", alignItems: "center", gap: 8 }}>
      {status.ok ? <CheckCircle style={{ width: 14, height: 14 }} /> : <XCircle style={{ width: 14, height: 14 }} />}
      {status.msg}
    </motion.div>
  );
};

const FieldLabel = ({ children, required }) => (
  <label style={{ fontSize: 11, fontWeight: 700, color: C.textSecondary, display: "block", marginBottom: 5 }}>
    {children}{required && <span style={{ color: C.red }}> *</span>}
  </label>
);

// ── Lesson Form Modal ─────────────────────────────────────────
function LessonModal({ moduleDoc, lesson, onClose, onSave }) {
  const isEdit = !!lesson;
  const blankLesson = { title: "", platform: "", description: "", notes: "", pptLink: "" };
  const [form, setForm] = useState(isEdit ? { ...lesson } : blankLesson);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.platform.trim()) { setErr("Title and Platform are required."); return; }
    setSaving(true); setErr(null);
    try {
      const lessons = [...(moduleDoc.lessons || [])];
      if (isEdit) {
        const idx = lessons.findIndex(l => l.id === lesson.id);
        if (idx >= 0) lessons[idx] = { ...lessons[idx], ...form };
      } else {
        const nextNum = lessons.length > 0 ? Math.max(...lessons.map(l => l.lessonNumber)) + 1 : 1;
        lessons.push({
          id: `${moduleDoc.category}_m${moduleDoc.moduleNumber}_l${nextNum}_${Date.now()}`,
          lessonNumber: nextNum,
          ...form,
        });
      }
      await updateDoc(doc(db, "curriculum", moduleDoc.id), { lessons, updatedAt: serverTimestamp() });
      onSave();
      onClose();
    } catch (e) {
      setErr(e.message);
    }
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.45)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94 }}
        style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: C.shadowModal, overflow: "hidden" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ height: 4, background: C.gradPrimary }} />
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.textPrimary }}>{isEdit ? "Edit Lesson" : "Add New Lesson"}</h3>
            <button onClick={onClose} style={{ background: C.bg, border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X style={{ width: 15, height: 15, color: C.textMuted }} />
            </button>
          </div>
          <Banner status={err ? { ok: false, msg: err } : null} />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <FieldLabel required>Lesson Title</FieldLabel>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. What is a Computer?" style={fieldStyle}
                onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <FieldLabel required>Platform Used</FieldLabel>
              <input name="platform" value={form.platform} onChange={handleChange} placeholder="e.g. Code.org + Scratch" style={fieldStyle}
                onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <FieldLabel>Lesson Description</FieldLabel>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                placeholder="What will the student learn and build in this lesson?"
                style={{ ...fieldStyle, resize: "none" }}
                onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <FieldLabel>Tutor Notes</FieldLabel>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                placeholder="Tips, prerequisites, or special instructions for the tutor..."
                style={{ ...fieldStyle, resize: "none" }}
                onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
            <div>
              <FieldLabel>PPT / Resource Link</FieldLabel>
              <input name="pptLink" value={form.pptLink} onChange={handleChange} placeholder="https://docs.google.com/..." style={fieldStyle}
                onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, fontSize: 13, fontWeight: 700, color: C.textSecondary, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleSave} disabled={saving}
              style={{ flex: 2, padding: "11px", borderRadius: 12, border: "none", background: C.gradPrimary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: saving ? 0.7 : 1 }}>
              {saving ? <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> : (isEdit ? "Save Changes" : "Add Lesson")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Module Form Modal ─────────────────────────────────────────
function ModuleModal({ category, existingModule, onClose, onSave }) {
  const isEdit = !!existingModule;
  const [form, setForm] = useState({
    moduleName: existingModule?.moduleName || "",
    moduleEmoji: existingModule?.moduleEmoji || "📚",
    moduleNumber: existingModule?.moduleNumber || "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    if (!form.moduleName.trim() || !form.moduleNumber) { setErr("Module name and number are required."); return; }
    setSaving(true); setErr(null);
    try {
      if (isEdit) {
        await updateDoc(doc(db, "curriculum", existingModule.id), {
          moduleName: form.moduleName.trim(),
          moduleEmoji: form.moduleEmoji.trim() || "📚",
          moduleNumber: Number(form.moduleNumber),
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "curriculum"), {
          category,
          moduleName: form.moduleName.trim(),
          moduleEmoji: form.moduleEmoji.trim() || "📚",
          moduleNumber: Number(form.moduleNumber),
          lessons: [],
          createdAt: serverTimestamp(),
        });
      }
      onSave();
      onClose();
    } catch (e) {
      setErr(e.message);
    }
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(15,23,42,0.45)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }}
        style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 420, boxShadow: C.shadowModal, overflow: "hidden" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ height: 4, background: C.gradEmerald }} />
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: C.textPrimary }}>{isEdit ? "Edit Module" : "Add New Module"}</h3>
            <button onClick={onClose} style={{ background: C.bg, border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X style={{ width: 15, height: 15, color: C.textMuted }} /></button>
          </div>
          <Banner status={err ? { ok: false, msg: err } : null} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 10 }}>
              <div>
                <FieldLabel>Emoji</FieldLabel>
                <input name="moduleEmoji" value={form.moduleEmoji} onChange={handleChange} style={{ ...fieldStyle, textAlign: "center", fontSize: 20 }} />
              </div>
              <div>
                <FieldLabel required>Module Number</FieldLabel>
                <input name="moduleNumber" value={form.moduleNumber} onChange={handleChange} type="number" min="1" placeholder="e.g. 12" style={fieldStyle}
                  onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
              </div>
            </div>
            <div>
              <FieldLabel required>Module Name</FieldLabel>
              <input name="moduleName" value={form.moduleName} onChange={handleChange} placeholder="e.g. Advanced Game Design" style={fieldStyle}
                onFocus={e => e.target.style.borderColor = C.emerald} onBlur={e => e.target.style.borderColor = C.border} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, fontSize: 13, fontWeight: 700, color: C.textSecondary, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleSave} disabled={saving}
              style={{ flex: 2, padding: "11px", borderRadius: 12, border: "none", background: C.gradEmerald, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {saving ? <Loader2 style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} /> : (isEdit ? "Save Changes" : "Add Module")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Module Row (collapsible) ──────────────────────────────────
function ModuleRow({ mod, col }) {
  const [open, setOpen] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editLesson, setEditLesson] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    const lessons = mod.lessons.filter(l => l.id !== lessonId);
    await updateDoc(doc(db, "curriculum", mod.id), { lessons });
  };

  const deleteModule = async () => {
    if (!window.confirm(`Delete Module ${mod.moduleNumber}: ${mod.moduleName} and ALL its lessons?`)) return;
    setDeleting(true);
    await deleteDoc(doc(db, "curriculum", mod.id));
  };

  return (
    <>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", boxShadow: C.shadowCard }}>
        {/* Module header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: col.bg, border: `1px solid ${col.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
            {mod.moduleEmoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary }}>Module {mod.moduleNumber}: {mod.moduleName}</p>
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{mod.lessons?.length || 0} lessons</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={e => { e.stopPropagation(); setShowModuleModal(true); }}
              style={{ padding: "5px 8px", borderRadius: 8, background: C.indigoLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Pencil style={{ width: 13, height: 13, color: C.indigo }} />
            </button>
            <button onClick={e => { e.stopPropagation(); deleteModule(); }} disabled={deleting}
              style={{ padding: "5px 8px", borderRadius: 8, background: C.redLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Trash2 style={{ width: 13, height: 13, color: C.red }} />
            </button>
            {open ? <ChevronDown style={{ width: 16, height: 16, color: C.textMuted }} /> : <ChevronRight style={{ width: 16, height: 16, color: C.textMuted }} />}
          </div>
        </div>

        {/* Lesson list */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              style={{ borderTop: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                {(mod.lessons || []).length === 0 ? (
                  <p style={{ textAlign: "center", fontSize: 13, color: C.textMuted, padding: "12px 0" }}>No lessons yet — add one below</p>
                ) : (
                  (mod.lessons || []).sort((a, b) => a.lessonNumber - b.lessonNumber).map(lesson => (
                    <div key={lesson.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 10, background: C.bg, border: `1px solid ${C.border}` }}>
                      <div style={{ width: 26, height: 26, borderRadius: 8, background: col.light, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color: col.text }}>
                        {lesson.lessonNumber}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary, marginBottom: 2 }}>{lesson.title}</p>
                        <p style={{ fontSize: 11, color: C.cyan, fontWeight: 600, marginBottom: lesson.description ? 4 : 0 }}>📱 {lesson.platform}</p>
                        {lesson.description && <p style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>{lesson.description}</p>}
                        {lesson.notes && <p style={{ fontSize: 11, color: C.amber, marginTop: 3 }}>📝 {lesson.notes}</p>}
                        {lesson.pptLink && (
                          <a href={lesson.pptLink} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: 11, color: C.indigo, fontWeight: 600, display: "inline-block", marginTop: 3 }}>🔗 View Resource</a>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button onClick={() => { setEditLesson(lesson); setShowLessonModal(true); }}
                          style={{ padding: "4px 7px", borderRadius: 7, background: C.indigoLight, border: "none", cursor: "pointer" }}>
                          <Pencil style={{ width: 12, height: 12, color: C.indigo }} />
                        </button>
                        <button onClick={() => deleteLesson(lesson.id)}
                          style={{ padding: "4px 7px", borderRadius: 7, background: C.redLight, border: "none", cursor: "pointer" }}>
                          <Trash2 style={{ width: 12, height: 12, color: C.red }} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
                <button onClick={() => { setEditLesson(null); setShowLessonModal(true); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, border: `1px dashed ${col.border}`, background: col.bg, color: col.text, fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%", justifyContent: "center" }}>
                  <PlusCircle style={{ width: 14, height: 14 }} /> Add Lesson
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLessonModal && (
          <LessonModal moduleDoc={mod} lesson={editLesson} onClose={() => { setShowLessonModal(false); setEditLesson(null); }} onSave={() => {}} />
        )}
        {showModuleModal && (
          <ModuleModal category={mod.category} existingModule={mod} onClose={() => setShowModuleModal(false)} onSave={() => {}} />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Category Panel ────────────────────────────────────────────
function CategoryPanel({ cat }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModule, setShowAddModule] = useState(false);
  const col = catColor[cat.value];

  useEffect(() => {
    const q = query(collection(db, "curriculum"), where("category", "==", cat.value));
    return onSnapshot(q, snap => {
      setModules(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.moduleNumber - b.moduleNumber));
      setLoading(false);
    });
  }, [cat.value]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 800, color: C.textPrimary }}>{cat.label}</p>
          <p style={{ fontSize: 12, color: C.textMuted }}>{cat.ages} · {modules.length} modules · {modules.reduce((s, m) => s + (m.lessons?.length || 0), 0)} lessons</p>
        </div>
        <button onClick={() => setShowAddModule(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: "none", background: C.gradPrimary, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
          <PlusCircle style={{ width: 14, height: 14 }} /> Add Module
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 40 }}><Loader2 style={{ width: 24, height: 24, color: C.emerald, animation: "spin 1s linear infinite" }} /></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {modules.map(mod => <ModuleRow key={mod.id} mod={mod} col={col} />)}
          {modules.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", borderRadius: 14, background: C.bg, border: `2px dashed ${C.border}` }}>
              <BookOpen style={{ width: 28, height: 28, color: C.textMuted, margin: "0 auto 10px", display: "block", opacity: 0.4 }} />
              <p style={{ fontSize: 13, color: C.textMuted }}>No modules yet. Click "Add Module" or seed the curriculum.</p>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showAddModule && <ModuleModal category={cat.value} onClose={() => setShowAddModule(false)} onSave={() => {}} />}
      </AnimatePresence>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────
export function CurriculumManager() {
  const [activeCategory, setActiveCategory] = useState("little_pearls");
  const [seeding, setSeeding] = useState(false);
  const [seedLog, setSeedLog] = useState([]);
  const [seedDone, setSeedDone] = useState(null);

  const handleSeed = async () => {
    if (!window.confirm("This will seed the initial PearlX curriculum for all 3 categories into Firestore. Existing modules will be skipped. Continue?")) return;
    setSeeding(true); setSeedLog([]); setSeedDone(null);
    try {
      const result = await seedCurriculumToFirestore(msg => setSeedLog(p => [...p, msg]));
      setSeedDone({ ok: true, msg: `Done! ${result.seeded} modules seeded, ${result.skipped} already existed.` });
    } catch (e) {
      setSeedDone({ ok: false, msg: e.message });
    }
    setSeeding(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.border}`, padding: "20px 24px", boxShadow: C.shadowCard }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.textPrimary, display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen style={{ width: 20, height: 20, color: C.emerald }} /> Curriculum Manager
            </h2>
            <p style={{ fontSize: 13, color: C.textMuted, marginTop: 3 }}>Add, edit and organise modules and lessons for each student category.</p>
          </div>
          <button onClick={handleSeed} disabled={seeding}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, color: C.textSecondary, fontWeight: 700, fontSize: 13, cursor: "pointer", opacity: seeding ? 0.7 : 1 }}>
            {seeding ? <Loader2 style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} /> : <Database style={{ width: 15, height: 15 }} />}
            {seeding ? "Seeding…" : "Seed Initial Curriculum"}
          </button>
        </div>

        {/* Seed log */}
        {(seedLog.length > 0 || seedDone) && (
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 12, background: C.bg, border: `1px solid ${C.border}`, maxHeight: 120, overflowY: "auto" }}>
            {seedLog.map((l, i) => <p key={i} style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.8 }}>✓ {l}</p>)}
            {seedDone && (
              <p style={{ fontSize: 12, fontWeight: 700, color: seedDone.ok ? C.emerald : C.red, marginTop: 6 }}>
                {seedDone.ok ? "✅ " : "❌ "}{seedDone.msg}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: C.shadowCard }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat.value;
            const col = catColor[cat.value];
            return (
              <button key={cat.value} onClick={() => setActiveCategory(cat.value)}
                style={{ flex: 1, padding: "14px 12px", border: "none", cursor: "pointer", fontWeight: active ? 800 : 600, fontSize: 13, background: active ? col.bg : C.bg, color: active ? col.text : C.textMuted, borderBottom: active ? `2px solid ${col.border}` : "2px solid transparent", transition: "all 0.15s" }}>
                {cat.label.split(" ")[0]} {cat.label.split(" ").slice(1).join(" ")}
              </button>
            );
          })}
        </div>
        <div style={{ padding: 24 }}>
          <CategoryPanel cat={CATEGORIES.find(c => c.value === activeCategory)} />
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
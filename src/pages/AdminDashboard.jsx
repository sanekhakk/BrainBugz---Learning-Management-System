// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, PlusCircle, Loader2, Search, Trash2, BookOpen,
  XCircle, CheckCircle, X, Calendar, ShieldCheck, LogOut,
  Users, Clock, AlertCircle,
} from "lucide-react";
import { collection, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { DARK as D } from "../utils/theme";

import { RegistrationPanel, EditUserPanel } from "./AdminDashboard_Part2";
import { StudentSelectionView, ClassSchedulingForm } from "./AdminDashboard_Part3";
import { ClassesOverview } from "./AdminDashboard_Part4";

// ── Shared helpers ────────────────────────────────────────────
const badge = (role) => {
  const map = {
    admin:   { bg: "rgba(248,113,113,0.12)", color: "#F87171", border: "rgba(248,113,113,0.25)" },
    tutor:   { bg: "rgba(167,139,250,0.12)", color: "#A78BFA", border: "rgba(167,139,250,0.25)" },
    student: { bg: "rgba(99,102,241,0.12)",  color: "#818CF8", border: "rgba(99,102,241,0.25)" },
  };
  return map[role] || map.student;
};

// ── Header ────────────────────────────────────────────────────
const AdminHeader = ({ adminProfile, activeView, setActiveView, logout }) => {
  const navItems = [
    { id: "list",         label: "Users",    icon: Users },
    { id: "classes-list", label: "Classes",  icon: BookOpen },
    { id: "register",     label: "Register", icon: PlusCircle },
    { id: "schedule",     label: "Schedule", icon: Calendar },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: `${D.surface}ee`, borderColor: D.border, backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl" style={{ background: D.gradPrimary }}>
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base" style={{ color: D.textPrimary }}>Admin Portal</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const active = activeView === item.id;
              return (
                <motion.button key={item.id} onClick={() => setActiveView(item.id)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: active ? D.indigoMuted : "transparent",
                    border: `1px solid ${active ? D.borderActive : "transparent"}`,
                    color: active ? D.textPrimary : D.textSecondary,
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Profile + Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold" style={{ color: D.textPrimary }}>{adminProfile?.name || "Admin"}</p>
            <p className="text-xs" style={{ color: D.textMuted }}>{adminProfile?.customId || "System Admin"}</p>
          </div>
          <motion.button onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl transition-all"
            style={{ background: D.redMuted, border: `1px solid ${D.red}30`, color: D.red }}>
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

// ── Stat mini card ─────────────────────────────────────────────
const MiniStat = ({ label, value, color }) => (
  <div className="p-4 rounded-2xl border" style={{ background: D.surfaceAlt, borderColor: D.border }}>
    <p className="text-2xl font-bold mb-0.5" style={{ color }}>{value}</p>
    <p className="text-xs" style={{ color: D.textMuted }}>{label}</p>
  </div>
);

// ── User List ─────────────────────────────────────────────────
function UserList({ users, isLoadingUsers, userError, setActiveView, adminDeleteUser, currentAdminUid, setSelectedUserToEdit }) {
  const [search, setSearch]     = useState("");
  const [filterRole, setFilter] = useState("all");
  const [isDeleting, setDel]    = useState(false);

  const filtered = users.filter(u => {
    if (filterRole !== "all" && u.role !== filterRole) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.name || "").toLowerCase().includes(q) ||
           (u.email || "").toLowerCase().includes(q) ||
           (u.uid || u.id || "").toLowerCase().includes(q);
  });

  const handleDelete = async (user) => {
    if (!window.confirm(`Permanently delete ${user.name}? This cannot be undone.`)) return;
    setDel(true);
    const res = await adminDeleteUser(user.uid);
    setDel(false);
    alert(res.success ? `Deleted: ${user.name}` : `Failed: ${res.error}`);
  };

  const stats = {
    all:     users.length,
    student: users.filter(u => u.role === "student").length,
    tutor:   users.filter(u => u.role === "tutor").length,
    admin:   users.filter(u => u.role === "admin").length,
  };

  return (
    <div className="rounded-3xl border overflow-hidden" style={{ background: D.surface, borderColor: D.border }}>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 p-6 border-b" style={{ borderColor: D.border }}>
        <MiniStat label="All Users"  value={stats.all}     color={D.indigo} />
        <MiniStat label="Students"   value={stats.student} color={D.cyan} />
        <MiniStat label="Tutors"     value={stats.tutor}   color={D.purple} />
        <MiniStat label="Admins"     value={stats.admin}   color={D.red} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 p-6 border-b" style={{ borderColor: D.border }}>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: D.textMuted }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{ background: D.surfaceAlt, border: `1px solid ${D.border}`, color: D.textPrimary }}
            onFocus={e => e.currentTarget.style.borderColor = D.indigo}
            onBlur={e => e.currentTarget.style.borderColor = D.border}
          />
        </div>
        <div className="flex gap-2">
          <select value={filterRole} onChange={e => setFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: D.surfaceAlt, border: `1px solid ${D.border}`, color: D.textPrimary }}>
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="tutor">Tutors</option>
            <option value="admin">Admins</option>
          </select>
          <motion.button onClick={() => setActiveView("register")}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: D.gradPrimary, boxShadow: D.shadowGlow }}>
            <PlusCircle className="w-4 h-4" /> Register
          </motion.button>
        </div>
      </div>

      {/* Table */}
      {isLoadingUsers ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: D.indigo }} />
        </div>
      ) : userError ? (
        <div className="m-6 p-4 rounded-2xl flex items-center gap-3"
          style={{ background: D.redMuted, border: `1px solid ${D.red}30` }}>
          <AlertCircle className="w-5 h-5" style={{ color: D.red }} />
          <p className="text-sm" style={{ color: D.red }}>{userError}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider border-b"
                style={{ color: D.textMuted, borderColor: D.border }}>
                {["Role", "Name", "Email", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-16 text-center text-sm" style={{ color: D.textMuted }}>
                    No users found
                  </td>
                </tr>
              ) : filtered.map(u => {
                const b = badge(u.role);
                const isSelf = u.uid === currentAdminUid;
                return (
                  <motion.tr key={u.uid || u.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="border-b transition-colors"
                    style={{ borderColor: D.border }}
                    onMouseEnter={e => e.currentTarget.style.background = D.surfaceAlt}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-sm" style={{ color: D.textPrimary }}>{u.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: D.textMuted }}>{u.customId || "—"}</p>
                    </td>
                    <td className="px-5 py-4 text-sm hidden sm:table-cell" style={{ color: D.textSecondary }}>
                      {u.email}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: D.greenMuted, color: D.green, border: `1px solid ${D.green}30` }}>
                        Active
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => { setSelectedUserToEdit(u); setActiveView("edit"); }}
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg transition-colors"
                          style={{ background: D.cyanMuted, border: `1px solid ${D.cyan}25` }}
                          title="Edit">
                          <Pencil className="w-3.5 h-3.5" style={{ color: D.cyan }} />
                        </motion.button>
                        {isSelf ? (
                          <span className="text-xs" style={{ color: D.textMuted }}>Self</span>
                        ) : (
                          <motion.button
                            onClick={() => handleDelete(u)} disabled={isDeleting}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg transition-colors disabled:opacity-40"
                            style={{ background: D.redMuted, border: `1px solid ${D.red}25` }}
                            title="Delete">
                            <Trash2 className="w-3.5 h-3.5" style={{ color: D.red }} />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────
export default function AdminDashboard() {
  const {
    adminRegisterUser, adminDeleteUser, adminDeleteClass,
    adminUpdateUser, adminScheduleClass, logout, role, userId,
  } = useAuth();

  const [allTutors, setAllTutors]                       = useState([]);
  const [selectedUserToEdit, setSelectedUserToEdit]     = useState(null);
  const [adminProfile, setAdminProfile]                 = useState(null);
  const [activeView, setActiveView]                     = useState("list");
  const [users, setUsers]                               = useState([]);
  const [isLoadingUsers, setIsLoadingUsers]             = useState(true);
  const [userError, setUserError]                       = useState(null);
  const [selectedStudentToSchedule, setSelStudent]      = useState(null);

  const initialFormState = {
    name: "", email: "", password: "", contactNumber: "", emergencyContact: "",
    classLevel: "", subjects: [], qualifications: "", hourlyRate: "",
    availability: "", timezone: "Asia/Kolkata",
  };
  const [form, setForm]         = useState(initialFormState);
  const [regRole, setRegRole]   = useState("student");
  const [regStatus, setRegStatus] = useState(null);
  const [regLoading, setRegLoading] = useState(false);

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: D.bg }}>
        <div className="text-center p-10 rounded-3xl border"
          style={{ background: D.surface, borderColor: D.border }}>
          <ShieldCheck className="w-14 h-14 mx-auto mb-4" style={{ color: D.red }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: D.textPrimary }}>Access Denied</h2>
          <p className="text-sm" style={{ color: D.textMuted }}>This panel is for admins only.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setIsLoadingUsers(true);
    const unsub = onSnapshot(collection(db, "userSummaries"), snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setUsers(arr); setIsLoadingUsers(false);
    }, () => { setUserError("Failed to load users."); setIsLoadingUsers(false); });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "userSummaries"), where("role", "==", "tutor"));
    const unsub = onSnapshot(q, snap => {
      setAllTutors(snap.docs.map(d => ({ uid: d.id, name: d.data().name, subjects: d.data().subjects || [] })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchAdmin = async () => {
      const snap = await getDoc(doc(db, "userSummaries", userId));
      if (snap.exists()) setAdminProfile(snap.data());
    };
    fetchAdmin();
  }, [userId]);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const students = users.filter(u => u.role === "student");

  return (
    <div className="min-h-screen" style={{ background: D.bg }}>
      <AdminHeader adminProfile={adminProfile} activeView={activeView} setActiveView={setActiveView} logout={logout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <AnimatePresence mode="wait">

          {activeView === "list" && (
            <motion.div key="list" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="mb-7">
                <h1 className="text-2xl font-bold mb-1" style={{ color: D.textPrimary }}>User Management</h1>
                <p className="text-sm" style={{ color: D.textMuted }}>{users.length} total users registered</p>
              </div>
              <UserList users={users} isLoadingUsers={isLoadingUsers} userError={userError}
                setActiveView={setActiveView} adminDeleteUser={adminDeleteUser}
                currentAdminUid={userId} setSelectedUserToEdit={setSelectedUserToEdit} />
            </motion.div>
          )}

          {activeView === "classes-list" && (
            <motion.div key="classes" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="mb-7">
                <h1 className="text-2xl font-bold mb-1" style={{ color: D.textPrimary }}>Classes Management</h1>
                <p className="text-sm" style={{ color: D.textMuted }}>View and manage all scheduled classes</p>
              </div>
              <ClassesOverview setActiveView={setActiveView} adminDeleteClass={adminDeleteClass} />
            </motion.div>
          )}

          {activeView === "register" && (
            <motion.div key="register" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="mb-7">
                <h1 className="text-2xl font-bold mb-1" style={{ color: D.textPrimary }}>Register New User</h1>
                <p className="text-sm" style={{ color: D.textMuted }}>Add a student or tutor to the system</p>
              </div>
              <RegistrationPanel form={form} regRole={regRole} regStatus={regStatus} regLoading={regLoading}
                handleFormChange={handleFormChange} setRegRole={setRegRole} setActiveView={setActiveView}
                setRegStatus={setRegStatus} tutors={allTutors} setForm={setForm} initialFormState={initialFormState}
                adminRegisterUser={adminRegisterUser} setRegLoading={setRegLoading} />
            </motion.div>
          )}

          {activeView === "edit" && selectedUserToEdit && (
            <motion.div key="edit" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="mb-7">
                <h1 className="text-2xl font-bold mb-1" style={{ color: D.textPrimary }}>Edit User</h1>
                <p className="text-sm" style={{ color: D.textMuted }}>Update user profile and assignments</p>
              </div>
              <EditUserPanel user={selectedUserToEdit} setActiveView={setActiveView}
                tutors={allTutors} adminUpdateUser={adminUpdateUser} />
            </motion.div>
          )}

          {activeView === "schedule" && !selectedStudentToSchedule && (
            <motion.div key="sched-sel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="mb-7">
                <h1 className="text-2xl font-bold mb-1" style={{ color: D.textPrimary }}>Schedule Class</h1>
                <p className="text-sm" style={{ color: D.textMuted }}>Select a student to schedule a session</p>
              </div>
              <StudentSelectionView students={students} onSelectStudent={setSelStudent} setActiveView={setActiveView} />
            </motion.div>
          )}

          {activeView === "schedule" && selectedStudentToSchedule && (
            <ClassSchedulingForm key="sched-form"
              selectedStudent={selectedStudentToSchedule}
              onBack={() => setSelStudent(null)}
              adminScheduleClass={adminScheduleClass}
              setActiveView={setActiveView}
            />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
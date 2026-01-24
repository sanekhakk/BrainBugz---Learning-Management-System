// REPLACE YOUR COMPLETE AdminDashboard.jsx WITH THIS VERSION

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, PlusCircle, Loader2, Search, Trash2, BookOpen, XCircle, CheckCircle,
  X, Calendar, ShieldCheck, LogOut, Users, Filter, Clock, AlertCircle,
} from "lucide-react";
import { collection, onSnapshot, query, where, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { InputField, SelectField } from "../components/FormFields";
import { COLORS, GRADIENTS, SHADOWS } from "../utils/theme";

// Import the Registration and Edit panels from Part 2
import { RegistrationPanel, EditUserPanel } from "./AdminDashboard_Part2";

// Import the Class Scheduling components from Part 3
import { StudentSelectionView, ClassSchedulingForm } from "./AdminDashboard_Part3";



const AdminHeader = ({ adminProfile, activeView, setActiveView, logout }) => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
    style={{ background: `${COLORS.bgPrimary}95`, borderColor: COLORS.glassBorder }}>
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl" style={{ background: GRADIENTS.primary }}>
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Admin Portal</span>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { id: "list", label: "Users", icon: Users },
              { id: "classes-list", label: "Classes", icon: BookOpen },
              { id: "register", label: "Register", icon: PlusCircle },
              { id: "schedule", label: "Schedule", icon: Calendar },
            ].map((item) => (
              <motion.button key={item.id} onClick={() => setActiveView(item.id)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center ${
                  activeView === item.id ? "text-white" : "text-gray-400"}`}
                style={{
                  background: activeView === item.id ? GRADIENTS.primary : "transparent",
                  boxShadow: activeView === item.id ? SHADOWS.md : "none",
                }}>
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-white">{adminProfile?.name || "Admin"}</p>
            <p className="text-xs text-gray-400">{adminProfile?.customId || "System Admin"}</p>
          </div>
          <motion.button onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 border border-red-500/30">
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  </header>
);

const StatCard = ({ icon: Icon, label, value, gradient }) => (
  <motion.div whileHover={{ y: -5, scale: 1.02 }}
    className="relative p-6 rounded-2xl border backdrop-blur-xl overflow-hidden group"
    style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder, boxShadow: SHADOWS.md }}>
    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
      style={{ background: gradient }} />
    <div className="relative z-10">
      <div className="p-3 rounded-xl inline-block mb-4"
        style={{ background: `${gradient}15`, border: `1px solid ${COLORS.glassBorder}` }}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </motion.div>
);

function UserList({ users, isLoadingUsers, userError, setActiveView, adminDeleteUser, currentAdminUid, setSelectedUserToEdit }) {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = users.filter((u) => {
    if (filterRole !== "all" && u.role !== filterRole) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.name || "").toLowerCase().includes(q) || 
           (u.email || "").toLowerCase().includes(q) || 
           (u.uid || u.id || "").toLowerCase().includes(q);
  });

  const handleDelete = async (user) => {
    if (!window.confirm(`DANGER! Permanently delete ${user.name}? This cannot be undone.`)) return;
    setIsDeleting(true);
    const result = await adminDeleteUser(user.uid);
    setIsDeleting(false);
    alert(result.success ? `Deleted: ${user.name}` : `Failed: ${result.error}`);
  };

  const roleStats = {
    all: users.length,
    student: users.filter((u) => u.role === "student").length,
    tutor: users.filter((u) => u.role === "tutor").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div className="p-6 rounded-2xl border backdrop-blur-xl"
      style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder, boxShadow: SHADOWS.lg }}>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "All Users", value: roleStats.all, gradient: GRADIENTS.primary },
          { label: "Students", value: roleStats.student, gradient: GRADIENTS.secondary },
          { label: "Tutors", value: roleStats.tutor, gradient: GRADIENTS.purple },
          { label: "Admins", value: roleStats.admin, gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }} className="p-4 rounded-xl border"
            style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
            <p className="text-2xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: stat.gradient }}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
            style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }} />
        </div>
        <div className="flex gap-2">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 rounded-xl border text-white focus:ring-2 focus:ring-cyan-500"
            style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="tutor">Tutors</option>
            <option value="admin">Admins</option>
          </select>
          <motion.button onClick={() => setActiveView("register")} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center px-6 py-3 rounded-xl font-bold text-white"
            style={{ background: GRADIENTS.primary, boxShadow: SHADOWS.glow }}>
            <PlusCircle className="w-4 h-4 mr-2" /> Register User
          </motion.button>
        </div>
      </div>

      {isLoadingUsers ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-cyan-400" /></div>
      ) : userError ? (
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">{userError}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b"
                style={{ borderColor: COLORS.glassBorder }}>
                <th className="p-4">Role</th>
                <th className="p-4">Name</th>
                <th className="p-4 hidden sm:table-cell">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-gray-400">No users found</td></tr>
              ) : (
                filtered.map((u) => {
                  const isCurrentAdmin = u.uid === currentAdminUid;
                  return (
                    <motion.tr key={u.uid || u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="border-b hover:bg-white/5 transition-colors"
                      style={{ borderColor: COLORS.glassBorder }}>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === "admin" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                          u.role === "tutor" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" :
                          "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-white">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.customId || "N/A"}</p>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-sm text-gray-400">{u.email}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                          Active
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <motion.button onClick={() => { setSelectedUserToEdit(u); setActiveView("edit"); }}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30">
                            <Pencil className="w-4 h-4 text-cyan-400" />
                          </motion.button>
                          {isCurrentAdmin ? (
                            <span className="text-xs text-gray-500 ml-2">Cannot delete self</span>
                          ) : (
                            <motion.button onClick={() => handleDelete(u)} disabled={isDeleting}
                              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 disabled:opacity-50">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Simplified Classes Overview for now - you can expand this
const StudentClassOverview = ({ setActiveView }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="p-8 rounded-2xl border backdrop-blur-xl text-center"
    style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
    <BookOpen className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
    <h2 className="text-2xl font-bold text-white mb-2">Classes Management</h2>
    <p className="text-gray-400 mb-6">View and manage all scheduled classes</p>
    <motion.button onClick={() => setActiveView("list")} whileHover={{ scale: 1.05 }}
      className="px-6 py-3 rounded-xl font-semibold text-white"
      style={{ background: GRADIENTS.primary }}>
      Back to Users
    </motion.button>
  </motion.div>
);

export default function AdminDashboard() {
  const { adminRegisterUser, adminDeleteUser, adminDeleteClass, adminUpdateUser, adminScheduleClass, logout, role, userId } = useAuth();
  const [allTutors, setAllTutors] = useState([]);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [activeView, setActiveView] = useState("list");
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [userError, setUserError] = useState(null);

  // For scheduling
  const [selectedStudentToSchedule, setSelectedStudentToSchedule] = useState(null);

  const initialFormState = {
    name: "", email: "", password: "", contactNumber: "", emergencyContact: "",
    classLevel: "", subjects: [], qualifications: "", hourlyRate: "", availability: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [regRole, setRegRole] = useState("student");
  const [regStatus, setRegStatus] = useState(null);
  const [regLoading, setRegLoading] = useState(false);

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.bgPrimary }}>
        <div className="text-center p-8 rounded-2xl border"
          style={{ background: COLORS.glassBg, borderColor: COLORS.glassBorder }}>
          <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">This panel is for admins only.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setIsLoadingUsers(true);
    const baseColl = collection(db, "userSummaries");
    const unsub = onSnapshot(baseColl, (snap) => {
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      arr.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setUsers(arr);
      setIsLoadingUsers(false);
    }, (err) => {
      setUserError("Failed to load users.");
      setIsLoadingUsers(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "userSummaries"), where("role", "==", "tutor"));
    const unsub = onSnapshot(q, (snap) => {
      setAllTutors(snap.docs.map((d) => ({ uid: d.id, name: d.data().name, subjects: d.data().subjects || [] })));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchAdmin = async () => {
      const docRef = doc(db, "userSummaries", userId);
      const snap = await getDoc(docRef);
      if (snap.exists()) setAdminProfile(snap.data());
    };
    fetchAdmin();
  }, [userId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "subjects" && Array.isArray(value)) {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Get only students for scheduling
  const students = users.filter(u => u.role === "student");

  return (
    <div className="min-h-screen pt-24 px-4" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="max-w-7xl mx-auto py-8">
        <AdminHeader adminProfile={adminProfile} activeView={activeView} setActiveView={setActiveView} logout={logout} />

        <AnimatePresence mode="wait">
          {activeView === "list" && (
            <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <UserList users={users} isLoadingUsers={isLoadingUsers} userError={userError}
                setActiveView={setActiveView} adminDeleteUser={adminDeleteUser}
                currentAdminUid={userId} setSelectedUserToEdit={setSelectedUserToEdit} />
            </motion.div>
          )}

          {activeView === "classes-list" && (
            <StudentClassOverview key="classes" setActiveView={setActiveView} />
          )}

          {activeView === "register" && (
            <RegistrationPanel key="register" form={form} regRole={regRole} regStatus={regStatus} regLoading={regLoading}
              handleFormChange={handleFormChange} setRegRole={setRegRole} setActiveView={setActiveView}
              setRegStatus={setRegStatus} tutors={allTutors} setForm={setForm} initialFormState={initialFormState}
              adminRegisterUser={adminRegisterUser} setRegLoading={setRegLoading} />
          )}

          {activeView === "edit" && selectedUserToEdit && (
            <EditUserPanel key="edit" user={selectedUserToEdit} setActiveView={setActiveView}
              tutors={allTutors} adminUpdateUser={adminUpdateUser} />
          )}

          {activeView === "schedule" && !selectedStudentToSchedule && (
            <StudentSelectionView 
              key="schedule-select"
              students={students}
              onSelectStudent={(student) => setSelectedStudentToSchedule(student)}
              setActiveView={setActiveView}
            />
          )}

          {activeView === "schedule" && selectedStudentToSchedule && (
            <ClassSchedulingForm
              key="schedule-form"
              selectedStudent={selectedStudentToSchedule}
              onBack={() => setSelectedStudentToSchedule(null)}
              adminScheduleClass={adminScheduleClass}
              setActiveView={setActiveView}
            />
          )}

          
        </AnimatePresence>
      </div>
    </div>
  );
}
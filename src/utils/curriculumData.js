import {
  collection, addDoc, getDocs, query, where, serverTimestamp,
  doc, setDoc, getDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject,
} from "firebase/storage";
import { db } from "../firebase";
import { Code2, Calculator, GraduationCap, Baby, Sprout, Rocket, Layers } from "lucide-react";

/**
 * COURSES
 * Pearlx currently runs 3 courses. "coding" and "math" both follow the same
 * tiered Module -> Lesson curriculum structure (see CATEGORIES below).
 * "academic_tuition" continues to use the existing per-student custom
 * chapter list (studentChapters/{uid}) and is NOT affected by this file.
 *
 * `icon` is a standard lucide-react icon component, kept here so every
 * dashboard renders the exact same icon for a given course/tier — no
 * emoji anywhere in the app.
 */
export const COURSES = [
  { value: "coding",           label: "Coding",            icon: Code2 },
  { value: "math",              label: "Math",              icon: Calculator },
  { value: "academic_tuition", label: "Academic Tuition",  icon: GraduationCap },
];

// Courses that follow the shared Module/Lesson curriculum, tiered by category
export const TIERED_COURSES = ["coding", "math"];

export const isTieredCourse = (course) => TIERED_COURSES.includes(course);

/**
 * Student tiers. These apply only to "coding" and "math" courses — every
 * (course, category) pair gets its own independent set of modules/lessons,
 * so e.g. coding/little_pearls and math/little_pearls are unrelated.
 */
export const CATEGORIES = [
  { value: "little_pearls",  label: "Little Pearls",  ages: "Ages 5–7 • Grades K–2",   icon: Baby },
  { value: "bright_pearls",  label: "Bright Pearls",  ages: "Ages 8–11 • Grades 3–6",  icon: Sprout },
  { value: "rising_pearls",  label: "Rising Pearls",  ages: "Ages 12–15 • Grades 7–10", icon: Rocket },
];

// Single shared icon used for every module, everywhere it's shown
// (admin, student, tutor) — modules are distinguished by name/number,
// not by a per-module icon.
export const MODULE_ICON = Layers;

/**
 * Works out which course a student profile belongs to. Handles students
 * created before the `course` field existed (when "coding" was the only
 * tiered course and category alone told you everything):
 *  - `course` already set on the profile -> use it as-is
 *  - legacy category "academic_tuition" or "courses" -> academic_tuition
 *  - legacy category one of the three tiers -> coding (the only tiered
 *    course that existed before this update)
 */
export function getEffectiveCourse(profile) {
  if (!profile) return "";
  if (profile.course) return profile.course;
  if (profile.category === "academic_tuition" || profile.category === "courses") return "academic_tuition";
  if (["little_pearls", "bright_pearls", "rising_pearls"].includes(profile.category)) return "coding";
  return "";
}

// ---------------------------------------------------------------------
// Module CRUD — a "module" doc lives in the top-level "curriculum"
// collection, scoped by { course, category }. Lessons are stored as an
// array field on the module doc.
// ---------------------------------------------------------------------

/** Fetch all modules for a given course + category tier, ordered by moduleNumber. */
export async function fetchCurriculumModules(course, category) {
  if (!course || !category) return [];
  const snap = await getDocs(
    query(
      collection(db, "curriculum"),
      where("course", "==", course),
      where("category", "==", category)
    )
  );
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.moduleNumber || 0) - (b.moduleNumber || 0));
}

/**
 * Returns a Firestore query for a course + category's modules, for use with
 * onSnapshot() in components that want live updates. Sort client-side by
 * moduleNumber after reading the snapshot.
 */
export function curriculumModulesQuery(course, category) {
  return query(
    collection(db, "curriculum"),
    where("course", "==", course),
    where("category", "==", category)
  );
}

/** Fetch every module across every course/category — used by the admin overview. */
export async function fetchAllCurriculumModules() {
  const snap = await getDocs(collection(db, "curriculum"));
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .sort((a, b) =>
      (a.course || "").localeCompare(b.course || "") ||
      (a.category || "").localeCompare(b.category || "") ||
      (a.moduleNumber || 0) - (b.moduleNumber || 0)
    );
}

/** Create a new (empty) module under a course + category. Module number is assigned sequentially. */
export async function createCurriculumModule(course, category, moduleName) {
  if (!course || !category) throw new Error("Course and category are required.");
  if (!moduleName?.trim()) throw new Error("Module name is required.");
  const existing = await fetchCurriculumModules(course, category);
  const moduleNumber = existing.length + 1;
  const ref = await addDoc(collection(db, "curriculum"), {
    course,
    category,
    moduleNumber,
    moduleName: moduleName.trim(),
    lessons: [],
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function renameCurriculumModule(moduleId, moduleName) {
  if (!moduleName?.trim()) throw new Error("Module name is required.");
  await updateDoc(doc(db, "curriculum", moduleId), {
    moduleName: moduleName.trim(),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCurriculumModule(moduleId) {
  await deleteDoc(doc(db, "curriculum", moduleId));
}

// ---------------------------------------------------------------------
// Lesson CRUD — lessons are an array field on their parent module doc.
// title is required; pptLink / studentResourceLink / teacherResourceLink /
// bannerImageUrl are all optional.
// ---------------------------------------------------------------------

export async function addCurriculumLesson(moduleId, lessonInput) {
  const { id, title, pptLink = "", studentResourceLink = "", teacherResourceLink = "", bannerImageUrl = "" } = lessonInput || {};
  if (!title?.trim()) throw new Error("Lesson title is required.");

  const modRef = doc(db, "curriculum", moduleId);
  const modSnap = await getDoc(modRef);
  if (!modSnap.exists()) throw new Error("Module not found.");

  const lessons = modSnap.data().lessons || [];
  const newLesson = {
    id: id || `${moduleId}_l${Date.now()}`,
    lessonNumber: lessons.length + 1,
    title: title.trim(),
    pptLink: (pptLink || "").trim(),
    studentResourceLink: (studentResourceLink || "").trim(),
    teacherResourceLink: (teacherResourceLink || "").trim(),
    bannerImageUrl: (bannerImageUrl || "").trim(),
  };

  await updateDoc(modRef, { lessons: [...lessons, newLesson], updatedAt: serverTimestamp() });
  return newLesson.id;
}

export async function updateCurriculumLesson(moduleId, lessonId, updates) {
  const modRef = doc(db, "curriculum", moduleId);
  const modSnap = await getDoc(modRef);
  if (!modSnap.exists()) throw new Error("Module not found.");

  if (updates?.title !== undefined && !updates.title.trim()) {
    throw new Error("Lesson title is required.");
  }

  const lessons = (modSnap.data().lessons || []).map(l => {
    if (l.id !== lessonId) return l;
    const { id: _ignoredId, ...safeUpdates } = updates || {};
    const merged = { ...l, ...safeUpdates };
    return {
      ...merged,
      title: (merged.title || "").trim(),
      pptLink: (merged.pptLink || "").trim(),
      studentResourceLink: (merged.studentResourceLink || "").trim(),
      teacherResourceLink: (merged.teacherResourceLink || "").trim(),
      bannerImageUrl: (merged.bannerImageUrl || "").trim(),
    };
  });

  await updateDoc(modRef, { lessons, updatedAt: serverTimestamp() });
}

export async function deleteCurriculumLesson(moduleId, lessonId) {
  const modRef = doc(db, "curriculum", moduleId);
  const modSnap = await getDoc(modRef);
  if (!modSnap.exists()) throw new Error("Module not found.");

  const target = (modSnap.data().lessons || []).find(l => l.id === lessonId);
  const lessons = (modSnap.data().lessons || [])
    .filter(l => l.id !== lessonId)
    .map((l, i) => ({ ...l, lessonNumber: i + 1 })); // keep numbers contiguous

  await updateDoc(modRef, { lessons, updatedAt: serverTimestamp() });

  // Best-effort cleanup of the banner image in Storage — never blocks the delete
  if (target?.bannerImageUrl) {
    deleteLessonBannerImageByUrl(target.bannerImageUrl);
  }
}

// ---------------------------------------------------------------------
// Lesson banner images (Firebase Storage)
// Stored at a fixed path per lesson — curriculumBanners/{course}/{category}/
// {moduleId}/{lessonId}.{ext} — so re-uploading a new image for the same
// lesson automatically overwrites the old file at the same path.
//
// Recommended image size: 1200 x 675px (16:9). This scales cleanly at any
// width via CSS object-fit: cover, so it renders crisp on desktop and
// mobile alike without needing separate mobile/desktop assets. Keep the
// file under ~500KB (JPG or WebP) for fast loading. Max accepted: 5MB.
// ---------------------------------------------------------------------

const MAX_BANNER_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function uploadLessonBannerImage(file, { course, category, moduleId, lessonId }) {
  if (!file) throw new Error("No image file selected.");
  if (!file.type?.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_BANNER_SIZE_BYTES) throw new Error("Image must be under 5MB.");
  if (!course || !category || !moduleId || !lessonId) throw new Error("Missing course/category/module/lesson reference for upload.");

  const storage = getStorage();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `curriculumBanners/${course}/${category}/${moduleId}/${lessonId}.${ext}`;
  const fileRef = storageRef(storage, path);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

export async function deleteLessonBannerImageByUrl(url) {
  if (!url) return;
  try {
    const storage = getStorage();
    const fileRef = storageRef(storage, url);
    await deleteObject(fileRef);
  } catch (e) {
    // Non-fatal — the doc-level update already succeeded either way
    console.warn("Could not delete old banner image from Storage:", e.message);
  }
}
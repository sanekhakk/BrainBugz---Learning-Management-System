// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const { admin, firestore } = require("../firebaseAdmin");
const { verifyIdToken, requireAdmin } = require("../middleware/authMiddleware");

// Function to generate a random ID: e.g., 'STU-A1B2C3D4'
const generateRandomId = (prefix) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = prefix + '-';
    for (let i = 0; i < 8; i++) { // 8 characters for randomness
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


// POST /admin/create-user
router.post("/create-user", verifyIdToken, requireAdmin, async (req, res) => {
  try {
    const { 
        name, 
        email, 
        password, 
        role, 
        contactNumber, 
        classLevel, 
        emergencyContact, 
        subjects, 
        qualifications, 
        hourlyRate,
        syllabus, 
        mediumOfCommunication,
        assignments,
        // NEW FIELD FOR STUDENT
        permanentClassLink
        // studentId is now removed from req.body and auto-generated
    } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ success: false, error: "Missing required fields: name, email, password, role" });
    }
    
    // 0. GENERATE CUSTOM ID AND TUTOR UIDS ARRAY
    let customId = "";
    let tutorUids = []; // NEW ARRAY FOR SECURE QUERYING
    
    if (role === 'student') {
        customId = generateRandomId("STU");
        // Extract tutor IDs from the assignments array for security rules
        tutorUids = (assignments || []).map(a => a.tutorId).filter(id => id); 
    } else if (role === 'tutor') {
        customId = generateRandomId("TUT");
    }
    

    // 1) Create the auth account
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    const uid = userRecord.uid;

    // 2) Set custom claims (optional — convenient for admin checks on server side)
    await admin.auth().setCustomUserClaims(uid, { role });

    // 3) Write profile in /users/{uid}
    const profile = {
      uid,
      name,
      email,
      role,
      contactNumber: contactNumber || "",
      classLevel: classLevel || "",
      emergencyContact: emergencyContact || "",
      qualifications: qualifications || "",
      hourlyRate: hourlyRate || "",
      subjects: subjects || [],
      customId: customId, // STORED
      // NEW STUDENT FIELDS
      syllabus: syllabus || "", 
      mediumOfCommunication: mediumOfCommunication || "",
      assignments: assignments || [], 
      tutorUids: tutorUids, // STORED FOR SECURITY RULES
      // NEW PERMANENT CLASS LINK FIELD
      permanentClassLink: permanentClassLink || "",
      // END NEW FIELDS
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await firestore.collection("users").doc(uid).set(profile);

    // 4) Write summary in /userSummaries/{uid}
    const summary = {
      uid,
      name,
      email,
      role,
      classLevel: classLevel || "",
      syllabus: syllabus || "",
      assignments: assignments || [],
      customId: customId, 
      tutorUids: tutorUids, // STORED FOR SECURITY RULES
      // Only include tutor subjects if role is tutor.
      subjects: role === 'tutor' ? (subjects || []) : [], 
      // NEW PERMANENT CLASS LINK FIELD
      permanentClassLink: permanentClassLink || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    await firestore.collection("userSummaries").doc(uid).set(summary);

    return res.status(200).json({ success: true, message: `${role} created with ID: ${customId}`, uid });
  } catch (err) {
    console.error("create-user err:", err);

    // Helpful error messages
    if (err.code === "auth/email-already-exists") {
      return res.status(400).json({ success: false, error: "Email already in use" });
    }

    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
});

// PUT /admin/update-user/:uid
router.put("/update-user/:uid", verifyIdToken, requireAdmin, async (req, res) => {
  const { uid } = req.params;
  const { 
    name, 
    email, // Note: Changing email in Auth requires the admin SDK method `admin.auth().updateUser(uid, { email: newEmail })`
    contactNumber, 
    classLevel, 
    emergencyContact, 
    subjects, // For Tutor
    qualifications, 
    hourlyRate,
    syllabus, 
    mediumOfCommunication,
    assignments, // For Student
    permanentClassLink,
    role // Role should not be changed, but include it for reference
  } = req.body;

  if (!uid) {
    return res.status(400).json({ success: false, error: "Missing User ID (uid)" });
  }

  try {
    // 1. Prepare profile updates
    const profileUpdates = {
      name,
      contactNumber: contactNumber || "",
      classLevel: classLevel || "",
      emergencyContact: emergencyContact || "",
      qualifications: qualifications || "",
      hourlyRate: hourlyRate || "",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // 2. Role-specific updates
    let summaryUpdates = { ...profileUpdates, email, role };
    let tutorUids = [];

    if (role === 'student') {
        tutorUids = (assignments || []).map(a => a.tutorId).filter(id => id);
        profileUpdates.subjects = (assignments || []).map(a => a.subject);
        profileUpdates.assignments = assignments || [];
        profileUpdates.tutorUids = tutorUids;
        profileUpdates.syllabus = syllabus || "";
        profileUpdates.permanentClassLink = permanentClassLink || "";

        summaryUpdates.subjects = profileUpdates.subjects;
        summaryUpdates.assignments = profileUpdates.assignments;
        summaryUpdates.tutorUids = profileUpdates.tutorUids;
        summaryUpdates.syllabus = profileUpdates.syllabus;
        summaryUpdates.permanentClassLink = profileUpdates.permanentClassLink;

    } else if (role === 'tutor') {
        profileUpdates.subjects = subjects || [];
        summaryUpdates.subjects = profileUpdates.subjects;
    }
    
    // The email must be updated in Firebase Auth first if it changed
    // For simplicity here, we assume email is not easily changeable, but we update Firestore profiles:
    profileUpdates.email = email;
    summaryUpdates.email = email;

    // 3. Update Firestore profile
    await firestore.collection("users").doc(uid).update(profileUpdates);
    
    // 4. Update Firestore summary
    await firestore.collection("userSummaries").doc(uid).update(summaryUpdates);

    // 5. Update Auth email (if necessary, though complex and often skipped in simple admin panels)
    // if (email !== userRecord.email) { await admin.auth().updateUser(uid, { email }); }

    return res.status(200).json({ success: true, message: `${role} profile updated successfully.` });
  } catch (err) {
    console.error("update-user err:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error during user update." });
  }
});

// DELETE /admin/delete-user/:uid
router.delete("/delete-user/:uid", verifyIdToken, requireAdmin, async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ success: false, error: "Missing User ID (uid)" });
  }
  
  // Prevent admin from deleting themselves
  if (uid === req.uid) { 
      return res.status(403).json({ success: false, error: "Cannot delete the currently signed-in admin user." });
  }

  try {
    // 1) Delete the user's Auth account
    await admin.auth().deleteUser(uid);

    // 2) Delete the user's Firestore profiles
    await firestore.collection("users").doc(uid).delete();
    await firestore.collection("userSummaries").doc(uid).delete();
    
    // 3) (Optional but recommended) Delete any associated scheduled classes if the user was a student
    const classesQuery = await firestore.collection("classes").where("studentId", "==", uid).get();
    const classDeletePromises = [];
    classesQuery.forEach(doc => {
        classDeletePromises.push(doc.ref.delete());
    });
    await Promise.all(classDeletePromises);


    return res.status(200).json({ success: true, message: `User ${uid} and associated data deleted successfully.` });
  } catch (err) {
    console.error(`delete-user err for UID ${uid}:`, err);
    
    // Handle specific error codes from Firebase Admin SDK
    if (err.code === 'auth/user-not-found') {
        return res.status(404).json({ success: false, error: "User not found in Firebase Auth." });
    }
    
    // For general errors
    return res.status(500).json({ success: false, error: err.message || "Server error during user deletion." });
  }
});

// DELETE /admin/class/:classId
router.delete("/class/:classId", verifyIdToken, requireAdmin, async (req, res) => {
    const { classId } = req.params;

    if (!classId) {
        return res.status(400).json({ success: false, error: "Missing Class ID" });
    }

    try {
        await firestore.collection("classes").doc(classId).delete();
        return res.status(200).json({ success: true, message: `Class ${classId} deleted successfully.` });
    } catch (err) {
        console.error(`delete-class err for ID ${classId}:`, err);
        return res.status(500).json({ success: false, error: err.message || "Server error during class deletion." });
    }
});

router.post("/schedule-class", verifyIdToken, requireAdmin, async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      tutorId,
      tutorName,
      subject,
      classDate,
      classTime,
      isRescheduled,
      originalClassDate
    } = req.body;

    // Validation
    if (!studentId || !tutorId || !subject || !classDate || !classTime) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields: studentId, tutorId, subject, classDate, classTime" 
      });
    }

    if (isRescheduled && !originalClassDate) {
      return res.status(400).json({
        success: false,
        error: "Original class date is required for rescheduled classes"
      });
    }

    // Create the class document
    const classData = {
      studentId,
      studentName,
      tutorId,
      tutorName,
      subject,
      classDate,
      classTime,
      status: "scheduled",
      isRescheduled: isRescheduled || false,
      originalClassDate: isRescheduled ? originalClassDate : "",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await firestore.collection("classes").add(classData);

    return res.status(200).json({ 
      success: true, 
      message: `Class scheduled successfully for ${studentName}`,
      classId: docRef.id 
    });
  } catch (err) {
    console.error("schedule-class error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
});
module.exports = router;
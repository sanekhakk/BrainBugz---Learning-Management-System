const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const nodemailer = require("nodemailer");

// Initialize Google Sheets API
const sheets = google.sheets("v4");

let authClient;

// Initialize Google Auth
async function initializeAuth() {
  try {
    // Check if env variable exists
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing");
    }

    // Parse service account JSON
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    );

    // Fix private key formatting for Render/Vercel
    if (serviceAccount.private_key) {
      serviceAccount.private_key =
        serviceAccount.private_key.replace(/\\n/g, "\n");
    }

    // Create auth client
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    authClient = await auth.getClient();

    console.log("✅ Google Sheets authentication initialized");
  } catch (err) {
    console.error(
      "❌ Failed to initialize Google Sheets auth:",
      err.message
    );

    throw new Error("Google Sheets authentication failed");
  }
}

// Initialize on startup
initializeAuth().catch((err) => console.error(err));

// Human-readable labels for the programInterest value sent from the modal
const PROGRAM_INTEREST_LABELS = {
  coding: "Coding Classes",
  academic_tuition: "Academic Tuition (Class 1-12)",
  courses: "Courses",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
}); 

// POST /api/submit-demo-booking
router.post("/submit-demo-booking", async (req, res) => {
  try {
    const {
      source,
      programInterest,
      studentName,
      studentGrade,
      country,
      state,
      languages,
      parentName,
      email,
      contactNumber,
      wantsDemoSession,
      preferredDate,
      preferredTime,
    } = req.body;

    // Validate required fields
    if (
      !programInterest ||
      !studentName ||
      !studentGrade ||
      !parentName ||
      !email ||
      !contactNumber
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Get Spreadsheet ID
    const spreadsheetId =
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error(
        "GOOGLE_SHEETS_SPREADSHEET_ID is missing"
      );
    }

    // Timestamp
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // Row data
    const rowData = [
      timestamp,
      source || "General",
      PROGRAM_INTEREST_LABELS[programInterest] || programInterest,
      studentName,
      studentGrade,
      country,
      state,
      languages,
      parentName,
      email,
      contactNumber,
      wantsDemoSession === "yes" ? "Yes" : "No",
      preferredDate || "N/A",
      preferredTime || "N/A",
    ];

    // Append to Google Sheet
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range: "Sheet1!A:N",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [rowData],
      },
    });

      // Send email notification
    try {
      const programName =
        PROGRAM_INTEREST_LABELS[programInterest] || programInterest || "N/A";

      await transporter.sendMail({
        from: `"Pearlx Demo Bookings" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL,

        subject: `🔔 New Pearlx Demo Booking — ${studentName}`,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #333;">

            <h2 style="margin-bottom: 5px;">
              🔔 New Pearlx Demo Booking
            </h2>

            <p style="color: #666;">
              A new demo booking has been submitted through the Pearlx website.
            </p>

            <hr>

            <h3>👨‍🎓 Student Details</h3>

            <p><strong>Student Name:</strong> ${studentName || "N/A"}</p>
            <p><strong>Grade:</strong> ${studentGrade || "N/A"}</p>
            <p><strong>Program:</strong> ${programName}</p>

            <h3>👨‍👩‍👧 Parent Details</h3>

            <p><strong>Parent Name:</strong> ${parentName || "N/A"}</p>
            <p><strong>Email:</strong> ${email || "N/A"}</p>
            <p><strong>Contact:</strong> ${contactNumber || "N/A"}</p>

            <h3>📍 Location</h3>

            <p><strong>Country:</strong> ${country || "N/A"}</p>
            <p><strong>State:</strong> ${state || "N/A"}</p>
            <p><strong>Languages:</strong> ${languages || "N/A"}</p>

            <h3>📅 Demo Details</h3>

            <p><strong>Wants Demo:</strong> ${
              wantsDemoSession === "yes" ? "Yes" : "No"
            }</p>

            <p><strong>Preferred Date:</strong> ${
              preferredDate || "N/A"
            }</p>

            <p><strong>Preferred Time:</strong> ${
              preferredTime || "N/A"
            }</p>

            <h3>📌 Booking Source</h3>

            <p><strong>Source:</strong> ${source || "General"}</p>

            <hr>

            <p style="font-size: 13px; color: #777;">
              This notification was automatically generated by the Pearlx website.
            </p>

          </div>
        `,
      });

      console.log("✅ Booking notification email sent successfully");
    } catch (emailError) {
      // Do not fail the booking if email fails.
      console.error("❌ Failed to send booking notification email:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "Demo booking submitted successfully!",
    });
  } catch (err) {
    console.error(
      "❌ Demo booking submission error:",
      err
    );

    return res.status(500).json({
      success: false,
      error:
        err.message || "Failed to submit demo booking",
    });
  }
});

// GET /api/demo-bookings
router.get("/demo-bookings", async (req, res) => {
  try {
    const spreadsheetId =
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error(
        "GOOGLE_SHEETS_SPREADSHEET_ID is missing"
      );
    }

    const response =
      await sheets.spreadsheets.values.get({
        auth: authClient,
        spreadsheetId,
        range: "Sheet1",
      });

    const rows = response.data.values || [];

    const headers = rows[0] || [];

    const bookings = rows.slice(1).map((row) => {
      const booking = {};

      headers.forEach((header, i) => {
        booking[header] = row[i] || "";
      });

      return booking;
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.error("❌ Fetch bookings error:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch bookings",
    });
  }
});



module.exports = router;
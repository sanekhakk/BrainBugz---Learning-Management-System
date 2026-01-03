// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// === FIX: Explicitly allow localhost:5173 ===
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite default
    "http://localhost:3000", // React default
    "http://127.0.0.1:5173"  // Alternative localhost
  ],
  credentials: true
}));

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "BrainBugz backend running" });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
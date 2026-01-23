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


app.use(cors({
  origin: [
    "https://pearlx-webstudio.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); 

app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "BrainBugz backend running" });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

/**
 * Loads the Firebase service account credentials from whichever env var
 * is actually set, checked in this order:
 *
 *   1. FIREBASE_SERVICE_ACCOUNT_KEY — the full service-account JSON as a
 *      single-line string (handy for hosts like Render where you paste
 *      the whole JSON into one env var).
 *   2. GOOGLE_SERVICE_ACCOUNT_KEY_PATH / GOOGLE_APPLICATION_CREDENTIALS —
 *      a filesystem path to the downloaded service-account .json key
 *      file. This is what this project's .env currently sets.
 *
 * Throws a clear, actionable error if neither is present or the file
 * can't be found, instead of a bare "is missing".
 */
function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch (e) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is set but is not valid JSON: " + e.message);
    }
  }

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyPath) {
    const resolved = path.resolve(keyPath);
    if (!fs.existsSync(resolved)) {
      throw new Error(
        `Service account key file not found at "${resolved}" (from ${
          process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ? "GOOGLE_SERVICE_ACCOUNT_KEY_PATH" : "GOOGLE_APPLICATION_CREDENTIALS"
        } in .env). Check the path is correct relative to where you start the server.`
      );
    }
    try {
      return JSON.parse(fs.readFileSync(resolved, "utf8"));
    } catch (e) {
      throw new Error(`Could not parse service account key file at "${resolved}": ${e.message}`);
    }
  }

  throw new Error(
    "No Firebase credentials found. Set one of: FIREBASE_SERVICE_ACCOUNT_KEY (full service-account JSON as a string), " +
    "or GOOGLE_SERVICE_ACCOUNT_KEY_PATH / GOOGLE_APPLICATION_CREDENTIALS (path to the service-account .json key file) in .env."
  );
}

const serviceAccount = loadServiceAccount();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin Initialized");
}

const firestore = admin.firestore();

// Exporting both as an object
module.exports = {
  admin,
  firestore,
};
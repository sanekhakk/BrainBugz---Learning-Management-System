// backend/firebaseAdmin.js
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || "./serviceAccountKey.json";
const serviceAccount = require(path.resolve(__dirname, credPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = {
  admin,
  firestore
};

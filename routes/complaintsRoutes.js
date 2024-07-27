// routes/complaintsRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const complaintsController = require("../controllers/complaintsController");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Submit a new complaint
router.post(
  "/submit",
  upload.single("image"),
  complaintsController.submitComplaint
);

// Retrieve all complaints
router.get("/all", complaintsController.getComplaints);

module.exports = router;

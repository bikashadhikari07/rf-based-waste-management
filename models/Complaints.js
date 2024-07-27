// models/complaints.js

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: "2dsphere",
    required: true,
  },
  image: {
    type: String, // Stores the URL/path to the image
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;

const Complaint = require("../models/Complaints");

exports.submitComplaint = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const image = req.file.path; // Multer will store the image in 'req.file.path'

    const newComplaint = new Complaint({
      coordinates: [longitude, latitude], // Store as [longitude, latitude]
      image,
    });

    await newComplaint.save();
    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: newComplaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting complaint", error });
  }
};

// Retrieve all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving complaints", error });
  }
};

// controllers/contactController.js
const Contact = require("../models/Contact");
const { body, validationResult } = require("express-validator");

exports.createContact = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name is required."),
  body("email").trim().isEmail().escape().withMessage("Invalid email address."),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Message is required."),

  // Process request after validation and sanitization.
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Send them to the client.
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new Contact document from the sanitized data.
      const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });

      // Save the contact document to the database.
      await contact.save();
      res.status(201).json({ message: "Contact form submitted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  },
];

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Fetch all contacts, sorted by creation date (most recent first)
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

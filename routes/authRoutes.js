// routes/authRoutes.js
const express = require("express");
const { login, createUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/create", createUser);

module.exports = router;

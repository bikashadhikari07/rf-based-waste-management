const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const binRoutes = require("./routes/binRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;

// Connect to database
connectDB();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

//app.use("/admin", authRoutes);

// Routes
app.use("/bins", binRoutes);
app.use("/admin", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

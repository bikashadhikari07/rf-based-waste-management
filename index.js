const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const binRoutes = require("./routes/binRoutes");
const authRoutes = require("./routes/authRoutes");
const garbageCollectorRoutes = require("./routes/garbageCollectorRoutes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3005;

// Connect to database
connectDB();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Routes
app.use("/bins", binRoutes);
app.use("/admin", authRoutes);
app.use(garbageCollectorRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Handle EADDRINUSE error
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use`);
    // Try a different port
    server.listen(0, () => {
      const newPort = server.address().port;
      console.log(`Server running on port ${newPort}`);
    });
  } else {
    throw err;
  }
});

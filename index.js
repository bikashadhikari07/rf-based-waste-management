const express = require("express");
const connectDB = require("./config/db");
const binRoutes = require("./routes/binRoutes");

const app = express();
const port = 3001;

// Connect to database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/bins", binRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

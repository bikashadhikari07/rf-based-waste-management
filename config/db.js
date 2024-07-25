const mongoose = require("mongoose");

const dbURL = "mongodb://localhost:27017/rf-based-waste-management";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {});
    console.log("Connected to database: rf-based-waste-management");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

module.exports = connectDB;

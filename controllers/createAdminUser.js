// createAdminUser.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

mongoose.connect("mongodb://localhost:27017/rf-based-waste-management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to database: rf-based-waste-management");

  const username = "admin"; // change this to your desired username
  const password = "admin123"; // change this to your desired password

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });

  await user.save();
  console.log("Admin user created");

  mongoose.connection.close();
});

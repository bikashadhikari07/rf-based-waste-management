const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  fullness: {
    type: Number,
    required: true,
  },
  lastEmptied: {
    type: Date,
    required: true,
  },
});

const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;

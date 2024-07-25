const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: "2dsphere",
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

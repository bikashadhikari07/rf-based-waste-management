// models/garbageCollector.js
const mongoose = require("mongoose");

const garbageCollectorSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

const GarbageCollector = mongoose.model(
  "GarbageCollector",
  garbageCollectorSchema
);

module.exports = GarbageCollector;

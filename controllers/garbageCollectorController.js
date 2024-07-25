const GarbageCollector = require("../models/GarbageCollector");

// Create a new garbage collector
exports.createGarbageCollector = async (req, res) => {
  try {
    const newGarbageCollector = new GarbageCollector(req.body);
    await newGarbageCollector.save();
    res.status(201).send(newGarbageCollector);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all garbage collectors
exports.getAllGarbageCollectors = async (req, res) => {
  try {
    const garbageCollectors = await GarbageCollector.find({});
    res.status(200).send(garbageCollectors);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single garbage collector by ID
exports.getGarbageCollectorById = async (req, res) => {
  try {
    const garbageCollector = await GarbageCollector.findById(req.params.id);
    if (!garbageCollector) {
      return res.status(404).send();
    }
    res.status(200).send(garbageCollector);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a garbage collector
exports.updateGarbageCollector = async (req, res) => {
  try {
    const garbageCollector = await GarbageCollector.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!garbageCollector) {
      return res.status(404).send();
    }
    res.status(200).send(garbageCollector);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a garbage collector
exports.deleteGarbageCollector = async (req, res) => {
  try {
    const garbageCollector = await GarbageCollector.findByIdAndDelete(
      req.params.id
    );
    if (!garbageCollector) {
      return res.status(404).send();
    }
    res.status(200).send(garbageCollector);
  } catch (error) {
    res.status(500).send(error);
  }
};

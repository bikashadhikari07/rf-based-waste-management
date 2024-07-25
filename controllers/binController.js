const Bin = require("../models/bin");

// Create a new bin
exports.createBin = async (req, res) => {
  try {
    const { latitude, longitude, fullness, lastEmptied } = req.body;

    if (
      latitude === undefined ||
      longitude === undefined ||
      fullness === undefined ||
      !lastEmptied
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const bin = new Bin({
      coordinates: [longitude, latitude],
      fullness: fullness,
      lastEmptied: new Date(lastEmptied),
    });

    await bin.save(); // Save new bin document to the database

    res.status(201).json(bin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing bin by ID
exports.updateBin = async (req, res) => {
  try {
    const { binId } = req.params;
    const { latitude, longitude, fullness, lastEmptied } = req.body;

    if (
      latitude === undefined ||
      longitude === undefined ||
      fullness === undefined ||
      !lastEmptied
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const bin = await Bin.findById(binId);

    if (!bin) return res.status(404).json({ error: "Bin not found" });

    bin.coordinates = [longitude, latitude];
    bin.fullness = fullness;
    bin.lastEmptied = new Date(lastEmptied);

    await bin.save(); // Save updated bin document to the database

    res.status(200).json(bin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get specific bin data by ID
exports.getBin = async (req, res) => {
  try {
    const { binId } = req.params;
    const bin = await Bin.findById(binId);

    if (!bin) return res.status(404).json({ error: "Bin not found" });

    res.status(200).json(bin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bins
exports.getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Find bins within a specified radius
exports.findNearbyBins = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;
    console.log("Received query parameters:", req.query); // Log parameters

    // Validate query parameters
    if (!latitude || !longitude || !maxDistance) {
      return res
        .status(400)
        .json({ error: "Please provide latitude, longitude, and maxDistance" });
    }

    const bins = await Bin.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(maxDistance), // distance in meters
        },
      },
    });

    res.status(200).json(bins);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: err.message });
  }
};

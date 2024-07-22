const Bin = require("../models/bin");

// Create or update a bin
const updateBin = async (req, res) => {
  const { location, fullness, lastEmptied } = req.body;

  try {
    let bin = await Bin.findOne({ location });
    if (bin) {
      bin.fullness = fullness;
      bin.lastEmptied = lastEmptied;
    } else {
      bin = new Bin({ location, fullness, lastEmptied });
    }
    await bin.save();
    res.status(200).json({ message: "Bin data updated successfully", bin });
  } catch (error) {
    res.status(500).json({ message: "Failed to update bin data", error });
  }
};

// Get a specific bin
const getBin = async (req, res) => {
  const { binId } = req.params;

  try {
    const bin = await Bin.findById(binId);
    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }
    res.status(200).json(bin);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bin data", error });
  }
};

// Get all bins
const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bins", error });
  }
};

module.exports = { updateBin, getBin, getAllBins };

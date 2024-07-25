const express = require("express");
const binController = require("../controllers/binController");

const router = express.Router();

// Route to create bin data
router.post("/", binController.createBin);

// Route to update bin data by ID
router.put("/:binId", binController.updateBin);

// Route to get specific bin data by ID
router.get("/:binId", binController.getBin);

// Route to get all bins
router.get("/", binController.getAllBins);

// Route to find nearby bins
router.get("/nearby", binController.findNearbyBins);

module.exports = router;

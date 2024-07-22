const express = require("express");
const binController = require("../controllers/binController");

const router = express.Router();

// Route to update or create bin data
router.post("/update", binController.updateBin);

// Route to get specific bin data
router.get("/:binId", binController.getBin);

// Route to get all bins
router.get("/", binController.getAllBins);

module.exports = router;

const express = require("express");
const router = express.Router();
const garbageCollectorController = require("../controllers/garbageCollectorController");

router.post(
  "/garbageCollectors",
  garbageCollectorController.createGarbageCollector
);
router.get(
  "/garbageCollectors",
  garbageCollectorController.getAllGarbageCollectors
);
router.get(
  "/garbageCollectors/:id",
  garbageCollectorController.getGarbageCollectorById
);
router.patch(
  "/garbageCollectors/:id",
  garbageCollectorController.updateGarbageCollector
);
router.delete(
  "/garbageCollectors/:id",
  garbageCollectorController.deleteGarbageCollector
);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addEquipment,
  approveEquipment,
  getEquipment,
  updateEquipmentStatus,
} = require("../controllers/equipmentController");

// Lab Incharge adds equipment
router.post("/", addEquipment);

// Admin approves
router.put("/approve/:id", approveEquipment);

// Get / filter
router.get("/", getEquipment);

// Update status
router.put("/:id/status", updateEquipmentStatus);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  raiseComplaint,
  getComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

// Raise a complaint
router.post("/", raiseComplaint);

// View complaints
router.get("/", getComplaints);

// Update complaint status
router.put("/:id", updateComplaintStatus);

module.exports = router;

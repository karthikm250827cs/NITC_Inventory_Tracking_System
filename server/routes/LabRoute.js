const express = require("express");
const router = express.Router();
const Lab = require("../models/lab");

// POST /api/labs
router.post("/", async (req, res) => {
  try {
    const { name, location, inCharge } = req.body;

    // Validation
    if (!name || !location || !inCharge) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create lab
    const newLab = new Lab({ name, location, inCharge });

    // Save to DB
    const savedLab = await newLab.save();

    res.status(201).json(savedLab);
  } catch (error) {
    console.error("Error adding lab:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

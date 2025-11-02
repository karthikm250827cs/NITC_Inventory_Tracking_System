console.log("✅ testroute.js loaded");

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// POST /api/users/add
router.post("/add", async (req, res) => {
  try {
    const { name, email, password, role, labId } = req.body;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      labId
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

router.get("/test", (req, res) => {
  res.send("✅ User route working");
});

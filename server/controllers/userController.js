const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Create new user
// controllers/userController.js

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, labId } = req.body;
    console.log("Received data:", req.body); // 👈 add this line to debug

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    if (role === "lab_incharge" && !labId) {
      return res.status(400).json({ message: "labId is required for lab_incharge" });
    }

    const user = new User({ name, email, passwordHash, role, labId });
    await user.save();

    if (role === "lab_incharge" && labId) {
      try {
        await Lab.findByIdAndUpdate(labId, { inCharge: user._id });
      } catch (updateErr) {
        console.error("Error updating lab:", updateErr.message);
      }
    }

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("labId", "name location");
    res.status(200).json(users); // ✅ just send the array
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error while fetching users" });
  }
};

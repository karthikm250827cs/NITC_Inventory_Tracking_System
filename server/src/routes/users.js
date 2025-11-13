// backend/src/routes/users.js
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import roles from "../middleware/roles.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// ✅ List all users (admin only)
router.get("/", verifyToken, roles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Add a new user (admin only)
router.post("/", verifyToken, roles("admin"), async (req, res) => {
  try {
    const { name, email, password, role, lab } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      lab,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error adding user:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delete user (admin only)
router.delete("/:id", verifyToken, roles("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User removed successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

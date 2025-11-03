import express from "express";
import Audit from "../models/Audit.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ GET /api/activities/recent
router.get("/recent", verifyToken, async (req, res) => {
  try {
    const logs = await Audit.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();
    res.json(logs);
  } catch (err) {
    console.error("Activity fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

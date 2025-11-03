// backend/src/routes/complaints.js
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createComplaint,
  getComplaints,
  updateComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", verifyToken, createComplaint);
router.get("/", verifyToken, getComplaints);
router.put("/:id", verifyToken, updateComplaint);

export default router;

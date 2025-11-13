import express from "express";
import { verifyToken } from "../middleware/auth.js";
import roles from "../middleware/roles.js";
import {addEquipment,getPending,approve,list,getById} from "../controllers/equipmentController.js";

const router = express.Router();

// 🔹 Add new equipment (lab-incharge or admin only)
router.post("/", verifyToken, roles("lab-incharge", "admin"), addEquipment);

// 🔹 Get all pending approvals (admin only)
router.get("/pending", verifyToken, roles("admin"), getPending);

// 🔹 Approve or reject equipment (admin only)
router.put("/:id/approve", verifyToken, roles("admin"), approve);

// 🔹 List all equipment (accessible to logged-in users)
router.get("/", verifyToken, list);

// 🔹 Get equipment details by ID
router.get("/:id", verifyToken, getById);

export default router;

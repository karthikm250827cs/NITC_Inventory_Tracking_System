// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/config/db.js";

// ✅ Resolve __dirname (since ES modules don’t support it natively)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import routes (ES6)
import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/users.js";
import equipmentRoutes from "./src/routes/equipment.js";
import complaintRoutes from "./src/routes/complaints.js";
import activityRoutes from "./src/routes/activityRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ NITC Inventory Backend (ES6 Module) running successfully!");
});

// ✅ Error handler middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

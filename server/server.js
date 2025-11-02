require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authroute");
const labRoute = require("./routes/LabRoute");
const app = express();

// Middlewares FIRST
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/labs", labRoute);
app.use("/api/equipment", require("./routes/equipmentRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
// Default route
app.get("/", (req, res) => {
  res.send("Home page");
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();



//mongodb+srv://nitcinventory:<db_password>@merninventory.yrmw3wh.mongodb.net/?appName=merninventory
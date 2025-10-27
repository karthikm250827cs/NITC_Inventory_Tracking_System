const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  equipmentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  model: { type: String },
  serialNumber: { type: String },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
  status: { 
    type: String, 
    enum: ["pending_approval","approved","working","faulty","under_repair","retired"], 
    default: "pending_approval" 
  },
  warranty: { type: mongoose.Schema.Types.Mixed }, // JSON for warranty details
  barcodeUrl: { type: String },
  serviceHistory: { type: mongoose.Schema.Types.Mixed }, // JSON for service logs
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Equipment", equipmentSchema);

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["open","in_progress","resolved","closed"], 
    default: "open" 
  },
  resolution: { type: mongoose.Schema.Types.Mixed } // JSON for resolution details
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);

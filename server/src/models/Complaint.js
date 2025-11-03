import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    equipmentId: { type: String, required: true},
    lab: { type: String, required: true},

    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Escalated", "Resolved"],
      default: "Pending",
    },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resolutionNote: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);

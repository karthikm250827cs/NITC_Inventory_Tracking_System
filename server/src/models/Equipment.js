import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    equipmentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String },
    model: { type: String },
    serialNumber: { type: String },
    lab: { type: String },
    warrantyExpiry: { type: Date },
    status: {
      type: String,
      enum: [
        "Pending Approval",
        "Approved",
        "Rejected",
        "Working",
        "Faulty",
        "Under Repair",
      ],
      default: "Pending Approval",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    history: [
      {
        action: String,
        by: String,
        at: { type: Date, default: Date.now },
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

// ✅ Add text index for search
equipmentSchema.index({ name: "text", type: "text", serialNumber: "text" });

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;

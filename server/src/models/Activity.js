import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
      enum: [
        "equipment_added",
        "complaint_resolved",
        "equipment_approved",
        "warranty_expiring",
        "user_registered",
        "complaint_raised",
      ],
      required: true,
    },
    message: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "relatedModel",
    },
    relatedModel: {
      type: String,
      enum: ["Equipment", "Complaint", "User"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);

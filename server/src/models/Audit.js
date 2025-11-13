import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    actor: { type: String },
    entity: { type: String },
    entityId: { type: String },
    timestamp: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

const Audit = mongoose.model("Audit", auditSchema);

export default Audit;

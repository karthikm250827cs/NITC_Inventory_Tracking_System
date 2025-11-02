const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  action: { type: String, required: true },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  details: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: { createdAt: "timestamp" } });

module.exports = mongoose.model("AuditLog", auditLogSchema);

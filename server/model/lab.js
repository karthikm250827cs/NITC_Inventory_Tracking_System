const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  inCharge: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Lab", labSchema);

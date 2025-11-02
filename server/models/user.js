const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "lab_incharge", "user"], 
    required: true 
  },
  labId: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: "Lab",
  required: function() {
    return this.role === "lab_incharge";
  },
  set: v => (v === "" ? null : v) // convert empty string to null automatically
}
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);


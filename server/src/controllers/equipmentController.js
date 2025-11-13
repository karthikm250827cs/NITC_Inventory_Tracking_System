import Equipment from "../models/Equipment.js";
import Audit from "../models/Audit.js";
import { nanoid } from "nanoid";

/* ==================================================
   🔹 Add Equipment (Role-based Logic)
================================================== */
export const addEquipment = async (req, res) => {
  try {
    const { name, type, model, serialNumber, lab, warrantyExpiry } = req.body;
    const equipmentId = "EQ-" + nanoid(8);

    // ✅ Role-based approval logic
    let initialStatus = "Pending Approval";
    let note = "Awaiting Admin Approval";

    if (req.user.role === "admin") {
      initialStatus = "Approved";
      note = "Auto-approved by Admin";
    }

    // ✅ Create equipment record
    const eq = new Equipment({
      equipmentId,
      name,
      type,
      model,
      serialNumber,
      lab,
      warrantyExpiry: warrantyExpiry ? new Date(warrantyExpiry) : null,
      createdBy: req.user._id,
      status: initialStatus,
    });

    // ✅ Add history
    eq.history.push({
      action: "Created",
      by: req.user.email,
      at: new Date(),
      notes: note,
    });

    await eq.save();

    // ✅ Add audit trail
    await Audit.create({
      action: `Add Equipment (${initialStatus})`,
      actor: req.user.email,
      entity: "Equipment",
      entityId: eq._id,
      details: { name, type, model, serialNumber, lab, warrantyExpiry },
    });

    res.status(201).json(eq);
  } catch (err) {
    console.error("❌ Add Equipment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==================================================
   🔹 Get Pending Equipment (Admin only)
================================================== */
export const getPending = async (req, res) => {
  try {
    const items = await Equipment.find({ status: "Pending Approval" }).populate(
      "createdBy",
      "name email role"
    );
    res.json(items);
  } catch (err) {
    console.error("❌ Get Pending Equipment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==================================================
   🔹 Approve / Reject Equipment (Admin)
================================================== */
export const approve = async (req, res) => {
  try {
    const { id } = req.params;
    const { approve, reason } = req.body;

    const eq = await Equipment.findById(id);
    if (!eq) return res.status(404).json({ message: "Equipment not found" });

    eq.status = approve ? "Working" : "Rejected";
    eq.history.push({
      action: approve ? "Working" : "Rejected",
      by: req.user.email,
      at: new Date(),
      notes: reason || "",
    });

    await eq.save();

    await Audit.create({
      action: approve ? "Approve Equipment" : "Reject Equipment",
      actor: req.user.email,
      entity: "Equipment",
      entityId: eq._id,
      details: { reason },
    });

    res.json(eq);
  } catch (err) {
    console.error("❌ Approve Equipment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==================================================
   🔹 List Equipment
================================================== */
export const list = async (req, res) => {
  try {
    const { q, type, lab, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (lab) filter.lab = lab;
    if (status) filter.status = status;
    if (q) filter.$text = { $search: q };

    const items = await Equipment.find(filter);
    res.json(items);
  } catch (err) {
    console.error("❌ List Equipment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==================================================
   🔹 Get Equipment By ID
================================================== */
export const getById = async (req, res) => {
  try {
    const eq = await Equipment.findById(req.params.id);
    if (!eq) return res.status(404).json({ message: "Equipment not found" });
    res.json(eq);
  } catch (err) {
    console.error("❌ Get Equipment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const Equipment = require("../models/equipment");
const Lab = require("../models/lab");

// ✅ Add new equipment (by Lab Incharge)
exports.addEquipment = async (req, res) => {
  try {
    const { equipmentId, name, type, model, serialNumber, labId } = req.body;

    if (!labId) return res.status(400).json({ message: "labId is required" });

    const equipment = new Equipment({
      equipmentId,
      name,
      type,
      model,
      serialNumber,
      labId,
      createdBy: req.user?._id || null, // optional if using auth
    });

    await equipment.save();
    res.status(201).json({ message: "Equipment added successfully", equipment });
  } catch (error) {
    console.error("Add equipment error:", error.message);
    res.status(500).json({ message: "Error adding equipment" });
  }
};

// ✅ Approve equipment (Admin only)
exports.approveEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    const equipment = await Equipment.findByIdAndUpdate(
      id,
      { status: "approved", approvedBy: req.user?._id || null },
      { new: true }
    );

    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    res.json({ message: "Equipment approved", equipment });
  } catch (error) {
    console.error("Approve equipment error:", error.message);
    res.status(500).json({ message: "Error approving equipment" });
  }
};

// ✅ Filter equipment (User / Lab Incharge)
exports.getEquipment = async (req, res) => {
  try {
    const { labId, model, status } = req.query;
    const filter = {};

    if (labId) filter.labId = labId;
    if (model) filter.model = model;
    if (status) filter.status = status;

    const equipments = await Equipment.find(filter).populate("labId", "name location");
    res.json(equipments);
  } catch (error) {
    console.error("Get equipment error:", error.message);
    res.status(500).json({ message: "Error fetching equipment" });
  }
};

// ✅ Update equipment status (Lab Incharge)
exports.updateEquipmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const equipment = await Equipment.findByIdAndUpdate(id, { status }, { new: true });
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    res.json({ message: "Status updated successfully", equipment });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ message: "Error updating status" });
  }
};

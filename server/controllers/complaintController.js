const Complaint = require("../models/complaint");
const Equipment = require("../models/equipment");

// ✅ Raise a complaint (User)
exports.raiseComplaint = async (req, res) => {
  try {
    const { equipmentId, description, raisedBy } = req.body;

    const complaint = new Complaint({ equipmentId, description, raisedBy });
    await complaint.save();

    // when complaint raised, mark equipment as faulty
    await Equipment.findByIdAndUpdate(equipmentId, { status: "faulty" });

    res.status(201).json({ message: "Complaint raised successfully", complaint });
  } catch (error) {
    console.error("Raise complaint error:", error.message);
    res.status(500).json({ message: "Error raising complaint" });
  }
};

// ✅ Get complaints (Lab Incharge can view complaints for their lab)
exports.getComplaints = async (req, res) => {
  try {
    const { labId } = req.query;

    // Populate for better display
    const complaints = await Complaint.find()
      .populate("equipmentId", "name serialNumber labId")
      .populate("raisedBy", "name email");

    // Optional filtering by lab
    const filtered = labId
      ? complaints.filter(c => c.equipmentId?.labId?.toString() === labId)
      : complaints;

    res.json(filtered);
  } catch (error) {
    console.error("Get complaints error:", error.message);
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// ✅ Update complaint status (Lab Incharge)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status, resolution },
      { new: true }
    );

    res.json({ message: "Complaint updated", complaint });
  } catch (error) {
    console.error("Update complaint error:", error.message);
    res.status(500).json({ message: "Error updating complaint" });
  }
};

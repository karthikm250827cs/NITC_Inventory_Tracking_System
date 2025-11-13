import Complaint from "../models/Complaint.js";
import Equipment from "../models/Equipment.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalEquipment = await Equipment.countDocuments();
    const pendingApprovals = await Complaint.countDocuments({ status: "Pending" });
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });
    const activeComplaints = await Complaint.countDocuments({
      status: { $in: ["In-Progress", "Escalated"] },
    });

    res.json({
      totalEquipment,
      activeComplaints,
      pendingApprovals,
      resolvedComplaints,
      usage: "85%",
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
};

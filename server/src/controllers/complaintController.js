import Complaint from "../models/Complaint.js";
import Equipment from "../models/Equipment.js";
import User from "../models/User.js";
import { logActivity } from "../utils/logActivity.js";

// Create new complaint
export const createComplaint = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Find lab-incharge of the same lab
    const labIncharge = await User.findOne({
      role: "lab-incharge",
      lab: user.lab,
    });

    const complaint = await Complaint.create({
      title: req.body.title,
      description: req.body.description,
      equipmentId: req.body.equipmentId, // new field from frontend
      lab: user.lab, // attach user's lab
      raisedBy: req.user._id,
      assignedTo: labIncharge ? labIncharge._id : null,
    });

    if (complaint.equipmentId) {
      await Equipment.findOneAndUpdate(
        { equipmentId: complaint.equipmentId }, // ✅ Must be an object
        {
          status: "Under Repair",
          $push: {
            history: {
              action: "Status Updated",
              by: user.name,
              notes: "Set to Under Repair due to complaint raised",
            },
          },
        }
      );

      await logActivity(
        "complaint_raised",
        `Complaint "${complaint.title}" (Equipment: ${complaint.equipmentId}) was raised in lab "${user.lab}".`,
        req.user
      );

      res.status(201).json(complaint);
    }
  } catch (err) {
    console.error("Error creating complaint:", err);
    res.status(500).json({ message: "Error creating complaint", error: err });
  }
};

// Fetch all complaints (role-based)
export const getComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let query = {};

    switch (user.role.toLowerCase()) {
      case "admin":
        query = { status: "Escalated" };
        break;

      case "lab-incharge":
        query = { lab: user.lab };
        break;

      default:
        query = { raisedBy: req.user._id };
        break;
    }
    console.log("role" + user.role);

    const complaints = await Complaint.find(query)
      .populate("raisedBy", "name role lab")
      .populate("assignedTo", "name role lab")
      .sort({ createdAt: -1 });

    console.log(query);

    console.log(complaints);

    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ message: "Error fetching complaints", error: err });
  }
};

// Update complaint status (resolve / escalate / approve)
export const updateComplaint = async (req, res) => {
  try {
    const { status, resolutionNote } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    const user = await User.findById(req.user._id);

    // ✅ Update complaint fields
    complaint.status = status || complaint.status;
    complaint.resolutionNote = resolutionNote || complaint.resolutionNote;

    // ✅ Escalation logic
    if (status === "Escalated" && user.role.toLowerCase() === "lab-incharge") {
      const admin = await User.findOne({ role: "admin" });
      complaint.assignedTo = admin?._id || complaint.assignedTo;

      await logActivity(
        "complaint_escalated",
        `Complaint "${complaint.title}" from lab "${user.lab}" was escalated to Admin.`,
        req.user
      );
    }

    // ✅ Resolution logic
    if (status === "Resolved" && user.role.toLowerCase() === "admin") {
      await logActivity(
        "complaint_resolved",
        `Complaint "${complaint.title}" was resolved by Admin.`,
        req.user
      );

      // 🧩 Also mark equipment as Working
      await Equipment.findOneAndUpdate(
        { equipmentId: complaint.equipmentId }, // ✅ filter must be an object
        {
          status: "Working",
          $push: {
            history: {
              action: "Status Updated",
              by: user.name,
              notes: "Set to Working after complaint resolution",
            },
          },
        }
      );
    }

    if (status === "Resolved" && user.role.toLowerCase() === "lab-incharge") {
      await logActivity(
        "complaint_resolved",
        `Complaint "${complaint.title}" was resolved by Admin.`,
        req.user
      );

      // 🧩 Also mark equipment as Working
      await Equipment.findOneAndUpdate(
        { equipmentId: complaint.equipmentId }, // ✅ filter must be an object
        {
          status: "Working",
          $push: {
            history: {
              action: "Status Updated",
              by: user.name,
              notes: "Set to Working after complaint resolution",
            },
          },
        }
      );
    }

    // ✅ If complaint marked as "In Progress" or "Under Review", mark equipment as Under Repair
    if (
      ["In Progress", "Under Review", "Pending", "Raised"].includes(status) &&
      complaint.equipmentId
    ) {
      await Equipment.findOneAndUpdate(complaint.equipmentId, {
        status: "Under Repair",
        $push: {
          history: {
            action: "Status Updated",
            by: user.name,
            notes: `Set to Under Repair due to complaint status "${status}"`,
          },
        },
      });
    }

    await complaint.save();

    res.json({ message: "Complaint updated successfully", complaint });
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ message: "Error updating complaint", error: err });
  }
};

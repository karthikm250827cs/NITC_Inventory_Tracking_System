import Activity from "../models/Activity.js";

export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name role")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(activities);
  } catch (err) {
    console.error("Fetch Activities Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

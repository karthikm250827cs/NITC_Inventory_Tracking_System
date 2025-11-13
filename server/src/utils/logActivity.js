import Activity from "../models/Activity.js";

/**
 * Log an activity in the system.
 * @param {String} actionType - Type of action (e.g., complaint_raised)
 * @param {String} message - Human-readable description
 * @param {Object} user - Mongoose user object
 */
export const logActivity = async (actionType, message, user) => {
  try {
    await Activity.create({
      actionType,
      message,
      user: user?._id || null,
    });
  } catch (err) {
    console.error("Activity logging failed:", err.message);
  }
};

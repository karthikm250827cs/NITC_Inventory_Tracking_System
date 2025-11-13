import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import "../styles/dashboardNew.css";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    equipmentId: "",
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || "user";

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error("Error loading complaints:", err);
    }
  };

  // Fetch equipment for user's lab
  const fetchEquipment = async () => {
    try {
      const res = await API.get(`/equipment?lab=${user.lab}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEquipment(res.data);
    } catch (err) {
      console.error("Error loading equipment:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
    if (role === "user") fetchEquipment();
  }, []);

  // Raise complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.equipmentId)
      return alert("All fields are required.");

    formData.lab = user.lab;
    try {
      setLoading(true);
      await API.post("/complaints", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("✅ Complaint submitted successfully!");
      setFormData({ title: "", description: "", equipmentId: "" });
      fetchComplaints();
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("❌ Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update complaint status
  const handleUpdate = async (id, status) => {
    try {
      await API.put(
        `/complaints/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchComplaints();
    } catch (err) {
      console.error("Error updating complaint:", err);
    }
  };

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          ⚙️ Complaint Management
        </h1>

        {/* ===== USER COMPLAINT FORM ===== */}
        {role === "user" && (
          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-8 mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              📝 Raise a Complaint
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Equipment Selection */}
              <div className="md:col-span-2">
                <label className="block text-gray-800 font-semibold mb-1">
                  Equipment<span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.equipmentId}
                  onChange={(e) =>
                    setFormData({ ...formData, equipmentId: e.target.value })
                  }
                  required
                  className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select Equipment</option>
                  {equipment.map((eq) => (
                    <option key={eq._id} value={eq.equipmentId}>
                      {eq.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-1">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Complaint Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-800 font-semibold mb-1">
                  Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe the issue..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows="4"
                  className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
                >
                  {loading ? "Submitting..." : "🚀 Submit Complaint"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===== COMPLAINT LIST ===== */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {role === "user" ? "📋 My Complaints" : "📋 All Complaints"}
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-white/50 backdrop-blur-lg border-b border-white/60">
                  <th className="p-3 text-left font-semibold">Title</th>
                  <th className="p-3 text-left font-semibold">Equipment</th>
                  <th className="p-3 text-left font-semibold">Status</th>
                  <th className="p-3 text-left font-semibold">Raised By</th>
                  <th className="p-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-600">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b border-white/40 hover:bg-white/40 transition-all duration-200"
                    >
                      <td className="p-3 font-medium">{c.title}</td>
                      <td className="p-3">{c.equipmentId || "-"}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            c.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : c.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : c.status === "Escalated"
                              ? "bg-red-100 text-red-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3">{c.raisedBy?.name || "User"}</td>
                      <td className="p-3">
                        {c.status !== "Resolved" &&
                          role !== "user" &&
                          ((role === "lab-incharge" &&
                            c.status !== "Escalated") ||
                            (role === "admin" && c.status === "Escalated")) && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate(c._id, "Resolved")}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-all"
                              >
                                Resolve
                              </button>
                              {role === "lab-incharge" && (
                                <button
                                  onClick={() =>
                                    handleUpdate(c._id, "Escalated")
                                  }
                                  className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 transition-all"
                                >
                                  Escalate
                                </button>
                              )}
                            </div>
                          )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

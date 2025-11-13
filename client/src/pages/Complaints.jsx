import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [equipment, setEquipment] = useState([]); // ✅ list of equipment in user's lab
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    equipmentId: "",
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log(user);
  const role = user?.role || "user";

  // ✅ Fetch complaints
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
  //updated by raafia 
  // ✅ Fetch equipment for user's lab
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
    if (role === "user") {
      fetchEquipment();
    }
  }, []);

  // ✅ Raise complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.equipmentId)
      return alert("All fields required");
    formData.lab = user.lab;

    try {
      setLoading(true);
      await API.post("/complaints", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Complaint submitted successfully!");
      setFormData({ title: "", description: "", equipmentId: "" });
      fetchComplaints();
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Failed to raise complaint. Please check login or server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update status (for admin/lab-incharge)
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
      <div className="p-6 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-slate-800 mb-5">
          Complaint Management
        </h1>

        {/* ===== USER RAISE COMPLAINT FORM ===== */}
        {role === "user" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow border border-slate-200 mb-8"
          >
            <h2 className="text-lg font-semibold mb-3 text-slate-700">
              Raise a Complaint
            </h2>

            {/* Equipment Selection */}
            <select
              value={formData.equipmentId}
              onChange={(e) =>
                setFormData({ ...formData, equipmentId: e.target.value })
              }
              required
              className="w-full p-2 border border-slate-300 rounded mb-3"
            >
              <option value="">Select Equipment</option>
              {equipment.map((eq) => (
                <option key={eq._id} value={eq.equipmentId}>
                  {eq.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Complaint Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full p-2 border border-slate-300 rounded mb-2"
            />
            <textarea
              placeholder="Describe your issue..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="w-full p-2 border border-slate-300 rounded mb-3 h-24"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        )}

        {/* ===== COMPLAINT LIST ===== */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-5">
          <h2 className="text-lg font-semibold mb-4 text-slate-800">
            {role === "user" ? "My Complaints" : "All Complaints"}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-2">Title</th>
                  <th className="p-2">Equipment</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Raised By</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-slate-500">
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="p-2 font-medium">{c.title}</td>
                      <td className="p-2">{c.equipmentId || "-"}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            c.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : c.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : c.status === "Escalated"
                              ? "bg-red-100 text-red-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="p-2">{c.raisedBy?.name || "User"}</td>
                      <td className="p-2">
                        {c.status !== "Resolved" && role !== "user" && (
  (role === "lab-incharge" && c.status !== "Escalated") ||
  (role === "admin" && c.status === "Escalated")
) && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleUpdate(c._id, "Resolved")}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                              >
                                Resolve
                              </button>
                              {role === "lab-incharge" && (
                                <button
                                  onClick={() =>
                                    handleUpdate(c._id, "Escalated")
                                  }
                                  className="bg-amber-500 text-white px-3 py-1 rounded text-xs hover:bg-amber-600"
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

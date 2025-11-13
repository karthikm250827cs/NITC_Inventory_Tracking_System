import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import "../styles/dashboardNew.css";

export default function ReviewApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    try {
      setLoading(true);
      const res = await API.get("/equipment/pending");
      setPending(res.data || []);
    } catch (err) {
      console.error("Error loading pending approvals:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, approve) => {
    const reason = !approve ? prompt("Enter rejection reason:") : "";
    try {
      await API.put(`/equipment/${id}/approve`, { approve, reason });
      alert(approve ? "✅ Equipment Approved" : "❌ Equipment Rejected");
      loadPending();
    } catch (err) {
      console.error("Error updating approval:", err);
      alert("Error updating approval status. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          🧾 Review Equipment Approvals
        </h1>

        {/* ====== Pending Approvals Table ====== */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {loading
              ? "Loading Pending Requests..."
              : "Pending Equipment Approvals"}
          </h2>

          {pending.length === 0 && !loading ? (
            <p className="text-gray-700 text-center py-6">
              🎉 All caught up! No pending equipment approvals.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-900 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/40 backdrop-blur-lg border-b border-white/60">
                    <th className="p-3 text-left font-semibold">Equipment</th>
                    <th className="p-3 text-left font-semibold">Lab</th>
                    <th className="p-3 text-left font-semibold">Type</th>
                    <th className="p-3 text-left font-semibold">Added By</th>
                    <th className="p-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-white/40 hover:bg-white/40 transition-all duration-200"
                    >
                      <td className="p-3 font-medium">{item.name}</td>
                      <td className="p-3">{item.lab || "N/A"}</td>
                      <td className="p-3">{item.type || "N/A"}</td>
                      <td className="p-3">
                        {item.createdBy?.email || "Unknown"}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(item._id, true)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow transition-all"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleAction(item._id, false)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow transition-all"
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

export default function ReviewApprovals() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    try {
      const res = await API.get("/equipment/pending");
      setPending(res.data || []);
    } catch (err) {
      console.error("Error loading pending approvals:", err);
    }
  };

  const handleAction = async (id, approve) => {
    const reason = !approve ? prompt("Enter rejection reason:") : "";
    await API.put(`/equipment/${id}/approve`, { approve, reason });
    alert(approve ? "✅ Equipment Approved" : "❌ Equipment Rejected");
    loadPending();
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">🧾 Review Equipment Approvals</h1>

        {pending.length === 0 ? (
          <p className="text-gray-600">No pending equipment approvals.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Equipment Name</th>
                  <th className="px-4 py-2 text-left">Lab</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Added By</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.lab}</td>
                    <td className="px-4 py-2">{item.type}</td>
                    <td className="px-4 py-2">{item.createdBy?.email || "Unknown"}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleAction(item._id, true)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(item._id, false)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

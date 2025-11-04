import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

export default function ViewReports() {
  const [equipment, setEquipment] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byStatus: {}, byLab: {} });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/equipment");
      setEquipment(res.data || []);
      calculateSummary(res.data);
    } catch (err) {
      console.error("Error loading reports:", err);
    }
  };

  const calculateSummary = (data) => {
    const total = data.length;
    const byStatus = {};
    const byLab = {};

    data.forEach((item) => {
      byStatus[item.status] = (byStatus[item.status] || 0) + 1;
      byLab[item.lab || "Unassigned"] = (byLab[item.lab || "Unassigned"] || 0) + 1;
    });

    setSummary({ total, byStatus, byLab });
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Equipment Reports</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow">
            <p className="text-sm font-semibold">Total Equipment</p>
            <h2 className="text-2xl font-bold">{summary.total}</h2>
          </div>

          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow">
            <p className="text-sm font-semibold">Working</p>
            <h2 className="text-2xl font-bold">{summary.byStatus["Working"] || 0}</h2>
          </div>

          <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
            <p className="text-sm font-semibold">Faulty / Under Repair</p>
            <h2 className="text-2xl font-bold">
              {(summary.byStatus["Faulty"] || 0) + (summary.byStatus["Under Repair"] || 0)}
            </h2>
          </div>
        </div>

        {/* By Status */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Equipment by Status</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.byStatus).map(([status, count]) => (
                <tr key={status}>
                  <td className="p-2 border-b">{status}</td>
                  <td className="p-2 border-b">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* By Lab */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Equipment by Lab</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">Lab</th>
                <th className="p-2 border-b">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.byLab).map(([lab, count]) => (
                <tr key={lab}>
                  <td className="p-2 border-b">{lab}</td>
                  <td className="p-2 border-b">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

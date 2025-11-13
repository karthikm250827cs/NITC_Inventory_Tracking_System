import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import "../styles/dashboardNew.css";

export default function ViewReports() {
  const [summary, setSummary] = useState({ total: 0, labs: {} });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/equipment");
      const data = res.data || [];
      calculateSummary(data);
    } catch (err) {
      console.error("Error loading reports:", err);
    }
  };

  const calculateSummary = (data) => {
    const labs = {};

    data.forEach((item) => {
      const lab = item.lab || "Unassigned";
      if (!labs[lab]) labs[lab] = { working: 0, faulty: 0 };

      if (item.status === "Working") labs[lab].working++;
      else if (item.status === "Faulty" || item.status === "Under Repair")
        labs[lab].faulty++;
    });

    setSummary({ total: data.length, labs });
  };

  const totalWorking = Object.values(summary.labs).reduce(
    (sum, lab) => sum + lab.working,
    0
  );
  const totalFaulty = Object.values(summary.labs).reduce(
    (sum, lab) => sum + lab.faulty,
    0
  );

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          📊 Equipment Report Dashboard
        </h1>

        {/* Glass Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl p-5 rounded-2xl">
            <p className="text-sm text-gray-700 font-medium">Total Equipment</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">
              {summary.total}
            </h2>
          </div>

          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl p-5 rounded-2xl">
            <p className="text-sm text-gray-700 font-medium">Working</p>
            <h2 className="text-3xl font-bold text-green-700 mt-1">
              {totalWorking}
            </h2>
          </div>

          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl p-5 rounded-2xl">
            <p className="text-sm text-gray-700 font-medium">
              Faulty / Under Repair
            </p>
            <h2 className="text-3xl font-bold text-red-700 mt-1">
              {totalFaulty}
            </h2>
          </div>
        </div>

        {/* Glass Table */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Equipment by Lab
          </h2>

          <table className="w-full text-gray-900">
            <thead>
              <tr className="bg-white/40 backdrop-blur-lg">
                <th className="p-3 text-left font-semibold">Lab</th>
                <th className="p-3 text-left font-semibold">Working</th>
                <th className="p-3 text-left font-semibold">
                  Faulty / Under Repair
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.labs).map(([lab, data]) => (
                <tr key={lab} className="hover:bg-white/30 transition-colors">
                  <td className="p-3 border-b border-white/50">{lab}</td>
                  <td className="p-3 border-b border-white/50">
                    {data.working}
                  </td>
                  <td className="p-3 border-b border-white/50">
                    {data.faulty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

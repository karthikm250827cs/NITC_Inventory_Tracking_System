import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import "../styles/dashboardNew.css";

export default function EquipmentList() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");
  const [lab, setLab] = useState("All Labs");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/equipment");
      setItems(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Filters & search
  useEffect(() => {
    let result = items;

    if (search.trim() !== "") {
      result = result.filter(
        (it) =>
          it.name?.toLowerCase().includes(search.toLowerCase()) ||
          it.model?.toLowerCase().includes(search.toLowerCase()) ||
          it.lab?.toLowerCase().includes(search.toLowerCase()) ||
          it.serialNumber?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "All Status") {
      result = result.filter((it) => (it.status || "Active") === status);
    }

    if (type !== "All Types") {
      result = result.filter(
        (it) => (it.type || "").toLowerCase() === type.toLowerCase()
      );
    }

    if (lab !== "All Labs") {
      result = result.filter(
        (it) => (it.lab || "").toLowerCase() === lab.toLowerCase()
      );
    }

    setFiltered(result);
  }, [search, status, type, lab, items]);

  // 🧾 Dropdown options
  const statusOptions = [
    "All Status",
    ...new Set(items.map((i) => i.status || "Active")),
  ];
  const typeOptions = [
    "All Types",
    ...new Set(items.map((i) => i.type || "General")),
  ];
  const labOptions = [
    "All Labs",
    ...new Set(items.map((i) => i.lab || "Unknown")),
  ];

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          🧰 Equipment Catalog
        </h1>

        {/* 🔽 Filters Section */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            🔎 Filter & Search
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <select
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {typeOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <select
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              value={lab}
              onChange={(e) => setLab(e.target.value)}
            >
              {labOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 🧱 Equipment Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((it) => (
              <div
                key={it._id}
                className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-6 hover:bg-white/40 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {it.name}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {it.model} • {it.lab}
                    </div>
                  </div>
                  <div
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      it.status === "Working"
                        ? "bg-green-100 text-green-700"
                        : it.status === "Under Repair"
                        ? "bg-amber-100 text-amber-700"
                        : it.status === "Faulty"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {it.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="text-xs text-gray-500">Serial Number</p>
                    <p className="font-medium">{it.serialNumber || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Equipment ID</p>
                    <p className="font-medium">
                      {it.equipmentId || it._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Warranty Expiry</p>
                    <p className="font-medium">
                      {it.warrantyExpiry
                        ? new Date(it.warrantyExpiry)
                            .toISOString()
                            .split("T")[0]
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-medium">{it.type || "General"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-10 text-lg">
            No equipment found matching your filters.
          </div>
        )}
      </div>
    </Layout>
  );
}

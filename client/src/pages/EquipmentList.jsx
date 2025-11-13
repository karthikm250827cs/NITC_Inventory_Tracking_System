import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";
import "../styles/equipment.css";

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
 //updated by raafia for testing
  // 🔍 Filter whenever filters or search change
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
      result = result.filter((it) => (it.type || "").toLowerCase() === type.toLowerCase());
    }

    if (lab !== "All Labs") {
      result = result.filter((it) => (it.lab || "").toLowerCase() === lab.toLowerCase());
    }

    setFiltered(result);
  }, [search, status, type, lab, items]);

  // 🧾 Extract unique dropdown options
  const statusOptions = ["All Status", ...new Set(items.map((i) => i.status || "Active"))];
  const typeOptions = ["All Types", ...new Set(items.map((i) => i.type || "General"))];
  const labOptions = ["All Labs", ...new Set(items.map((i) => i.lab || "Unknown"))];

  return (
    <Layout>
      <div className="page-title">
        <h1>Equipment Catalog</h1>
      </div>

      {/* 🔽 Filters Section */}
      <div className="filters card mt-4">
        <div className="flex flex-wrap gap-3">
          <input
            className="input flex-1"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
            {typeOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          <select className="input" value={lab} onChange={(e) => setLab(e.target.value)}>
            {labOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 🧰 Equipment Grid */}
      <div className="equipment-grid mt-6">
        {filtered.length > 0 ? (
          filtered.map((it) => (
            <div key={it._id} className="equipment-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{it.name}</h3>
                  <div className="text-sm text-slate-400">
                    {it.model} • {it.lab}
                  </div>
                </div>
                <div
  className={`text-sm px-3 py-1 rounded-full font-medium ${
    it.status === "Working"
      ? "bg-green-100 text-green-700"
      : it.status === "Under Repair"
      ? "bg-amber-100 text-amber-700"
      : it.status === "Faulty"
      ? "bg-red-100 text-red-700"
      : "bg-slate-100 text-slate-600"
  }`}
>
  {it.status}
</div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-slate-600">
                <div>
                  <div className="text-xs text-slate-400">Serial Number:</div>
                  <div className="text-slate-700">{it.serialNumber || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Equipment ID:</div>
                  <div className="text-slate-700">
                    {it.equipmentId || it._id.slice(-6).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Warranty:</div>
                  <div className="text-slate-700">{it.warrantyExpiry || "N/A"}</div>
                </div>
                {/* <div>
                  <div className="text-xs text-slate-400">Last Service:</div>
                  <div className="text-slate-700">{it.lastService || "N/A"}</div>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400 mt-10">
            No equipment found matching your filters.
          </div>
        )}
      </div>
    </Layout>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api/axios";
import "../styles/dashboardNew.css";

export default function AddEquipment() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    model: "",
    serialNumber: "",
    lab: "",
    warrantyExpiry: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    if (user.role === "user") {
      alert("You are not authorized to add equipment");
      navigate("/dashboard");
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/equipment", form);

      if (user.role === "admin") {
        alert("✅ Equipment added successfully.");
      } else if (user.role === "lab-incharge") {
        alert("✅ Equipment added successfully and sent for admin approval.");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding equipment:", err);
      alert("❌ Failed to add equipment. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          ➕ Add New Equipment
        </h1>

        {/* Full-Width Glassmorphic Form */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-10 w-full">
          <form
            onSubmit={submit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Equipment Name */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-semibold mb-1">
                Equipment Name<span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter equipment name"
                className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Type
              </label>
              <input
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="e.g., Computer, Sensor"
                className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Model
              </label>
              <input
                required
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                placeholder="Model number or name"
                className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Serial Number
              </label>
              <input
                required
                value={form.serialNumber}
                onChange={(e) =>
                  setForm({ ...form, serialNumber: e.target.value })
                }
                placeholder="Unique serial number"
                className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Lab */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Lab
              </label>
              <select
                required
                value={form.lab}
                onChange={(e) => setForm({ ...form, lab: e.target.value })}
                className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Lab</option>
                <option value="SSL">SSL</option>
                <option value="NSL">NSL</option>
                <option value="ML">ML</option>
                <option value="Image Processing">Image Processing</option>
              </select>
            </div>

            {/* Warranty Expiry */}
            <div className="md:col-span-2">
              <label className="block text-gray-800 font-semibold mb-1">
                Warranty Expiry
              </label>
              <input
                required
                type="date"
                value={form.warrantyExpiry}
                onChange={(e) =>
                  setForm({ ...form, warrantyExpiry: e.target.value })
                }
                className="w-full p-4 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
              >
                🚀 Submit Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

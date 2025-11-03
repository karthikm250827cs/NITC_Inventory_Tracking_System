import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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

      // ✅ Dynamic success messages based on user role
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
      <div className="max-w-2xl bg-white p-6 rounded shadow mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add Equipment
        </h2>
        <form onSubmit={submit} className="grid grid-cols-1 gap-4">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Equipment Name"
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          />
          <input
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            placeholder="Equipment Type"
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          />
          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Model"
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          />
          <input
            value={form.serialNumber}
            onChange={(e) =>
              setForm({ ...form, serialNumber: e.target.value })
            }
            placeholder="Serial Number"
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          />
          <input
            value={form.lab}
            onChange={(e) => setForm({ ...form, lab: e.target.value })}
            placeholder="Lab"
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          />
          <label className="text-sm text-gray-700 font-medium">
            Warranty Expiry
          </label>
          <input
            type="date"
            value={form.warrantyExpiry}
            onChange={(e) =>
              setForm({ ...form, warrantyExpiry: e.target.value })
            }
            className="p-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200"
          />

          <button
            type="submit"
            className="px-4 py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

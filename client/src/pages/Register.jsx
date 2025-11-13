import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/dashboardNew.css"; // use same glass theme

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    lab: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      alert("✅ Registered successfully! Please login.");
      nav("/");
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Failed to register. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-800 relative overflow-hidden">
      {/* Soft glowing background orbs */}
      <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl top-16 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Registration Card */}
      <div className="backdrop-blur-2xl bg-white/20 border border-white/40 shadow-2xl rounded-3xl p-10 w-[90%] max-w-lg text-center text-gray-100 z-10">
        <h1 className="text-4xl font-extrabold mb-2 text-white tracking-wide">
          Create Account
        </h1>
        <p className="text-gray-300 mb-8 text-sm">
          Join the NITC Inventory Management Portal
        </p>

        <form onSubmit={submit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
          />

          {/* <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
          /> */}

          <input
            type="text"
            placeholder="Lab"
            value={form.lab}
            onChange={(e) => setForm({ ...form, lab: e.target.value })}
            required
            className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
          />

          {/* Role (optional dropdown for future admin) */}
          {/* <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="user">User</option>
            <option value="lab-incharge">Lab In-Charge</option>
            <option value="admin">Admin</option>
          </select> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-blue-500/40"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() => nav("/")}
            className="w-full py-3 rounded-xl bg-white/30 text-white border border-white/40 hover:bg-white/40 font-medium transition-all duration-300"
          >
            ⬅ Back to Login
          </button>
        </form>

        <div className="mt-6 text-gray-300 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => nav("/")}
            className="text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/dashboardNew.css"; // reuse same glassmorphic theme

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/dashboard");
    } catch (err) {
      alert("❌ Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-800 relative overflow-hidden">
      {/* Soft glowing orbs */}
      <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Login Card */}
      <div className="backdrop-blur-2xl bg-white/20 border border-white/40 shadow-2xl rounded-3xl p-10 w-[90%] max-w-md text-center text-gray-100 z-10">
        <h1 className="text-4xl font-extrabold mb-2 text-white tracking-wide">
          NITC Inventory
        </h1>
        <p className="text-gray-300 mb-8 text-sm">
          Smart Inventory Management Portal
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full p-3 rounded-xl bg-white/60 text-gray-900 border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-blue-500/40"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => setForm({ email: "", password: "" })}
            className="w-full py-3 rounded-xl bg-white/30 text-white border border-white/40 hover:bg-white/40 font-medium transition-all duration-300"
          >
            Clear
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-gray-300 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}

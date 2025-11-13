import React, { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import "../styles/dashboardNew.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    lab: "",
  });

  const load = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", form);
      alert("✅ User added successfully");
      setForm({ name: "", email: "", password: "", role: "user", lab: "" });
      load();
    } catch (err) {
      console.error("Error adding user:", err);
      alert("❌ Failed to add user");
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      load();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("❌ Failed to delete user");
    }
  };

  return (
    <Layout>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          👥 User Management
        </h1>

        {/* ====== Add User Form ====== */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ➕ Add New User
          </h2>

          <form
            onSubmit={addUser}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              placeholder="Email Address"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="user">User</option>
              <option value="lab-incharge">Lab-In-Charge</option>
              <option value="admin">Admin</option>
            </select>

            <select
              value={form.lab}
              onChange={(e) => setForm({ ...form, lab: e.target.value })}
              className="p-3 rounded-xl bg-white/50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Lab</option>
              <option value="SSL">SSL</option>
              <option value="NSL">NSL</option>
              <option value="ML">ML</option>
              <option value="Image Processing">Image Processing</option>
            </select>

            <div className="sm:col-span-2 md:col-span-3 lg:col-span-5 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200"
              >
                🚀 Add User
              </button>
            </div>
          </form>
        </div>

        {/* ====== Users Table ====== */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Registered Users
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-white/40 backdrop-blur-lg border-b border-white/60">
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">Role</th>
                  <th className="p-3 text-left font-semibold">Lab</th>
                  <th className="p-3 text-left font-semibold text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-600">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-b border-white/40 hover:bg-white/40 transition-all duration-200"
                    >
                      <td className="p-3 font-medium">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3">{u.lab || "-"}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => removeUser(u._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow transition-all"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

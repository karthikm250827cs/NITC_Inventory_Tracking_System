import React from "react";
import Layout from "../components/Layout";
import "../styles/dashboardNew.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          👤 My Profile
        </h1>

        {/* Profile Info Card */}
        <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl rounded-2xl p-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Circle */}
            <div className="w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user?.name || "Unknown User"}
              </h2>
              <p className="text-gray-700 mt-1">📧 {user?.email || "N/A"}</p>
              {user.role != "admin" && (
                <p className="text-gray-700 mt-1">🧪 Lab: {user?.lab || "-"}</p>
              )}
              <p className="text-gray-700 mt-1">
                🛠️ Role:{" "}
                <span className="font-semibold capitalize">
                  {user?.role || "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Glass Grid Summary (optional aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl p-5 rounded-2xl text-center">
            <p className="text-sm text-gray-700 font-medium">Full Name</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1">
              {user?.name || "-"}
            </h2>
          </div>

          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl p-5 rounded-2xl text-center">
            <p className="text-sm text-gray-700 font-medium">Email</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1 break-all">
              {user?.email || "-"}
            </h2>
          </div>

          <div className="backdrop-blur-xl bg-white/30 border border-white/60 shadow-xl p-5 rounded-2xl text-center">
            <p className="text-sm text-gray-700 font-medium">Role</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1 capitalize">
              {user?.role || "-"}
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}

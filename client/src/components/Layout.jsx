import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  MessageSquare,
  UserPlus,
  CheckCircle,
  Users,
  Menu,
  LogOut,
} from "lucide-react";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
    >
      <Icon size={20} />
      {sidebarOpen && <span className="font-medium">{label}</span>}
    </Link>
  );

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg h-screen flex flex-col transition-all duration-300`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1
            className={`font-bold text-xl text-blue-700 transition-all duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            NITC
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* User Role */}
        {sidebarOpen && (
          <p className="px-6 py-2 text-sm text-gray-500 border-b">
            {user?.role?.toUpperCase()}
          </p>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1 text-gray-700">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/equipment" icon={Wrench} label="Equipment" />
          <NavItem to="/complaints" icon={MessageSquare} label="Complaints" />

          {user?.role !== "user" && (
            <NavItem to="/add" icon={UserPlus} label="Add Equipment" />
          )}

          {user?.role === "admin" && (
            <>
              <NavItem
                to="/approvals"
                icon={CheckCircle}
                label="Review Approvals"
              />
              <NavItem to="/users" icon={Users} label="Manage Users" />
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <LogOut size={18} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 transition-all duration-300">
        <div className="min-h-full">{children}</div>
      </main>
    </div>
  );
}

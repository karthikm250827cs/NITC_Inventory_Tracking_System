import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  MessageSquare,
  UserPlus,
  CheckCircle,
  Users,
  User,
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

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link to={to} className="nav-item">
      <Icon size={20} />
      {sidebarOpen && <span className="font-medium">{label}</span>}
    </Link>
  );

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="sidebar-header">
          <h1
            className={`logo ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}`}
          >
            NITC
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={22} />
          </button>
        </div>

        <nav className="sidebar-links">
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
          <NavItem to="/profile" icon={User} label="My Profile" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50">
        {/* Top Header with Profile */}
        <div className="top-header">
          <div className="profile-box">
            <span className="role">{user?.role.toUpperCase()}</span>
            <div className="avatar">{initials}</div>
            <div className="info">
              <span className="name">{user?.name.toUpperCase()}</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

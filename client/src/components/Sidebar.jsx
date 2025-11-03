import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Box, AlertTriangle, Users } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">NITC Inventory</div>
        <nav className="nav-links">
          <Link
            to="/dashboard"
            className={location.pathname.includes("dashboard") ? "active" : ""}
          >
            <Home size={18} /> <span>Dashboard</span>
          </Link>

          <Link to="/equipment">
                <Box size={18} /> <span>Equipment</span>
            </Link>

          {user?.role !== "user" && (
            <Link
              to="/add"
              className={location.pathname.includes("add") ? "active" : ""}
            >
              <Box size={18} /> <span>Add Equipment</span>
            </Link>
          )}

          <Link
            to="/complaints"
            className={location.pathname.includes("complaints") ? "active" : ""}
          >
            <AlertTriangle size={18} /> <span>Complaints</span>
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/users"
              className={location.pathname.includes("users") ? "active" : ""}
            >
              <Users size={18} /> <span>Users</span>
            </Link>
          )}
        </nav>
      </div>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

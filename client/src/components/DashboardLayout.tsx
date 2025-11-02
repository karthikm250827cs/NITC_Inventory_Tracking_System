import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical, LayoutDashboard, Package, AlertCircle, Users, LogOut, Plus, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "admin" | "lab-incharge" | "user";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const navItems = {
    admin: [
      { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/admin/approvals", icon: Package, label: "Pending Approvals" },
      { path: "/admin/complaints", icon: AlertCircle, label: "Complaints" },
      { path: "/admin/users", icon: Users, label: "User Management" },
    ],
    "lab-incharge": [
      { path: "/lab-incharge", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/lab-incharge/equipment", icon: Package, label: "My Equipment" },
      { path: "/lab-incharge/add", icon: Plus, label: "Add Equipment" },
      { path: "/lab-incharge/complaints", icon: AlertCircle, label: "Complaints" },
    ],
    user: [
      { path: "/user", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/user/catalog", icon: Package, label: "Equipment Catalog" },
      { path: "/user/complaints", icon: AlertCircle, label: "My Complaints" },
    ],
  };

  const currentNavItems = navItems[role];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border shadow-lg">
        <div className="p-6 border-b border-sidebar-border bg-gradient-to-br from-sidebar-primary/10 to-transparent">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Lab Inventory</h1>
              <p className="text-xs text-sidebar-foreground/70 font-medium">NITC CSE Dept</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {currentNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 animate-fade-in ${
                    isActive
                      ? "bg-gradient-primary text-white shadow-md hover:shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-sidebar-border bg-sidebar">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive transition-all duration-300"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/20">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border p-6 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent capitalize">
                {role.replace("-", " ")} Dashboard
              </h2>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Manage laboratory equipment and track inventory
              </p>
            </div>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </header>
        <div className="p-6 animate-fade-in">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

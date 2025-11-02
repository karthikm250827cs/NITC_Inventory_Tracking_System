import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import EquipmentTable from "@/components/EquipmentTable";
import { Package, AlertCircle, Search, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  const availableEquipment = [
    { id: "EQ-3001", name: "Desktop Computer", type: "Computer", lab: "Lab A", status: "working" as const, warranty: "2025-08-15" },
    { id: "EQ-3002", name: "Laser Printer", type: "Printer", lab: "Lab B", status: "working" as const, warranty: "2026-02-28" },
    { id: "EQ-3003", name: "Projector System", type: "Projector", lab: "Lab C", status: "working" as const, warranty: "2025-12-10" },
  ];

  const myComplaints = [
    { id: "C-101", equipment: "Desktop Computer", issue: "Slow performance", date: "2025-10-20", status: "in-progress" },
    { id: "C-102", equipment: "Projector System", issue: "No display output", date: "2025-10-22", status: "pending" },
  ];

  return (
    <DashboardLayout role="user">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <StatCard title="Available Equipment" value="234" icon={Package} trend="All labs" />
          <StatCard title="My Complaints" value="2" icon={AlertCircle} trend="1 in progress" />
          <StatCard title="Working Items" value="215" icon={Search} trend="91% uptime" />
          <StatCard title="Labs" value="8" icon={FileText} trend="CSE Department" />
        </div>

        {/* Search Equipment */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-500 border-border/50 overflow-hidden animate-slide-up">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 pointer-events-none" />
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5 relative">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent font-bold">Equipment Catalog</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 relative">
            <div className="flex gap-4">
              <Input 
                placeholder="Search equipment by name, type, or lab..." 
                className="flex-1 shadow-sm focus:shadow-md transition-shadow duration-300" 
              />
              <Button className="bg-gradient-primary hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            <EquipmentTable equipment={availableEquipment} actions="view" />
          </CardContent>
        </Card>

        {/* My Complaints */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-500 border-border/50 overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-secondary opacity-5 pointer-events-none" />
          <CardHeader className="border-b bg-gradient-to-r from-destructive/5 to-warning/5 relative">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-destructive to-warning rounded-lg shadow-glow">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent font-bold">My Complaints</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 relative">
            <div className="space-y-4">
              {myComplaints.map((complaint, index) => (
                <div
                  key={complaint.id}
                  className="group flex items-center justify-between p-5 bg-gradient-card rounded-xl hover:shadow-md transition-all duration-300 border border-border/30 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-1.5">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">{complaint.equipment}</p>
                    <p className="text-sm text-muted-foreground font-medium">{complaint.issue}</p>
                    <p className="text-xs text-muted-foreground">Filed on {complaint.date}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                    complaint.status === "pending" ? "bg-warning/20 text-warning border border-warning/30" :
                    "bg-primary/20 text-primary border border-primary/30"
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              ))}
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Raise New Complaint
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;

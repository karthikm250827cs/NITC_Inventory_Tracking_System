import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Wrench, CheckCircle, XCircle } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  lab: string;
  status: "working" | "faulty" | "pending";
  warranty: string;
}

interface EquipmentTableProps {
  equipment: Equipment[];
  actions?: "view" | "approve" | "resolve";
}

const EquipmentTable = ({ equipment, actions = "view" }: EquipmentTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "working":
        return <Badge className="bg-success text-success-foreground">Working</Badge>;
      case "faulty":
        return <Badge className="bg-destructive text-destructive-foreground">Faulty</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b-2 border-primary/20">
            <TableHead className="font-bold text-foreground">Equipment ID</TableHead>
            <TableHead className="font-bold text-foreground">Name</TableHead>
            <TableHead className="font-bold text-foreground">Type</TableHead>
            <TableHead className="font-bold text-foreground">Lab</TableHead>
            <TableHead className="font-bold text-foreground">Status</TableHead>
            <TableHead className="font-bold text-foreground">Warranty</TableHead>
            <TableHead className="font-bold text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item, index) => (
            <TableRow 
              key={item.id} 
              className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 border-b border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-mono text-sm font-semibold text-primary">{item.id}</TableCell>
              <TableCell className="font-semibold">{item.name}</TableCell>
              <TableCell className="text-muted-foreground">{item.type}</TableCell>
              <TableCell className="text-muted-foreground">{item.lab}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell className="font-medium">{item.warranty}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {actions === "view" && (
                    <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  )}
                  {actions === "approve" && (
                    <>
                      <Button size="sm" className="bg-success hover:bg-success/90 shadow-sm hover:shadow-md transition-all duration-300">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="shadow-sm hover:shadow-md transition-all duration-300">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {actions === "resolve" && (
                    <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      <Wrench className="w-4 h-4 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EquipmentTable;

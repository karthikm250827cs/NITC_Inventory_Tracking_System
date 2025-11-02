import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, trend, className = "" }: StatCardProps) => {
  return (
    <Card className={`group relative overflow-hidden hover:shadow-lg transition-all duration-500 border-border/50 bg-gradient-card ${className}`}>
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">{value}</p>
            {trend && <p className="text-xs text-muted-foreground font-medium">{trend}</p>}
          </div>
          <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

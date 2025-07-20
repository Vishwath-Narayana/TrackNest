import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange";
  chartData?: number[];
}

const colorMap = {
  blue: "bg-kpi-blue",
  green: "bg-kpi-green", 
  purple: "bg-kpi-purple",
  orange: "bg-kpi-orange"
};

export function KPICard({ title, value, change, icon: Icon, color, chartData = [] }: KPICardProps) {
  const isPositive = change.startsWith("+");
  
  const colorStyles = {
    blue: {
      bg: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
      icon: "bg-gradient-to-br from-blue-500 to-blue-600",
      text: "text-blue-600",
      border: "border-blue-200/50"
    },
    green: {
      bg: "bg-gradient-to-br from-green-500/10 to-green-600/10",
      icon: "bg-gradient-to-br from-green-500 to-green-600",
      text: "text-green-600",
      border: "border-green-200/50"
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
      icon: "bg-gradient-to-br from-purple-500 to-purple-600",
      text: "text-purple-600",
      border: "border-purple-200/50"
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
      icon: "bg-gradient-to-br from-orange-500 to-orange-600",
      text: "text-orange-600",
      border: "border-orange-200/50"
    }
  };
  
  const style = colorStyles[color];
  
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      {/* Background Effects */}
      <div className={`absolute inset-0 ${style.bg}`}></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
      
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${style.icon} shadow-lg`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            <span className="text-xs">{isPositive ? "↗" : "↘"}</span>
            {change}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl md:text-3xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600 font-medium">{title}</div>
        </div>
        
        {/* Enhanced Mini Chart */}
        <div className="mt-4 flex items-end space-x-1 h-12">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm ${style.icon} shadow-sm transition-all duration-300 group-hover:shadow-md`}
              style={{ 
                height: `${20 + Math.random() * 20}px`,
                opacity: 0.7 + Math.random() * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
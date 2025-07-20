import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CheckCircle, Clock, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const taskStats = [
  {
    id: "1",
    title: "Total Tasks",
    subtitle: "All project tasks",
    value: 66,
    change: "+1%",
    icon: CalendarDays,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    id: "2", 
    title: "Completed",
    subtitle: "Tasks finished",
    value: 43,
    change: "+13%",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    id: "3",
    title: "In Progress", 
    subtitle: "Currently active",
    value: 18,
    change: "-2%",
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    id: "4",
    title: "Overdue",
    subtitle: "Past deadline",
    value: 5,
    change: "-1%",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-50"
  }
];

export function TaskStatistics() {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Glassmorphism Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl translate-x-8 -translate-y-8"></div>
      
      <div className="relative z-10 p-3 md:p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Task Statistics</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <span>Jan 15 - Mar 30, 2024</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {taskStats.map((stat) => (
            <div key={stat.id} className="group p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/70 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${stat.bgColor} shadow-sm`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">{stat.title}</span>
                    <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{stat.subtitle}</span>
                    <div className="flex items-center gap-1">
                      {stat.change.startsWith('+') ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-white/30">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">65%</div>
              <div className="text-xs text-gray-500">Completion Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">+8%</div>
              <div className="text-xs text-gray-500">This Week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
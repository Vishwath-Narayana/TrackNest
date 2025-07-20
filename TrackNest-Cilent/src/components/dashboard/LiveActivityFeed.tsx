import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Code, 
  Bug,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  description: string;
  user?: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "info",
    title: "New Activity Item",
    description: "This is a simulated real-time update",
    user: "System",
    timestamp: "Just now",
    icon: Activity
  },
  {
    id: "2",
    type: "warning", 
    title: "New Activity Item",
    description: "This is a simulated real-time update",
    user: "System",
    timestamp: "Just now",
    icon: AlertTriangle
  },
  {
    id: "3",
    type: "success",
    title: "Feature: User Authentication",
    description: "Added OAuth integration and JWT tokens",
    user: "Sarah Chen",
    timestamp: "2 minutes ago",
    icon: Code
  },
  {
    id: "4",
    type: "error",
    title: "Bug Fix: Dashboard Loading",
    description: "Resolved infinite loading state issue",
    timestamp: "5 minutes ago",
    icon: Bug
  }
];

const activityColors = {
  info: "text-activity-info",
  warning: "text-activity-warning", 
  success: "text-activity-success",
  error: "text-activity-error"
};

export function LiveActivityFeed() {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-xl translate-x-8 -translate-y-8"></div>
      
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Live Activity</h2>
              <p className="text-sm text-gray-600">Real-time system updates</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            Live
          </Badge>
        </div>
      
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full shadow-sm",
                activity.type === "info" && "bg-blue-100",
                activity.type === "warning" && "bg-yellow-100", 
                activity.type === "success" && "bg-green-100",
                activity.type === "error" && "bg-red-100"
              )}>
                <activity.icon className={cn("h-4 w-4", 
                  activity.type === "info" && "text-blue-600",
                  activity.type === "warning" && "text-yellow-600",
                  activity.type === "success" && "text-green-600",
                  activity.type === "error" && "text-red-600"
                )} />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{activity.title}</span>
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    activity.type === "info" && "bg-blue-500",
                    activity.type === "warning" && "bg-yellow-500",
                    activity.type === "success" && "bg-green-500", 
                    activity.type === "error" && "bg-red-500"
                  )} />
                </div>
                
                <p className="text-xs text-gray-600">
                  {activity.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {activity.user && (
                    <>
                      <span className="font-medium">{activity.user}</span>
                      <span>•</span>
                    </>
                  )}
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          
          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            View all activities
          </Button>
        </div>
      </div>
    </div>
  );
}
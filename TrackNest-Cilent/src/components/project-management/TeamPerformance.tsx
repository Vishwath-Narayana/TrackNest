import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, Award, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Lead Designer",
    tasks: 12,
    efficiency: 95,
    avatar: "SC",
    color: "bg-blue-500",
    status: "online"
  },
  {
    id: "2", 
    name: "Mike Johnson",
    role: "Frontend Dev",
    tasks: 10,
    efficiency: 88,
    avatar: "MJ",
    color: "bg-green-500",
    status: "online"
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "UI Designer", 
    tasks: 8,
    efficiency: 92,
    avatar: "ED",
    color: "bg-purple-500",
    status: "away"
  },
  {
    id: "4",
    name: "Alex Kim",
    role: "Backend Dev",
    tasks: 15,
    efficiency: 87,
    avatar: "AK",
    color: "bg-orange-500",
    status: "online"
  }
];

export function TeamPerformance() {
  const averageEfficiency = Math.round(teamMembers.reduce((sum, member) => sum + member.efficiency, 0) / teamMembers.length);
  const totalTasks = teamMembers.reduce((sum, member) => sum + member.tasks, 0);

  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Glassmorphism Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl translate-x-8 -translate-y-8"></div>
      
      <div className="relative z-10 p-3 md:p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-purple-50">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Team Performance</h2>
            <p className="text-sm text-gray-600">Individual and team metrics</p>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-white/50 rounded-xl border border-white/30">
            <div className="text-lg font-bold text-blue-600">{averageEfficiency}%</div>
            <div className="text-xs text-gray-500">Avg Efficiency</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl border border-white/30">
            <div className="text-lg font-bold text-green-600">{totalTasks}</div>
            <div className="text-xs text-gray-500">Total Tasks</div>
          </div>
        </div>
        
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="group p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/70 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarFallback className={`${member.color} text-white text-sm font-medium`}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                    member.status === "online" && "bg-green-500",
                    member.status === "away" && "bg-yellow-500",
                    member.status === "offline" && "bg-gray-400"
                  )} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">{member.name}</span>
                    <span className="text-sm font-medium text-gray-600">{member.tasks} tasks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{member.role}</span>
                    <span className="text-xs font-medium text-gray-600">{member.efficiency}%</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Progress 
                  value={member.efficiency} 
                  className="h-2 bg-gray-100" 
                />
                <div className={cn(
                  "absolute inset-0 rounded-full opacity-20 transition-all duration-300",
                  member.efficiency >= 90 && "bg-green-500",
                  member.efficiency >= 80 && member.efficiency < 90 && "bg-blue-500",
                  member.efficiency >= 70 && member.efficiency < 80 && "bg-orange-500",
                  member.efficiency < 70 && "bg-red-500"
                )}></div>
              </div>

              {/* Performance Indicator */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span className="capitalize">{member.status}</span>
                <div className="flex items-center gap-1">
                  {member.efficiency >= 90 && <Award className="h-3 w-3 text-yellow-500" />}
                  {member.efficiency >= 80 && member.efficiency < 90 && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {member.efficiency < 80 && <Target className="h-3 w-3 text-orange-500" />}
                  <span className={cn(
                    member.efficiency >= 90 && "text-green-600",
                    member.efficiency >= 80 && member.efficiency < 90 && "text-blue-600",
                    member.efficiency < 80 && "text-orange-600"
                  )}>
                    {member.efficiency >= 90 && "Excellent"}
                    {member.efficiency >= 80 && member.efficiency < 90 && "Good"}
                    {member.efficiency < 80 && "Needs Improvement"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Summary */}
        <div className="mt-4 pt-3 border-t border-white/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Team Health</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
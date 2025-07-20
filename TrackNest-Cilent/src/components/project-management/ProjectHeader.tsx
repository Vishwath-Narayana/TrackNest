import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Users, CheckCircle, MoreHorizontal, Edit, Share2 } from "lucide-react";

export function ProjectHeader() {
  const teamMembers = [
    { id: "1", initials: "SC", color: "bg-purple-500", name: "Sarah Chen" },
    { id: "2", initials: "MJ", color: "bg-green-500", name: "Mike Johnson" },
    { id: "3", initials: "ED", color: "bg-blue-500", name: "Emily Davis" },
    { id: "4", initials: "AK", color: "bg-orange-500", name: "Alex Kim" },
  ];

  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Glassmorphism Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl -translate-x-8 translate-y-8"></div>
      
      <div className="relative z-10 p-3 md:p-4">
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Project Icon */}
            <div className="relative">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-lg md:text-xl font-bold text-white">A</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Project Info */}
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard Redesign</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Owner: Sarah Chen</span>
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>Jan 15 - Mar 30, 2024</span>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>68% Complete</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 bg-white/50 border-white/30 hover:bg-white/70">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 bg-white/50 border-white/30 hover:bg-white/70">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-white/50 border-white/30 hover:bg-white/70">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Team Members and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          {/* Team Members */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Team:</span>
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-white shadow-sm hover:scale-110 transition-transform">
                  <AvatarFallback className={`${member.color} text-white text-xs`}>
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center shadow-sm">
                <span className="text-xs text-gray-600">+2</span>
              </div>
            </div>
            <span className="text-xs text-gray-500">6 members</span>
          </div>

          {/* Status Badge */}
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
            Active
          </Badge>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">Project Progress</span>
            <span className="text-sm font-medium text-gray-600">68%</span>
          </div>
          <div className="relative">
            <Progress value={68} className="h-3 bg-gray-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"></div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>23 of 34 tasks completed</span>
            <span>11 tasks remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
}
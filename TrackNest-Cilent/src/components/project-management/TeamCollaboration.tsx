import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Video, Calendar, FileText, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const recentActivities = [
  {
    id: "1",
    type: "message",
    user: "Sarah Chen",
    avatar: "SC",
    color: "bg-blue-500",
    action: "commented on Design System",
    time: "2 min ago",
    icon: MessageCircle
  },
  {
    id: "2",
    type: "meeting",
    user: "Mike Johnson",
    avatar: "MJ",
    color: "bg-green-500",
    action: "scheduled team sync",
    time: "15 min ago",
    icon: Video
  },
  {
    id: "3",
    type: "task",
    user: "Emily Davis",
    avatar: "ED",
    color: "bg-purple-500",
    action: "completed UI Mockups",
    time: "1 hour ago",
    icon: FileText
  },
  {
    id: "4",
    type: "collaboration",
    user: "Alex Kim",
    avatar: "AK",
    color: "bg-orange-500",
    action: "shared API docs",
    time: "2 hours ago",
    icon: Users
  }
];

const upcomingMeetings = [
  {
    id: "1",
    title: "Sprint Planning",
    time: "Today, 2:00 PM",
    participants: 6,
    type: "video"
  },
  {
    id: "2",
    title: "Design Review",
    time: "Tomorrow, 10:00 AM",
    participants: 4,
    type: "in-person"
  },
  {
    id: "3",
    title: "Code Review",
    time: "Mar 15, 3:00 PM",
    participants: 3,
    type: "video"
  }
];

export function TeamCollaboration() {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Glassmorphism Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl translate-x-8 -translate-y-8"></div>
      
      <div className="relative z-10 p-3 md:p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-blue-50">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Team Collaboration</h2>
            <p className="text-sm text-gray-600">Recent activities and meetings</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <MessageCircle className="h-4 w-4 mr-2" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button size="sm" variant="outline" className="bg-white/50 border-white/30 hover:bg-white/70">
            <Video className="h-4 w-4 mr-2" />
            <span className="text-xs">Meeting</span>
          </Button>
        </div>

        {/* Recent Activities */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <h3 className="font-semibold text-gray-800 text-sm">Recent Activities</h3>
          </div>
          
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-2 bg-white/50 rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-200">
                <Avatar className="h-6 w-6 border border-white">
                  <AvatarFallback className={`${activity.color} text-white text-xs`}>
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-800">{activity.user}</span>
                    <activity.icon className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{activity.action}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <h3 className="font-semibold text-gray-800 text-sm">Upcoming Meetings</h3>
          </div>
          
          <div className="space-y-2">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-3 bg-white/50 rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">{meeting.title}</span>
                  <Badge variant="outline" className="text-xs bg-white/50 border-white/30">
                    {meeting.type === "video" ? "Video" : "In-person"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{meeting.time}</span>
                  <span>{meeting.participants} participants</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/30">
          <div className="text-center">
            <div className="text-sm font-bold text-blue-600">12</div>
            <div className="text-xs text-gray-500">Messages</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">3</div>
            <div className="text-xs text-gray-500">Meetings</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-purple-600">8</div>
            <div className="text-xs text-gray-500">Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
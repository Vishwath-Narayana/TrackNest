import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelinePhase {
  id: string;
  name: string;
  tasks: string;
  status: "completed" | "current" | "upcoming";
  progress: number;
  color: string;
  month: string;
  description: string;
}

const timelinePhases: TimelinePhase[] = [
  {
    id: "1",
    name: "Planning & Research",
    tasks: "147 tasks",
    status: "completed",
    progress: 100,
    color: "bg-blue-500",
    month: "Jan 2024",
    description: "Requirements gathering and project planning"
  },
  {
    id: "2", 
    name: "Design & Prototyping",
    tasks: "89 tasks",
    status: "completed",
    progress: 100,
    color: "bg-blue-500",
    month: "Feb 2024",
    description: "UI/UX design and interactive prototypes"
  },
  {
    id: "3",
    name: "Development",
    tasks: "234 tasks",
    status: "current",
    progress: 75,
    color: "bg-purple-500",
    month: "Feb 2024",
    description: "Core functionality implementation"
  },
  {
    id: "4",
    name: "Testing & QA",
    tasks: "67 tasks",
    status: "current",
    progress: 30,
    color: "bg-orange-500",
    month: "Mar 2024",
    description: "Comprehensive testing and quality assurance"
  },
  {
    id: "5",
    name: "Deployment",
    tasks: "23 tasks",
    status: "upcoming",
    progress: 0,
    color: "bg-red-500",
    month: "Mar 2024",
    description: "Production deployment and go-live"
  }
];

const milestones = [
  {
    id: "1",
    title: "Project Kickoff",
    description: "Initial planning and team alignment",
    date: "Jan 15",
    status: "completed",
    icon: CheckCircle
  },
  {
    id: "2",
    title: "Design Phase Complete",
    description: "UI/UX designs approved and finalized",
    date: "Feb 10",
    status: "completed",
    icon: CheckCircle
  },
  {
    id: "3",
    title: "Development Milestone",
    description: "Core functionality implementation",
    date: "Feb 28",
    status: "current",
    icon: TrendingUp
  },
  {
    id: "4",
    title: "Testing & QA",
    description: "Comprehensive testing and bug fixes",
    date: "Mar 15",
    status: "upcoming",
    icon: Clock
  },
  {
    id: "5",
    title: "Launch Ready",
    description: "Final deployment and go-live",
    date: "Mar 30",
    status: "upcoming",
    icon: AlertCircle
  }
];

export function ProjectTimeline() {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Glassmorphism Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl -translate-x-8 translate-y-8"></div>
      
      <div className="relative z-10 p-3 md:p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Project Timeline</h2>
          <p className="text-sm text-gray-600">Track progress across project phases and milestones</p>
        </div>
        
        <div className="space-y-4">
          {/* Timeline Chart */}
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Jan 2024</span>
              <span>Feb 2024</span>
              <span>Mar 2024</span>
            </div>
            
            <div className="space-y-4">
              {timelinePhases.map((phase) => (
                <div key={phase.id} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-3 w-3 rounded-full transition-all duration-200",
                        phase.color,
                        phase.status === "current" && "animate-pulse"
                      )} />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{phase.name}</h3>
                        <p className="text-xs text-gray-500">{phase.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{phase.tasks}</span>
                      <Badge 
                        variant={phase.status === "completed" ? "default" : "secondary"}
                        className={cn(
                          "text-xs",
                          phase.status === "completed" && "bg-green-100 text-green-700 border-green-200",
                          phase.status === "current" && "bg-blue-100 text-blue-700 border-blue-200",
                          phase.status === "upcoming" && "bg-gray-100 text-gray-600 border-gray-200"
                        )}
                      >
                        {phase.status === "completed" && "Completed"}
                        {phase.status === "current" && "In Progress"}
                        {phase.status === "upcoming" && "Upcoming"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-gray-600">{phase.progress}%</span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={phase.progress} 
                        className="h-2 bg-gray-100" 
                      />
                      <div className={cn(
                        "absolute inset-0 rounded-full opacity-20 transition-all duration-300",
                        phase.color
                      )}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Milestones */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <h3 className="font-semibold text-gray-800">Key Milestones</h3>
            </div>
            
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start gap-3 group">
                  <div className={cn(
                    "h-2 w-2 rounded-full mt-2 transition-all duration-200",
                    milestone.status === "completed" && "bg-green-500",
                    milestone.status === "current" && "bg-blue-500 animate-pulse",
                    milestone.status === "upcoming" && "bg-gray-300"
                  )} />
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <milestone.icon className={cn(
                          "h-4 w-4",
                          milestone.status === "completed" && "text-green-500",
                          milestone.status === "current" && "text-blue-500",
                          milestone.status === "upcoming" && "text-gray-400"
                        )} />
                        <span className="text-sm font-semibold text-gray-800">{milestone.title}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded-full">
                        {milestone.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/30">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">2</div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">2</div>
              <div className="text-xs text-gray-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-600">1</div>
              <div className="text-xs text-gray-500">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">68%</div>
              <div className="text-xs text-gray-500">Overall</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
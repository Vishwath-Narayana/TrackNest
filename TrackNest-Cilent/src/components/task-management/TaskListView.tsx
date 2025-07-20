import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CalendarDays, 
  MessageSquare, 
  Paperclip, 
  Clock,
  Flag,
  AlertTriangle,
  CheckCircle2,
  MoreHorizontal,
  Edit3,
  Trash2,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "done" | "in-progress" | "to-do" | "review";
  priority: "high" | "medium" | "low";
  progress: number;
  tags: string[];
  assignees: { id: string; initials: string; color: string }[];
  dueDate: string;
  comments: number;
  attachments: number;
  category: string;
  updatedDate: string;
}

interface TaskListViewProps {
  tasks: Task[];
}

const statusColors = {
  "done": "text-green-600 bg-green-50 border-green-200",
  "in-progress": "text-blue-600 bg-blue-50 border-blue-200", 
  "to-do": "text-gray-600 bg-gray-50 border-gray-200",
  "review": "text-yellow-600 bg-yellow-50 border-yellow-200"
};

const statusIcons = {
  "done": CheckCircle2,
  "in-progress": Clock,
  "to-do": AlertTriangle,
  "review": Flag
};

const priorityColors = {
  "high": "border-l-red-500 bg-red-50/50",
  "medium": "border-l-yellow-500 bg-yellow-50/50",
  "low": "border-l-green-500 bg-green-50/50"
};

const priorityLabels = {
  "high": "High Priority",
  "medium": "Medium Priority", 
  "low": "Low Priority"
};

export function TaskListView({ tasks }: TaskListViewProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const StatusIcon = statusIcons[task.status];
        
        return (
          <div 
            key={task.id} 
            className={cn(
              "relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 border-l-4 hover:bg-white/80 hover:shadow-xl transition-all duration-300 group",
              priorityColors[task.priority]
            )}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 cursor-pointer
                      ${task.status === "done" ? "bg-green-500 border-green-500" : "hover:border-blue-400"}
                    `}>
                      {task.status === "done" && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                      ${task.status === "done" ? "bg-green-100 text-green-600" :
                        task.status === "in-progress" ? "bg-blue-100 text-blue-600" :
                        task.status === "review" ? "bg-yellow-100 text-yellow-600" :
                        "bg-gray-100 text-gray-600"}
                    `}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                        {task.title}
                      </h3>
                      <Badge className={cn("text-xs font-medium", statusColors[task.status])}>
                        {task.status === "in-progress" ? "In Progress" : 
                         task.status === "to-do" ? "To Do" : 
                         task.status === "review" ? "Review" : "Done"}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50">
                        {priorityLabels[task.priority]}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-white/50 border border-white/30 text-gray-600 hover:bg-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="text-gray-800 font-semibold">{task.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" 
                    style={{ width: `${task.progress}%` }} 
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Assigned to:</span>
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee) => (
                        <Avatar key={assignee.id} className="h-6 w-6 border-2 border-white shadow-sm">
                          <AvatarFallback className={`${assignee.color} text-white text-xs font-medium`}>
                            {assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <CalendarDays className="h-3 w-3" />
                    <span>Due {task.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{task.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Paperclip className="h-3 w-3" />
                    <span>{task.attachments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{task.category}</span>
                  </div>
                </div>
              </div>

              {/* Updated Date */}
              <div className="mt-3 pt-3 border-t border-white/30">
                <span className="text-xs text-gray-400">Updated {task.updatedDate}</span>
              </div>
            </div>
          </div>
        );
      })}
      
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your filters or create a new task.</p>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Showing {tasks.length} of {tasks.length} tasks</span>
          </div>
        </div>
      )}
    </div>
  );
}
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CalendarDays, 
  MessageSquare, 
  Paperclip, 
  Clock,
  Flag,
  AlertTriangle,
  CheckCircle2,
  Plus,
  MoreHorizontal,
  Edit3,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

interface TaskKanbanViewProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: string) => void;
  onAddTask: (status: string) => void;
}

const statusConfig = {
  "to-do": {
    title: "To Do",
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: AlertTriangle,
    count: 0
  },
  "in-progress": {
    title: "In Progress", 
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: Clock,
    count: 0
  },
  "review": {
    title: "Review",
    color: "from-yellow-500 to-yellow-600", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: Flag,
    count: 0
  },
  "done": {
    title: "Done",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50", 
    borderColor: "border-green-200",
    icon: CheckCircle2,
    count: 0
  }
};

const priorityColors = {
  "high": "border-l-red-500 bg-red-50/50",
  "medium": "border-l-yellow-500 bg-yellow-50/50", 
  "low": "border-l-green-500 bg-green-50/50"
};

function SortableTaskCard({ task, onTaskMove }: { task: Task; onTaskMove: (taskId: string, newStatus: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const StatusIcon = statusConfig[task.status].icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl p-4 mb-3 border-l-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-white/80 hover:shadow-lg group",
        priorityColors[task.priority],
        isDragging && "opacity-50 scale-95"
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`
              w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200
              ${task.status === "done" ? "bg-green-100 text-green-600" :
                task.status === "in-progress" ? "bg-blue-100 text-blue-600" :
                task.status === "review" ? "bg-yellow-100 text-yellow-600" :
                "bg-gray-100 text-gray-600"}
            `}>
              <StatusIcon className="h-3 w-3" />
            </div>
            <Badge className={cn("text-xs font-medium", 
              task.status === "done" ? "text-green-600 bg-green-50 border-green-200" :
              task.status === "in-progress" ? "text-blue-600 bg-blue-50 border-blue-200" :
              task.status === "review" ? "text-yellow-600 bg-yellow-50 border-yellow-200" :
              "text-gray-600 bg-gray-50 border-gray-200"
            )}>
              {statusConfig[task.status].title}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-white/50">
              <Eye className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-white/50">
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Title and Description */}
        <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors duration-200">
          {task.title}
        </h4>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-white/50 border border-white/30 text-gray-600">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs bg-white/50 border border-white/30 text-gray-600">
              +{task.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="text-gray-700 font-medium">{task.progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" 
              style={{ width: `${task.progress}%` }} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {task.assignees.slice(0, 3).map((assignee) => (
                <Avatar key={assignee.id} className="h-5 w-5 border border-white shadow-sm">
                  <AvatarFallback className={`${assignee.color} text-white text-xs font-medium`}>
                    {assignee.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              {task.assignees.length > 3 && (
                <div className="h-5 w-5 bg-gray-200 rounded-full flex items-center justify-center border border-white">
                  <span className="text-xs text-gray-600">+{task.assignees.length - 3}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <CalendarDays className="h-3 w-3" />
              <span>{task.dueDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{task.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TaskKanbanView({ tasks, onTaskMove, onAddTask }: TaskKanbanViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group tasks by status
  const tasksByStatus = {
    "to-do": tasks.filter(task => task.status === "to-do"),
    "in-progress": tasks.filter(task => task.status === "in-progress"),
    "review": tasks.filter(task => task.status === "review"),
    "done": tasks.filter(task => task.status === "done")
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as string;
      onTaskMove(taskId, newStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => {
          const config = statusConfig[status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          
          return (
            <div key={status} className="space-y-4">
              {/* Column Header */}
              <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                
                <div className="relative z-10 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r ${config.color} text-white shadow-sm`}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{config.title}</h3>
                        <p className="text-xs text-gray-500">{statusTasks.length} tasks</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{statusTasks.length > 0 ? Math.round((statusTasks.filter(t => t.progress === 100).length / statusTasks.length) * 100) : 0}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-500`} 
                        style={{ 
                          width: `${statusTasks.length > 0 ? (statusTasks.filter(t => t.progress === 100).length / statusTasks.length) * 100 : 0}%` 
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Task Button */}
              <Button
                onClick={() => onAddTask(status)}
                variant="outline"
                className="w-full bg-white/50 border-white/30 hover:bg-white/70 text-gray-600 hover:text-gray-800 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>

              {/* Task Cards */}
              <div className="min-h-[200px]">
                <SortableContext items={statusTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                  {statusTasks.map((task) => (
                    <SortableTaskCard key={task.id} task={task} onTaskMove={onTaskMove} />
                  ))}
                </SortableContext>
                
                {statusTasks.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <StatusIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">No tasks in {config.title.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
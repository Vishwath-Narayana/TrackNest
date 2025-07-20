import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TaskListView } from "@/components/task-management/TaskListView";
import { TaskKanbanView } from "@/components/task-management/TaskKanbanView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Bell, 
  List, 
  LayoutGrid,
  X,
  Bookmark,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Share2,
  MoreHorizontal,
  Plus,
  Users,
  Target,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

const tasks: Task[] = [
  {
    id: "1",
    title: "User Authentication Flow",
    description: "Implement secure user authentication with OAuth, 2FA, and session management...",
    status: "done",
    priority: "high",
    progress: 100,
    tags: ["Security", "Authentication"],
    assignees: [
      { id: "1", initials: "SC", color: "bg-blue-500" },
      { id: "2", initials: "MJ", color: "bg-green-500" }
    ],
    dueDate: "Jan 10, 2024",
    comments: 5,
    attachments: 1,
    category: "Security",
    updatedDate: "1/9/2024"
  },
  {
    id: "2", 
    title: "Design System Implementation",
    description: "Create a comprehensive design system with reusable components, tokens, and documentation.",
    status: "in-progress",
    priority: "high",
    progress: 65,
    tags: ["UI/UX", "Frontend"],
    assignees: [
      { id: "3", initials: "ED", color: "bg-purple-500" },
      { id: "4", initials: "AK", color: "bg-orange-500" }
    ],
    dueDate: "Jan 15, 2024",
    comments: 3,
    attachments: 5,
    category: "Design",
    updatedDate: "1/10/2024"
  },
  {
    id: "3",
    title: "Mobile Responsive Design", 
    description: "Ensure all components work perfectly on mobile devices with touch interactions.",
    status: "in-progress",
    priority: "high",
    progress: 40,
    tags: ["Mobile", "Responsive"],
    assignees: [
      { id: "3", initials: "ED", color: "bg-purple-500" },
      { id: "2", initials: "MJ", color: "bg-green-500" }
    ],
    dueDate: "Jan 16, 2024",
    comments: 6,
    attachments: 4,
    category: "Design",
    updatedDate: "1/10/2024"
  },
  {
    id: "4",
    title: "API Integration Testing",
    description: "Comprehensive testing of all API endpoints with error handling and performance optimization.",
    status: "to-do",
    priority: "medium",
    progress: 0,
    tags: ["Backend", "Testing"],
    assignees: [
      { id: "4", initials: "AK", color: "bg-orange-500" }
    ],
    dueDate: "Jan 20, 2024",
    comments: 2,
    attachments: 1,
    category: "Development",
    updatedDate: "1/8/2024"
  },
  {
    id: "5",
    title: "Performance Optimization",
    description: "Optimize application performance, reduce bundle size, and improve loading times.",
    status: "review",
    priority: "medium",
    progress: 85,
    tags: ["Performance", "Optimization"],
    assignees: [
      { id: "1", initials: "SC", color: "bg-blue-500" }
    ],
    dueDate: "Jan 25, 2024",
    comments: 4,
    attachments: 2,
    category: "Performance",
    updatedDate: "1/11/2024"
  },
  {
    id: "6",
    title: "Database Migration",
    description: "Migrate from legacy database to new cloud infrastructure with zero downtime.",
    status: "to-do",
    priority: "low",
    progress: 10,
    tags: ["Database", "Migration"],
    assignees: [
      { id: "2", initials: "MJ", color: "bg-green-500" }
    ],
    dueDate: "Feb 1, 2024",
    comments: 0,
    attachments: 0,
    category: "Infrastructure",
    updatedDate: "1/3/2024"
  }
];

type SortField = "title" | "dueDate" | "priority" | "status" | "lastUpdated";
type SortOrder = "asc" | "desc";
type FilterStatus = "all" | "to-do" | "in-progress" | "review" | "done";
type FilterPriority = "all" | "low" | "medium" | "high";

export default function TaskManagement() {
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterPriority, setFilterPriority] = useState<FilterPriority>("all");

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = searchQuery === "" || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || task.status === filterStatus;
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "dueDate":
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case "status":
          const statusOrder = { "to-do": 1, "in-progress": 2, "review": 3, "done": 4 };
          aValue = statusOrder[a.status];
          bValue = statusOrder[b.status];
          break;
        case "lastUpdated":
          aValue = new Date(a.updatedDate);
          bValue = new Date(b.updatedDate);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchQuery, sortField, sortOrder, filterStatus, filterPriority]);

  const completedTasks = filteredAndSortedTasks.filter(t => t.status === "done").length;
  const inProgressTasks = filteredAndSortedTasks.filter(t => t.status === "in-progress").length;
  const toDoTasks = filteredAndSortedTasks.filter(t => t.status === "to-do").length;
  const reviewTasks = filteredAndSortedTasks.filter(t => t.status === "review").length;
  const totalTasks = filteredAndSortedTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -translate-x-40 translate-y-40"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <DashboardHeader />
          
          <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-6 overflow-auto">
            {/* Project Header */}
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
              
              <div className="relative z-10 p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      T
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        Task Management System
                      </h1>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                        <span>Owner: Sarah Chen</span>
                        <span>Jan 15 - Mar 30, 2024</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{completionRate}% Complete</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-gray-600">Team:</span>
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">SC</div>
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">MJ</div>
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">ED</div>
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">AK</div>
                        </div>
                        <span className="text-sm text-gray-500">+2 6 members</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">
                      Active
                    </Badge>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">
                      {completedTasks} of {totalTasks} tasks completed
                    </span>
                    <span className="text-gray-600">{completionRate}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" 
                      style={{ width: `${completionRate}%` }} 
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{totalTasks - completedTasks} tasks remaining</p>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-1">
                <Button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                      : "text-gray-700 hover:text-gray-900 bg-transparent"
                  }`}
                >
                  <List className="h-4 w-4 mr-2" />
                  List View
                </Button>
                <Button
                  onClick={() => setViewMode("kanban")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "kanban"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm"
                      : "text-gray-700 hover:text-gray-900 bg-transparent"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Kanban View
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              
              <div className="relative z-10 p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
                    <Input 
                      placeholder="Search tasks by title, description, or category..." 
                      className="pl-9 pr-16 bg-white/50 border-white/30 focus:bg-white/70 transition-all duration-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 z-10">
                      {searchQuery ? 'ESC' : '⌘K'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                        >
                          <Filter className="h-4 w-4" />
                          <span className="font-medium">Filters</span>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-0 border-0 shadow-2xl" align="end" sideOffset={5}>
                        <div className="relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                          <div className="relative z-10 p-5 space-y-4">
                            <div className="text-center pb-3 border-b border-white/20">
                              <h4 className="text-base font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Filter Tasks
                              </h4>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Status</h5>
                              <RadioGroup value={filterStatus} onValueChange={(value) => setFilterStatus(value as FilterStatus)}>
                                <div className="space-y-2">
                                  {[
                                    { value: "all", label: "All Status" },
                                    { value: "to-do", label: "To Do" },
                                    { value: "in-progress", label: "In Progress" },
                                    { value: "review", label: "Review" },
                                    { value: "done", label: "Done" }
                                  ].map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option.value} id={`status-${option.value}`} />
                                      <Label htmlFor={`status-${option.value}`} className="text-sm cursor-pointer">
                                        {option.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">Priority</h5>
                              <RadioGroup value={filterPriority} onValueChange={(value) => setFilterPriority(value as FilterPriority)}>
                                <div className="space-y-2">
                                  {[
                                    { value: "all", label: "All Priority" },
                                    { value: "low", label: "Low Priority" },
                                    { value: "medium", label: "Medium Priority" },
                                    { value: "high", label: "High Priority" }
                                  ].map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option.value} id={`priority-${option.value}`} />
                                      <Label htmlFor={`priority-${option.value}`} className="text-sm cursor-pointer">
                                        {option.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80 hover:border-white/60 text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-sm"
                        >
                          <span className="font-medium">Sort</span>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 p-0 border-0 shadow-2xl" align="start" sideOffset={5}>
                        <div className="relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                          <div className="relative z-10 p-4 space-y-3">
                            <div className="text-center pb-2 border-b border-white/20">
                              <h4 className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Sort Tasks
                              </h4>
                            </div>
                            <div className="space-y-2">
                              <RadioGroup value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                                <div className="space-y-2">
                                  {[
                                    { value: "title", label: "Title" },
                                    { value: "dueDate", label: "Due Date" },
                                    { value: "priority", label: "Priority" },
                                    { value: "status", label: "Status" },
                                    { value: "lastUpdated", label: "Last Updated" }
                                  ].map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                                      <Label htmlFor={`sort-${option.value}`} className="text-sm cursor-pointer">
                                        {option.label}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium text-gray-700 mb-1.5">Order</h5>
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  onClick={() => setSortOrder("asc")}
                                  className={`h-8 text-xs font-medium transition-all duration-200 ${
                                    sortOrder === "asc" 
                                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
                                      : "bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/40"
                                  }`}
                                >
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                  Ascending
                                </Button>
                                <Button
                                  onClick={() => setSortOrder("desc")}
                                  className={`h-8 text-xs font-medium transition-all duration-200 ${
                                    sortOrder === "desc" 
                                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
                                      : "bg-white/60 hover:bg-white/80 text-gray-700 hover:text-gray-900 border border-white/40"
                                  }`}
                                >
                                  <ArrowDown className="h-3 w-3 mr-1" />
                                  Descending
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>



            {/* Task Content */}
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              
              <div className="relative z-10 p-4 md:p-6">
                {viewMode === "list" ? (
                  <TaskListView tasks={filteredAndSortedTasks} />
                ) : (
                  <TaskKanbanView 
                    tasks={filteredAndSortedTasks} 
                    onTaskMove={() => {}}
                    onAddTask={() => {}}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { ProjectVelocityChart } from "@/components/dashboard/ProjectVelocityChart";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { 
  FolderOpen, 
  Ticket, 
  FileText, 
  Clock 
} from "lucide-react";

export default function Dashboard() {
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
            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="relative z-10 p-6">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  Welcome back, Sarah! 👋
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Here's what's happening with your projects today
                </p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <KPICard
                title="Total Active Projects"
                value="10"
                change="+0.9%"
                icon={FolderOpen}
                color="blue"
              />
              <KPICard
                title="Number of Open Tickets"
                value="2"
                change="+1.0%"
                icon={Ticket}
                color="green"
              />
              <KPICard
                title="Pending Deliverables"
                value="2"
                change="+0.7%"
                icon={FileText}
                color="purple"
              />
              <KPICard
                title="Upcoming Deadlines"
                value="5"
                change="+0.8%"
                icon={Clock}
                color="orange"
              />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2">
                <ProjectVelocityChart />
              </div>
              <div className="lg:col-span-1">
                <LiveActivityFeed />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
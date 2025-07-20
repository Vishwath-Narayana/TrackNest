import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectHeader } from "@/components/project-management/ProjectHeader";
import { ProjectTimeline } from "@/components/project-management/ProjectTimeline";
import { TaskStatistics } from "@/components/project-management/TaskStatistics";
import { TeamPerformance } from "@/components/project-management/TeamPerformance";
import { TeamCollaboration } from "@/components/project-management/TeamCollaboration";
import { LinkedResources } from "@/components/project-management/LinkedResources";
import { useState } from "react";

export default function ProjectManagement() {
  const [activeView, setActiveView] = useState<"overview" | "timeline" | "resources" | "team">("overview");

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
          <ProjectHeader />

          {/* View Toggle */}
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-1">
              <button
                onClick={() => setActiveView("overview")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeView === "overview"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveView("timeline")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeView === "timeline"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveView("resources")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeView === "resources"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                Resources
              </button>
              <button
                onClick={() => setActiveView("team")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeView === "team"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                Team
              </button>
            </div>
          </div>

          {/* Content Based on Active View */}
          {activeView === "overview" && (
            <div className="space-y-3 md:space-y-4">
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
                {/* Left Column - Timeline (Extended) */}
                <div className="lg:col-span-3">
                  <ProjectTimeline />
                </div>

                {/* Right Column - Statistics and Team */}
                <div className="space-y-3 md:space-y-4">
                  <TaskStatistics />
                  <TeamPerformance />
                </div>
              </div>

              {/* Resources Section */}
              <LinkedResources />
            </div>
          )}

          {activeView === "timeline" && (
            <div className="space-y-3 md:space-y-4">
              <ProjectTimeline />
            </div>
          )}

          {activeView === "resources" && (
            <div className="space-y-3 md:space-y-4">
              <LinkedResources />
            </div>
          )}

          {activeView === "team" && (
            <div className="space-y-3 md:space-y-4">
              <TeamPerformance />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <TaskStatistics />
                <TeamCollaboration />
              </div>
            </div>
          )}
        </main>
        </div>
      </div>
    </div>
  );
}
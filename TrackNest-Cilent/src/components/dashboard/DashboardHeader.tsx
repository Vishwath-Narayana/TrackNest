import { Search, Bell, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span className="text-foreground">Dashboard</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Analytics</span>
        <ChevronRight className="h-4 w-4" />
        <span>Overview</span>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
          <Input
            placeholder="Search or press ⌘K"
            className="w-64 pl-9 pr-16 bg-gray-50 border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-blue-500 text-gray-700 placeholder:text-gray-500 transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 z-10">
            ⌘K
          </div>
        </div>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <div className="h-4 w-4 rounded-full border border-border"></div>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User Avatar */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
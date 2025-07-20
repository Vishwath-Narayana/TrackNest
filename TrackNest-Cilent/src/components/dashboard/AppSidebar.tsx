import { 
  Home, 
  FolderKanban,
  CheckSquare,
  Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const sidebarItems = [
  { icon: Home, href: "/", label: "Dashboard" },
  { icon: FolderKanban, href: "/project-management", label: "Project Management" },
  { icon: CheckSquare, href: "/task-management", label: "Task Management" },
  { icon: Settings, href: "/settings", label: "Settings" },
];

function Tooltip({ children, isVisible, position }: { 
  children: React.ReactNode; 
  isVisible: boolean; 
  position: { x: number; y: number; } | null;
}) {
  if (!isVisible || !position) return null;

  return createPortal(
    <div 
      className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg pointer-events-none whitespace-nowrap z-[999999] shadow-2xl border border-gray-700 transition-opacity duration-200"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translateY(-50%)'
      }}
    >
      {children}
      <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
    </div>,
    document.body
  );
}

export function AppSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number; } | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (label: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 12, // 12px margin from sidebar
      y: rect.top + rect.height / 2
    });
    setHoveredItem(label);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setTooltipPosition(null);
  };

  return (
    <div ref={sidebarRef} className="flex h-full w-16 flex-col bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl relative">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-white/20">
        <div className="relative group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <div className="h-5 w-5 rounded bg-white/90 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-3">
        {sidebarItems.map((item) => (
          <div key={item.href} className="relative group">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 relative",
                  isActive
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-md"
                )
              }
              title={item.label}
              onMouseEnter={(e) => handleMouseEnter(item.label, e)}
              onMouseLeave={handleMouseLeave}
            >
              {({ isActive }) => (
                <>
                  {/* Background glow for active state */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-xl"></div>
                  )}
                  
                  {/* Icon container */}
                  <div className="relative z-10">
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-300",
                      "group-hover:scale-110"
                    )} />
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-full"></div>
                  )}
                </>
              )}
            </NavLink>
          </div>
        ))}
      </nav>

      {/* Global Tooltip */}
      <Tooltip 
        isVisible={!!hoveredItem} 
        position={tooltipPosition}
      >
        {hoveredItem}
      </Tooltip>
    </div>
  );
}
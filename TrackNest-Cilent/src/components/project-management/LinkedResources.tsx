import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  FileText, 
  Code, 
  File, 
  Database, 
  Play, 
  Palette, 
  Monitor, 
  Layers,
  ExternalLink,
  Filter,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

const resourceCategories = [
  "All", "Document", "Code", "Database", "Video", "Folder", "Website", "Image"
];

const resources = [
  {
    id: "1",
    title: "Design System Documentation", 
    description: "Complete design system guidelines and component library",
    author: "Emily Davis",
    date: "Feb 10, 2024",
    size: "2.4 MB",
    tags: ["design", "documentation", "ui"],
    icon: FileText,
    color: "text-blue-500",
    type: "Document"
  },
  {
    id: "2",
    title: "API Specification",
    description: "RESTful API endpoints and data models",
    author: "Mike Johnson", 
    date: "Feb 20, 2024",
    size: "856 KB",
    tags: ["api", "backend", "documentation"],
    icon: Code,
    color: "text-green-500",
    type: "Code"
  },
  {
    id: "3",
    title: "User Research Findings",
    description: "Comprehensive user interviews and usability testing results",
    author: "Sarah Chen",
    date: "Feb 10, 2024",
    size: "5.2 MB",
    tags: ["research", "ux", "insights"],
    icon: File,
    color: "text-purple-500",
    type: "Document"
  },
  {
    id: "4",
    title: "Database Schema",
    description: "Complete database structure and relationships",
    author: "Alex Kim",
    date: "Feb 18, 2024",
    size: "1.1 MB",
    tags: ["database", "schema", "backend"],
    icon: Database,
    color: "text-orange-500",
    type: "Database"
  },
  {
    id: "5",
    title: "Prototype Demo Video",
    description: "Interactive prototype walkthrough and feature demonstration",
    author: "Emily Davis",
    date: "Feb 22, 2024",
    size: "45.8 MB",
    tags: ["prototype", "demo", "video"],
    icon: Play,
    color: "text-red-500",
    type: "Video"
  },
  {
    id: "6",
    title: "Brand Assets",
    description: "Logo variations, color palettes, and brand guidelines",
    author: "Design Team",
    date: "Feb 12, 2024",
    size: "12.3 MB",
    tags: ["branding", "assets", "design"],
    icon: Palette,
    color: "text-pink-500",
    type: "Folder"
  },
  {
    id: "7",
    title: "Production Environment", 
    description: "Live application deployment and monitoring dashboard",
    author: "DevOps Team",
    date: "Feb 25, 2024",
    size: "",
    tags: ["production", "deployment", "monitoring"],
    icon: Monitor,
    color: "text-indigo-500",
    type: "Website"
  },
  {
    id: "8",
    title: "UI Mockups Collection",
    description: "High-fidelity interface designs and visual concepts",
    author: "Emily Davis",
    date: "Feb 14, 2024",
    size: "8.7 MB",
    tags: ["mockups", "ui", "design"],
    icon: Layers,
    color: "text-cyan-500",
    type: "Image"
  }
];

export function LinkedResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || resource.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resourceCounts = resources.reduce((acc, resource) => {
    acc[resource.type] = (acc[resource.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Glassmorphism Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl -translate-x-8 translate-y-8"></div>
      
      <div className="relative z-10 p-3 md:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Linked Resources</h2>
            <p className="text-sm text-gray-600">Project files, documentation, and external links</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Resource</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="space-y-3 mb-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10 pr-4 bg-white/50 border-white/30 focus:bg-white/70 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/50 border-white/30 hover:bg-white/70"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            
            <div className={`flex flex-wrap gap-2 transition-all duration-300 ${showFilters ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {resourceCategories.map((category) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCategory === category 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0" 
                      : "bg-white/50 border-white/30 hover:bg-white/70"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id} 
              className="group relative p-4 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/70 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Open Resource Button - Appears on Hover */}
              <div className="absolute inset-0 bg-blue-100/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Button className="bg-blue-500 text-white border-0 shadow-lg hover:bg-blue-600 transition-all duration-200">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Open Resource
                </Button>
              </div>
              
              {/* External Link Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-white/80 shadow-sm ${resource.color}`}>
                  <resource.icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{resource.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{resource.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-white/50 border-white/30">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-white/50 border-white/30">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {resource.author}</span>
                    <div className="flex items-center gap-2">
                      <span>Updated {resource.date}</span>
                      {resource.size && <span>{resource.size}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-600 font-medium">No resources found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t border-white/30 text-sm text-gray-600">
          <span>Showing {filteredResources.length} of {resources.length} resources</span>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(resourceCounts).map(([type, count]) => (
              <span key={type} className="bg-white/50 px-2 py-1 rounded-full">
                {count} {type}s
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
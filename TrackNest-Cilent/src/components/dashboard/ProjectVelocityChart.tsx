import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart3 } from "lucide-react";

const velocityData = [
  { week: "Week 1", value: 40 },
  { week: "Week 2", value: 48 },
  { week: "Week 3", value: 35 },
  { week: "Week 4", value: 42 },
  { week: "Week 5", value: 38 },
  { week: "Week 6", value: 52 },
  { week: "Week 7", value: 50 },
  { week: "Week 8", value: 48 }
];

export function ProjectVelocityChart() {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl translate-x-16 -translate-y-16"></div>
      
      <div className="relative z-10 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Analytics Dashboard</h2>
              <p className="text-sm text-gray-600">Real-time project insights and metrics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white/50 border-white/30 hover:bg-white/70">7d</Button>
            <Button variant="outline" size="sm" className="bg-white/50 border-white/30 hover:bg-white/70">30d</Button>
            <Button variant="outline" size="sm" className="bg-white/50 border-white/30 hover:bg-white/70">90d</Button>
          </div>
        </div>
      
              <Tabs defaultValue="velocity" className="w-full">
          <TabsList className="mb-6 bg-white/50 border border-white/30">
            <TabsTrigger value="velocity" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4" />
              <span>Project Velocity</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4" />
              <span>Ticket Flow</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="velocity" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Project Velocity</h3>
              <p className="text-sm text-gray-600">Story points completed over time</p>
            </div>
            
            <div className="h-64 bg-white/30 rounded-xl p-4 border border-white/20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    tick={{ fill: "#64748b" }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                    tick={{ fill: "#64748b" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Ticket Flow</h3>
              <p className="text-sm text-gray-600">Ticket status distribution over time</p>
            </div>
            <div className="h-64 bg-white/30 rounded-xl p-4 border border-white/20 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Ticket flow chart coming soon...</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
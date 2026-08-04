"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  IndianRupee, 
  CalendarDays, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

export function DashboardClient({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back. Here is the summary of your advisory activities today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/reports" className="block transition-transform hover:scale-[1.02]">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (6M)</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on actual transactions
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/clients" className="block transition-transform hover:scale-[1.02]">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeClients}</div>
              <p className="text-xs text-emerald-500 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                View all clients
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/calendar" className="block transition-transform hover:scale-[1.02]">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Meetings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todaysMeetings}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Check your calendar
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/tasks" className="block transition-transform hover:scale-[1.02]">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingTasksCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Manage your to-do list
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value / 1000}k`} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                  />
                  <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lead Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex flex-col justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.leadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.leadData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold">{Math.round((stats.leadData.find((d: any) => d.name === "Converted")?.value || 0) / Math.max(stats.leadData.reduce((acc: number, curr: any) => acc + curr.value, 0), 1) * 100)}%</span>
                <span className="text-xs text-muted-foreground">Conversion</span>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {stats.leadData.map((entry: any, index: number) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
         <Card>
           <CardHeader>
             <CardTitle>Upcoming Meetings Today</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-6">
                {stats.upcomingMeetings.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming meetings today.</p>
                ) : stats.upcomingMeetings.map((meeting: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {(meeting.client?.firstName || meeting.title).charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{meeting.client ? `${meeting.client.firstName} ${meeting.client.lastName}` : meeting.title}</p>
                        <p className="text-xs text-muted-foreground">{meeting.notes || "Meeting"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <Badge variant="outline" className="mt-1">{meeting.status}</Badge>
                    </div>
                  </div>
                ))}
             </div>
           </CardContent>
         </Card>
         
         <Card>
           <CardHeader>
             <CardTitle>Recent Follow-ups</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-6">
                {stats.recentFollowups.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent follow-ups.</p>
                ) : stats.recentFollowups.map((followup: any, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{followup.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Client: <span className="font-medium text-foreground">{followup.name}</span> • {new Date(followup.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
             </div>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}

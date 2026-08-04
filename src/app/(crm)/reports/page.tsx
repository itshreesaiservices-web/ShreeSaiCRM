"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart2, Download, Filter, IndianRupee, TrendingUp, Users, Target, FileSpreadsheet, Building2 
} from "lucide-react";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

// Mock Data
const aumData = [
  { month: "Jan", aum: 110 }, { month: "Feb", aum: 115 }, { month: "Mar", aum: 112 },
  { month: "Apr", aum: 120 }, { month: "May", aum: 128 }, { month: "Jun", aum: 135 },
  { month: "Jul", aum: 142 }, { month: "Aug", aum: 150 },
];

const revenueData = [
  { month: "Jan", mf: 4.5, tax: 2.1 }, { month: "Feb", mf: 4.8, tax: 2.5 },
  { month: "Mar", mf: 5.0, tax: 8.5 }, { month: "Apr", mf: 5.2, tax: 1.2 },
  { month: "May", mf: 5.5, tax: 1.0 }, { month: "Jun", mf: 5.8, tax: 1.5 },
  { month: "Jul", mf: 6.2, tax: 6.5 },
];

const leadSourceData = [
  { name: "Website", value: 45 }, { name: "Referrals", value: 30 },
  { name: "Social Media", value: 15 }, { name: "Walk-in", value: 10 },
];
const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#6366f1"];

const clientGrowthData = [
  { month: "Jan", clients: 240 }, { month: "Feb", clients: 252 },
  { month: "Mar", clients: 265 }, { month: "Apr", clients: 278 },
  { month: "May", clients: 295 }, { month: "Jun", clients: 310 },
  { month: "Jul", clients: 325 },
];

const taxFilingData = [
  { type: "ITR-1", filed: 145 }, { type: "ITR-2", filed: 85 },
  { type: "ITR-3", filed: 120 }, { type: "ITR-4", filed: 65 },
];

export default function ReportsDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-primary" />
            Reporting & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive business intelligence across all verticals.
          </p>
        </div>
        
        {/* Global Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="ytd">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mtd">Month to Date</SelectItem>
              <SelectItem value="qtd">Quarter to Date</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Advisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Advisors</SelectItem>
              <SelectItem value="sanjay">Sharad H.</SelectItem>
              <SelectItem value="amit">Amit P.</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
             <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex flex-col h-full">
          <Tabs defaultValue="financials" className="w-full h-full flex flex-col">
            <div className="border-b border-border px-6 shrink-0 bg-muted/20">
              <TabsList className="bg-transparent h-14 p-0 w-full justify-start space-x-8">
                <TabsTrigger value="financials" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-14 text-sm font-medium">
                  Financials & AUM
                </TabsTrigger>
                <TabsTrigger value="growth" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-14 text-sm font-medium">
                  Growth & Leads
                </TabsTrigger>
                <TabsTrigger value="tax" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-14 text-sm font-medium">
                  Tax & Compliance
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {/* FINANCIALS TAB */}
              <TabsContent value="financials" className="m-0 h-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-primary text-primary-foreground border-none">
                    <CardContent className="p-6">
                      <p className="text-sm font-medium opacity-80 mb-2">Total Firm AUM</p>
                      <p className="text-3xl font-bold flex items-center"><IndianRupee className="w-6 h-6 mr-1" /> 150.5 Cr</p>
                      <p className="text-sm opacity-80 mt-2">+12% vs last year</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Monthly SIP Book</p>
                      <p className="text-3xl font-bold text-foreground">₹45.2 L</p>
                      <p className="text-sm text-emerald-500 mt-2 font-medium flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> +₹2.5L this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Revenue (YTD)</p>
                      <p className="text-3xl font-bold text-foreground flex items-center"><IndianRupee className="w-6 h-6 mr-1" /> 42.5 L</p>
                      <p className="text-sm text-emerald-500 mt-2 font-medium flex items-center"><TrendingUp className="w-4 h-4 mr-1" /> On Target</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AUM Growth (Crores)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={aumData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
                            <YAxis stroke="#888" tickLine={false} axisLine={false} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            {/* @ts-ignore */}
                            <Tooltip contentStyle={{ borderRadius: '8px' }} formatter={(value: any) => [`₹${value} Cr`, 'AUM']} />
                            <Area type="monotone" dataKey="aum" stroke="#2563eb" fillOpacity={1} fill="url(#colorAum)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Breakdown (Lakhs)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
                            <YAxis stroke="#888" tickLine={false} axisLine={false} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            {/* @ts-ignore */}
                            <Tooltip contentStyle={{ borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="mf" name="Mutual Funds" stackId="a" fill="#2563eb" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="tax" name="Tax & Consulting" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* GROWTH TAB */}
              <TabsContent value="growth" className="m-0 h-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Total Active Clients</p>
                      <p className="text-3xl font-bold text-foreground">325</p>
                      <p className="text-sm text-emerald-500 mt-2 font-medium">+15 this month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Lead Conversion Rate</p>
                      <p className="text-3xl font-bold text-foreground">22.4%</p>
                      <p className="text-sm text-emerald-500 mt-2 font-medium">+2.1% vs last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Meetings Held (YTD)</p>
                      <p className="text-3xl font-bold text-foreground">184</p>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">Avg 4.5/week per advisor</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <Card>
                     <CardHeader>
                       <CardTitle>Client Acquisition Trend</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={clientGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
                              <YAxis stroke="#888" tickLine={false} axisLine={false} />
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                              {/* @ts-ignore */}
                              <Tooltip contentStyle={{ borderRadius: '8px' }} />
                              <Line type="monotone" dataKey="clients" name="Total Clients" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                     </CardContent>
                   </Card>
                   
                   <Card>
                     <CardHeader>
                       <CardTitle>Lead Sources</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="h-[300px] w-full flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                {leadSourceData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              {/* @ts-ignore */}
                              <Tooltip contentStyle={{ borderRadius: '8px' }} formatter={(value: any) => [`${value}%`, 'Source']} />
                              <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                     </CardContent>
                   </Card>
                </div>
              </TabsContent>
              
              {/* TAX TAB */}
              <TabsContent value="tax" className="m-0 h-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Total ITRs Filed (AY 26-27)</p>
                      <p className="text-3xl font-bold text-foreground">415</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Pending Returns</p>
                      <p className="text-3xl font-bold text-orange-500">42</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground font-medium mb-2">Total Tax Refunds Processed</p>
                      <p className="text-3xl font-bold text-foreground flex items-center"><IndianRupee className="w-6 h-6 mr-1" /> 1.2 Cr</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ITR Filings by Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={taxFilingData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                             <XAxis type="number" stroke="#888" tickLine={false} axisLine={false} />
                             <YAxis dataKey="type" type="category" stroke="#888" tickLine={false} axisLine={false} />
                             <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                             {/* @ts-ignore */}
                             <Tooltip contentStyle={{ borderRadius: '8px' }} />
                             <Bar dataKey="filed" name="Returns Filed" fill="#6366f1" radius={[0, 4, 4, 0]} />
                           </BarChart>
                         </ResponsiveContainer>
                       </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, PieChart as PieChartIcon, TrendingUp, BarChart2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from "recharts";

const assetAllocationData = [
  { name: 'Equity Large Cap', value: 45 },
  { name: 'Equity Mid Cap', value: 20 },
  { name: 'Equity Small Cap', value: 10 },
  { name: 'Debt & Bonds', value: 20 },
  { name: 'Liquid/Cash', value: 5 },
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#10b981', '#f59e0b'];

const performanceData = [
  { month: 'Jan', value: 3500000 },
  { month: 'Feb', value: 3650000 },
  { month: 'Mar', value: 3600000 },
  { month: 'Apr', value: 3800000 },
  { month: 'May', value: 4100000 },
  { month: 'Jun', value: 4300000 },
  { month: 'Jul', value: 4500000 },
];

const currentHoldings = [
  { scheme: "HDFC Mid-Cap Opportunities Fund", category: "Equity - Mid Cap", invested: "₹5,00,000", current: "₹8,50,000", return: "+70.0%", xirr: "22.4%" },
  { scheme: "SBI Small Cap Fund", category: "Equity - Small Cap", invested: "₹3,00,000", current: "₹4,20,000", return: "+40.0%", xirr: "18.1%" },
  { scheme: "Parag Parikh Flexi Cap Fund", category: "Equity - Flexi Cap", invested: "₹15,00,000", current: "₹22,00,000", return: "+46.6%", xirr: "16.5%" },
  { scheme: "ICICI Prudential Corporate Bond Fund", category: "Debt - Corporate", invested: "₹12,00,000", current: "₹13,30,000", return: "+10.8%", xirr: "7.2%" },
];

export default function PortalPortfolioPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <PieChartIcon className="w-8 h-8 text-primary" />
            My Portfolio
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your investments, asset allocation, and overall returns.
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <Card className="bg-primary text-primary-foreground col-span-2 md:col-span-1">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <p className="text-sm opacity-80 mb-1">Current Value</p>
            <p className="text-2xl font-bold flex items-center"><IndianRupee className="w-5 h-5 mr-1" /> 45,00,000</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Invested Amount</p>
            <p className="text-xl font-bold flex items-center"><IndianRupee className="w-4 h-4 mr-1 text-muted-foreground" /> 35,00,000</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Returns</p>
            <p className="text-xl font-bold text-emerald-500">+ ₹10,00,000</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Annualized Return (XIRR)</p>
            <p className="text-xl font-bold text-emerald-500">+ 15.2%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex flex-col h-full">
          <Tabs defaultValue="holdings" className="w-full h-full flex flex-col">
            <div className="border-b border-border px-6 shrink-0">
              <TabsList className="bg-transparent h-14 p-0 w-full justify-start space-x-8">
                <TabsTrigger value="holdings" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-14 text-sm font-medium">
                  Current Holdings
                </TabsTrigger>
                <TabsTrigger value="allocation" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-14 text-sm font-medium">
                  Asset Allocation
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-14 text-sm font-medium">
                  Performance Chart
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="holdings" className="m-0 h-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scheme</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Invested</TableHead>
                      <TableHead className="text-right">Current Value</TableHead>
                      <TableHead className="text-right">Returns (Abs)</TableHead>
                      <TableHead className="text-right">XIRR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentHoldings.map((holding, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{holding.scheme}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-normal">{holding.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{holding.invested}</TableCell>
                        <TableCell className="text-right font-semibold">{holding.current}</TableCell>
                        <TableCell className="text-right text-emerald-500 font-medium">{holding.return}</TableCell>
                        <TableCell className="text-right text-emerald-500">{holding.xirr}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="allocation" className="m-0 h-full flex items-center justify-center">
                 <div className="w-full max-w-2xl h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetAllocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        {/* @ts-ignore */}
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                          formatter={(value: any) => [`${value}%`, 'Allocation']}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
              </TabsContent>

              <TabsContent value="performance" className="m-0 h-full flex flex-col">
                 <div className="w-full h-[400px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
                        <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/100000}L`} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        {/* @ts-ignore */}
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                          formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Current Value']}
                        />
                        <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

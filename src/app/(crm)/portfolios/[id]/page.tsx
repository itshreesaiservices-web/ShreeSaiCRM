"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Download, IndianRupee, PieChart as PieChartIcon, BarChart2, Activity } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area
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
  { month: 'Jan', value: 3500000, invested: 3200000 },
  { month: 'Feb', value: 3650000, invested: 3250000 },
  { month: 'Mar', value: 3600000, invested: 3300000 },
  { month: 'Apr', value: 3800000, invested: 3350000 },
  { month: 'May', value: 4100000, invested: 3400000 },
  { month: 'Jun', value: 4300000, invested: 3450000 },
  { month: 'Jul', value: 4500000, invested: 3500000 },
];

const transactions = [
  { date: "15 Aug 2026", scheme: "HDFC Mid-Cap Opportunities Fund", type: "SIP", amount: "₹10,000", units: 52.4, nav: "190.84", status: "Processed" },
  { date: "10 Aug 2026", scheme: "SBI Small Cap Fund", type: "SIP", amount: "₹5,000", units: 28.1, nav: "177.93", status: "Processed" },
  { date: "05 Aug 2026", scheme: "Parag Parikh Flexi Cap Fund", type: "SIP", amount: "₹15,000", units: 215.2, nav: "69.70", status: "Processed" },
  { date: "01 Jul 2026", scheme: "ICICI Prudential Bluechip Fund", type: "LUMPSUM", amount: "₹1,00,000", units: 1050.4, nav: "95.20", status: "Processed" },
];

export default function PortfolioDashboardPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/portfolios">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Rahul Sharma's Portfolio
              <Badge variant="outline" className="bg-primary/10 text-primary border-none ml-2">PF-001</Badge>
            </h1>
            <p className="text-muted-foreground mt-1">Aggressive Growth Strategy • Started Jan 2024</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            PDF Report
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Excel Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card className="bg-primary text-primary-foreground lg:col-span-1">
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <p className="text-sm opacity-80 mb-1">Current Value</p>
            <p className="text-2xl font-bold">₹45,00,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Invested Amount</p>
            <p className="text-xl font-bold">₹35,00,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Absolute Return</p>
            <p className="text-xl font-bold text-emerald-500">+₹10,00,000 (28.5%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">XIRR (Annualized)</p>
            <p className="text-xl font-bold text-emerald-500">15.2%</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1 border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
               <Activity className="w-4 h-4 text-primary" />
               <span className="text-sm font-semibold">Health Score</span>
            </div>
            <div className="text-2xl font-bold text-primary">85<span className="text-sm text-muted-foreground">/100</span></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Overview & Allocation
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            Transactions & SIPs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current spread across asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {assetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                        formatter={(value) => [`${value}%`, 'Allocation']}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Mapping</CardTitle>
                <CardDescription>Progress towards financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="font-semibold">Retirement Corpus</p>
                      <p className="text-xs text-muted-foreground">Target: 2045</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">₹30L / ₹5Cr</p>
                      <p className="text-xs text-muted-foreground">6% achieved</p>
                    </div>
                  </div>
                  <Progress value={6} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="font-semibold">Child Education</p>
                      <p className="text-xs text-muted-foreground">Target: 2032</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">₹15L / ₹25L</p>
                      <p className="text-xs text-muted-foreground">60% achieved</p>
                    </div>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-6">
           <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth</CardTitle>
                <CardDescription>Invested Value vs Current Value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
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
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}
                        formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="value" name="Current Value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" />
                      <Line type="monotone" dataKey="invested" name="Invested Amount" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
           <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>SIP, Lumpsum, and SWP history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Scheme</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">NAV</TableHead>
                      <TableHead className="text-right">Units</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                        <TableCell className="font-medium">{tx.scheme}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            tx.type === 'SIP' ? 'bg-blue-500/10 text-blue-500 border-none' : 
                            'bg-orange-500/10 text-orange-500 border-none'
                          }>
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{tx.amount}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{tx.nav}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{tx.units}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

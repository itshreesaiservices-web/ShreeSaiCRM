"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreVertical, Eye, Download, PieChart, TrendingUp, IndianRupee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const portfolios = [
  { id: "PF-001", client: "Rahul Sharma", invested: "₹35,00,000", current: "₹45,00,000", absReturn: "+28.5%", xirr: "15.2%", health: 85, activeSIPs: 3 },
  { id: "PF-002", client: "Anita Desai", invested: "₹10,00,000", current: "₹12,50,000", absReturn: "+25.0%", xirr: "12.8%", health: 92, activeSIPs: 1 },
  { id: "PF-003", client: "Vikram Mehta", invested: "₹1,00,00,000", current: "₹1,20,00,000", absReturn: "+20.0%", xirr: "14.5%", health: 78, activeSIPs: 0 },
  { id: "PF-004", client: "Priya Singh", invested: "₹7,50,000", current: "₹8,00,000", absReturn: "+6.6%", xirr: "8.2%", health: 65, activeSIPs: 2 },
  { id: "PF-005", client: "Amit Patel", invested: "₹50,00,000", current: "₹65,00,000", absReturn: "+30.0%", xirr: "16.1%", health: 88, activeSIPs: 4 },
];

export default function PortfoliosPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <PieChart className="w-8 h-8 text-primary" />
            Portfolios
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage mutual fund investments, allocations, and track performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Portfolio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <IndianRupee className="w-5 h-5 text-muted-foreground" />
               <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">Total AUM</Badge>
             </div>
             <p className="text-2xl font-bold">₹2,50,50,000</p>
             <p className="text-sm text-muted-foreground mt-1">Across 124 clients</p>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <TrendingUp className="w-5 h-5 text-muted-foreground" />
               <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-none">Avg XIRR</Badge>
             </div>
             <p className="text-2xl font-bold">14.3%</p>
             <p className="text-sm text-emerald-500 flex items-center mt-1">
               +1.2% vs Benchmark
             </p>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <TrendingUp className="w-5 h-5 text-muted-foreground" />
               <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-none">Active SIPs</Badge>
             </div>
             <p className="text-2xl font-bold">₹12,45,000</p>
             <p className="text-sm text-muted-foreground mt-1">Monthly Inflow</p>
           </CardContent>
         </Card>
         <Card className="bg-primary text-primary-foreground">
           <CardContent className="p-6">
             <h3 className="font-semibold mb-2">Market Alert</h3>
             <p className="text-sm opacity-90">NIFTY 50 crossed 25,000. 12 portfolios need rebalancing to maintain asset allocation.</p>
             <Button variant="secondary" size="sm" className="mt-4 w-full text-xs">View Rebalance Opportunities</Button>
           </CardContent>
         </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b border-border gap-4 shrink-0">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search portfolios by client..."
                className="pl-9 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted/95 backdrop-blur z-10">
                <TableRow>
                  <TableHead>Client & Portfolio</TableHead>
                  <TableHead>Invested Amount</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Returns (Abs / XIRR)</TableHead>
                  <TableHead>Health Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolios.map((pf) => (
                  <TableRow key={pf.id} className="group cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {pf.client.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">{pf.client}</p>
                          <p className="text-xs text-muted-foreground">{pf.id} • {pf.activeSIPs} SIPs</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground">
                      {pf.invested}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {pf.current}
                    </TableCell>
                    <TableCell>
                      <div className="text-emerald-500 font-medium">{pf.absReturn}</div>
                      <div className="text-xs text-muted-foreground">{pf.xirr}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${pf.health >= 80 ? 'bg-emerald-500' : pf.health >= 60 ? 'bg-orange-500' : 'bg-red-500'}`}
                            style={{ width: `${pf.health}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{pf.health}/100</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        {/* @ts-ignore */}
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* @ts-ignore */}
                          <DropdownMenuItem asChild>
                            <Link href={`/portfolios/${pf.id}`} className="flex items-center w-full cursor-pointer">
                               <PieChart className="w-4 h-4 mr-2" />
                               View Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Add Transaction</DropdownMenuItem>
                          <DropdownMenuItem>Export PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ClientTableRowActions } from "./ClientTableRowActions";
import { ClientActionsDialog } from "./ClientActionsDialog";

export function ClientList({ initialClients }: { initialClients: any[] }) {
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredClients = initialClients.filter(c => 
    c.firstName.toLowerCase().includes(search.toLowerCase()) || 
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client portfolios, KYC, and advisory relationships.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b border-border gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name or email..."
                className="pl-9 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Risk Profile</TableHead>
                  <TableHead>Portfolio Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No clients found. Click "Add Client" to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {client.firstName[0]}{client.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{client.firstName} {client.lastName}</p>
                            <p className="text-xs text-muted-foreground">ID: {client.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{client.phone || "No Phone"}</div>
                        <div className="text-xs text-muted-foreground">{client.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          client.riskProfile === "HIGH" || client.riskProfile === "AGGRESSIVE" ? "text-red-500 border-red-500/20 bg-red-500/10" :
                          client.riskProfile === "LOW" || client.riskProfile === "CONSERVATIVE" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" :
                          "text-blue-500 border-blue-500/20 bg-blue-500/10"
                        }>
                          {client.riskProfile || "MODERATE"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(client.computedPortfolioValue || 0)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={client.status === "ACTIVE" ? "default" : "secondary"}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <ClientTableRowActions client={client} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <div>Showing {filteredClients.length} clients</div>
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <ClientActionsDialog 
        isOpen={isAddOpen} 
        onOpenChange={setIsAddOpen} 
      />
    </div>
  );
}

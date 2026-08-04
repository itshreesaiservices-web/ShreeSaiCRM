"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Activity, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings & Security</h1>
        <p className="text-muted-foreground mt-1">
          Manage firm roles, security policies, and view system audit logs.
        </p>
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="bg-muted mb-6">
          <TabsTrigger value="roles" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Role Management
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Security Policies
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage access levels for your staff and advisors.</CardDescription>
              </div>
              <Button>Invite Member</Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {[
                  { name: "Super Admin", email: "admin@shreesai.com", role: "ADMIN", status: "Active" },
                  { name: "Sharad Hume", email: "sharad@shreesai.com", role: "ADVISOR", status: "Active" },
                  { name: "Priya Staff", email: "priya@shreesai.com", role: "STAFF", status: "Active" },
                ].map((user, i) => (
                  <div key={i} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={
                        user.role === "ADMIN" ? "border-primary text-primary" : 
                        user.role === "ADVISOR" ? "border-emerald-500 text-emerald-500" : ""
                      }>
                        {user.role}
                      </Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
           <Card>
             <CardHeader>
               <CardTitle>Authentication Settings</CardTitle>
               <CardDescription>Configure how users authenticate to the CRM.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Key className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Two-Factor Authentication (2FA)</h4>
                      <p className="text-sm text-muted-foreground">Require 2FA for all staff and admin accounts.</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none hover:bg-emerald-500/10">Enabled</Badge>
                </div>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
             <CardHeader>
               <CardTitle>System Audit Logs</CardTitle>
               <CardDescription>Comprehensive log of all significant actions taken within the CRM.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="divide-y divide-border border rounded-lg">
                  {[
                    { action: "Downloaded Client Document (Rahul_Sharma_PAN.pdf)", user: "Sharad Hume", time: "10 mins ago", ip: "192.168.1.45" },
                    { action: "Updated Lead Pipeline Status (Vikram Singh -> Proposal Sent)", user: "Super Admin", time: "1 hour ago", ip: "192.168.1.1" },
                    { action: "Created New Client (Anita Desai)", user: "Sharad Hume", time: "3 hours ago", ip: "192.168.1.45" },
                    { action: "Failed Login Attempt", user: "System", time: "Yesterday", ip: "45.22.19.8" },
                  ].map((log, i) => (
                    <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                       <div>
                         <p className="font-medium text-sm text-foreground">{log.action}</p>
                         <p className="text-xs text-muted-foreground mt-1">Performed by: <span className="font-medium">{log.user}</span> • IP: {log.ip}</p>
                       </div>
                       <span className="text-xs text-muted-foreground shrink-0">{log.time}</span>
                    </div>
                  ))}
                </div>
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

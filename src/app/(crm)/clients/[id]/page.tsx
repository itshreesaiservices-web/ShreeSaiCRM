"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Phone, Mail, MapPin, Briefcase, 
  CreditCard, FileText, UserCheck, Users, Target, Shield, Clock
} from "lucide-react";
import Link from "next/link";

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  // In a real app, we'd fetch client data using params.id
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Rahul Sharma
            <Badge variant="default" className="text-xs h-6">Active</Badge>
          </h1>
          <p className="text-muted-foreground mt-1">Client ID: {params.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-primary/20 bg-gradient-to-b from-card to-primary/5">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 ring-4 ring-background shadow-md">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">RS</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-1">Rahul Sharma</h2>
            <p className="text-sm text-muted-foreground mb-4">Senior Software Engineer at TechCorp</p>
            
            <div className="w-full space-y-3 mt-4 text-left">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                <span className="truncate">rahul.s@example.com</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
                <span>Andheri West, Mumbai 400053</span>
              </div>
            </div>
            
            <div className="w-full mt-6 pt-6 border-t border-border">
               <h3 className="text-sm font-semibold mb-3 text-left">Risk Profile</h3>
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm text-muted-foreground">MODERATE</span>
                 <span className="text-sm font-medium">65/100</span>
               </div>
               <Progress value={65} className="h-2 [&>div]:bg-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full">
              <div className="px-6 pt-4 border-b border-border overflow-x-auto">
                <TabsList className="bg-transparent h-12 p-0 w-max min-w-full justify-start space-x-6">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 h-12">Overview</TabsTrigger>
                  <TabsTrigger value="kyc" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 h-12">KYC & Banking</TabsTrigger>
                  <TabsTrigger value="family" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 h-12">Family & Nominee</TabsTrigger>
                  <TabsTrigger value="vault" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 h-12">Document Vault</TabsTrigger>
                  <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 h-12">Notes & Activity</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="overview" className="mt-0 outline-none space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-xl border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Total AUM</p>
                      <p className="text-2xl font-bold text-foreground">₹45,00,000</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-xl border border-border">
                      <p className="text-sm text-muted-foreground mb-1">YTD Returns</p>
                      <p className="text-2xl font-bold text-emerald-500">+14.2%</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-xl border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Last Meeting</p>
                      <p className="text-lg font-bold text-foreground">15 Aug 2026</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-primary" />
                      Financial Goals
                    </h3>
                    <div className="space-y-4">
                       <div className="bg-background border border-border rounded-lg p-4">
                         <div className="flex justify-between mb-2">
                           <span className="font-medium">Child's Education (2032)</span>
                           <span className="text-sm font-semibold">₹12L / ₹20L</span>
                         </div>
                         <Progress value={60} className="h-2" />
                       </div>
                       <div className="bg-background border border-border rounded-lg p-4">
                         <div className="flex justify-between mb-2">
                           <span className="font-medium">Retirement Corpus (2045)</span>
                           <span className="text-sm font-semibold">₹33L / ₹5Cr</span>
                         </div>
                         <Progress value={6} className="h-2" />
                       </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="kyc" className="mt-0 outline-none space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <UserCheck className="w-4 h-4 mr-2 text-primary" />
                      Identity Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/30 rounded-md border border-border">
                        <p className="text-xs text-muted-foreground mb-1">PAN Number</p>
                        <p className="font-medium">ABCDE1234F <Badge variant="secondary" className="ml-2 bg-emerald-500/10 text-emerald-500 border-none">Verified</Badge></p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Aadhar Number</p>
                        <p className="font-medium">XXXX-XXXX-9876 <Badge variant="secondary" className="ml-2 bg-emerald-500/10 text-emerald-500 border-none">Verified</Badge></p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2 text-primary" />
                      Bank Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/30 rounded-md border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Bank Name</p>
                        <p className="font-medium">HDFC Bank Ltd.</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                        <p className="font-medium">50100XXXXXXX89</p>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md border border-border">
                        <p className="text-xs text-muted-foreground mb-1">IFSC Code</p>
                        <p className="font-medium">HDFC0001234</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="family" className="mt-0 outline-none space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      Family Members
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                        <div>
                          <p className="font-medium">Neha Sharma</p>
                          <p className="text-xs text-muted-foreground">Spouse • DOB: 12-Oct-1992</p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                        <div>
                          <p className="font-medium">Aryan Sharma</p>
                          <p className="text-xs text-muted-foreground">Son • DOB: 05-May-2018</p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-primary" />
                      Nominee Details
                    </h3>
                    <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                       <p className="font-medium text-primary mb-1">Neha Sharma (100%)</p>
                       <p className="text-sm text-muted-foreground">Primary nominee for all mutual fund folios.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="vault" className="mt-0 outline-none flex flex-col items-center justify-center py-12">
                   <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
                   <h3 className="text-lg font-medium mb-2">No documents yet</h3>
                   <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
                     Securely upload PAN, Aadhar, Bank Mandates, and signed agreements here.
                   </p>
                   <Button>Upload Document</Button>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-0 outline-none">
                  <div className="relative pl-6 border-l-2 border-border space-y-8 mt-4">
                    <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-primary ring-4 ring-background mt-1"></div>
                       <p className="text-sm font-medium">Conducted Portfolio Review Call</p>
                       <p className="text-xs text-muted-foreground flex items-center mt-1">
                         <Clock className="w-3 h-3 mr-1" /> 15 Aug 2026, 11:30 AM
                       </p>
                       <div className="mt-3 text-sm bg-muted/50 p-3 rounded-md text-foreground">
                         Discussed rebalancing the portfolio to reduce mid-cap exposure and increase large-cap stability ahead of upcoming market volatility. Client agreed to the changes.
                       </div>
                    </div>
                    <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-muted-foreground ring-4 ring-background mt-1"></div>
                       <p className="text-sm font-medium">Uploaded Tax Filing FY25</p>
                       <p className="text-xs text-muted-foreground flex items-center mt-1">
                         <Clock className="w-3 h-3 mr-1" /> 10 Jul 2026, 04:15 PM
                       </p>
                    </div>
                  </div>
                </TabsContent>
                
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

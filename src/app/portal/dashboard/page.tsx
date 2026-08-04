import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  IndianRupee, TrendingUp, FileSpreadsheet, CalendarDays, 
  MessageSquare, ArrowRight, Download, Activity, CheckCircle2 
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ClientDashboardPage() {
  const session = await getSession() as any;
  if (!session) redirect("/login");

  const user: any = await prisma.user.findUnique({
    where: { id: session.userId as string },
    include: { clientProfile: true }
  });

  const firstName = user?.clientProfile?.firstName || user?.name || "Client";
  
  // Example dummy aggregation logic for the UI if real data doesn't exist
  // We can hook this up to real data later, but for now we'll just fix the greeting and placeholders
  const missingDocsCount = user?.clientProfile ? await prisma.taxReturn.count({
    where: { clientId: user.clientProfile.id, status: "UPLOADS" }
  }) : 0;

  return (
    <div className="space-y-8">
      {/* Greeting Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {firstName}! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Here is a summary of your wealth portfolio and ongoing tax filings as of today.
        </p>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="bg-primary text-primary-foreground border-none shadow-md relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <IndianRupee className="w-24 h-24" />
           </div>
           <CardContent className="p-6 relative z-10">
             <p className="text-sm font-medium opacity-80 mb-2">Total Portfolio Value</p>
             <p className="text-3xl font-bold">₹1,20,50,000</p>
             <div className="mt-4 flex items-center text-sm bg-primary-foreground/10 w-fit px-2 py-1 rounded">
               <TrendingUp className="w-4 h-4 mr-1" />
               <span>+14.5% XIRR</span>
             </div>
           </CardContent>
         </Card>

         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <FileSpreadsheet className="w-5 h-5 text-muted-foreground" />
               {missingDocsCount > 0 && (
                 <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-none">Action Needed</Badge>
               )}
             </div>
             <p className="text-sm font-medium text-muted-foreground mb-1">Tax Return (AY 2026-27)</p>
             <p className="text-xl font-bold">{missingDocsCount > 0 ? "Missing Documents" : "All Good!"}</p>
             <Link href="/portal/tax">
               <Button variant="link" className="p-0 h-auto mt-4 text-sm text-primary">
                 View Returns <ArrowRight className="w-4 h-4 ml-1" />
               </Button>
             </Link>
           </CardContent>
         </Card>

         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <CalendarDays className="w-5 h-5 text-muted-foreground" />
               <Badge variant="secondary">Scheduled</Badge>
             </div>
             <p className="text-sm font-medium text-muted-foreground mb-1">Next Appointment</p>
             <p className="text-xl font-bold">15 Aug, 10:30 AM</p>
             <p className="text-sm text-muted-foreground mt-4 flex items-center">
               Portfolio Review with Sharad
             </p>
           </CardContent>
         </Card>

         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <MessageSquare className="w-5 h-5 text-muted-foreground" />
               <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
             </div>
             <p className="text-sm font-medium text-muted-foreground mb-1">Secure Messages</p>
             <p className="text-xl font-bold">2 Unread</p>
             <Link href="/portal/support">
               <Button variant="link" className="p-0 h-auto mt-4 text-sm text-primary">
                 Read Messages <ArrowRight className="w-4 h-4 ml-1" />
               </Button>
             </Link>
           </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals Progress */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track your progress towards major life milestones.</CardDescription>
            </div>
            <Link href="/portal/portfolio">
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="font-semibold text-lg flex items-center">
                    Retirement Corpus 
                    <Badge variant="outline" className="ml-2 border-emerald-500/30 text-emerald-500">On Track</Badge>
                  </p>
                  <p className="text-sm text-muted-foreground">Target Year: 2045</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">₹1.2Cr <span className="text-sm text-muted-foreground font-normal">/ ₹5Cr</span></p>
                  <p className="text-sm font-medium text-muted-foreground">24% Achieved</p>
                </div>
              </div>
              <Progress value={24} className="h-3" />
            </div>
            
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="font-semibold text-lg flex items-center">
                    {firstName}'s Education
                    <Badge variant="outline" className="ml-2 border-blue-500/30 text-blue-500">Ahead</Badge>
                  </p>
                  <p className="text-sm text-muted-foreground">Target Year: 2035</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">₹18L <span className="text-sm text-muted-foreground font-normal">/ ₹25L</span></p>
                  <p className="text-sm font-medium text-muted-foreground">72% Achieved</p>
                </div>
              </div>
              <Progress value={72} className="h-3 [&>div]:bg-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
             <CardTitle>Recent Documents</CardTitle>
             <CardDescription>Latest files from your advisor.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">Q2 Portfolio Review.pdf</p>
                    <p className="text-xs text-muted-foreground">Aug 05, 2026</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-md shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">ITR-2 Acknowledgement (AY 25-26).pdf</p>
                    <p className="text-xs text-muted-foreground">Jul 20, 2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Link href="/portal/documents">
               <Button variant="ghost" className="w-full mt-4 text-sm text-primary">View Vault</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

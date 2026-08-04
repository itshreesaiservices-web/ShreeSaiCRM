import { FileSpreadsheet, Bell, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaxBoard } from "@/components/crm/tax/TaxBoard";
import { getTaxReturns } from "../actions/tax";

export default async function TaxDashboardPage() {
  const taxReturns = await getTaxReturns();

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-primary" />
            Income Tax Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Track ITR workflows, manage documents, and monitor GST/TDS compliance.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">View Notices</Button>
           <Button>New Tax Return</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <Clock className="w-5 h-5 text-muted-foreground" />
               <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-none">AY 2026-27</Badge>
             </div>
             <p className="text-2xl font-bold">142</p>
             <p className="text-sm text-muted-foreground mt-1">Pending Returns</p>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
               <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">Filed</Badge>
             </div>
             <p className="text-2xl font-bold">350</p>
             <p className="text-sm text-muted-foreground mt-1">Successfully Filed</p>
           </CardContent>
         </Card>
         <Card>
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <AlertTriangle className="w-5 h-5 text-muted-foreground" />
               <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-none">Follow-up</Badge>
             </div>
             <p className="text-2xl font-bold">28</p>
             <p className="text-sm text-muted-foreground mt-1">Missing Documents</p>
           </CardContent>
         </Card>
         <Card className="bg-primary/5 border-primary/20">
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <Bell className="w-5 h-5 text-primary" />
               <Badge variant="default">Action Required</Badge>
             </div>
             <p className="text-2xl font-bold text-primary">3</p>
             <p className="text-sm text-muted-foreground mt-1">Open Tax Notices</p>
           </CardContent>
         </Card>
      </div>

      <TaxBoard initialReturns={taxReturns} />
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, Download, CheckCircle2, Circle, AlertCircle, Upload } from "lucide-react";

const docChecklist = [
  { name: "Form 16 (Part A & B)", status: "Uploaded" },
  { name: "Form 26AS", status: "Uploaded" },
  { name: "Annual Information Statement (AIS)", status: "Uploaded" },
  { name: "Capital Gains Statement (Mutual Funds)", status: "Missing" },
  { name: "Home Loan Interest Certificate", status: "Uploaded" },
  { name: "Section 80C Investment Proofs", status: "Missing" },
];

export default function PortalTaxPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <FileSpreadsheet className="w-8 h-8 text-primary" />
            Tax Returns
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your ongoing Income Tax filing and view past returns.
          </p>
        </div>
      </div>

      <Card className="border-orange-500/20 bg-orange-500/5 shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <AlertCircle className="w-32 h-32 text-orange-500" />
        </div>
        <CardContent className="p-6 relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
           <div>
             <div className="flex items-center gap-3 mb-2">
               <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">AY 2026-27 (Current Year)</h2>
               <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-none">Missing Documents</Badge>
             </div>
             <p className="text-orange-600/80 dark:text-orange-400/80 font-medium max-w-2xl">
               Your advisor is unable to proceed with filing your return. Please review the checklist below and upload the pending documents securely.
             </p>
           </div>
           <Button className="bg-orange-500 hover:bg-orange-600 text-white border-none shrink-0">
             <Upload className="w-4 h-4 mr-2" />
             Upload Pending Docs
           </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2">
           <CardHeader>
             <CardTitle>Document Checklist</CardTitle>
             <CardDescription>Documents requested by your advisor for AY 2026-27.</CardDescription>
           </CardHeader>
           <CardContent>
              <div className="space-y-4">
                 {docChecklist.map((doc, i) => (
                   <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                     <div className="flex items-start gap-3">
                       {doc.status === 'Uploaded' ? (
                         <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                       ) : (
                         <Circle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                       )}
                       <div>
                         <p className={`text-sm font-medium ${doc.status === 'Uploaded' ? 'text-foreground' : 'text-orange-500'}`}>
                           {doc.name}
                         </p>
                         <p className="text-xs text-muted-foreground mt-0.5">
                           {doc.status === 'Uploaded' ? 'Received & Verified' : 'Action Required'}
                         </p>
                       </div>
                     </div>
                     {doc.status === 'Missing' && (
                       <Button variant="outline" size="sm" className="shrink-0 border-orange-500/30 text-orange-600 hover:bg-orange-500/10">
                         Upload
                       </Button>
                     )}
                   </div>
                 ))}
               </div>
           </CardContent>
         </Card>

         <Card className="lg:col-span-1 h-fit">
           <CardHeader>
             <CardTitle>Past Returns</CardTitle>
             <CardDescription>Download your historical acknowledgements.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex justify-between items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-semibold text-sm">AY 2025-26</p>
                  <p className="text-xs text-emerald-500">Filed Successfully</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
             </div>
             <div className="flex justify-between items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-semibold text-sm">AY 2024-25</p>
                  <p className="text-xs text-emerald-500">Filed Successfully</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
             </div>
             <div className="flex justify-between items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-semibold text-sm">AY 2023-24</p>
                  <p className="text-xs text-emerald-500">Filed Successfully</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </Button>
             </div>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}

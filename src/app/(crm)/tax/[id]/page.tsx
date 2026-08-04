"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle2, Circle, AlertCircle, Send, Download, Calculator, FileText, Landmark } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const docChecklist = [
  { name: "Form 16 (Part A & B)", status: "Uploaded" },
  { name: "Form 26AS", status: "Uploaded" },
  { name: "Annual Information Statement (AIS)", status: "Uploaded" },
  { name: "Capital Gains Statement (Mutual Funds)", status: "Missing" },
  { name: "Home Loan Interest Certificate", status: "Uploaded" },
  { name: "Section 80C Investment Proofs", status: "Missing" },
];

export default function TaxDetailDashboard({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/tax">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
              Vikram Mehta
              <Badge className="bg-orange-500/10 text-orange-500 border-none ml-2">Missing Docs</Badge>
            </h1>
            <p className="text-muted-foreground mt-1">AY 2026-27 • ITR-3 • TX-003</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10">
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <Button>
             Mark Ready to File
          </Button>
        </div>
      </div>

      {/* Visual Workflow Stepper */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10 -translate-y-1/2"></div>
             
             {/* Step 1 */}
             <div className="flex flex-col items-center bg-card px-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Uploads</span>
             </div>
             {/* Step 2 */}
             <div className="flex flex-col items-center bg-card px-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Verification</span>
             </div>
             {/* Step 3 */}
             <div className="flex flex-col items-center bg-card px-2">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center ring-4 ring-orange-500/20 mb-2">
                  <span className="font-bold">3</span>
                </div>
                <span className="text-xs font-medium text-orange-500">Missing Docs</span>
             </div>
             {/* Step 4 */}
             <div className="flex flex-col items-center bg-card px-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center mb-2">
                  <span className="font-bold">4</span>
                </div>
                <span className="text-xs font-medium">Filing</span>
             </div>
             {/* Step 5 */}
             <div className="flex flex-col items-center bg-card px-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center mb-2">
                  <span className="font-bold">5</span>
                </div>
                <span className="text-xs font-medium">Confirmation</span>
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2">
            <Tabs defaultValue="computation" className="w-full h-full flex flex-col">
              <CardHeader className="border-b border-border pb-0 px-6 pt-4">
                <TabsList className="bg-transparent h-10 p-0 w-full justify-start space-x-6">
                  <TabsTrigger value="computation" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">Income Computation</TabsTrigger>
                  <TabsTrigger value="taxes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">Taxes Paid (26AS)</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <TabsContent value="computation" className="mt-0 outline-none space-y-6">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="font-semibold flex items-center">
                       <Calculator className="w-4 h-4 mr-2 text-primary" />
                       Summary of Income
                     </h3>
                     <Badge variant="secondary">Old Tax Regime</Badge>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/30">
                        <span className="font-medium">1. Income from Salary</span>
                        <span className="font-semibold">₹24,50,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/30">
                        <span className="font-medium">2. Income from House Property</span>
                        <span className="font-semibold">-₹2,00,000</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/30">
                        <span className="font-medium">3. Business / Profession</span>
                        <span className="font-semibold">₹0</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/30">
                        <span className="font-medium">4. Capital Gains (Pending Statement)</span>
                        <span className="text-orange-500 font-medium italic">Pending</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-muted/30">
                        <span className="font-medium">5. Other Sources</span>
                        <span className="font-semibold">₹45,000</span>
                      </div>
                      <div className="flex justify-between items-center p-4 border border-primary/20 rounded-lg bg-primary/5 mt-4">
                        <span className="font-bold text-primary">Gross Total Income</span>
                        <span className="font-bold text-lg text-primary">₹22,95,000</span>
                      </div>
                   </div>
                </TabsContent>
                <TabsContent value="taxes" className="mt-0 outline-none">
                  <h3 className="font-semibold flex items-center mb-4">
                    <Landmark className="w-4 h-4 mr-2 text-primary" />
                    TDS & Advance Tax
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deductor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount Deducted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">TechCorp India Pvt Ltd</TableCell>
                        <TableCell>TDS on Salary (Sec 192)</TableCell>
                        <TableCell className="text-right font-medium">₹3,45,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">HDFC Bank</TableCell>
                        <TableCell>TDS on Interest (Sec 194A)</TableCell>
                        <TableCell className="text-right font-medium">₹4,500</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center p-4 border border-border rounded-lg bg-muted/50 mt-4">
                    <span className="font-semibold">Total Taxes Paid</span>
                    <span className="font-bold text-lg text-emerald-500">₹3,49,500</span>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
         </Card>

         <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Document Checklist
              </CardTitle>
              <CardDescription>Required documents for ITR-3</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                 {docChecklist.map((doc, i) => (
                   <div key={i} className="flex items-start gap-3">
                     {doc.status === 'Uploaded' ? (
                       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                     ) : (
                       <Circle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                     )}
                     <div>
                       <p className={`text-sm font-medium ${doc.status === 'Uploaded' ? 'text-foreground' : 'text-orange-500'}`}>
                         {doc.name}
                       </p>
                       <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                         {doc.status === 'Uploaded' ? (
                           <span className="flex items-center text-emerald-500"><CheckCircle2 className="w-3 h-3 mr-1" /> Verified</span>
                         ) : (
                           <span className="flex items-center text-orange-500"><AlertCircle className="w-3 h-3 mr-1" /> Pending Client Upload</span>
                         )}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-sm text-center">
                 <p className="font-medium mb-2">2 Documents Missing</p>
                 <Button className="w-full" variant="outline">
                   <Download className="w-4 h-4 mr-2" />
                   Download Received Docs
                 </Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Folder, Upload, Search, Download, FileText, FileImage, FileKey 
} from "lucide-react";

export default function PortalDocumentsPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Document Vault</h1>
          <p className="text-muted-foreground mt-1">
            Access your KYC documents, tax returns, and investment proofs securely.
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload New Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
         <Card className="cursor-pointer hover:border-primary transition-colors">
           <CardContent className="p-6 flex items-center gap-4">
             <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
               <Folder className="w-6 h-6" />
             </div>
             <div>
               <p className="font-semibold text-foreground">Identity & KYC</p>
               <p className="text-sm text-muted-foreground">4 files</p>
             </div>
           </CardContent>
         </Card>
         <Card className="cursor-pointer hover:border-primary transition-colors">
           <CardContent className="p-6 flex items-center gap-4">
             <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-lg">
               <Folder className="w-6 h-6" />
             </div>
             <div>
               <p className="font-semibold text-foreground">Tax Returns</p>
               <p className="text-sm text-muted-foreground">12 files</p>
             </div>
           </CardContent>
         </Card>
         <Card className="cursor-pointer hover:border-primary transition-colors">
           <CardContent className="p-6 flex items-center gap-4">
             <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
               <Folder className="w-6 h-6" />
             </div>
             <div>
               <p className="font-semibold text-foreground">Portfolio Reports</p>
               <p className="text-sm text-muted-foreground">8 files</p>
             </div>
           </CardContent>
         </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="flex p-4 border-b border-border shrink-0">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your documents..."
                className="pl-9 w-full"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-2">
            {[
              { name: "PAN Card.pdf", type: "PDF", size: "2.4 MB", date: "15 Aug 2026", icon: FileKey },
              { name: "Aadhar Card.jpg", type: "Image", size: "1.8 MB", date: "22 Jul 2026", icon: FileImage },
              { name: "ITR-V_AY2025-26.pdf", type: "PDF", size: "1.1 MB", date: "10 Aug 2025", icon: FileText },
              { name: "Q2_Portfolio_Review.pdf", type: "PDF", size: "3.5 MB", date: "05 Aug 2026", icon: FileText },
            ].map((file, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border transition-colors group">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-md text-primary shrink-0">
                      <file.icon className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="font-medium text-sm text-foreground">{file.name}</p>
                       <p className="text-xs text-muted-foreground">{file.date} • {file.size}</p>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <Download className="w-4 h-4 text-muted-foreground" />
                 </Button>
               </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

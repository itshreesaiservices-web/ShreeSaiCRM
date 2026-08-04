"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Folder, FileText, Upload, Search, Filter, 
  MoreVertical, FileImage, FileKey, HardDrive, Download, Trash2
} from "lucide-react";
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

const files = [
  { id: 1, name: "Rahul_Sharma_PAN.pdf", type: "PDF", size: "2.4 MB", date: "15 Aug 2026", owner: "Rahul Sharma", icon: FileKey },
  { id: 2, name: "Anita_Desai_ITR_FY25.pdf", type: "PDF", size: "1.1 MB", date: "10 Aug 2026", owner: "Anita Desai", icon: FileText },
  { id: 3, name: "Vikram_Portfolio_Review.xlsx", type: "Excel", size: "3.5 MB", date: "05 Aug 2026", owner: "System", icon: FileText },
  { id: 4, name: "Priya_Singh_Aadhar.jpg", type: "Image", size: "1.8 MB", date: "22 Jul 2026", owner: "Priya Singh", icon: FileImage },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Document Vault</h1>
          <p className="text-muted-foreground mt-1">
            Securely manage, upload, and organize client documents and firm assets.
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
         <Card className="bg-primary text-primary-foreground">
           <CardContent className="p-6">
             <div className="flex justify-between items-start mb-4">
               <HardDrive className="w-6 h-6 opacity-80" />
               <span className="text-sm font-medium opacity-80">Storage</span>
             </div>
             <p className="text-2xl font-bold">14.2 GB</p>
             <p className="text-sm opacity-80 mt-1">of 100 GB used (14%)</p>
             <div className="w-full h-1.5 bg-primary-foreground/20 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-primary-foreground w-[14%] rounded-full"></div>
             </div>
           </CardContent>
         </Card>
         <Card className="cursor-pointer hover:border-primary transition-colors">
           <CardContent className="p-6 flex items-center gap-4">
             <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
               <Folder className="w-6 h-6" />
             </div>
             <div>
               <p className="font-semibold text-foreground">KYC Documents</p>
               <p className="text-sm text-muted-foreground">1,245 files</p>
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
               <p className="text-sm text-muted-foreground">850 files</p>
             </div>
           </CardContent>
         </Card>
         <Card className="cursor-pointer hover:border-primary transition-colors">
           <CardContent className="p-6 flex items-center gap-4">
             <div className="p-3 bg-orange-500/10 text-orange-500 rounded-lg">
               <Folder className="w-6 h-6" />
             </div>
             <div>
               <p className="font-semibold text-foreground">Proposals</p>
               <p className="text-sm text-muted-foreground">320 files</p>
             </div>
           </CardContent>
         </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b border-border gap-4 shrink-0">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by name, type, or client..."
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
                  <TableHead>File Name</TableHead>
                  <TableHead>Client / Owner</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md text-primary">
                          <file.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {file.owner}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {file.date}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {file.size}
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
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
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

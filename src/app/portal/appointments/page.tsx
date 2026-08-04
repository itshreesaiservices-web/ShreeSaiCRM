"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Video, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PortalAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-primary" />
            Appointments
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your upcoming scheduled reviews and tax consultations.
          </p>
        </div>
        <Link href="/book-consultation">
          <Button>
            Book Consultation
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-border rounded-lg bg-card mb-4 relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                 <div>
                   <h3 className="font-semibold text-lg">Portfolio Review</h3>
                   <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center text-foreground"><CalendarDays className="w-4 h-4 mr-1 text-primary" /> 15 Aug, 2026</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 10:30 AM (45 mins)</span>
                      <span className="flex items-center text-blue-500"><Video className="w-4 h-4 mr-1" /> Google Meet</span>
                   </div>
                 </div>
                 <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                      <XCircle className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm">
                      Join Meeting
                    </Button>
                 </div>
               </div>
            </CardContent>
         </Card>

         <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Past Meetings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border border-border rounded-lg bg-muted/30">
                <p className="font-medium text-sm">Tax Planning Consultation</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">10 Apr, 2026</span>
                  <Badge variant="outline" className="text-emerald-500 border-none bg-emerald-500/10">Completed</Badge>
                </div>
              </div>
              <div className="p-3 border border-border rounded-lg bg-muted/30">
                <p className="font-medium text-sm">Q1 Portfolio Review</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">05 Jan, 2026</span>
                  <Badge variant="outline" className="text-emerald-500 border-none bg-emerald-500/10">Completed</Badge>
                </div>
              </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

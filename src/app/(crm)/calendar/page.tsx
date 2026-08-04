"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, MapPin, Video, MoreVertical, CalendarDays, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAppointments } from "../actions/appointments";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      if (!date) return;
      setIsLoading(true);
      const data = await getAppointments(date);
      setAppointments(data);
      setIsLoading(false);
    }
    loadAppointments();
  }, [date]);

  // Generate hourly slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 9 }).map((_, i) => {
    const hour = i + 9;
    const isPM = hour >= 12;
    const displayHour = hour > 12 ? hour - 12 : hour;
    const ampm = isPM ? "PM" : "AM";
    const timeString = `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`;
    
    // Find an appointment that starts at this hour (simplified for now)
    const appointment = appointments.find(app => {
      const appHour = new Date(app.startTime).getHours();
      return appHour === hour;
    });

    return {
      time: timeString,
      meeting: appointment ? {
        title: appointment.title,
        client: appointment.client ? `${appointment.client.firstName} ${appointment.client.lastName}` : "",
        type: appointment.notes || "In Person",
        duration: "1h", // Simplified
        color: "bg-primary/10 border-primary/20 text-primary"
      } : null
    };
  });

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your appointments and meetings.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="shrink-0">
            <CardContent className="p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </CardContent>
          </Card>
          
          <Card className="flex-1 min-h-0 overflow-y-auto">
            <CardHeader className="py-4">
              <CardTitle className="text-sm">Calendars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-primary text-primary focus:ring-primary h-4 w-4" defaultChecked />
                <span className="text-sm font-medium">My Appointments</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-emerald-500 text-emerald-500 focus:ring-emerald-500 h-4 w-4" defaultChecked />
                <span className="text-sm font-medium">Tax Deadlines</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-orange-500 text-orange-500 focus:ring-orange-500 h-4 w-4" defaultChecked />
                <span className="text-sm font-medium">Client Birthdays</span>
              </label>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3 flex flex-col min-h-0">
          <CardHeader className="py-4 border-b border-border flex flex-row items-center justify-between shrink-0">
            <CardTitle className="text-lg flex items-center">
              <CalendarDays className="w-5 h-5 mr-2 text-primary" />
              Schedule for {date ? date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : "Select a date"}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Day</Button>
              <Button variant="outline" size="sm">Week</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="divide-y divide-border">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">Loading appointments...</div>
              ) : (
                timeSlots.map((slot, i) => (
                  <div key={i} className="flex relative group">
                    <div className="w-20 py-4 pr-4 text-right text-xs text-muted-foreground font-medium border-r border-border shrink-0">
                      {slot.time}
                    </div>
                    <div className="flex-1 p-2 relative min-h-[80px]">
                      {slot.meeting && (
                        <div className={`absolute inset-x-2 top-2 bottom-2 rounded-md border p-3 ${slot.meeting.color}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-sm">{slot.meeting.title}</h4>
                            <span className="text-xs font-medium opacity-80">{slot.meeting.duration}</span>
                          </div>
                          {slot.meeting.client && (
                            <p className="text-sm opacity-90 mt-1">{slot.meeting.client}</p>
                          )}
                          {slot.meeting.type && (
                            <div className="flex items-center text-xs opacity-70 mt-2">
                              {slot.meeting.type === "Google Meet" ? <Video className="w-3 h-3 mr-1" /> :
                               slot.meeting.type === "In Person" ? <MapPin className="w-3 h-3 mr-1" /> : 
                               <Phone className="w-3 h-3 mr-1" />}
                              {slot.meeting.type}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

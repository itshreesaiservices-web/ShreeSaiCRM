"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Circle, Clock, AlertCircle, 
  Filter, MoreHorizontal, Calendar as CalendarIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleTaskStatus } from "@/app/(crm)/actions/tasks";
import type { Task } from "@/generated/prisma/client";

export function TaskList({ initialTasks }: { initialTasks: any[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState(initialTasks);
  const [isPending, startTransition] = useTransition();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "URGENT": return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-none">Urgent</Badge>;
      case "HIGH": return <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-none">High</Badge>;
      case "MEDIUM": return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none">Medium</Badge>;
      default: return <Badge className="bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-none">Low</Badge>;
    }
  };

  const filteredTasks = activeTab === "all" ? tasks : tasks.filter(t => 
    activeTab === "pending" ? t.status === "PENDING" || t.status === "IN_PROGRESS" : t.status === "COMPLETED"
  );

  const handleToggle = (id: string, currentStatus: string) => {
    // Optimistic update
    const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    startTransition(() => {
      toggleTaskStatus(id, currentStatus);
    });
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row justify-between p-4 border-b border-border gap-4">
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Input placeholder="Search tasks..." className="w-full" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {filteredTasks.map((task) => (
              <div key={task.id} className="p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors group">
                <button 
                  onClick={() => handleToggle(task.id, task.status)}
                  className="mt-1 shrink-0 text-muted-foreground hover:text-primary transition-colors"
                >
                  {task.status === "COMPLETED" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-base font-medium truncate ${task.status === "COMPLETED" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {getPriorityBadge(task.priority)}
                      <DropdownMenu>
                        {/* @ts-ignore */}
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
                      <span>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
                      </span>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border">
                      {task.assignedTo?.name || "Unassigned"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTasks.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-sm">No tasks found in this view.</p>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MoreHorizontal, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateLeadStatus } from "@/app/(crm)/actions/leads";
import type { Lead as DbLead } from "@/generated/prisma/client";

type Columns = {
  [key: string]: {
    id: string;
    title: string;
    leadIds: string[];
  };
};

type Data = {
  leads: { [key: string]: DbLead };
  columns: Columns;
  columnOrder: string[];
};

const defaultColumns = {
  "NEW": "New",
  "CONTACTED": "Contacted",
  "MEETING_SCHEDULED": "Meeting Scheduled",
  "PROPOSAL_SENT": "Proposal Sent",
  "CONVERTED": "Converted",
  "LOST": "Lost"
};

const priorityColors: Record<string, string> = {
  LOW: "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20",
  MEDIUM: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  HIGH: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  URGENT: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
};

function prepareInitialData(dbLeads: DbLead[]): Data {
  const leadsObj: { [key: string]: DbLead } = {};
  dbLeads.forEach(lead => leadsObj[lead.id] = lead);

  const columns: Columns = {};
  const columnOrder = Object.keys(defaultColumns);
  
  columnOrder.forEach(key => {
    columns[key] = {
      id: key,
      title: defaultColumns[key as keyof typeof defaultColumns],
      leadIds: dbLeads.filter(l => l.status === key).map(l => l.id),
    };
  });

  return {
    leads: leadsObj,
    columns,
    columnOrder
  };
}

export function KanbanBoard({ initialLeads }: { initialLeads: DbLead[] }) {
  const [data, setData] = useState<Data>(prepareInitialData(initialLeads));
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Fix hydration issue with react-beautiful-dnd / hello-pangea
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync state if initialLeads prop changes
  useEffect(() => {
    setData(prepareInitialData(initialLeads));
  }, [initialLeads]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newLeadIds = Array.from(startColumn.leadIds);
      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        leadIds: newLeadIds,
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
      return;
    }

    // Moving from one column to another
    const startLeadIds = Array.from(startColumn.leadIds);
    startLeadIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      leadIds: startLeadIds,
    };

    const finishLeadIds = Array.from(finishColumn.leadIds);
    finishLeadIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      leadIds: finishLeadIds,
    };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    }));

    // Perform the server action to update the DB
    startTransition(() => {
      updateLeadStatus(draggableId, destination.droppableId);
    });
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-6 overflow-x-auto pb-4">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const leads = column.leadIds.map((leadId) => data.leads[leadId]);

          return (
            <div key={column.id} className="flex flex-col flex-shrink-0 w-80 bg-muted/50 rounded-xl">
              <div className="p-4 flex items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="secondary" className="rounded-full h-5 px-1.5 min-w-5 flex items-center justify-center text-xs">
                    {leads.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-3 min-h-[150px] transition-colors ${
                      snapshot.isDraggingOver ? "bg-muted/80" : ""
                    }`}
                  >
                    <div className="space-y-3">
                      {leads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Card className={`border shadow-sm cursor-grab active:cursor-grabbing transition-shadow ${snapshot.isDragging ? "shadow-md ring-1 ring-primary/20" : "hover:border-primary/50 hover:shadow-md"}`}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-3">
                                    <Badge variant="outline" className={`border-none ${priorityColors[lead.priority]}`}>
                                      {lead.priority}
                                    </Badge>
                                    <span className="text-xs font-semibold text-muted-foreground">{lead.value}</span>
                                  </div>
                                  
                                  <h4 className="font-semibold text-sm mb-1 line-clamp-1">{lead.name}</h4>
                                  {lead.source && (
                                    <div className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mb-1">
                                      {lead.source}
                                    </div>
                                  )}
                                  
                                  <div className="space-y-1.5 mt-3">
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <Phone className="w-3 h-3 mr-2 shrink-0" />
                                      <span className="line-clamp-1">{lead.phone}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <Mail className="w-3 h-3 mr-2 shrink-0" />
                                      <span className="line-clamp-1">{lead.email}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      Today
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                      {lead.name.charAt(0)}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

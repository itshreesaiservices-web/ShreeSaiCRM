"use client";

import React, { useState, useEffect, useTransition } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { updateTaxReturnStatus } from "@/app/(crm)/actions/tax";

type Columns = {
  [key: string]: {
    id: string;
    title: string;
    returnIds: string[];
  };
};

type Data = {
  returns: { [key: string]: any };
  columns: Columns;
  columnOrder: string[];
};

const defaultColumns = {
  "UPLOADS": "Client Uploads",
  "VERIFICATION": "Verification",
  "MISSING_DOCS": "Missing Docs",
  "FILING": "Ready for Filing",
  "CONFIRMATION": "Filed / Confirmation"
};

function prepareInitialData(dbReturns: any[]): Data {
  const returnsObj: { [key: string]: any } = {};
  dbReturns.forEach(ret => returnsObj[ret.id] = ret);

  const columns: Columns = {};
  const columnOrder = Object.keys(defaultColumns);
  
  columnOrder.forEach(key => {
    columns[key] = {
      id: key,
      title: defaultColumns[key as keyof typeof defaultColumns],
      returnIds: dbReturns.filter(r => r.status === key).map(r => r.id),
    };
  });

  return {
    returns: returnsObj,
    columns,
    columnOrder
  };
}

export function TaxBoard({ initialReturns }: { initialReturns: any[] }) {
  const [data, setData] = useState<Data>(prepareInitialData(initialReturns));
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setData(prepareInitialData(initialReturns));
  }, [initialReturns]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newReturnIds = Array.from(startColumn.returnIds);
      newReturnIds.splice(source.index, 1);
      newReturnIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, returnIds: newReturnIds };
      setData((prev) => ({ ...prev, columns: { ...prev.columns, [newColumn.id]: newColumn } }));
      return;
    }

    const startReturnIds = Array.from(startColumn.returnIds);
    startReturnIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, returnIds: startReturnIds };

    const finishReturnIds = Array.from(finishColumn.returnIds);
    finishReturnIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, returnIds: finishReturnIds };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    }));

    startTransition(() => {
      updateTaxReturnStatus(draggableId, destination.droppableId);
    });
  };

  if (!isMounted) return null;

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-full gap-6 overflow-x-auto pb-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const returns = column.returnIds.map((id) => data.returns[id]);

            return (
              <div key={column.id} className="flex flex-col flex-shrink-0 w-80 bg-muted/50 rounded-xl">
                <div className="p-4 flex items-center justify-between border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                    <Badge variant="secondary" className="rounded-full h-5 px-1.5 min-w-5 flex items-center justify-center text-xs">
                      {returns.length}
                    </Badge>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 p-3 min-h-[150px] transition-colors ${snapshot.isDraggingOver ? "bg-muted/80" : ""}`}
                    >
                      <div className="space-y-3">
                        {returns.map((taxReturn, index) => (
                          <Draggable key={taxReturn.id} draggableId={taxReturn.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ ...provided.draggableProps.style }}
                              >
                                <Card className={`border shadow-sm cursor-grab active:cursor-grabbing transition-shadow ${snapshot.isDragging ? "shadow-md ring-1 ring-primary/20" : "hover:border-primary/50"}`}>
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <Badge variant="outline" className={
                                        taxReturn.status === 'MISSING_DOCS' ? 'bg-red-500/10 text-red-500 border-none' : 
                                        taxReturn.status === 'VERIFICATION' ? 'bg-orange-500/10 text-orange-500 border-none' : ''
                                      }>
                                        {taxReturn.itrType}
                                      </Badge>
                                      <Link href={`/tax/${taxReturn.id}`}>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                                          <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                      </Link>
                                    </div>
                                    <h4 className="font-semibold text-sm mb-1">
                                      {taxReturn.client?.firstName} {taxReturn.client?.lastName}
                                    </h4>
                                    <div className="text-xs text-muted-foreground flex justify-between mt-3 pt-3 border-t border-border">
                                       <span>AY {taxReturn.assessmentYear}</span>
                                       {taxReturn.refundStatus && (
                                          <span className="text-emerald-500 font-medium">{taxReturn.refundStatus}</span>
                                       )}
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
    </div>
  );
}

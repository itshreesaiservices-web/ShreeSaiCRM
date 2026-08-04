"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deactivateClient } from "@/app/(crm)/actions/clients";
import { ClientActionsDialog } from "./ClientActionsDialog";

export function ClientTableRowActions({ client }: { client: any }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivate = async () => {
    if (!confirm(`Are you sure you want to deactivate ${client.firstName} ${client.lastName}? Their account will be locked.`)) {
      return;
    }
    
    setIsDeactivating(true);
    await deactivateClient(client.id);
    setIsDeactivating(false);
  };

  return (
    <>
      <DropdownMenu>
        {/* @ts-ignore */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* @ts-ignore */}
          <DropdownMenuItem asChild>
            <Link href={`/clients/${client.id}`} className="flex items-center w-full cursor-pointer">
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Client
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeactivate} disabled={isDeactivating} className="text-red-600 focus:bg-red-50 focus:text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeactivating ? "Deactivating..." : "Deactivate Client"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      {isEditOpen && (
        <ClientActionsDialog 
          isOpen={isEditOpen} 
          onOpenChange={setIsEditOpen} 
          client={client} 
        />
      )}
    </>
  );
}

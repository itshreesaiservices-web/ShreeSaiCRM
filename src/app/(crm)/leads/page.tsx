import { KanbanBoard } from "@/components/crm/leads/KanbanBoard";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import { getLeads } from "../actions/leads";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Lead Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your potential clients through the conversion funnel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 overflow-hidden">
        <KanbanBoard initialLeads={leads} />
      </div>
    </div>
  );
}

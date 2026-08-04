import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskList } from "@/components/crm/tasks/TaskList";
import { getTasks } from "../actions/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage your daily to-dos, recurring tasks, and reminders.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      <TaskList initialTasks={tasks} />
    </div>
  );
}

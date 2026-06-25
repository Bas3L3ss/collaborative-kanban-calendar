import { Plus } from "lucide-react";

import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/features/tasks/types";

const columnLabels: Record<TaskStatus, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  className?: string;
}

export function BoardColumn({ status, tasks, className }: BoardColumnProps) {
  return (
    <div
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-xl bg-muted/50",
        className,
      )}
    >
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{columnLabels[status]}</h3>
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="icon-xs">
          <Plus className="size-3.5" />
          <span className="sr-only">Add task</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 pb-3">
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <p className="px-2 py-6 text-center text-xs text-muted-foreground">
              No tasks yet
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

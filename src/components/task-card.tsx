import { format, parseISO } from "date-fns";
import { Calendar, MessageSquare, Paperclip } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Task, TaskPriority } from "@/types";
import { cn } from "@/lib/utils";

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  high: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  urgent: "bg-destructive/10 text-destructive",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface TaskCardProps {
  task: Task;
  className?: string;
}

export function TaskCard({ task, className }: TaskCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <CardContent className="space-y-3 pt-4">
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.map((label) => (
              <Badge key={label} variant="secondary" className="text-[10px]">
                {label}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-sm font-medium leading-snug">{task.title}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn("text-[10px] capitalize", priorityStyles[task.priority])}
            >
              {task.priority}
            </Badge>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                {format(parseISO(task.dueDate), "MMM d")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {task.commentCount > 0 && (
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <MessageSquare className="size-3" />
                {task.commentCount}
              </span>
            )}
            {task.attachmentCount > 0 && (
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Paperclip className="size-3" />
                {task.attachmentCount}
              </span>
            )}
            {task.assignee && (
              <Avatar size="sm">
                <AvatarFallback className="text-[10px]">
                  {getInitials(task.assignee.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

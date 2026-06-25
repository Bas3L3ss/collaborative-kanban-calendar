import type { ComponentType } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  Filter,
  GitBranch,
  MessageSquare,
  UserPlus,
  CheckCircle2,
  ArrowRightLeft,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { activities } from "@/mock-data";
import type { ActivityItem } from "@/types";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  ActivityItem["type"],
  { icon: ComponentType<{ className?: string }>; color: string }
> = {
  task: { icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600" },
  board: { icon: GitBranch, color: "bg-blue-500/10 text-blue-600" },
  comment: { icon: MessageSquare, color: "bg-violet-500/10 text-violet-600" },
  member: { icon: UserPlus, color: "bg-amber-500/10 text-amber-600" },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ActivityTimelineItem({ activity }: { activity: ActivityItem }) {
  const config = typeConfig[activity.type];
  const Icon = config.icon;

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      <div className="absolute top-10 left-5 h-[calc(100%-2.5rem)] w-px bg-border last:hidden" />
      <div
        className={cn(
          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
          config.color,
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="text-[10px]">
              {getInitials(activity.user.name)}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm">
            <span className="font-medium">{activity.user.name}</span>{" "}
            <span className="text-muted-foreground">{activity.action}</span>{" "}
            <span className="font-medium">{activity.target}</span>
          </p>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] capitalize">
            {activity.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(parseISO(activity.timestamp), {
              addSuffix: true,
            })}
          </span>
          <span className="text-xs text-muted-foreground">
            · {format(parseISO(activity.timestamp), "MMM d, h:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ActivityPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
          <p className="text-muted-foreground">
            A timeline of actions across your workspace.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />
          Filter activity
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <CheckCircle2 className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-muted-foreground">Task updates</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-violet-500/10">
              <MessageSquare className="size-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
              <ArrowRightLeft className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Status changes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            All recent actions from the past 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activities.map((activity) => (
            <ActivityTimelineItem key={activity.id} activity={activity} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

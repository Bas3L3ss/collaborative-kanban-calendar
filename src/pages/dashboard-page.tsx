import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LayoutGrid,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { StatsCard } from "@/components/stats-card";
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
import {
  activities,
  boards,
  currentUser,
  dashboardStats,
  upcomingDeadlines,
} from "@/mock-data";
import { boardPath } from "@/routes/route-paths";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function DashboardPage() {
  const completionRate = Math.round(
    (dashboardStats.completedTasks / dashboardStats.totalTasks) * 100,
  );

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {currentUser.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening across your workspace today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Tasks"
          value={dashboardStats.totalTasks}
          description="across all boards"
          icon={ClipboardList}
          trend={{ value: "+12%", positive: true }}
        />
        <StatsCard
          title="Completed"
          value={dashboardStats.completedTasks}
          description={`${completionRate}% completion rate`}
          icon={CheckCircle2}
          trend={{ value: "+8%", positive: true }}
        />
        <StatsCard
          title="Active Boards"
          value={dashboardStats.activeBoards}
          description="currently in use"
          icon={LayoutGrid}
        />
        <StatsCard
          title="Team Members"
          value={dashboardStats.teamMembers}
          description="in this workspace"
          icon={Users}
          trend={{ value: "+2", positive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Boards</CardTitle>
              <CardDescription>Boards you&apos;ve worked on recently</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to={boardPath(boards[0].id)}>
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {boards.slice(0, 4).map((board) => (
              <Link
                key={board.id}
                to={boardPath(board.id)}
                className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div
                  className={`size-10 shrink-0 rounded-lg ${board.color} opacity-80`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{board.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {board.description}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{board.taskCount} tasks</p>
                  <p>{board.memberCount} members</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <Avatar size="sm">
                  <AvatarFallback className="text-[10px]">
                    {getInitials(activity.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {activity.action}
                    </span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(parseISO(activity.timestamp), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Tasks with approaching deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {upcomingDeadlines.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {task.assignee?.name ?? "Unassigned"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {task.priority}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {task.dueDate &&
                      format(parseISO(task.dueDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

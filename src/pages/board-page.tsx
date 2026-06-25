import { Filter, MoreHorizontal, Plus, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { BoardColumn } from "@/components/board-column";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getBoardById, getTasksByStatus, teamMembers } from "@/mock-data";
import { ROUTES } from "@/routes/route-paths";
import type { TaskStatus } from "@/types";
import { SEO } from "@/components/layout/seo";

const columns: TaskStatus[] = [
  "backlog",
  "todo",
  "in_progress",
  "review",
  "done",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const board = boardId ? getBoardById(boardId) : undefined;

  if (!board) {
    return (
      <>
        <SEO
          title="No board found"
          description="Create new board to manage tasks, track progress, and collaborate with your team using Kanban boards."
        />

        <div className="flex flex-col items-center justify-center gap-4 p-12">
          <h1 className="text-xl font-semibold">Board not found</h1>
          <p className="text-muted-foreground">
            The board you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link to={ROUTES.DASHBOARD}>Back to Dashboard</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title={board.name} description={`Kanban board for ${board.name}.`} />
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`size-3 rounded-full ${board.color}`} />
            <div>
              <h1 className="text-lg font-semibold">{board.name}</h1>
              <p className="text-sm text-muted-foreground">
                {board.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              {teamMembers.slice(0, 4).map((member) => (
                <Avatar key={member.id} size="sm">
                  <AvatarFallback className="text-[10px]">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Badge variant="secondary" className="ml-1">
                <Users className="mr-1 size-3" />
                {board.memberCount}
              </Badge>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filter
            </Button>

            <Button size="sm">
              <Plus className="size-4" />
              Add Task
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Board settings</DropdownMenuItem>
                <DropdownMenuItem>Export board</DropdownMenuItem>
                <DropdownMenuItem>Archive board</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex gap-4 p-6">
            {columns.map((status) => (
              <BoardColumn
                key={status}
                status={status}
                tasks={getTasksByStatus(board.id, status)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}

import type { ActivityItem } from "@/features/activities/types";
import type { User } from "@/features/auth/types";
import type { Board } from "@/features/boards/types";
import type { NotificationItem } from "@/features/notifications/types";
import type { Task } from "@/features/tasks/types";
import type { DashboardStats, WorkspaceSettings } from "@/types";

export const currentUser: User = {
  id: "user-1",
  name: "Alex Morgan",
  email: "alex.morgan@acme.io",
  role: "Product Manager",
};

export const teamMembers: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Jordan Lee",
    email: "jordan.lee@acme.io",
    role: "Engineer",
  },
  {
    id: "user-3",
    name: "Sam Patel",
    email: "sam.patel@acme.io",
    role: "Designer",
  },
  {
    id: "user-4",
    name: "Taylor Kim",
    email: "taylor.kim@acme.io",
    role: "QA Lead",
  },
];

export const boards: Board[] = [
  {
    id: "board-1",
    name: "Product Roadmap",
    description: "Q2 feature planning and delivery tracking",
    color: "bg-blue-500",
    taskCount: 24,
    memberCount: 6,
    updatedAt: "2026-06-24T14:30:00Z",
  },
  {
    id: "board-2",
    name: "Engineering Sprint",
    description: "Current sprint backlog and active work",
    color: "bg-violet-500",
    taskCount: 18,
    memberCount: 8,
    updatedAt: "2026-06-25T09:15:00Z",
  },
  {
    id: "board-3",
    name: "Design System",
    description: "Component library and UI consistency",
    color: "bg-emerald-500",
    taskCount: 12,
    memberCount: 4,
    updatedAt: "2026-06-23T16:45:00Z",
  },
  {
    id: "board-4",
    name: "Marketing Launch",
    description: "Go-to-market campaign coordination",
    color: "bg-amber-500",
    taskCount: 9,
    memberCount: 5,
    updatedAt: "2026-06-22T11:00:00Z",
  },
];

export const dashboardStats: DashboardStats = {
  totalTasks: 63,
  completedTasks: 28,
  activeBoards: 4,
  teamMembers: 12,
};

export const tasks: Task[] = [
  {
    id: "task-1",
    boardId: "board-1",
    title: "Define MVP scope for calendar integration",
    description: "Outline requirements for syncing tasks with calendar views.",
    status: "backlog",
    priority: "high",
    assignee: teamMembers[1],
    dueDate: "2026-07-02",
    labels: ["Planning"],
    commentCount: 3,
    attachmentCount: 1,
  },
  {
    id: "task-2",
    boardId: "board-1",
    title: "User research synthesis",
    status: "backlog",
    priority: "medium",
    assignee: teamMembers[2],
    dueDate: "2026-07-05",
    labels: ["Research"],
    commentCount: 1,
    attachmentCount: 0,
  },
  {
    id: "task-3",
    boardId: "board-2",
    title: "Set up authentication flow",
    status: "todo",
    priority: "urgent",
    assignee: teamMembers[1],
    dueDate: "2026-06-28",
    labels: ["Backend", "Auth"],
    commentCount: 5,
    attachmentCount: 2,
  },
  {
    id: "task-4",
    boardId: "board-2",
    title: "Design login and register screens",
    status: "todo",
    priority: "high",
    assignee: teamMembers[2],
    dueDate: "2026-06-27",
    labels: ["Design"],
    commentCount: 2,
    attachmentCount: 1,
  },
  {
    id: "task-5",
    boardId: "board-2",
    title: "Implement Kanban board layout",
    status: "in_progress",
    priority: "high",
    assignee: teamMembers[0],
    dueDate: "2026-06-26",
    labels: ["Frontend"],
    commentCount: 8,
    attachmentCount: 0,
  },
  {
    id: "task-6",
    boardId: "board-2",
    title: "WebSocket realtime updates",
    status: "in_progress",
    priority: "medium",
    assignee: teamMembers[1],
    dueDate: "2026-07-01",
    labels: ["Backend"],
    commentCount: 4,
    attachmentCount: 1,
  },
  {
    id: "task-7",
    boardId: "board-3",
    title: "Review button component variants",
    status: "review",
    priority: "low",
    assignee: teamMembers[2],
    dueDate: "2026-06-25",
    labels: ["Design System"],
    commentCount: 2,
    attachmentCount: 0,
  },
  {
    id: "task-8",
    boardId: "board-3",
    title: "Accessibility audit for forms",
    status: "review",
    priority: "medium",
    assignee: teamMembers[3],
    dueDate: "2026-06-29",
    labels: ["A11y"],
    commentCount: 6,
    attachmentCount: 1,
  },
  {
    id: "task-9",
    boardId: "board-1",
    title: "Ship dashboard analytics v1",
    status: "done",
    priority: "high",
    assignee: teamMembers[0],
    dueDate: "2026-06-20",
    labels: ["Analytics"],
    commentCount: 12,
    attachmentCount: 3,
  },
  {
    id: "task-10",
    boardId: "board-4",
    title: "Finalize launch checklist",
    status: "done",
    priority: "medium",
    assignee: teamMembers[3],
    dueDate: "2026-06-18",
    labels: ["Marketing"],
    commentCount: 1,
    attachmentCount: 0,
  },
];

export const activities: ActivityItem[] = [
  {
    id: "activity-1",
    user: teamMembers[1],
    action: "moved",
    target: "Implement Kanban board layout to In Progress",
    timestamp: "2026-06-25T10:32:00Z",
    type: "task",
  },
  {
    id: "activity-2",
    user: teamMembers[2],
    action: "commented on",
    target: "Design login and register screens",
    timestamp: "2026-06-25T09:48:00Z",
    type: "comment",
  },
  {
    id: "activity-3",
    user: teamMembers[0],
    action: "created board",
    target: "Marketing Launch",
    timestamp: "2026-06-24T15:20:00Z",
    type: "board",
  },
  {
    id: "activity-4",
    user: teamMembers[3],
    action: "completed",
    target: "Finalize launch checklist",
    timestamp: "2026-06-24T11:05:00Z",
    type: "task",
  },
  {
    id: "activity-5",
    user: teamMembers[0],
    action: "invited",
    target: "Taylor Kim to Engineering Sprint",
    timestamp: "2026-06-23T16:30:00Z",
    type: "member",
  },
  {
    id: "activity-6",
    user: teamMembers[1],
    action: "assigned",
    target: "WebSocket realtime updates to themselves",
    timestamp: "2026-06-23T14:12:00Z",
    type: "task",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "You were mentioned",
    message: "Jordan Lee mentioned you in a comment on Kanban board layout",
    timestamp: "2026-06-25T10:45:00Z",
    read: false,
    type: "mention",
  },
  {
    id: "notif-2",
    title: "Task assigned to you",
    message: "Implement Kanban board layout was assigned to you",
    timestamp: "2026-06-25T08:30:00Z",
    read: false,
    type: "assignment",
  },
  {
    id: "notif-3",
    title: "Deadline approaching",
    message: "Design login and register screens is due tomorrow",
    timestamp: "2026-06-24T17:00:00Z",
    read: false,
    type: "deadline",
  },
  {
    id: "notif-4",
    title: "Board updated",
    message: "Sam Patel updated 3 tasks on Design System",
    timestamp: "2026-06-24T13:22:00Z",
    read: true,
    type: "update",
  },
  {
    id: "notif-5",
    title: "Task completed",
    message: "Taylor Kim completed Accessibility audit for forms",
    timestamp: "2026-06-23T16:50:00Z",
    read: true,
    type: "update",
  },
];

export const upcomingDeadlines = tasks
  .filter((task) => task.status !== "done" && task.dueDate)
  .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""))
  .slice(0, 6);

export const workspaceSettings: WorkspaceSettings = {
  name: "Acme Workspace",
  slug: "acme-workspace",
  timezone: "America/New_York",
  weekStartsOn: "Monday",
};

export function getBoardById(boardId: string): Board | undefined {
  return boards.find((board) => board.id === boardId);
}

export function getTasksByBoardId(boardId: string): Task[] {
  return tasks.filter((task) => task.boardId === boardId);
}

export function getTasksByStatus(
  boardId: string,
  status: Task["status"],
): Task[] {
  return getTasksByBoardId(boardId).filter((task) => task.status === status);
}

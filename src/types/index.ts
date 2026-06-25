// TASKS

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  dueDate?: string;
  labels: string[];
  commentCount: number;
  attachmentCount: number;
}

// USER

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

// BOARD

export interface Board {
  id: string;
  name: string;
  description: string;
  color: string;
  taskCount: number;
  memberCount: number;
  updatedAt: string;
}

//NOTIFICATION
export interface ActivityItem {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
  type: "task" | "board" | "comment" | "member";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "mention" | "assignment" | "deadline" | "update";
}

// DASHBOARD

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  activeBoards: number;
  teamMembers: number;
}

// WORKSPACE

export interface WorkspaceSettings {
  name: string;
  slug: string;
  timezone: string;
  weekStartsOn: string;
}

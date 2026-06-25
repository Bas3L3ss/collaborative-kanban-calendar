import type { User } from "../auth/types";

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

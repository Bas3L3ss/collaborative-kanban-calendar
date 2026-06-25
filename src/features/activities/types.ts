import type { User } from "../auth/types";

export interface ActivityItem {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
  type: "task" | "board" | "comment" | "member";
}

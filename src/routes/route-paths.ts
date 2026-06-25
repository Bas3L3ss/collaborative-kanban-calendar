export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  BOARD: "/board/:boardId",
  CALENDAR: "/calendar",
  NOTIFICATIONS: "/notifications",
  ACTIVITY: "/activity",
  SETTINGS: "/settings",
} as const;

export function boardPath(boardId: string) {
  return `/board/${boardId}`;
}

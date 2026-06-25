// TASKS

// USER

// BOARD

//NOTIFICATION

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

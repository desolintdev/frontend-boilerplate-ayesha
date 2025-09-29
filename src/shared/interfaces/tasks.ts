// types/tasks.ts

export interface OrganizationInfo {
  permissions: string;
  organizationId: string;
  role: string;
  isActive: boolean;
}

export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  organizations?: OrganizationInfo[];
  currentActiveOrganization?: OrganizationInfo | null;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | string;
  priority: 'low' | 'medium' | 'high' | string;
  dueDate: string; // ISO date
  creatorId: UserInfo;
  assignedTo: UserInfo;
  organizationId: string;
  isOverdue: boolean;
}

export interface TasksResponseBody {
  tasks: Task[];
  type: string; // e.g. "DATA_RETRIEVED_SUCCESSFULLY"
}

export interface TasksResponse {
  statusCode: number;
  message: string;
  body: TasksResponseBody;
}

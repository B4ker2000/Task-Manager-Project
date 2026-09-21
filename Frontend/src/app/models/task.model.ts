import { ProjectCategory } from "./category.model";

export interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Review Required" | "Completed"
    priority: "Low" | "Medium" | "High"
    deadline?: string;
    projectId: number;
    sortOrder: number;
    assignedUserId?: number | null;
    categoryId?: number | null;
    category?: ProjectCategory | null;
}

export interface WorkspaceTeamMember {
    userId: number; 
    userEmail: string;
    userName: string;
    projectRole: "Owner" | "Member" | "Viewer";
}

export interface ProjectWorkspaceData {
    role: "Owner" | "Member" | "Viewer";
    tasks: TaskItem[];
    team: WorkspaceTeamMember[];
}

export interface TaskCreateDto {
    projectId: number;
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    deadline?: string;
}
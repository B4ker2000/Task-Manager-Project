import { TaskItem } from "./task.model";

export interface ProjectItem {
    id: number;
    title: string;
    description: string;
    userRole: "Owner" | "Member" | "Viewer";
}

export interface ProjectDetails {
    id: number;
    name: string;
    description: string;
    projectManagerId: number;
    tasks: TaskItem[];
    members: WorkspaceMember[];
    userRole: "Owner" | "Member" | "Viewer";
}

export interface WorkspaceMember {
    userId: number;
    userEmail: string;
    userName: string;
    projectRole: "Owner" | "Member" | "Viewer";
}

export interface ProjectInvitation {
    id: number;
    projectId: number;
    project: ProjectDetails;
    invitedEmail: string;
    invitedUserId: number | null;
    invitedByUserId: number;
    status: "Pending" | "Accepted" | "Declined" | "TimedOut";
    projectRole: "Owner" | "Member" | "Viewer";
    createdAt: Date;
    expiresAt: Date;
}
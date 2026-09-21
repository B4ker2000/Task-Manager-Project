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
    // projectManagerId: number;
}

export interface WorkspaceMember {
    userId: number;
    userEmail: string;
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
    createdAt: number;
    expiresAt: number;
}
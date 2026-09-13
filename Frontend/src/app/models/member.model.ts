export interface ProjectMember {
    userId: number;
    userName: string;
    userEmail: string;
    userAssignedtasksId?: number[];
    userProjectId?: number[];
    userProjectRole: string;
}
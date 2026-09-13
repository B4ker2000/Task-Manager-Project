import { ProjectCategory } from "./category.model";
import { ProjectMember } from "./member.model";

export interface Task {
    taskId: number;
    taskTitle: string;
    taskDescription: string;
    taskStatus: "Pending" | "In Progress" | "Review" | "Completed";
    taskAssignedUser?: ProjectMember;
    taskProjectId: number;
    taskCategory?: ProjectCategory;
    taskPriority: "Low" | "Medium" | "High";
    taskDeadline?: string;
}
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaskItem, ProjectWorkspaceData, TaskCreateDto } from "../models/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:5283/api/task';
    private http = inject(HttpClient);

    // 1. Get all tasks, user role, and roster list for a project room
    public getProjectTasks(projectId: number): Observable<ProjectWorkspaceData> {
        return this.http.get<ProjectWorkspaceData>(`${this.apiUrl}/project/${projectId}`);
    }

    // 2. Create a new task
    public createTask(task: TaskCreateDto): Observable<{ message: string, taskId: number }> {
        return this.http.post<{ message: string, taskId: number }>(this.apiUrl, task);
    }

    // 3. Update status (Pending -> In Progress -> Completed)
    public updateTaskStatus(taskId: number, status: string): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${this.apiUrl}/${taskId}/status`, { status });
    }

    // 4. Delete a task completely from the database
    public deleteTask(taskId: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${taskId}`);
    }

    // 5. Assign tasks to users
    public assignTask(taskId: number, assignedUserId: number | null): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${taskId}/assign`, { assignedUserId });
    }

    // 6. Assign tags/categories to tasks
    public assignTaskCategory(taskId: number, categoryId: number | null): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${this.apiUrl}/${taskId}/category`, { categoryId });
    }

    // 7. Re-order task cards in a column layout
    public reorderTasks(projectId: number, status: string, taskIds: number[]): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${this.apiUrl}/project/${projectId}/reorder`, { status, taskIds });
    }
}
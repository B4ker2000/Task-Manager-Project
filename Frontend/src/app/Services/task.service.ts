import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { observable, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:5283/api/task';
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID); // Inject platform checking context

    private getHeaders(): HttpHeaders {
        let token = '';

        if(isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem('token') || '';
        }
        
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    // 1. Get all tasks for a specific project
    getProjectTasks(projectId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/project/${projectId}`, { headers: this.getHeaders() });
    }

    // 2. Create a new task
    createTask(task: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, task, { headers: this.getHeaders() });
    }

    // 3. Update status (Pending -> In Progress -> Completed)
    updateTaskStatus(taskId: number, status: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${taskId}/status`, { status }, { headers: this.getHeaders() });
    }

    // 4. Delete a task completely from the database
    deleteTask(taskId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() });
    }

    // 5. Assign tasks to users
    assignTask(taskId: number, assignedUserId: number | null): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}/assign`, { assignedUserId }, { headers: this.getHeaders() });
    }

    // 6. Assign tags/categories to tasks
    assignTaskCategory(taskId: number, categoryId: number | null): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${taskId}/category`, { categoryId }, { headers: this.getHeaders() });
    }
}
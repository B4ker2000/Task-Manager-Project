import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5283/api/project';
    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    // 1. Fetch all categories assigned to a specific project room
    getProjectCategories(projectId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${projectId}/categories`, { headers: this.getHeaders() });
    }

    // 2. Post a new category tag creation packet (Project Managers Only)
    createCategory(projectId: number, categoryData: { name: string, colorHex: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${projectId}/categories`, categoryData, { headers: this.getHeaders() });
    }

    // 3. Delete a selected category tag 
    deleteCategory(projectId: number, categoryId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${projectId}/categories/${categoryId}`, { headers: this.getHeaders() });
    }
}
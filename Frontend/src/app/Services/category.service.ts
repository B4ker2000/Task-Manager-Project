import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectCategory, CategoryCreateDto, ApiResponseWrapper } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:5283/api/project';

    // 1. Fetch all categories assigned to a specific project room
    public getProjectCategories(projectId: number): Observable<ProjectCategory[]> {
        return this.http.get<ProjectCategory[]>(`${this.apiUrl}/${projectId}/categories`);
    }

    // 2. Post a new category tag creation packet (Project Managers Only)
    public createCategory(projectId: number, categoryData: CategoryCreateDto): Observable<ApiResponseWrapper<ProjectCategory>> {
        return this.http.post<ApiResponseWrapper<ProjectCategory>>(`${this.apiUrl}/${projectId}/categories`, categoryData);
    }

    // 3. Delete a selected category tag 
    public deleteCategory(projectId: number, categoryId: number): Observable<ApiResponseWrapper<null>> {
        return this.http.delete<ApiResponseWrapper<null>>(`${this.apiUrl}/${projectId}/categories/${categoryId}`);
    }
}
import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    // Update this to use your exact backend port!
    private apiUrl = 'http://localhost:5283/api/project';
    private http = inject(HttpClient);

    // Inject platform checking context (server vs. browser)
    private platformId = inject(PLATFORM_ID);

    // Helper method to attach the JWT wristband to the HTTP Headers
    private getHeaders(): HttpHeaders {
        let token = '';

        // Only attempt to read storage if running on the client-side browser
        if(isPlatformBrowser(this.platformId)) {
            token = localStorage.getItem('token') || '';
        }

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    // 1. Fetch all projects belonging to the logged-in user
    getMyProjects(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    // 2. Send a request payload to create a new project
    createProject(project: { name: string, description: string }): Observable<any> {
        return this.http.post<any>(this.apiUrl, project, { headers: this.getHeaders() });
    }

    // 3. Delete a project
    deleteProject(projectId: number): Observable<any> {
        return this.http.delete(`http://localhost:5283/api/project/${projectId}`);
    }

    // 4. Add a new project member!
    inviteMemberToProject(projectId: number, invitePayload: { InvitedEmail: string; ProjectRole: string }): Observable<any> {
        return this.http.post(`http://localhost:5283/api/project/${projectId}/invite`, invitePayload);
    }

    // 5. Get the user role in a given project
    getProjectRole(projectId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${projectId}/role`, {
            headers: this.getHeaders()
        });
    }

    // 6. Get details of just one project via it's ID
    getProjectById(projectId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${projectId}`, { headers: this.getHeaders() });
    }

    // 7. Get member details for the roster list
    getProjectMembers(projectId: number): Observable<any[]> {
        return this .http.get<any[]>(`${this.apiUrl}/${projectId}/members`, { headers: this.getHeaders() });
    }

    // 8. Remove members from projects as an Owner/Admin or leave one yourself
    removeProjectMember(projectId: number, targetUserId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${projectId}/members/${targetUserId}`, { headers: this.getHeaders() })
    }
}
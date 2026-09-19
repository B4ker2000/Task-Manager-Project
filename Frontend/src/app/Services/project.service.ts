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
    public getMyProjects(): Observable<any[]> {
        return this.http.get<any[]>(
            this.apiUrl, 
            { headers: this.getHeaders() }
        )
    }

    // 2. Send a request payload to create a new project
    public createProject(project: { name: string, description: string }): Observable<any> {
        return this.http.post<any>(
            this.apiUrl, 
            project, 
            { headers: this.getHeaders() }
        )
    }

    // 3. Delete a project
    public deleteProject(projectId: number): Observable<any> {
        return this.http.delete<any>(
            `${this.apiUrl}/${projectId}`, 
            { headers: this.getHeaders() }
        )
    }

    // 4. Get the user role in a given project
    public getProjectRole(projectId: number): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${projectId}/role`, 
            { headers: this.getHeaders()}
        )
    }

    // 5. Get details of just one project via it's ID
    public getProjectById(projectId: number): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/${projectId}`, 
            { headers: this.getHeaders() }
        )
    }

    // 6. Get member details for the roster list
    public getProjectMembers(projectId: number): Observable<any[]> {
        return this .http.get<any[]>(
            `${this.apiUrl}/${projectId}/members`, 
            { headers: this.getHeaders() }
        )
    }

    // 7. Remove members from projects as an Owner/Admin or leave one yourself
    public removeProjectMember(projectId: number, targetUserId: number): Observable<any> {
        return this.http.delete<any>(
            `${this.apiUrl}/${projectId}/members/${targetUserId}`, 
            { headers: this.getHeaders() }
        )
    }

    // 8. Create an invitation
    public createInvitation(
        projectId: number,
        invitePayload: { InvitedEmail: string, ProjectRole: string }
    ): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/${projectId}/invitations`,
            invitePayload,
            { headers: this.getHeaders() }
        )
    }

    // 9. Fetch pending Invitations
    public getPendingInvitations(): Observable<any[]> {
        return this.http.get<any[]>(
            `${this.apiUrl}/invitations/pending`,
            { headers: this.getHeaders() }
        )
    }

    // 10. Accept an Invitation!
    public acceptInvitation(invitationId: number): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/invitations/${invitationId}/accept`, 
            {}, 
            { headers: this.getHeaders() }
        )
    }

    // 11. Decline an Invitation!
    public declineInvitation(invitationId: number): Observable<any> {
        return this.http.post<any>(
            `${this.apiUrl}/invitations/${invitationId}/decline`, 
            {}, 
            { headers: this.getHeaders() }
        )
    }
}
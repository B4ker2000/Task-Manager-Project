import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectItem, ProjectDetails, WorkspaceMember, ProjectInvitation } from "../models/project.model";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    // Update this to use your exact backend port!
    private apiUrl = 'http://localhost:5283/api/project';
    private http = inject(HttpClient);

    // 1. Fetch all projects belonging to the logged-in user
    public getMyProjects(): Observable<ProjectItem[]> {
        return this.http.get<ProjectItem[]>(this.apiUrl);
    }

    // 2. Send a request payload to create a new project
    public createProject(project: { name: string, description: string }): Observable<{ message: string, projectId: number }> {
        return this.http.post<{ message: string, projectId: number }>(this.apiUrl, project);
    }

    // 3. Delete a project
    public deleteProject(projectId: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${projectId}`);
    }

    // 4. Get the user role in a given project
    public getProjectRole(projectId: number): Observable<{ role: string }> {
        return this.http.get<{ role: string }>(`${this.apiUrl}/${projectId}/role`);
    }

    // 5. Get details of just one project via its ID
    public getProjectById(projectId: number): Observable<ProjectDetails> {
        return this.http.get<ProjectDetails>(`${this.apiUrl}/${projectId}`);
    }

    // 6. Get member details for the roster list
    public getProjectMembers(projectId: number): Observable<WorkspaceMember[]> {
        return this.http.get<WorkspaceMember[]>(`${this.apiUrl}/${projectId}/members`);
    }

    // 7. Remove members from projects as an Owner/Admin or leave one yourself
    public removeProjectMember(projectId: number, targetUserId: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${projectId}/members/${targetUserId}`);
    }

    // 8. Create an invitation
    public createInvitation(projectId: number, invitePayload: { invitedEmail: string, projectRole: string }): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/${projectId}/invitations`, invitePayload);
    }

    // 9. Fetch pending Invitations
    public getPendingInvitations(): Observable<ProjectInvitation[]> {
        return this.http.get<ProjectInvitation[]>(`${this.apiUrl}/invitations/pending`);
    }

    // 10. Accept an Invitation!
    public acceptInvitation(invitationId: number): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/invitations/${invitationId}/accept`, {});
    }

    // 11. Decline an Invitation!
    public declineInvitation(invitationId: number): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/invitations/${invitationId}/decline`, {});
    }

    // 12. 
    public updateUserProjectPreferences(orderedIds: number[]): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/user-preferences/project-order`, {
            orderedProjectIds: orderedIds
        });
    }
}
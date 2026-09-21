import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, DatePipe, isPlatformBrowser } from "@angular/common";
import { ProjectService } from "../services/project.service";
import { ProjectItem, ProjectInvitation } from "../models/project.model";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LanguageService } from "../i18n/language.service";
import { LocalizeNumberPipe } from "../i18n/localize-number.pipe";
import { PopupComponent } from "./popup.component";
import { UserProfile } from "../models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, DatePipe, RouterLink, LocalizeNumberPipe, PopupComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
    private projectService = inject(ProjectService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);
    private authService = inject(AuthService);

    public projects: ProjectItem[] = [];
    public newProject = { name: '', description: '' };
    public pendingInvitations: ProjectInvitation[] = [];

    private pendingDeleteProjectId: number | null = null;
    private pendingDeclineInvitationId: number | null = null;

    //////////////////////////////////////
    // Popup component state controller //
    //////////////////////////////////////
    public popupConfig = {
        visible: false,
        type: "success" as "success" | "warning" | "danger",
        title: "",
        body: "",
        isConfirmation: false,
        actionType: "" // Tracks what to do when clicking "Proceed"
    };

    constructor(public langService: LanguageService) {}

    ngOnInit(): void {
        // Only trigger initial project load if we are fully inside the browser
        if(isPlatformBrowser(this.platformId)) {
            this.authService.getUserProfile().subscribe({
                next: (profile: UserProfile) => {
                    this.loadProjects();
                    this.loadPendingInvitations();
                },
                error: (err: HttpErrorResponse) => {
                    console.error("Identity check pending on reload, trying fallback...", err);
                    this.loadProjects();
                    this.loadPendingInvitations();
                }
            })
        }
    }

    private loadProjects(): void {
        // Defensive check: If there is no token in the browser, stop immediately and don't call the the API!
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(!token) return; // Stop completely if no token exists
        
        this.projectService.getMyProjects().subscribe({
            next: (data: ProjectItem[]) => { 
                this.projects = data; 
                this.cdr.detectChanges(); // Instantly refresh the cards so they show up immediately after login!
            },
            error: (err: HttpErrorResponse) => console.error('Could not fetch projects', err)
        });
    }

    private loadPendingInvitations():void {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) return;

        this.projectService.getPendingInvitations().subscribe({
            next: (invitations: ProjectInvitation[]) => {
                this.pendingInvitations = invitations;
                this.cdr.detectChanges();
            },
            error: (err: HttpErrorResponse) => {
                console.error("Could not fetch pending invitations", err);
            }
        });
    }

    public acceptInvitation(invitationId: number): void {
        this.projectService.acceptInvitation(invitationId).subscribe({
            next: () => {
                this.pendingInvitations = this.pendingInvitations.filter(
                    invitation => invitation.id !== invitationId
                );

                this.loadProjects();
                
                this.showPopup(
                    "success",
                    this.langService.words().POPUP.SUCCESS_INVITATION_ACCEPTED_TITLE,
                    this.langService.words().POPUP.SUCCESS_INVITATION_ACCEPTED_BODY,
                    false,
                    "invitation-accepted"
                );
            },
            error: (err: HttpErrorResponse) => {
                console.error("Could not accept invitation", err);

                const serverMessage = err.error && typeof err.error === 'object' && 'message' in err.error
                    ? (err.error as { message: string }).message
                    : null;

                this.showPopup(
                    "danger",
                    this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                    serverMessage || this.langService.words().POPUP.ERROR_INVITATION_ACCEPT_FAILED_BODY,
                    false,
                    "error-dismiss"
                );
            }
        });
    }

    public declineInvitation(invitationId: number): void {
        this.pendingDeclineInvitationId = invitationId;
                 
        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_INVITATION_DECLINE_TITLE,
            this.langService.words().POPUP.WARNING_INVITATION_DECLINE_BODY,
            true,
            "invitation-declined"
        );
    }

    public onCreateProject(): void {
        this.projectService.createProject(this.newProject).subscribe({
            next: () => {
                this.newProject = { name: '', description: '' }; // Clear fields
                this.loadProjects(); // Instantly refresh layout card list view!
            },
            error: (err: HttpErrorResponse) => console.error('Failed to create a project!', err)
        });
    }

    public onLogout(): void {
        if(isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            this.router.navigate(['/login']);
        }
    }

    public onDeleteProject(projectId: number, event: Event): void {
        event.stopPropagation(); // Prevents clicking the delete button from opening the project board!
        this.pendingDeleteProjectId = projectId;
        
        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_DELETE_PROJECT_TITLE,
            this.langService.words().POPUP.WARNING_DELETE_PROJECT_BODY,
            true,
            "delete-project"
        );
    }

    public handlePopupConfirm(): void {
        const currentAction = this.popupConfig.actionType;
        this.closePopup(); 

        if (currentAction === "delete-project" && this.pendingDeleteProjectId !== null) {
            this.projectService.deleteProject(this.pendingDeleteProjectId).subscribe({
                next: () => {
                    this.pendingDeleteProjectId = null; // Flush cache identifier
                    this.loadProjects();
                },
                error: (err: HttpErrorResponse) => {
                    this.pendingDeleteProjectId = null;
                    console.error("Failed to delete project:", err);
                }
            });
        } else if (currentAction === "invitation-declined" && this.pendingDeclineInvitationId !== null) {    
            this.projectService.declineInvitation(this.pendingDeclineInvitationId).subscribe({
                next: () => {
                    this.pendingInvitations = this.pendingInvitations.filter(
                        invitation => invitation.id !== this.pendingDeclineInvitationId
                    );

                    this.pendingDeclineInvitationId = null;
                    this.loadProjects();
                    
                    this.showPopup(
                        "success",
                        this.langService.words().POPUP.SUCCESS_INVITATION_DECLINED_TITLE,
                        this.langService.words().POPUP.SUCCESS_INVITATION_DECLINED_BODY,
                        false,
                        "invitation-declined"
                    );
                }, 
                error: (err: HttpErrorResponse) => {
                    console.error("Could not decline invitation", err);
                    this.pendingDeclineInvitationId = null;

                    const serverMessage = err.error && typeof err.error === 'object' && 'message' in err.error
                        ? (err.error as { message: string }).message
                        : null;

                    this.showPopup(
                        "danger",
                        this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                        serverMessage || this.langService.words().POPUP.ERROR_INVITATION_DECLINE_FAILED_BODY,
                        false,
                        "error-dismiss"
                    );
                }
            });
        }
    }

    private showPopup(type: "success" | "warning" | "danger", title: string, body: string, isConfirmation: boolean, actionType: string): void {
        this.popupConfig = { visible: true, type, title, body, isConfirmation, actionType };
        this.cdr.detectChanges();
    }

    public closePopup(): void {
        this.popupConfig.visible = false;
        this.cdr.detectChanges();
    }

    // Method to dynamically replace our dictionary tokens to include a value!
    public formatLabel(template: string, value: string): string {
        return template.replace(/\{[a-zA-Z0-9_]+\}/, value);
    }

    public getLocalizedRole(role: string): string {
        switch (role) {
            case "Owner":
                return this.langService.words().GLOBAL.ROLE_OWNER;
            case "Member":
                return this.langService.words().GLOBAL.ROLE_MEMBER;
            case "Viewer":
                return this.langService.words().GLOBAL.ROLE_VIEWER;
            default:
                return role;
        }
    }
}
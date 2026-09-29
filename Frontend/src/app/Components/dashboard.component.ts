import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, DatePipe, isPlatformBrowser } from "@angular/common";
import { ProjectService } from "../services/project.service";
import { ProjectItem, ProjectInvitation } from "../models/project.model";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LanguageService } from "../i18n/language.service";
import { LocalizeNumberPipe } from "../i18n/localize-number.pipe";
import { PopupService } from "../services/popup.service";
import { UserProfile } from "../models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";
import { DragDropModule, CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, DatePipe, RouterLink, LocalizeNumberPipe, DragDropModule],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
    private projectService = inject(ProjectService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);
    private authService = inject(AuthService);
    private popupService = inject(PopupService);

    public projects: ProjectItem[] = [];
    public newProject = { name: '', description: '' };
    public pendingInvitations: ProjectInvitation[] = [];

    private pendingDeleteProjectId: number | null = null;
    private pendingDeclineInvitationId: number | null = null;

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
                
                this.popupService.show({
                    type: "success",
                    title: this.langService.words().POPUP.SUCCESS_INVITATION_ACCEPTED_TITLE,
                    body: this.langService.words().POPUP.SUCCESS_INVITATION_ACCEPTED_BODY,
                    isConfirmation: false,
                    actionType: "invitation-accepted"
                });
            },
            error: (err: HttpErrorResponse) => {
                console.error("Could not accept invitation", err);

                const serverMessage = err.error && typeof err.error === 'object' && 'message' in err.error
                    ? (err.error as { message: string }).message
                    : null;

                this.popupService.show({
                    type: "danger",
                    title: this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                    body: serverMessage || this.langService.words().POPUP.ERROR_INVITATION_ACCEPT_FAILED_BODY,
                    isConfirmation: false,
                    actionType: "error-dismiss"
                });
            }
        });
    }

    public declineInvitation(invitationId: number): void {
        this.pendingDeclineInvitationId = invitationId;
                 
        this.popupService.show({
            type: "warning",
            title: this.langService.words().POPUP.WARNING_INVITATION_DECLINE_TITLE,
            body: this.langService.words().POPUP.WARNING_INVITATION_DECLINE_BODY,
            isConfirmation: true,
            actionType: "invitation-declined"
        });
    }

    public onCreateProject(): void {
        this.projectService.createProject(this.newProject).subscribe({
            next: () => {
                this.newProject = { name: '', description: '' }; // Clear fields
                this.loadProjects(); // Instantly refresh layout card list view!
            },
            error: (err: HttpErrorResponse) => {
                console.error('Failed to create a project!', err)

                const projectCreationFailedBody = this.formatLabel(this.langService.words().POPUP.DANGER_PROJECT_CREATION_FAILED_BODY, err.message)

                this.popupService.show({
                    type: "danger",
                    title: this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                    body: projectCreationFailedBody,
                    isConfirmation: true,
                    actionType: "invitation-declined"
                });
            }
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
        
        this.popupService.show({
            type: "warning",
            title: this.langService.words().POPUP.WARNING_DELETE_PROJECT_TITLE,
            body: this.langService.words().POPUP.WARNING_DELETE_PROJECT_BODY,
            isConfirmation: true,
            actionType: "delete-project"
        });
    }

    @HostListener('window:global-popup-confirm', ['$event'])
    public handlePopupConfirm(event: Event): void {
        const customEvent = event as CustomEvent<{ actionType: string }>
        const currentAction = customEvent.detail.actionType;

        this.popupService.close(); 

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
                    
                    this.popupService.show({
                        type: "success",
                        title: this.langService.words().POPUP.SUCCESS_INVITATION_DECLINED_TITLE,
                        body: this.langService.words().POPUP.SUCCESS_INVITATION_DECLINED_BODY,
                        isConfirmation: false,
                        actionType: "invitation-declined"
                    });
                }, 
                error: (err: HttpErrorResponse) => {
                    console.error("Could not decline invitation", err);
                    this.pendingDeclineInvitationId = null;

                    const serverMessage = err.error && typeof err.error === 'object' && 'message' in err.error
                        ? (err.error as { message: string }).message
                        : null;

                    this.popupService.show({
                        type: "danger",
                        title: this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                        body: serverMessage || this.langService.words().POPUP.ERROR_INVITATION_DECLINE_FAILED_BODY,
                        isConfirmation: false,
                        actionType: "error-dismiss"
                    });
                }
            });
        }
    }

    // Method to dynamically replace our dictionary tokens to include a value!
    public formatLabel(template: string, value: string): string {
        return template.replace(/\{[a-zA-Z0-9_]+\}/, value);    // not needed here?
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

    // Angular CDK drag-and-drop handler for Project Cards
    public onProjectCardDropTrigger(event: CdkDragDrop<ProjectItem[]>): void {
        // 1. Shuffling locally within the same canvas grid row
        moveItemInArray(
            this.projects,
            event.previousIndex,
            event.currentIndex
        );

        this.cdr.detectChanges();

        // 2. Map current order into a clean list of sequential primary identifiers
        const orderedProjectIds = this.projects.map(proj => proj.id);

        // 3. Persist the array sequence securely to the C# Backend Database Profile via network
        this.projectService.updateUserProjectPreferences(orderedProjectIds).subscribe({
            next: () => {
                console.log("Personalized dashboard order updated successfully.");
            },
            error: (err: HttpErrorResponse) => {
                console.error("Failed to synchronize project order preference: ", err);
                // Fallback: reload original data state if the network mutation rejected 
                this.loadProjects();
            }
        });
    }

    private sortProjectsByPreference(projects: ProjectItem[], preferenceIds: number[]): ProjectItem[] {
        if (!preferenceIds || preferenceIds.length === 0) return projects;

        return projects.sort((a, b) => {
            const indexA = preferenceIds.indexOf(a.id);
            const indexB = preferenceIds.indexOf(b.id);

            // If an entry is missing from preferenceIds cache list, append to the bottom
            const posA = indexA === -1 ? Infinity : indexA;
            const posB = indexB === -1 ? Infinity : indexB;

            return posA - posB;
        });
    }
}
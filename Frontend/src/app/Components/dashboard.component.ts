import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, isPlatformBrowser } from "@angular/common";
import { ProjectService } from "../Services/project.service";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { LanguageService } from "../i18n/language.service";
import { PopupComponent } from "./popup.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, RouterLink, PopupComponent],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
    private projectService = inject(ProjectService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);
    private authService = inject(AuthService);

    projects: any[] = [];
    newProject = { name: '', description: '' };

    private pendingDeleteProjectId: number | null = null;

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
                next: () => this.loadProjects(),
                error: (err: any) => {
                    console.error("Identity check pending on reload, trying fallback...", err);
                    this.loadProjects();
                }
            })
        }
    }

    loadProjects(): void {
        // Defensive check: If there is no token in the browser, stop immediately and don't call the the API!
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if(!token) return; // Stop completely if no token exists
        
        this.projectService.getMyProjects().subscribe({
            next: (data: any[]) => { 
                this.projects = data; 
                this.cdr.detectChanges(); // Instantly refresh the cards so they show up immidetly after login!
            },
            error: (err) => console.error('Could not fetch projects', err)
        });
    }

    onCreateProject(): void {
        this.projectService.createProject(this.newProject).subscribe({
            next: () => {
                this.newProject = { name: '', description: '' }; // Clear fields
                this.loadProjects(); // Instantly refresh layout card list view!
            },
            error: (err) => console.error('Failed to create a project!', err)
        });
    }

    onLogout(): void {
        if(isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            this.router.navigate(['/login']);
        }
    }

    onDeleteProject(projectId: number, event: Event): void {
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

    handlePopupConfirm(): void {
        const currentAction = this.popupConfig.actionType;
        this.closePopup(); 

        if (currentAction === "delete-project" && this.pendingDeleteProjectId !== null) {
            this.projectService.deleteProject(this.pendingDeleteProjectId).subscribe({
                next: () => {
                    this.pendingDeleteProjectId = null; // Flush cache identifier
                    this.loadProjects();
                },
                error: (err) => {
                    this.pendingDeleteProjectId = null;
                    console.error("Failed to delete project:", err);
                }
            });
        }
    }

    showPopup(type: "success" | "warning" | "danger", title: string, body: string, isConfirmation: boolean, actionType: string): void {
        this.popupConfig = { visible: true, type, title, body, isConfirmation, actionType };
        this.cdr.detectChanges();
    }

    closePopup(): void {
        this.popupConfig.visible = false;
        this.cdr.detectChanges();
    }

    // Trigger method for when changing languages
    onLanguageChangeEngineTrigger(newLang: string): void {
        if (this.langService) {
            this.langService.setLanguage(newLang);
        }
    }

    // Method to dynamically replace our dictionary tokens to include a value!
    formatLabel(template: string, value: string): string {
        return template.replace('{title}', value);
    }
}
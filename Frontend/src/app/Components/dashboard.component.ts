import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, isPlatformBrowser } from "@angular/common";
import { ProjectService } from "../Services/project.service";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, RouterLink],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
    private projectService = inject(ProjectService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);

    projects: any[] = [];
    newProject = { name: '', description: '' };

    ngOnInit(): void {
        // Only trigger initial project load if we are fully inside the browser
        if(isPlatformBrowser(this.platformId)) {
            this.loadProjects();
            this.cdr.detectChanges();
        }
    }

    loadProjects(): void {
        // Defensive check: If there is no token in the browser, stop immediately and don't call the the API!
        const token = localStorage.getItem('token');
        if(!token) return; // Stop completely if no token exists
        
        this.projectService.getMyProjects().subscribe({
            next: (data: any[]) => { 
                this.projects = data; 
                this.cdr.detectChanges(); // Instantly refresh the cards so they show up immidetly after login!
            },
            error: (err) => { console.error('Could not fetch projects', err); }
        });
    }

    onCreateProject(): void {
        this.projectService.createProject(this.newProject).subscribe({
            next: (response) => {
                this.newProject = { name: '', description: '' }; // Clear fields
                this.loadProjects(); // Instantly refresh layout card list view!
            },
            error: (err) => { console.error('Failed to create a project!', err); }
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

        if(confirm("Are you sure you want to delete this project and all its associated tasks?")) {
            this.projectService.deleteProject(projectId).subscribe({
                next: () => {
                    this.loadProjects(); // Reloads the project grid layout automatically
                },
                error: (err) => console.error("Failed to delete project:", err)
            });
        }
    }
}
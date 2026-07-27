import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, NgClass, DatePipe, isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { TaskService } from "../Services/task.service";
import { ProjectService } from "../Services/project.service";
import { AuthService } from "../Services/auth.service";
import { CategoryService } from "../Services/category.service";
import { error } from "console";

@Component({
    selector: 'app-task-board',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, NgClass, RouterLink, DatePipe],
    templateUrl: "./task-board.component.html",
    styleUrl: "./task-board.component.css"
})
export class TaskBoardComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private taskService = inject(TaskService);
    private projectService = inject(ProjectService);
    private cdr = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);
    private authService = inject(AuthService);
    private categoryService = inject(CategoryService);

    projectId!: number; // Here we basically declare "projectId" but don't assign anything to it yet (null) but because TypeScript restricts use of variables that are declared but aren't assigned anything immediately afterwards, we put an "!" after the name to basically tell TypeScript "Trust me, I know what I'm doing by not assigning anything to 'projectId' right now, but I promise it will absolutely have a number inside it before the HTML page tries to read it!"
    isModalOpen = false; // Tracks whether form window is visible

    // Split our fetched tasks into specific arrays for each column mapping. Also raw records from backend database
    pendingTasks: any[] = [];
    inProgressTasks: any[] = [];
    completedTasks: any[] = [];

    // Dynamic sub-arrays rendered on screen layout
    filteredPendingTasks: any[] = [];
    filteredInProgressTasks: any[] = [];
    filteredCompletedTasks: any[] = [];

    // Live input binding tracking values
    searchQuery: string = '';
    selectedPriority: string = 'All';
    completionPercentage: number = 0;

    // Tracks properties typed into form fields matching TaskCreateDto.cs fields exactly
    newTask = { 
        title: '', 
        description: '', 
        priority: 'Medium', 
        deadline: '', 
        projectId: 0 
    };

    // "Add new member" related values
    inviteEmail: string = "";
    inviteRole: string = "Member"; // Defaults to regular Member assignment 

    currentUserId!: number;

    // Dynamic title string with a gaming twist! :D
    projectTitle: string = "";
    
    currentUserProjectRole: string = "";

    // Array to hold our teammate info
    projectMembers: any[] = [];

    // Array to store our category tasks
    projectCategories: any[] = [];

    // Task category related properties 
    isCategoryModalOpen: boolean = false;
    newCategoryName: string = "";
    newCategoryColor: string = "#3182ce"; // Default category color is blue!
    ngOnInit(): void {
        // Read the dynamic route context param parameter safely
        this.route.params.subscribe(params => {
            this.projectId = +params['id']; // The '+' trick converts the URL string context to a real Number!

            // Ensure we are running inside a browser window environment safely
            if(this.projectId && isPlatformBrowser(this.platformId)) {
                this.projectTitle = "Now Loading...";
                this.currentUserProjectRole = "Loading...";

                // Load identity above first and then load the assets
                this.loadBoardRequirements();
            }
        });

        this.projectId = Number(this.route.snapshot.paramMap.get("id"));
        this.loadUserRole();
    }
    
    loadBoardRequirements(): void {
        this.authService.getUserProfile().subscribe({
            next: (data: any) => {
                this.currentUserId = Number(data.id);
                this.loadTasks();
                this.loadUserRole();
                this.loadProjectDetails(); // Fetches the real project title
                this.loadProjectMembers(); 
                this.loadProjectCategories();
            },
            error: (err: any) => {
                console.error("Critical board init failure:", err);
                // Fallback load so the screen doesn't completely freeze on network hiccups
                this.loadTasks();
                this.loadUserRole();
                this.loadProjectDetails();
                this.loadProjectMembers(); 
                this.loadProjectCategories();
            }
        })
    }

    loadTasks(): void {
        this.taskService.getProjectTasks(this.projectId).subscribe({
            next: (response: any) => {                
                // Intercept and extract the role metadata sent from backend
                this.currentUserProjectRole = response.role;

                // Extract the actual tasks array safely out of the data envelope wrapper
                const allTasks = response.tasks || [];

                // Parse and map array buckets perfectly filtering on TaskItem.cs status properties
                // 1. Separate items by status
                this.pendingTasks = allTasks.filter((t: any) => t.status === "Pending");
                this.inProgressTasks = allTasks.filter((t: any) => t.status === "In Progress" || t.status === "Review Required");
                this.completedTasks = allTasks.filter((t: any) => t.status === "Completed");

                // 2. Compute completion metrics right away
                this.calculateProgress(allTasks);

                // 3. Render filtered items immediately
                this.applyFilters();

                //4. Save our new team array
                this.projectMembers = response.team || [];

                this.cdr.detectChanges(); // Force rendering updates instantly!
            },
            error: (err: any) => console.error('Failed to get tasks for this project board!', err)
        });
    }

    onUpdateStatus(taskId: number, newStatus: string): void {
        this.taskService.updateTaskStatus(taskId, newStatus).subscribe({
            next: () => {
                this.loadTasks(); // Instantly reload layout lists with new tracking statuses
            },
            error: (err) => console.error('Failed to update task status tracking context!', err)
        });
    }

    onDeleteTask(taskId: number): void {
        // A quick browser pop-up confirmation to prevent accidental clicks
        if(confirm("Are you sure you want to delete this task completely?")) {
            this.taskService.deleteTask(taskId).subscribe({
                next: () => {
                    this.loadTasks(); // Instantly reload columns to remove the deleted card
                },
                error: (err) => {
                    console.error("Failed to delete task item!", err);

                    if(err.status === 403) {
                        alert("🛑 Access Denied!\nOnly the project Owner has permission to delete workspace items.");
                    } else {
                        alert("Failed to complete task deletion. Please try again.")
                    }
                }
            });
        }
    }

    // Prepare our form model structure before opening overlay container view
    openModal(): void {
        this.newTask = { title: '', description: '', priority: 'Medium', deadline: '', projectId: this.projectId };
        this.isModalOpen = true;
    }

    closeModal(): void { this.isModalOpen = false; }

    // If deadline is an empty string, turn it to null so .NET backend dates parse perfectly
    onCreateTask(): void {
        if(this.newTask.deadline === '') {
            (this.newTask as any).deadline = null;
        }

        this.taskService.createTask(this.newTask).subscribe({
            next: () => {
                this.closeModal();
                this.loadTasks(); // Refreshes columns immediately to reveal new task item!
            },
            error: (err) => console.error("Failed to execute task item database storage request", err)
        });
    }

    applyFilters(): void {
        const filterFn = (task: any) => {
            const matchesSearch = task.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesPriority = this.selectedPriority === 'All' || task.priority === this.selectedPriority;
            return matchesSearch && matchesPriority;
        };

        this.filteredPendingTasks = this.pendingTasks.filter(filterFn);
        this.filteredInProgressTasks = this.inProgressTasks.filter(filterFn);
        this.filteredCompletedTasks = this.completedTasks.filter(filterFn);
    }

    calculateProgress(allTasks: any[]): void {
        if(!allTasks || allTasks.length === 0) {
            this.completionPercentage = 0;
            return;
        }

        const total = allTasks.length;
        const completedCount = allTasks.filter(t => t.status === "Completed").length;
        this.completionPercentage = Math.round((completedCount / total) * 100);
    }

    onInviteUser(): void {
        if(!this.inviteEmail) {
            alert("Validation Alert: Please type a valid email address first!");
            return;
        }

        const payload = {
            InvitedEmail: this.inviteEmail,
            ProjectRole: this.inviteRole
        };

        this.projectService.inviteMemberToProject(this.projectId, payload).subscribe({
            next: (res: any) => {
                alert(res.message || "Teammate successfully mapped into this project room!");
                this.inviteEmail = ""; // Clear out the text input field box on success
                this.inviteRole = "Member"; // Snap the selector dropdown back to default member status!
            },
            error: (err: any) => {
                console.error("Invitation process failure:", err);
                alert(err.error?.message || "Failed to complete member assignment.");
            }
        });
    }

    loadUserRole(): void {
        if(isPlatformBrowser(this.platformId)) {
            // Token check from both session and local storages!
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if(!token) {
                console.warn("No active authorization token discovered. Redirecting...");
                this.router.navigate(["/login"]);
                return;
            };

            this.projectService.getProjectRole(this.projectId).subscribe({
                next: (response: any) => { 
                    if(response && response.role) {
                        this.currentUserProjectRole = response.role;
                    } else {
                        this.currentUserProjectRole = "Member";
                    }
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.error("Failed to resolve project permissions layout:", err);
                    this.currentUserProjectRole = "Member";
                    this.cdr.detectChanges();
                }
            });
        }
    }

    loadProjectDetails(): void {
        this.projectService.getProjectById(this.projectId).subscribe({
            next: (project: any) => {
                this.projectTitle = project.name;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error("Could not retrieve project data payload:", err);
                this.projectTitle = "Project Board";
                this.cdr.detectChanges();
            }
        });
    }

    loadProjectMembers(): void {
        this.projectService.getProjectMembers(this.projectId).subscribe({
            next: (members: any[]) => {
                this.projectMembers = members;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error("Failed to retrieve project member roster layout:", err);
            }
        });
    }

    onAssignUser(taskId: number, selectedValue: any): void {
        const userId = selectedValue === "null" || selectedValue === null ? null : Number(selectedValue);
        this.taskService.assignTask(taskId, userId).subscribe({
            next: (res: any) => {
                console.log("Assignment updated successfully:", res.message);
                this.loadTasks();
            },
            error: (err: any) => {
                console.error("Failed to update task assignment row:", err);
            }
        });
    }

    loadCurrentUserId(): void {
        this.authService.getUserProfile().subscribe({
            next: (data: any) => {
                this.currentUserId = Number(data.id);
                this.cdr.detectChanges();
            },
            error: (err: any) => {
                console.error("Could not resolve current user payload identity:", err);
            }
        });
    }

    onCreateCategorySubmit(): void {
        const payload = {
            name: this.newCategoryName.trim(),
            colorHex: this.newCategoryColor
        };

        this.categoryService.createCategory(this.projectId, payload).subscribe({
            next: (res: any) => {
                console.log("Category created successfully!", res.message);
                this.isCategoryModalOpen = false;
                this.newCategoryName = ""; // Reset form parameter field input
                this.loadProjectCategories();
            },
            error: (err: any) => console.error("Failed to submit category creation:", err)
        });
    }

    loadProjectCategories(): void {
        this.categoryService.getProjectCategories(this.projectId).subscribe({
            next: (data: any[]) => {
                this.projectCategories = data;
                this.cdr.detectChanges();
            },
            error: (err: any) => console.error("Could not parse project tags list:", err)
        });
    }

    onAssignCategory(taskId: number, selectedValue: any): void {
        const categoryId = selectedValue === "null" || selectedValue === null ? null: Number(selectedValue);

        this.taskService.assignTaskCategory(taskId, categoryId).subscribe({
            next: (res: any) => {
                console.log("Task category updated successfully:", res.message);
                this.loadTasks(); // Instantly reloads to display our colorful task card tags!
            },
            error: (err: any) => console.error("Failed to update task category reference:", err)
        });
    }
}
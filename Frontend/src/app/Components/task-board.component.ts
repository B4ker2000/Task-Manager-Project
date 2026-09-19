import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID, ElementRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf, NgClass, DatePipe, isPlatformBrowser } from "@angular/common";
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { TaskService } from "../services/task.service";
import { ProjectService } from "../services/project.service";
import { AuthService } from "../services/auth.service";
import { CategoryService } from "../services/category.service";
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { LanguageService } from "../i18n/language.service";
import { LocalizeNumberPipe } from "../i18n/localize-number.pipe";
import { PopupComponent } from "./popup.component";

@Component({
    selector: 'app-task-board',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, NgClass, RouterLink, DatePipe, DragDropModule, LocalizeNumberPipe, PopupComponent],
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

    private projectId!: number; // Here we basically declare "projectId" but don't assign anything to it yet (null) but because TypeScript restricts use of variables that are declared but aren't assigned anything immediately afterwards, we put an "!" after the name to basically tell TypeScript "Trust me, I know what I'm doing by not assigning anything to 'projectId' right now, but I promise it will absolutely have a number inside it before the HTML page tries to read it!"
    public isModalOpen = false; // Tracks whether form window is visible

    // Split our fetched tasks into specific arrays for each column mapping. Also raw records from backend database
    public pendingTasks: any[] = [];
    public inProgressTasks: any[] = [];
    public completedTasks: any[] = [];

    // Dynamic sub-arrays rendered on screen layout
    public filteredPendingTasks: any[] = [];
    public filteredInProgressTasks: any[] = [];
    public filteredCompletedTasks: any[] = [];

    // Live input binding tracking values
    public searchQuery: string = '';
    public selectedPriority: string = 'All';
    public completionPercentage: number = 0;

    // Tracks properties typed into form fields matching TaskCreateDto.cs fields exactly
    public newTask = { 
        title: '', 
        description: '', 
        priority: 'Medium', 
        deadline: '', 
        projectId: 0 
    };

    // "Add new member" related values
    public inviteEmail: string = "";
    public inviteRole: string = "Member"; // Defaults to regular Member assignment 

    public currentUserId!: number;

    // Dynamic title string with a gaming twist! :D
    public projectTitle: string = "";
    
    public currentUserProjectRole: string = "";

    // Array to hold our teammate info
    public projectMembers: any[] = [];

    // Array to store our category tasks
    public projectCategories: any[] = [];

    // Task category related properties 
    public isCategoryModalOpen: boolean = false;
    public newCategoryName: string = "";
    public newCategoryColor: string = "#3182ce"; // Default category color is Electric Blue!

    // Filter by category related property
    public selectedCategory: string = "All";

    // Vertical screen related properity
    public activeMobileColumn: string = 'Pending'; // Default view lane tracking 
    public isMobileView: boolean = false;

    // Modal focus related
    @ViewChild('taskModalHeader') public taskModalHeader!: ElementRef<HTMLHeadingElement>;
    @ViewChild('tagModalHeader') public tagModalHeader!: ElementRef<HTMLHeadingElement>;
    @ViewChild('createTaskBtn') public createTaskBtn!: ElementRef<HTMLButtonElement>
    @ViewChild('createTagBtn') public createTagBtn!: ElementRef<HTMLButtonElement>

    private pendingDeleteTaskId: number | null = null; 
    private pendingDeleteCategoryId: number | null = null;
    private pendingRemoveMemberId: number | null = null;
    private pendingLeavingMemberId: number | null = null;

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
        // Read the dynamic route context param parameter safely
        this.route.params.subscribe(params => {
            this.projectId = +params['id']; // The '+' trick converts the URL string context to a real Number!

            // Ensure we are running inside a browser window environment safely
            if(this.projectId && isPlatformBrowser(this.platformId)) {
                this.projectTitle = this.langService.words().GLOBAL.GENERIC_LOADING;
                this.currentUserProjectRole = this.langService.words().GLOBAL.GENERIC_LOADING;

                // Mobile view state update
                this.updateMobileViewState();
                window.addEventListener('resize', this.updateMobileViewState);

                // SECURITY TOKEN CHECK GATEWAY: Prevents unauthorized empty requests on reload!
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                if(token) {
                    // Load identity above first and then load the assets
                    this.loadBoardRequirements();
                } else {
                    console.warn("Security token missing on mount, redirecting to login entrance room...");
                    this.router.navigate(['/login']);
                }
                this.cdr.detectChanges();
            }
        });

        if(!this.projectId && isPlatformBrowser(this.platformId)) {
            const snapshotId = this.route.snapshot.paramMap.get('id');
            if(snapshotId) {
                this.projectId = Number(snapshotId);
                this.loadBoardRequirements();
                this.cdr.detectChanges();
            }
        }
    }
    
    private loadBoardRequirements(): void {
        this.authService.getUserProfile().subscribe({
            next: (data: any) => {
                this.currentUserId = Number(data.id);
                this.taskService.getProjectTasks(this.projectId).subscribe({
                    next: (boardData: any) => {
                        // Lock the permission status string safely first
                        this.currentUserProjectRole = boardData.role;

                        // Sort task card buckets
                        const allTasks = boardData.tasks || [];
                        this.pendingTasks = allTasks.filter((t: any) => t.status === "Pending");
                        this.inProgressTasks = allTasks.filter((t: any) => t.status === "In Progress" || t.status === "Review Required");
                        this.completedTasks = allTasks.filter((t: any) => t.status === "Completed");

                        // Overwrite crew roster with data straight from our combined response payload packet!
                        // this.projectMembers = boardData.team || [];
                        this.loadProjectMembers();

                        // Compute analytics progress scales and filter views
                        this.calculateProgress(allTasks);
                        this.applyFilters();

                        // Force single, perfect structural rendering paint pass
                        this.cdr.detectChanges();
                    },
                    error: (err: any) => console.error("Failed to map board asset matrices:", err)
                });
                this.loadProjectDetails(); // Fetches the real project title
                this.loadProjectCategories();
            },
            error: (err: any) => {
                console.error("Critical refresh validation gate failure, firing fallbacks:", err);
                // Fallback load so the screen doesn't completely freeze on network hiccups
                this.loadProjectDetails();
                this.loadProjectCategories();
            }
        });
    }

    private loadTasks(): void {
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

    public onUpdateStatus(taskId: number, newStatus: string, skipNetworkReload: boolean = false): void {
        this.taskService.updateTaskStatus(taskId, newStatus).subscribe({
            next: () => {
                if(!skipNetworkReload) {
                    this.loadTasks(); // Instantly reload layout lists with new tracking statuses
                }
            },
            error: (err) => console.error('Failed to update task status tracking context!', err)
        });
    }

    public onDeleteTask(taskId: number): void {
        this.pendingDeleteTaskId = taskId;
        
        // A quick pop-up confirmation to prevent accidental clicks!
        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_DELETE_TASK_TITLE,
            this.langService.words().POPUP.WARNING_DELETE_TASK_BODY,
            true,
            "delete-task"
        );
    }
        
    public handlePopupConfirm(): void {
        const currentAction = this.popupConfig.actionType;
        this.closePopup();

        if (currentAction === "delete-task" && this.pendingDeleteTaskId !== null) {
            this.taskService.deleteTask(this.pendingDeleteTaskId).subscribe({
                next: () => {
                    this.pendingDeleteTaskId = null;
                    this.loadTasks(); // Instantly reload columns to remove the deleted card
                },
                error: (err) => {
                    this.pendingDeleteTaskId = null;
                    console.error("Failed to delete task item!", err);

                    if (err.status === 403) {
                        this.showPopup(
                            "danger",
                            this.langService.words().POPUP.DANGER_ACCESS_DENIED_TITLE,
                            this.langService.words().POPUP.DANGER_TASK_DELETE_ACCESS_DENIED_BODY,
                            false,
                            "error-dismiss"
                        );
                    } else {
                        this.showPopup(
                            "danger",
                            this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                            this.langService.words().POPUP.ERROR_TASK_DELETE_BODY,
                            false,
                            "error-dismiss"
                        );
                    }
                }
            });
        } else if (currentAction === "delete-category" && this.pendingDeleteCategoryId !== null) {
            this.categoryService.deleteCategory(this.projectId, this.pendingDeleteCategoryId).subscribe({
                next: (res: any) => {
                    this.pendingDeleteCategoryId = null;
                    console.log("Category tag expunged successfully:", res.message);
                    // Refresh tags tray and task board arrays immediately on the fly!
                    this.loadProjectCategories();
                    this.loadTasks();
                },
                error: (err: any) => {
                    this.pendingDeleteCategoryId = null;
                    console.error("Failed to delete workspace tag row:", err);
                    this.showPopup(
                        "danger",
                        this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                        this.langService.words().POPUP.ERROR_TASK_DELETE_BODY,
                        false,
                        "error-dismiss"
                    );
                }
            });
        } else if (currentAction === "remove-member" && this.pendingRemoveMemberId !== null) {
            this.projectService.removeProjectMember(this.projectId, this.pendingRemoveMemberId).subscribe({
                next: (res: any) => {
                    this.pendingRemoveMemberId = null;
                    console.log("Roster update executed successfully:", res.message);
                    // Refresh your dashboard panel lists immediately on the fly!
                    this.loadProjectMembers();
                    this.loadTasks();
                },
                error: (err: any) => {
                    this.pendingRemoveMemberId = null;
                    console.error("Failed to execute member removal:", err);
                    this.showPopup(
                        "danger",
                        this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                        this.langService.words().POPUP.ERROR_TASK_DELETE_BODY,
                        false,
                        "error-dismiss"
                    );
                }
            });
        } else if (currentAction === "leave-project" && this.pendingLeavingMemberId !== null) {
            this.projectService.removeProjectMember(this.projectId, this.pendingLeavingMemberId).subscribe({
                next: (res: any) => {
                    this.pendingLeavingMemberId = null;
                    console.log("Resignation sequence tracking successful:", res.message);
                    // Redirect the user straight back to their main clean dashboard portal room!
                    this.router.navigate(['/dashboard']);
                },
                error: (err: any) => {
                    this.pendingLeavingMemberId = null;
                    const errorMsg = err.error?.message || this.langService.words().POPUP.ERROR_SOLE_OWNER_BODY;
                    this.showPopup(
                        "danger",
                        this.langService.words().POPUP.DANGER_ACCESS_DENIED_TITLE,
                        errorMsg,
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

    // Prepare our form model structure before opening overlay container view
    public openModal(): void {
        this.newTask = { title: '', description: '', priority: 'Medium', deadline: '', projectId: this.projectId };
        this.isModalOpen = true;

        // Wait exactly one microsecond for Angular to draw the HTML element, then force focus on ```taskModalHeader```!
        setTimeout(() => {
            if (this.taskModalHeader) {
                this.taskModalHeader.nativeElement.focus();
            }
        }, 50);
    }

    public closeModal(): void { 
        this.isModalOpen = false; 

        setTimeout(() => {
            if (this.createTaskBtn) {
                this.createTaskBtn.nativeElement.focus();
                console.log("Accessibility Core successfully restored focus to Create Task trigger.");
            }
        }, 50);
    }

    // If deadline is an empty string, turn it to null so .NET backend dates parse perfectly
    public onCreateTask(): void {
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

    public applyFilters(): void {
        const filterFn = (task: any) => {
            const matchesSearch = task.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesPriority = this.selectedPriority === 'All' || task.priority === this.selectedPriority;

            let matchesCategory = true;
            if(this.selectedCategory !== "All") {
                if(this.selectedCategory === "Null") {
                    matchesCategory = task.categoryId === null || task.categoryId === undefined;
                } else {
                    matchesCategory = task.categoryId !== null && task.categoryId !== undefined && Number(task.categoryId) === Number(this.selectedCategory);
                }
            }
            
            return matchesSearch && matchesPriority && matchesCategory;
        };

        this.filteredPendingTasks = this.pendingTasks.filter(filterFn);
        this.filteredInProgressTasks = this.inProgressTasks.filter(filterFn);
        this.filteredCompletedTasks = this.completedTasks.filter(filterFn);

        this.cdr.detectChanges();
    }

    private calculateProgress(allTasks: any[]): void {
        if(!allTasks || allTasks.length === 0) {
            this.completionPercentage = 0;
            return;
        }

        const total = allTasks.length;
        const completedCount = allTasks.filter(t => t.status === "Completed").length;
        this.completionPercentage = Math.round((completedCount / total) * 100);
    }

    public onInviteUser(): void {
        if (!this.inviteEmail.trim()) {
            this.showPopup(
                "warning",
                this.langService.words().POPUP.WARNING_INVALID_EMAIL_INPUT_TITLE,
                this.langService.words().POPUP.WARNING_INVALID_EMAIL_INPUT_BODY,
                false,
                "invalid-email"
            );
            return;
        }

        const payload = {
            InvitedEmail: this.inviteEmail,
            ProjectRole: this.inviteRole
        };

        this.projectService.createInvitation(this.projectId, payload).subscribe({
            next: (res: any) => {
                this.inviteEmail = ""; // Clear out the text input field box on success
                this.inviteRole = "Member"; // Snap the selector dropdown back to default member status!
                this.loadProjectMembers();
                this.loadTasks();

                this.showPopup(
                    "success",
                    this.langService.words().POPUP.SUCCESS_INVITATION_SENT_TITLE,
                    this.langService.words().POPUP.SUCCESS_INVITATION_SENT_BODY,
                    false,
                    "invitation-created"
                );
            },
            error: (err: any) => {
                console.error("Invitation process failure:", err);

                const msg = err.error?.message || this.langService.words().POPUP.ERROR_INVITE_FAILED_BODY;

                this.showPopup(
                    "danger",
                    this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                    msg,
                    false,
                    "error-dismiss"
                );
            }
        });
    }

    private loadProjectDetails(): void {
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

    private loadProjectMembers(): void {
        this.projectService.getProjectMembers(this.projectId).subscribe({
            next: (members: any[]) => {
                // Custom weight mapper that ranks member based on their roles in this order: Owners -> Members -> Viewers
                const roleWeights: Record<string, number> = { 
                    'owner': 1, 
                    'member': 2, 
                    'viewer': 3 
                };

                this.projectMembers = [...members].sort((a, b) => {
                    const roleA = (a.projectRole || a.ProjectRole || '').toString().toLowerCase().trim();
                    const roleB = (b.projectRole || b.ProjectRole || '').toString().toLowerCase().trim();
                    
                    const weightA = roleWeights[roleA] || 99;
                    const weightB = roleWeights[roleB] || 99;

                    return weightA - weightB;   // Ascending order layout sorting
                });

                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error("Failed to retrieve project member roster layout:", err);
            }
        });
    }

    public onAssignUser(taskId: number, selectedValue: any): void {
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

    private loadCurrentUserId(): void {
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

    private loadProjectCategories(): void {
        this.categoryService.getProjectCategories(this.projectId).subscribe({
            next: (data: any[]) => {
                this.projectCategories = data;
                this.cdr.detectChanges();
            },
            error: (err: any) => console.error("Could not parse project tags list:", err)
        });
    }

    public onAssignCategory(taskId: number, selectedValue: any): void {
        const categoryId = selectedValue === "null" || selectedValue === null ? null: Number(selectedValue);

        this.taskService.assignTaskCategory(taskId, categoryId).subscribe({
            next: (res: any) => {
                console.log("Task category updated successfully:", res.message);
                this.loadTasks(); // Instantly reloads to display our colorful task card tags!
            },
            error: (err: any) => console.error("Failed to update task category reference:", err)
        });
    }

    public getTaskCountByCategory(categoryId: number): number {
        // Merge the active columns into a single flat array to count matching category keys
        const totalCurrentBoardTasks = [...this.pendingTasks, ...this.inProgressTasks, ...this.completedTasks];
        return totalCurrentBoardTasks.filter(t => t.categoryId === categoryId).length;
    }

    public onDeleteCategoryClick(categoryId: number, categoryName: string): void {
        this.pendingDeleteCategoryId = categoryId;
        
        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_DELETE_CATEGORY_TITLE,
            this.langService.words().POPUP.WARNING_DELETE_CATEGORY_BODY_PART_1 + `'${categoryName}'` + this.langService.words().POPUP.WARNING_DELETE_CATEGORY_BODY_PART_2,
            true,
            "delete-category"
        );
    }

    public openCategoryModal(): void {
        this.newCategoryName = "";
        this.newCategoryColor = "#3182ce";
        this.isCategoryModalOpen = true;

        // This will switch the screen reader focus to ```tagModalHeader```
        setTimeout(() => {
            if (this.tagModalHeader) {
                this.tagModalHeader.nativeElement.focus();
            }
        }, 50);
    }

    public closeCategoryModal(): void {
        this.isCategoryModalOpen = false;

        setTimeout(() => {
            if (this.createTagBtn) {
                this.createTagBtn.nativeElement.focus();
                console.log("Accessibility Core successfully restored focus to Create Tag trigger.")
            }
        }, 50);
    }

    public onCreateCategorySubmit(): void {
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

    public onRemoveMemberClick(targetUserId: number, targetEmail: string): void {
        this.pendingRemoveMemberId = targetUserId

        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_REMOVE_MEMBER_TITLE,
            this.langService.words().POPUP.WARNING_REMOVE_MEMBER_BODY_PART_1 + `${targetEmail}` + this.langService.words().POPUP.WARNING_REMOVE_MEMBER_BODY_PART_2,
            true,
            "remove-member"
        );
    }

    public onLeaveProjectClick(): void {
        this.pendingLeavingMemberId = this.currentUserId;

        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_LEAVE_PROJECT_TITLE,
            this.langService.words().POPUP.WARNING_LEAVE_PROJECT_BODY,
            true,
            "leave-project"
        );
    }

    // Method to hide category select drop down menu
    public hideCategorySelect(task: any): boolean {
        return this.currentUserProjectRole === 'Owner' || task.assignedUserId === this.currentUserId;
    }

    // Angular CDK drag-and-drop master event router interceptor
    public onTaskCardDropTrigger(event: CdkDragDrop<any[]>): void {
        const targetTaskItem = event.previousContainer.data[event.previousIndex];
        if(!targetTaskItem) return;

        // Resolve string identifiers for origin and destination columns 
        const sourceLaneId = event.previousContainer.id;
        const targetLaneId = event.container.id;

        // Determine the baseline status token string matching the landing column zone
        let computedDatabaseStatusString = targetTaskItem.status;
        if(targetLaneId === "pendingLaneList") computedDatabaseStatusString = "Pending";
        if(targetLaneId === "inProgressLaneList") computedDatabaseStatusString = "In Progress";
        if(targetLaneId === "completedLaneList") computedDatabaseStatusString = "Completed";

        // Permission checks for easy reading
        const isOwner = this.currentUserProjectRole === "Owner";
        const isAssignee = targetTaskItem.assignedUserId === this.currentUserId;
        
        // =========================================================================
        // PERMISSION GATE 1: THE DYNAMIC SELF-DROP PROGRESS/REVIEW TOGGLE SWITCH
        // =========================================================================
        if (sourceLaneId === targetLaneId && targetLaneId === "inProgressLaneList") {
            // SECURITY: Block regular users from toggling cards that are NOT assigned to them!
            if(!isOwner && !isAssignee) {
                this.showPopup(
                    "danger",
                    this.langService.words().POPUP.DANGER_ACCESS_DENIED_TITLE,
                    this.langService.words().POPUP.DANGER_UNAUTHORIZED_TASK_ACCESS,
                    false,
                    "unauthorized-access"
                );
                return;
            }

            let nextState = targetTaskItem.status;
            if(targetTaskItem.status === "In Progress") {
                nextState = "Review Required";
            } else if(targetTaskItem.status === "Review Required" && isOwner) {
                nextState = "In Progress";      // PM rejects/returns request
            } else if(targetTaskItem.status === "Review Required" && !isOwner && isAssignee) {
                nextState = "In Progress";      // Assignee cancels their own pending review request safely!
            }

            if(nextState !== targetTaskItem.status) {
                targetTaskItem.status = nextState;
                this.onUpdateStatus(targetTaskItem.id, nextState);
                this.cdr.detectChanges();
            }
            return;
        }

        // Standard local row index swapping slot handler fallback if shuffling within same columns (excluding middle lane)
        if(sourceLaneId === targetLaneId) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.cdr.detectChanges();
            return;
        }

        // =========================================================================
        // PERMISSION GATE 2: CROSS-COLUMN MOVEMENT BOUNDARY OUTWRITING SECURITY
        // =========================================================================
        
        // RULE A: Absolute lock on the Completed Column lane! Only Project Managers can approve tasks.
        if(computedDatabaseStatusString === "Completed" && !isOwner) {
            this.showPopup(
                "danger",
                this.langService.words().POPUP.DANGER_ACCESS_DENIED_TITLE,
                this.langService.words().POPUP.DANGER_UNAUTHORIZED_TASK_APPROVE,
                false,
                "unauthorized-approve"
            );
            return;
        }

        // RULE B: Prevent regular members from grabbing or picking up unassigned work items entirely.
        if(!isOwner && !isAssignee) {
                this.showPopup(
                    "danger",
                    this.langService.words().POPUP.DANGER_ACCESS_DENIED_TITLE,
                    this.langService.words().POPUP.DANGER_UNAUTHORIZED_TASK_ACCESS,
                    false,
                    "unauthorized-access"
                );
                return;
            }

        // RULE C: If a regular member drags their card from 'Pending' into 'In Progress', force it to 'In Progress'
        // and strip any old historical 'Review Required' flags seamlessly.
        if(computedDatabaseStatusString === "In Progress" && !isOwner) {
            computedDatabaseStatusString = "In Progress";
        }

        // =========================================================================
        // TRANSACTION EXECUTION FLUSH
        // =========================================================================
        targetTaskItem.status = computedDatabaseStatusString;

        // 1. Locally transfer the item across our arrays so the screen stays incredibly snappy!
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        // 2. Synchronize line modifications securely over the network to the C# Web API database tables
        this.onUpdateStatus(targetTaskItem.id, computedDatabaseStatusString, true);

        // Recalculate our progress analytics metrics bar graph on the fly
        const totalCurrentBoardTasks = [...this.pendingTasks, ...this.inProgressTasks, ...this.completedTasks];
        this.calculateProgress(totalCurrentBoardTasks);
        this.applyFilters();

        // Force a structural paint pass to snap the counters into perfect alignment
        this.cdr.detectChanges();
    }

    // Method to dynamically replace our dictionary tokens to include a value!
    public formatLabel(template: string, value: string | number): string {
        // "/\{[a-zA-Z0-9_]+\}/" Basically means "anything" :p
        return template.replace(/\{[a-zA-Z0-9_]+\}/, value.toString());
    }

    private updateMobileViewState(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        this.isMobileView = window.innerWidth <= 800;
    }

    public setActiveMobileColumn(column: 'Pending' | 'InProgress' | 'Completed'): void {
        this.activeMobileColumn = column.toString();
    }
}
import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from "@angular/core";
import { isPlatformBrowser, NgIf, NgClass } from "@angular/common";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FormsModule } from "@angular/forms";
import { LanguageService } from "../i18n/language.service";
import { LocalizeNumberPipe } from "../i18n/localize-number.pipe";
import { PopupComponent } from "./popup.component";

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [NgIf, NgClass, RouterLink, FormsModule, LocalizeNumberPipe, PopupComponent], // [(ngModel)] needs FormsModule to be imported!
    templateUrl: "./user-profile.component.html",
    styleUrl: "./user-profile.component.css"
})
export class UserProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private platformId = inject(PLATFORM_ID);
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);

    userProfile: any = null;
    isLoading: boolean = true;

    updateData = { NewUsername: '', NewPassword: '' }; // Data package tracking model for profile updates
    confirmNewPassword = '';
    showPassword = false;
    showConfirmPassword = false;

    assignedWorkItems: number = 0;
    completedTasks: number = 0;

    // Theme related variable
    activeTheme: string = "light";

    // Accessibility related variables
    activeFont: string = "";
    activeColorblind: string = "";

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
        // Only run data fetches inside the browser window context shell
        if(isPlatformBrowser(this.platformId)) {
            this.isLoading = true;

            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if(token) {
                // Only fire our identity request when the storage token layer is active!
                this.loadProfile();
            } else {
                console.warn("Security token missing on mount, redirecting to login entrance room...");
                this.router.navigate(['/login']);
            }

            // Theme cache reader
            const savedTheme = localStorage.getItem("user-preferred-theme");
            if(savedTheme) {
                this.activeTheme = savedTheme;
                this.onThemeChangeEngineTrigger();
            }

            // Accessibility cache reader
            const savedFont = localStorage.getItem("user-preferred-font");
            const savedColorblindOption = localStorage.getItem("user-preferred-colorblind");
            if(savedFont) {
                this.activeFont = savedFont;
                this.onFontChangeEngineTrigger();
            }
            if(savedColorblindOption) {
                this.activeColorblind = savedColorblindOption;
                this.onColorblindChangeEngineTrigger()
            }

            this.cdr.detectChanges();
        }
    }

    loadProfile(): void {
        this.authService.getUserProfile().subscribe({
            next: (data: any) => {
                this.userProfile = data;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error("Profile fetch failed:", err);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    onUpdateAccount(): void {
        // 1. Core Evaluation: Did the user actually leave both input forms blank?
        if (!this.updateData.NewUsername && !this.updateData.NewPassword) {
            this.showPopup(
                "warning", 
                this.langService.words().POPUP.WARNING_EMPTY_FIELDS_TITLE, 
                this.langService.words().POPUP.WARNING_EMPTY_FIELDS_BODY, 
                false, 
                "update-missing");
            return;
        }

        // 2. Identity Check: Stop the users if they typed a username identical to their active profile username!
        if (this.updateData.NewUsername && this.updateData.NewUsername === this.userProfile?.username) {
            this.showPopup(
                "warning", 
                this.langService.words().POPUP.WARNING_IDENTICAL_USERNAME_TITLE,
                this.langService.words().POPUP.WARNING_IDENTICAL_USERNAME_BODY,
                false, 
                "identical-username"
            );
            return;
        }

        // 3. Password Verification Layer: Evaluate ONLY if the user is actively trying to set a new password
        if (this.updateData.NewPassword) {
            if (!this.confirmNewPassword) {
                this.showPopup(
                    "warning", 
                    this.langService.words().POPUP.WARNING_NEW_PASSWORD_TITLE, 
                    this.langService.words().POPUP.WARNING_NEW_PASSWORD_BODY,
                    false, 
                    "confirm-missing"
                );
                return;
            }

            if (this.updateData.NewPassword !== this.confirmNewPassword) {
                this.showPopup(
                    "warning", 
                    this.langService.words().POPUP.WARNING_NEW_PASSWORD_MISMATCH_TITLE,
                    this.langService.words().POPUP.WARNING_NEW_PASSWORD_MISMATCH_BODY,
                    false, 
                    "mismatch"
                );
                return;
            }
        }
        
        const payload: any = {};
        if (this.updateData.NewUsername) payload.NewUsername = this.updateData.NewUsername;
        if (this.updateData.NewPassword) payload.NewPassword = this.updateData.NewPassword;

        this.authService.updateAccountDetails(payload).subscribe({
            next: (res) => {
                const msg = res.message || this.langService.words().POPUP.SUCCESS_USER_INFO_UPDATED_BODY;
                this.showPopup(
                    "success", 
                    this.langService.words().POPUP.SUCCESS_USER_INFO_UPDATED_TITLE, 
                    msg, 
                    false, 
                    "success-update"
                );
                
                // Clear the input fields out beautifully
                this.updateData = { NewUsername: '', NewPassword: '' };
                this.confirmNewPassword = ''; // Clear confirmation fields out cleanly
                this.loadProfile(); // Re-sync screen values with your database file records
            },
            error: (err) => console.error("Account update failed:", err)
        });
    }

    onDeleteAccount(): void {
        // Fire off the localized critical accessibility alert confirmation modal
        this.showPopup(
            "warning",
            this.langService.words().POPUP.WARNING_DELETE_PROFILE_TITLE,
            this.langService.words().POPUP.WARNING_DELETE_PROFILE_BODY,
            true,
            "delete-primary"
        );
    }

    // Core Routing Engine for Popup Submissions
    public handlePopupConfirm(): void {
        const currentAction = this.popupConfig.actionType;
        this.closePopup(); // Clear overlay box instantly

        if (currentAction === "delete-primary") {
            // Advance user smoothly onto the second final critical warning stage
            setTimeout(() => {
                this.showPopup(
                    "danger",
                    this.langService.words().POPUP.DANGER_FINAL_WARNING_TITLE,
                    this.langService.words().POPUP.DANGER_FINAL_WARNING_BODY,
                    true,
                    "delete-secondary"
                );
            }, 300);
        } else if (currentAction === 'delete-secondary') {
            // Execute the database erasure request securely
            this.authService.deleteAccountPermanently().subscribe({
                next: (res) => {
                    // Clear out security tokens so the browser realizes the user is logged out no matter if their token was saved in local or session storage!
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');

                    const msg = res.message || this.langService.words().POPUP.SUCCESS_PROFILE_REMOVED_TITLE;
                    this.showPopup(
                        "success", 
                        this.langService.words().POPUP.SUCCESS_PROFILE_REMOVED_BODY, 
                        msg, 
                        false, 
                        "success-redirect"
                    );
                },
                error: (err) => console.error("Account destruction failed:", err)
            });
        } else if (currentAction === "success-redirect") {
            // Boot the user back out onto the login screen instantly
            this.router.navigate(['/login']);
        }
    }

    // Theme controller method
    onThemeChangeEngineTrigger(): void {
        if(typeof document !== "undefined") {
            // Instantly sets the data-theme attribute on the global <html> tag!
            document.documentElement.setAttribute("data-theme", this.activeTheme);

            // Cache the user's favorite selection so it stays active when they reload!
            localStorage.setItem("user-preferred-theme", this.activeTheme);
            console.log(`Application theme shifted to "${this.activeTheme}" successfully.`);
        }
    }

    /////////////////////////////////////
    // Accessibility controller method //
    /////////////////////////////////////
    // Font Controller Method
    onFontChangeEngineTrigger(): void {
        if (typeof document !== "undefined") {
            if (this.activeFont) {
                document.documentElement.setAttribute("data-accessible-font", this.activeFont);
            } else {
                document.documentElement.removeAttribute("data-accessible-font");
            }
            localStorage.setItem("user-preferred-font", this.activeFont);
            console.log(`Typography layout shifted to "${this.activeFont || 'Default'}" successfully.`);
        }
    }

    // Colorblind Controller Method
    onColorblindChangeEngineTrigger(): void {
        if (typeof document !== "undefined") {
            if (this.activeColorblind) {
                document.documentElement.setAttribute("data-colorblind", this.activeColorblind);
            } else {
                document.documentElement.removeAttribute("data-colorblind");
            }
            localStorage.setItem("user-preferred-colorblind", this.activeColorblind);
            console.log(`Colorblind matrix shifted to "${this.activeColorblind || 'None'}" successfully.`);
        }
    }
    
    // Popup related methods
    showPopup(type: "success" | "warning" | "danger", title: string, body: string, isConfirmation: boolean, actionType: string): void {
        this.popupConfig = { visible: true, type, title, body, isConfirmation, actionType };
        this.cdr.detectChanges();
    }

    closePopup(): void {
        this.popupConfig.visible = false;
        this.cdr.detectChanges();
    }
}
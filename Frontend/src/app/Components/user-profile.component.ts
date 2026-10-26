import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef, HostListener } from "@angular/core";
import { isPlatformBrowser, NgClass } from "@angular/common";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FormsModule } from "@angular/forms";
import { LanguageService } from "../i18n/language.service";
import { LocalizeNumberPipe } from "../i18n/localize-number.pipe";
import { PopupService } from "../services/popup.service";
import { UserProfile } from "../models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [NgClass, RouterLink, FormsModule, LocalizeNumberPipe], // [(ngModel)] needs FormsModule to be imported!
    templateUrl: "./user-profile.component.html",
    styleUrl: "./user-profile.component.css"
})
export class UserProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private platformId = inject(PLATFORM_ID);
    private cdr = inject(ChangeDetectorRef);
    private router = inject(Router);
    private popupService = inject(PopupService);

    public userProfile: UserProfile | null = null;
    public isLoading: boolean = true;

    public updateData = { newUsername: '', newPassword: '' }; // Data package tracking model for profile updates
    public confirmNewPassword = '';
    public showPassword = false;
    public showConfirmPassword = false;

    // Theme and Accessibility variables
    public activeTheme: string = "light";
    public activeFont: string = "";
    public activeColorblind: string = "";

    constructor(public langService: LanguageService) {}

    private readonly avatarPalettes = [
        "avatar-palette-0",
        "avatar-palette-1",
        "avatar-palette-2",
        "avatar-palette-3"
    ] as const;

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

            this.cdr.detectChanges();
        }
    }

    private loadProfile(): void {
        this.authService.getUserProfile().subscribe({
            next: (data: UserProfile) => {
                this.userProfile = data;

                const preferences = data.preferences;
                this.activeTheme = preferences.theme;
                this.activeFont = preferences.font;
                this.activeColorblind = preferences.colorblind;

                const root = document.documentElement;
                root.setAttribute("data-theme", preferences.theme);

                if (preferences.font) {
                    root.setAttribute("data-accessible-font", preferences.font);
                } else {
                    root.removeAttribute("data-accessible-font");
                }

                if (preferences.colorblind) {
                    root.setAttribute("data-colorblind", preferences.colorblind);
                } else {
                    root.removeAttribute("data-colorblind");
                }

                this.langService.setLanguage(preferences.language);

                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err: HttpErrorResponse) => {
                console.error("Profile fetch failed:", err);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    public onUpdateAccount(): void {
        // 1. Core Evaluation: Did the user actually leave both input forms blank?
        if (!this.updateData.newUsername && !this.updateData.newPassword) {
            this.popupService.show({
                type: "warning", 
                title: this.langService.words().POPUP.WARNING_EMPTY_FIELDS_TITLE, 
                body: this.langService.words().POPUP.WARNING_EMPTY_FIELDS_BODY, 
                isConfirmation: false, 
                actionType: "update-missing"
            });
            return;
        }

        // 2. Identity Check: Stop the users if they typed a username identical to their active profile username!
        if (this.updateData.newUsername && this.updateData.newUsername === this.userProfile?.username) {
            this.popupService.show({
                type: "warning", 
                title: this.langService.words().POPUP.WARNING_IDENTICAL_USERNAME_TITLE,
                body: this.langService.words().POPUP.WARNING_IDENTICAL_USERNAME_BODY,
                isConfirmation: false, 
                actionType: "identical-username"
            });
            return;
        }

        // 3. Password Verification Layer: Evaluate ONLY if the user is actively trying to set a new password
        if (this.updateData.newPassword) {
            if (!this.confirmNewPassword) {
                this.popupService.show({
                    type: "warning", 
                    title: this.langService.words().POPUP.WARNING_NEW_PASSWORD_TITLE, 
                    body: this.langService.words().POPUP.WARNING_NEW_PASSWORD_BODY,
                    isConfirmation: false, 
                    actionType: "confirm-missing"
                });
                return;
            }

            if (this.updateData.newPassword !== this.confirmNewPassword) {
                this.popupService.show({
                    type: "warning", 
                    title: this.langService.words().POPUP.WARNING_NEW_PASSWORD_MISMATCH_TITLE,
                    body: this.langService.words().POPUP.WARNING_NEW_PASSWORD_MISMATCH_BODY,
                    isConfirmation: false, 
                    actionType: "mismatch"
                });
                return;
            }
        }
        
        const payload: { NewUsername?: string; NewPassword?: string } = {};
        if (this.updateData.newUsername) payload.NewUsername = this.updateData.newUsername;
        if (this.updateData.newPassword) payload.NewPassword = this.updateData.newPassword;

        this.authService.updateAccountDetails(payload).subscribe({
            next: () => {
                this.popupService.show({
                    type: "success", 
                    title: this.langService.words().POPUP.SUCCESS_USER_INFO_UPDATED_TITLE, 
                    body: this.langService.words().POPUP.SUCCESS_USER_INFO_UPDATED_BODY, 
                    isConfirmation: false, 
                    actionType: "success-update"
                });
                
                // Clear the input fields out beautifully
                this.updateData = { newUsername: '', newPassword: '' };
                this.confirmNewPassword = ''; // Clear confirmation fields out cleanly
                this.loadProfile(); // Re-sync screen values with your database file records
            },
            error: (err: HttpErrorResponse) => {
                console.error("Account update failed: ", err)
                
                this.popupService.show({
                    type: "danger",
                    title: this.langService.words().POPUP.DANGER_USER_INFO_UPDATE_FAILED_TITLE, 
                    body: this.langService.words().POPUP.DANGER_USER_INFO_UPDATE_FAILED_BODY,
                    isConfirmation: false, 
                    actionType: "failed-to-update"
                });
            }
        });
    }

    public onDeleteAccount(): void {
        // Fire off the localized critical accessibility alert confirmation modal
        this.popupService.show({
            type: "warning",
            title: this.langService.words().POPUP.WARNING_DELETE_PROFILE_TITLE,
            body: this.langService.words().POPUP.WARNING_DELETE_PROFILE_BODY,
            isConfirmation: true,
            actionType: "delete-primary"
        });
    }

    // Core Routing Engine for Popup Submissions
    @HostListener('window:global-popup-confirm', ['$event'])
    public handlePopupConfirm(event: Event): void {
        const customEvent = event as CustomEvent<{ actionType: string }>;
        const currentAction = customEvent.detail.actionType;
        
        // Clear overlay box instantly
        this.popupService.close();

        if (currentAction === "delete-primary") {
            // Advance user smoothly onto the second final critical warning stage
            setTimeout(() => {
                this.popupService.show({
                    type: "danger",
                    title: this.langService.words().POPUP.DANGER_FINAL_WARNING_TITLE,
                    body: this.langService.words().POPUP.DANGER_FINAL_WARNING_BODY,
                    isConfirmation: true,
                    actionType: "delete-secondary"
                });
            }, 300);
        } else if (currentAction === 'delete-secondary') {
            // Execute the database erasure request securely
            this.authService.deleteAccountPermanently().subscribe({
                next: () => {
                    // Clear out security tokens so the browser realizes the user is logged out no matter if their token was saved in local or session storage!
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');

                    this.popupService.show({
                        type: "success", 
                        title: this.langService.words().POPUP.SUCCESS_PROFILE_REMOVED_TITLE, 
                        body: this.langService.words().POPUP.SUCCESS_PROFILE_REMOVED_BODY, 
                        isConfirmation: false, 
                        actionType: "success-redirect"
                    });
                },
                error: (err: HttpErrorResponse) => {
                    console.error("Account destruction failed:", err)

                    const profileDestructionFailedBody = this.formatLabel(this.langService.words().POPUP.DANGER_PROFILE_DESTRUCTION_FAILED, err.message);

                    this.popupService.show({
                        type: "danger",
                        title: this.langService.words().POPUP.ERROR_GENERIC_TITLE, 
                        body: profileDestructionFailedBody,
                        isConfirmation: false, 
                        actionType: "failed-to-delete-profile"
                    });
                }
            });
        } else if (currentAction === "success-redirect") {
            // Boot the user back out onto the login screen instantly
            this.router.navigate(['/login']);
        }
    }

    ////////////////////////////////////////////////////////
    // Accessibility & User Preference Controller Methods //
    ////////////////////////////////////////////////////////
    // Method to save user preferences 
    private savePreferences(): void {
        const preferences: UserProfile["preferences"] = {
            language: this.langService.currentLang(),
            theme: this.activeTheme,
            font: this.activeFont,
            colorblind: this.activeColorblind
        };

        this.authService.updatePreferences(preferences).subscribe({
            error: (err: HttpErrorResponse) => 
                console.error("Failed to save user preferences:", err)
        });
    }

    // Language change method
    public onLanguageChange(language: string): void {
        this.langService.setLanguage(language);
        this.savePreferences();
    }
    
    // Method to dynamically replace our dictionary tokens to include a value!
    public formatLabel(template: string, value: string): string {
        return template.replace(/\{[a-zA-Z0-9_]+\}/, value);
    }
    
    // Theme controller method
    public onThemeChangeEngineTrigger(): void {
        if(typeof document !== "undefined") {
            // Instantly sets the data-theme attribute on the global <html> tag!
            document.documentElement.setAttribute("data-theme", this.activeTheme);

            // Cache the user's favorite selection so it stays active when they reload!
            this.savePreferences();
            console.log(`Application theme shifted to "${this.activeTheme}" successfully.`);
        }
    }
    // Font Controller Method
    public onFontChangeEngineTrigger(): void {
        if (typeof document !== "undefined") {
            if (this.activeFont) {
                document.documentElement.setAttribute("data-accessible-font", this.activeFont);
            } else {
                document.documentElement.removeAttribute("data-accessible-font");
            }
            this.savePreferences();
            console.log(`Typography layout shifted to "${this.activeFont || 'Default'}" successfully.`);
        }
    }

    // Colorblind Controller Method
    public onColorblindChangeEngineTrigger(): void {
        if (typeof document !== "undefined") {
            if (this.activeColorblind) {
                document.documentElement.setAttribute("data-colorblind", this.activeColorblind);
            } else {
                document.documentElement.removeAttribute("data-colorblind");
            }
            this.savePreferences();
            console.log(`Colorblind matrix shifted to "${this.activeColorblind || 'None'}" successfully.`);
        }
    }

    // Method to get user initials
    public getInitials(username: string): string {
        const parts = username.trim().split(/\s+/).filter(Boolean); // .split(/\s+/) splits by whitespace

        if (parts.length > 1) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }

        return parts[0]?.slice(0, 2).toUpperCase() || "?";
    }

    // Random theme aware avatar colors for when no image is selected!
    public getAvatarPaletteClass(userId: number): string {
        const index = Math.abs(userId) % this.activeTheme.length;
        return this.avatarPalettes[index];
    }
}
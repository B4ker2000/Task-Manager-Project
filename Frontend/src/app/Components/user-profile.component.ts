import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from "@angular/core";
import { isPlatformBrowser, NgIf, NgClass } from "@angular/common";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [NgIf, NgClass, RouterLink, FormsModule], // [(ngModel)] needs FormsModule to be imported!
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
    isHighContrast: boolean = false;
    activeColorblind: string = "";

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
            const savedContrastOption = localStorage.getItem("user-preferred-high-contrast");
            const savedColorblindOption = localStorage.getItem("user-preferred-colorblind");
            if(savedFont) {
                this.activeFont = savedFont;
                this.onFontChangeEngineTrigger();
            }
            if(savedContrastOption) {
                this.isHighContrast = savedContrastOption === "true";
                this.onHighContrastEngineTrigger();
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
        // Validation check: Make sure the user typed something before clicking save!
        if(!this.updateData.NewUsername && !this.updateData.NewPassword) {
            alert("Please fill out at least one field to save profile updates!");
            return;
        }

        if(this.updateData.NewPassword && this.updateData.NewPassword !== this.confirmNewPassword) {
            alert("Security mismatch: Your updated passwords do not match");
            return;
        }

        this.authService.updateAccountDetails(this.updateData).subscribe({
            next: (res) => {
                alert(res.message || "Account updated successfully!");
                // Clear the input fields out beautifully
                this.updateData = { NewUsername: '', NewPassword: '' };
                this.confirmNewPassword = ''; // Clear confirmation fields out cleanly
                this.loadProfile(); // Re-sync screen values with your database file records
            },
            error: (err) => console.error("Account update failed:", err)
        });
    }

    onDeleteAccount(): void {
        const primaryConfirm = confirm("CRITICAL ACCESSIBILITY ALERT!\nAre you sure you want to permanently delete your workspace profile?");
        if(primaryConfirm) {
            const secondaryConfirm = confirm("FINAL WARNING: This completely wipes out all your records from the system database. This action cannot be reversed. Proceed?");
            if(secondaryConfirm) {
                this.authService.deleteAccountPermanently().subscribe({
                    next: (res) => {
                        alert(res.message || "Your identity profile was successfully removed");

                        // Clear out security tokens so the browser realizes the user is logged out
                        localStorage.removeItem('token');

                        // Boot the user back out onto the login screen instantly
                        this.router.navigate(['/login']);
                    },
                    error: (err) => console.error("Account destruction failed:", err)
                });
            }
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

    // High Contrast Controller Method
    onHighContrastEngineTrigger(): void {
        if (typeof document !== "undefined") {
            if (this.isHighContrast) {
                document.documentElement.setAttribute("data-high-contrast", this.isHighContrast.toString());
            } else {
                document.documentElement.removeAttribute("data-high-contrast");
            }
            localStorage.setItem("user-preferred-high-contrast", this.isHighContrast.toString());
            console.log(`High Contrast state toggled to: ${this.isHighContrast}`);
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
}
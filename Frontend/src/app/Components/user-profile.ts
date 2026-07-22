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

    ngOnInit(): void {
        // Only run data fetches inside the browser window context shell
        if(isPlatformBrowser(this.platformId)) {
            this.loadProfile();
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
}
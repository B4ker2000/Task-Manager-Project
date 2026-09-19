import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LanguageService } from "../i18n/language.service";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css"
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    public registerData = { Username: '', Email: '', Password: '' };
    public confirmPassword = '';
    public showPassword = false;
    public showConfirmPassword = false;

    constructor(public langService: LanguageService) {}

    public onRegister(): void {
        if(this.registerData.Password !== this.confirmPassword) {
            alert("Security match mismatch: Your entered passwords do not match!");
            return;
        }

        this.authService.register(this.registerData).subscribe({
            next: (res) => {
                alert("Account created successfully! Redirecting you to login...");
                this.router.navigate(["/login"]); 
            },
            error: (err) => {
                console.error("Registration error:", err);
                alert(err.error || "Failed to complete account registration.");
            }
        });
    }
}
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LanguageService } from "../i18n/language.service";
import { UserRegisterDto, RegisterResponse } from "../models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";

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

    public registerData: UserRegisterDto = { username: '', email: '', password: '' };
    public confirmPassword = '';
    public showPassword = false;
    public showConfirmPassword = false;

    constructor(public langService: LanguageService) {}

    public onRegister(): void {
        if(this.registerData.password !== this.confirmPassword) {
            alert("Security match mismatch: Your entered passwords do not match!");
            return;
        }

        this.authService.register(this.registerData).subscribe({
            next: (res: RegisterResponse) => {
                console.log(res.message);
                alert("Account created successfully! Redirecting you to login...");
                this.router.navigate(["/login"]); 
            },
            error: (err: HttpErrorResponse) => {
                console.error("Registration error:", err);

                if (err.error && typeof err.error === "object" && "message" in err.error) {
                    alert((err.error as { message: string }).message);
                } else {
                    alert("Failed to complete account registration.");
                }
            }
        });
    }
}
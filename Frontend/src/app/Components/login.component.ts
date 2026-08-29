import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { NgIf } from "@angular/common";
import { LanguageService } from "../language.sevice";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, NgIf, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css"
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    credentials = { email: '', password: '' };
    errorMessage: string = '';
    showPassword = false; 
    rememberMe: boolean = false;

    constructor(public langService: LanguageService) {}

    onLogin(): void { 
        this.errorMessage = ''; // Clears out past error notices before trying again

        this.authService.login(this.credentials).subscribe({
            next: (res: any) => {
                console.log("Authentication sequence successful!");

                // 1. Wipe out any old conflicting residual keys first
                sessionStorage.removeItem('token');

                // 2. THE SECURITY GATEWAY: Branch the storage based on their tick status!
                if(this.rememberMe) {
                    // Persistent save: Survives browser crashes and computer restarts
                    localStorage.setItem('token', res.token);
                } else {
                    // Volatile save: Strictly bounded to the life of this active tab window context
                    sessionStorage.setItem('token', res.token);
                }
                
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error(err);
                this.errorMessage = err.error || 'Invalid email or password. Please try again.';
                this.cdr.detectChanges();
            }
        });
    }

    // Trigger method foe when changing languages
    onLanguageChangeEngineTrigger(newLang: string): void {
        if (this.langService) {
            this.langService.setLanguage(newLang);
        }
    }
}
import { Component, inject, ChangeDetectorRef, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { LanguageService } from "../i18n/language.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, NgIf, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    credentials = { email: '', password: '' };
    errorMessage: string = '';
    showPassword = false; 
    rememberMe: boolean = false;
    isFirstTimeUser: boolean = true;

    constructor(public langService: LanguageService) {}

    ngOnInit(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            // Check if our unique workspace tracking flag exists
            const hasVisited = localStorage.getItem('has-visited-before');
            this.isFirstTimeUser = hasVisited !== 'true';
        }
    }

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

                // SUCCESS GATE: Lock down the browser footprint token right here so next time they see "Welcome Back"
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem('has-visited-before', 'true');
                }
                
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error(err);

                // Safely extract our backend's structured JSON message, or fall back to our dictionary token
                if (err.error && typeof err.error === 'object' && err.error.message) {
                    this.errorMessage = err.error.message;
                } else {
                    this.errorMessage = this.langService.words().LOGIN.ERROR_FALLBACK;
                }
                this.cdr.detectChanges();
            }
        });
    }
}
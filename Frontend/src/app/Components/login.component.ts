import { Component, inject, ChangeDetectorRef, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LanguageService } from "../i18n/language.service";
import { AuthResponse, UserLoginDto } from "../models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    public credentials: UserLoginDto = { email: '', password: '' };
    public errorMessage: string = '';
    public showPassword = false;
    public rememberMe: boolean = false;
    public isFirstTimeUser: boolean = true;

    constructor(public langService: LanguageService) {}

    ngOnInit(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            // Check if our unique workspace tracking flag exists
            const hasVisited = localStorage.getItem('has-visited-before');
            this.isFirstTimeUser = hasVisited !== 'true';
        }
    }

    public onLogin(): void { 
        this.errorMessage = ''; // Clears out past error notices before trying again

        this.authService.login(this.credentials).subscribe({
            next: (res: AuthResponse) => {
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
            error: (err: HttpErrorResponse) => {
                console.error(err);

                // Safely extract our structured backend JSON exception signature
                if (err.error && typeof err.error === 'object' && 'message' in err.error) {
                    this.errorMessage = (err.error as { message: string }).message;
                } else {
                    this.errorMessage = this.langService.words().LOGIN.ERROR_FALLBACK;
                }
                this.cdr.detectChanges();
            }
        });
    }
}
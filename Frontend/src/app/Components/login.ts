import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, NgIf, RouterLink],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css"
})
// export class LoginComponent {
//     private authService = inject(AuthService);
//     private router = inject(Router);

//     credentials = { email: '', password: '' };
//     errorMessage = '';

//     onLogin(): void { 
//         this.authService.login(this.credentials).subscribe({
//             next: (response) => {
//                 console.log('Login successful!', response);
//                 this.router.navigate(['/dashboard']);
//             },
//             error: (err) => {
//                 console.error('Login failed', err);
//                     this.errorMessage = 'Invalid email or password. Please try again.';
//             }
//         });
//     }
// }
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    credentials = { email: '', password: '' };
    errorMessage: string = '';
    showPassword = false; 
    rememberMe: boolean = false;

    onLogin(): void { 
        this.errorMessage = ''; // Clears out past error notices before trying again

        this.authService.login(this.credentials).subscribe({
            next: (res: any) => {
                if(this.rememberMe) {
                    localStorage.setItem('token', res.token);
                } else {
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
}
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { UserRegisterDto, UserLoginDto, AuthResponse, UserProfile } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5283/api/auth';
    private http = inject(HttpClient);

    // 1. Send register payload to backend
    public register(user: UserRegisterDto): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/register`, user);
    }

    // 2. Send login credentials and save token dynamically based on Remember Me option
    public login(credentials: UserLoginDto & { rememberMe?: boolean }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if (response && response.token) {
                    // Save the digital wristband token securely based on the user's preference!
                    if (credentials.rememberMe) {
                        localStorage.setItem('token', response.token);
                    } else {
                        sessionStorage.setItem('token', response.token);
                    }
                }
            })
        );
    }

    // 3. Clear token from BOTH storage locations to log out
    public logout(): void {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    // 4. Check if the user is currently logged in across either active storage module
    public isLoggedIn(): boolean {
        // Read from both repositories so unremembered sessions still pass validation
        return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
    }

    // 5. Method needed for our "Profile" tab!
    public getUserProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/profile`);
    }

    // 6. Method to update user account info like username & password
    public updateAccountDetails(updatedFields: { NewUsername?: string; NewPassword?: string }): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${this.apiUrl}/update-account`, updatedFields);
    }

    // 7. Method needed to delete user accounts if they wish so
    public deleteAccountPermanently(): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/delete-account`);
    }
}
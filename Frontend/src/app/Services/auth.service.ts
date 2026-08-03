import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:5283/api/auth';
    private http = inject(HttpClient);

    // 1. Send register payload to backend
    register(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
    }

    // 2. Send login credentials and save the token if successful
    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                if(response && response.token) {
                    // Save the digital wristband token securely in the browser!
                    localStorage.setItem('token', response.token);
                }
            })
        );
    }

    // 3. Clear token to log out
    logout(): void {
        localStorage.removeItem('token');
    }

    // 4. Check if the user is currently logged in
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token'); // The first "!" basically trasnforms our 'token' which is eaither a long JWT string when logged-in and "null" when logged-out into a simple "true" for when logged-out and "false" for when logged-in. The second "!" basically inverts that so that it's "true" when logged-in & "false" when logged-out!
    }

    // 5. Method needed for our "Profile" tab!
    getUserProfile(): Observable<any> {
        return this.http.get('http://localhost:5283/api/auth/profile');
    }

    // 6. Method to update user account info like username & password
    updateAccountDetails(updatedFields: { NewUsername?: string; NewPassword?: string }): Observable<any> {
        return this.http.put("http://localhost:5283/api/auth/update-account", updatedFields);
    }

    // 7. Method needed to delete user accounts if they wish so
    deleteAccountPermanently(): Observable<any> {
        return this.http.delete("http://localhost:5283/api/auth/delete-account");
    }

    // 6. Method needed for our "Task board" tab!
    // getUserTasks(): Observable<any> {
    //     return this.http.get('http://localhost:5283/api/auth/projects');
    // }
}
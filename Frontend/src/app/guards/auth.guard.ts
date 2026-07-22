import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

export const AuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID); // Check if we are server or browser

    // 1. Check if we are running on the backend server
    if(!isPlatformBrowser(platformId)) {
        return true; // The server says: "Pass through, let the browser handle it!"
    }

    // 2. We only reach this point if we are safely inside the browser window
    const token = localStorage.getItem('token') || sessionStorage.getItem("token");
    // If the JWT token exists in the browser storage, allow access to the page
    if(token) {
        return true; // Browser says: "Token found! Stay on the page."
    }

    // 3. Only if we are in the browser AND there is no token, we block access
    console.warn("Access denied! Redirecting to login...");
    router.navigate(['/login']);
    return false;
};
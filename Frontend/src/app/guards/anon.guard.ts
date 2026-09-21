import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

export const AnonGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    // 1. If running on the SSR server, pass through smoothly
    if (!isPlatformBrowser(platformId)) {
        return true;
    }

    // 2. If running in the browser, check for active security clearance tokens
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
        // User is already authenticated! Redirect them to their Dashboard
        router.navigate(["/dashboard"]);
        return false; // Block the said users from the login form/page
    }

    return true; // Let users see the Login page if they are logged out
};
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: "root"
})
export class AnonGuard implements CanActivate {
    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    public canActivate(): boolean {
        if(isPlatformBrowser(this.platformId)) {
            // Check if the local token exists in the browser cache
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            if(token) {
                // User is already authenticated! Redirect them to their Dashboard
                this.router.navigate(["/dashboard"]);
                return false; // Block the said users from the login form/page
            }
        }

        return true; // Let users see the Login page if they are logged out
    }
}
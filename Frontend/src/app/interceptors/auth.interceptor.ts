import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn 
): Observable<HttpEvent<unknown>> => {
    const platformId = inject(PLATFORM_ID);

    // Only look for the token if we are running safely in the browser window
    if(isPlatformBrowser(platformId)) {
        const token = localStorage.getItem('token');

        if(token) {
            // Clone the request and insert the Authorization header
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next(clonedReq)
        }
    }

    return next(req);
};
import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let uiErrorMessage = 'An unexpected system glitch occured. Please try again.';

            // 1. Read our unified .NET API Exception payload
            if (error.error && typeof error.error === 'object' && error.error.message) {
                uiErrorMessage = error.error.message;
            } else if (error.status === 0) {
                uiErrorMessage = 'Unable to connect to the backend core.'
            }

            // 2. Log it out to the developer console for easy tracking 
            console.error(`[Backedn Exception Code ${error.status}]:`, uiErrorMessage);

            // 3. Toast error will be added here later!

            // 4. Pass the error through smoothly so button loading animation can turn off
            return throwError(() => new Error(uiErrorMessage));
        })
    );
};
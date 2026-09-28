import { Component, inject, HostListener } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LanguageService } from "../i18n/language.service";
import { UserRegisterDto, RegisterResponse } from "../models/auth.model";
import { HttpErrorResponse } from "@angular/common/http";
import { PopupService } from "../services/popup.service";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css"
})
export class RegisterComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private popupService = inject(PopupService);

    public registerData: UserRegisterDto = { username: '', email: '', password: '', confirmPassword: '' };
    public showPassword = false;
    public showConfirmPassword = false;

    constructor(public langService: LanguageService) {}

    public onRegister(): void {
        if(this.registerData.password !== this.registerData.confirmPassword) {
            this.popupService.show({
                type: "warning", 
                title: this.langService.words().POPUP.WARNING_NEW_PASSWORD_MISMATCH_TITLE,
                body: this.langService.words().POPUP.WARNING_NEW_PASSWORD_MISMATCH_BODY,
                isConfirmation: false, 
                actionType: "mismatch"
            });
            return;
        }

        this.authService.register(this.registerData).subscribe({
            next: (res: RegisterResponse) => {
                console.log(res.message);

                this.popupService.show({
                    type: "success", 
                    title: this.langService.words().POPUP.SUCCESS_REGISTER_TITLE,   // This custom popup might be replaced with a 
                    body: this.langService.words().POPUP.SUCCESS_REGISTER_BODY,     // toast message later when those are implemented!
                    isConfirmation: false, 
                    actionType: "account-registered-successfully"
                }); 
            },
            error: (err: HttpErrorResponse) => {
                console.error("Registration error: ", err);

                let errorMsg = this.langService.words().POPUP.DANGER_REGISTRATION_FAILURE_BODY;
                let actionType = "account-registration-failed";

                // 1. Extract the raw string message from the error payload
                let extractedMessage = "";
                if (err.error) { 
                    if (typeof err.error === "string") {
                    extractedMessage = err.error;
                    } else if (typeof err.error === "object") {
                        extractedMessage = err.error.message || err.error.title || "";
                    }
                }
                    
                // 2. Fallback to status text if the body was empty
                if (!extractedMessage && err.message) {
                    extractedMessage = err.message;
                }

                // 3. Match against your specific C# exception string safely
                const serializedMessage = extractedMessage.toLowerCase();
                if (serializedMessage.includes("email") && serializedMessage.includes("exists")) {
                    errorMsg = this.langService.words().POPUP.ERROR_EMAIL_ALREADY_EXISTS_BODY || extractedMessage;
                    actionType = "account-email-exists";
                } else if (extractedMessage) {
                    errorMsg = extractedMessage;
                }

                // 4. Trigger the custom warning popup modal!
                this.popupService.show({
                    type: "danger", 
                    title: this.langService.words().POPUP.ERROR_GENERIC_TITLE,
                    body: errorMsg,
                    isConfirmation: false, 
                    actionType: actionType
                })
            }
        })
    }

    @HostListener('window:global-popup-confirm', ['$event'])
    public handlePopupConfirm(event: Event): void {
        const customEvent = event as CustomEvent<{ actionType: string }>;
        const currentAction = customEvent.detail.actionType;

        this.popupService.close();

        if (currentAction === "account-registered-successfully") {
            this.router.navigate(["/login"]); 
        }
    }
}
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../i18n";
import { PopupService } from "../services/popup.service";

@Component({
    selector: "app-popup",
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent {
    // Configurable layout attributes
    @Input() public type: "success" | "warning" | "danger" = "success";
    @Input() public title: string = "";
    @Input() public body: string = "";
    @Input() public isConfirmation: boolean = false;

    // Interactivity callback triggers
    @Output() public confirm = new EventEmitter<void>();
    @Output() public cancel = new EventEmitter<void>();

    constructor(public langService: LanguageService) {}

    public onConfirm(): void {
        this.confirm.emit();
    }

    public onCancel(): void {
        this.cancel.emit();
    }

    // Dismiss if user clicks on the backdrop window glass shade
    public onDismissOutside(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains("popup-backdrop")) {
            // 1. For basic alerts/success popups
            if (!this.isConfirmation) {
                this.onConfirm();
            } else {
                // 2. For critical confirmation windows
                this.onCancel();
            }
        }
    }
}
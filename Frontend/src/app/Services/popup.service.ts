import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PopupModel } from "../models/popup.model";

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    private initialConfig: PopupModel = {
        visible: false,
        type: "success",
        title: "",
        body: "",
        isConfirmation: false,
        actionType: ""
    };

    // The state stream engine holding our live popup setup configurations
    private popupState$ = new BehaviorSubject<PopupModel>(this.initialConfig);

    // Expose the state as a read-only stream that components can subscribe to
    public get config$(): Observable<PopupModel> {
        return this.popupState$.asObservable();
    }

    // Call this from ANY component logic to instantly trigger the custom popup!
    public show(options: Omit<PopupModel, 'visible'>): void {
        this.popupState$.next({
            ...options,
            visible: true
        });
    }

    // Safely drop and hide the active modal layer. This only hides the popup so close 
    // animations won't show the text and other info suddenly disappear but these fields 
    // will be replaced with new ones when a new popup appears!
    public close(): void {
        this.popupState$.next({
            ...this.popupState$.value,
            visible: false
        });
    }

    // Helper getter to quickly pull active action identifiers inside components
    public get currentActionType(): string {
        return this.popupState$.value.actionType;
    }
}
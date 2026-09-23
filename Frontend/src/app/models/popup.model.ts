export interface PopupModel {
    visible: boolean,
    type: "success" | "warning" | "danger",
    title: string,
    body: string,
    isConfirmation: boolean,
    actionType: string // Tracks what to do when clicking "Proceed"
}
import { Pipe, PipeTransform, inject } from "@angular/core";
import { LanguageService } from "./language.service";

@Pipe({
    name: 'localizeNumber',
    pure: false, // Ensures numbers re-render the moment language option changes!
    standalone: true
})
export class LocalizeNumberPipe implements PipeTransform {
    private langService = inject(LanguageService);

    transform(value: number | string | null | undefined): string {
        if (value === null || value === undefined) return '';

        const inputStr = value.toString();
        const currentLang = this.langService.currentLang();
        
        // If the selected language is Persian, manually swap out digits globally!
        if (currentLang === 'fa') {
            const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return inputStr.replace(/[0-9]/g, (w) => persianDigits[parseInt(w, 10)]);
        }

        return inputStr; // Returns standard formatting for the rest of the languages!
    }
}
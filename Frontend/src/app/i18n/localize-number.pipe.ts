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

        const num = Number(value);
        if (isNaN(num)) return value.toString();

        const currentLang = this.langService.currentLang();
        let cultureCode = 'en-US';

        if (currentLang === 'fa') cultureCode = 'fa-IR';
        else if (currentLang === 'jp') cultureCode = 'ja-JP';
        else if (currentLang === 'ru') cultureCode = 'ru-RU';
        else if (currentLang === 'en-gb') cultureCode = 'en-GB';

        // Native browser execution context engine automatically translates digits!
        return new Intl.NumberFormat(cultureCode).format(num);
    }
}
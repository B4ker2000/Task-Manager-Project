import { Injectable, signal, WritableSignal } from "@angular/core";
import { DictionaryMatrix } from "./index";
import { LocalePack } from "./locale-pack.interface";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // Uses Angular Signals for ultra-fast, reactive real-time template updates!
    public currentLang = signal<string>('en-us');
    public words: WritableSignal<LocalePack> = signal(DictionaryMatrix['en-us']);

    constructor() {
        this.loadLanguagePreference();
    }

    public setLanguage(lang: string): void {
        const lowerLang = lang.toLowerCase();
        if (DictionaryMatrix[lowerLang]) {
            this.currentLang.set(lowerLang);
            this.words.set(DictionaryMatrix[lowerLang]);
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('user-preferred-lang', lowerLang);
            }
            console.log(`Global Translation Matrix shifted to language context: "${lowerLang}"`);
        }
    }

    private loadLanguagePreference(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            let savedLang = localStorage.getItem('user-preferred-lang') || 'en-us';
            savedLang = savedLang.toLowerCase();

            this.setLanguage(savedLang);
        }
    }
}
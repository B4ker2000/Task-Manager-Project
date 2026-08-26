import { Injectable, signal, WritableSignal } from "@angular/core";
import { DICTIONARY, LocalePack } from "./languages";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // Uses Angular Signals for ultra-fast, reactive real-time template updates!
    public currentLang = signal<string>('en');
    public words: WritableSignal<LocalePack> = signal(DICTIONARY['en']);

    constructor() {
        this.loadLanguagePreference();
    }

    public setLanguage(lang: string): void {
        if (DICTIONARY[lang]) {
            this.currentLang.set(lang);
            this.words.set(DICTIONARY[lang]);
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('user-preferred-lang', lang);
            }
            console.log(`Global Translation Matrix shifted to language context: "${lang}"`);
        }
    }

    private loadLanguagePreference(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            const savedLang = localStorage.getItem('user-preferred-lang') || 'en';
            this.setLanguage(savedLang);
        }
    }
}
import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './Components/popup.component';
import { AsyncPipe } from '@angular/common';
import { PopupService } from './services/popup.service';
import { AuthService } from './services/auth.service';
import { LanguageService } from './i18n';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, PopupComponent, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Frontend');
  public popupService = inject(PopupService);

  public handleGlobalCancel(): void {
    this.popupService.close();
  }
  public handleGlobalConfirm(): void {
    const confirmEvent = new CustomEvent('global-popup-confirm', {
      detail: { actionType: this.popupService.currentActionType }
    });
    window.dispatchEvent(confirmEvent);
  }

  private authService = inject(AuthService);
  private languageService = inject(LanguageService);

  // GLOBAL INITIALIZATION ROUTINE: Fires BEFORE any route screens render!
  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    this.authService.getUserProfile().subscribe({
      next: profile => {
        const preferences = profile.preferences;
        const root = document.documentElement;
      
        root.setAttribute('data-theme', preferences.theme);

        if (preferences.font) {
          root.setAttribute('data-accessible-font', preferences.font);
        } else {
          root.removeAttribute('data-accessible-font');
        }

        if (preferences.colorblind) {
          root.setAttribute('data-colorblind', preferences.colorblind);
        } else {
          root.removeAttribute('data-colorblind');
        }

        this.languageService.setLanguage(preferences.language);
      },
      error: error => console.error('Could not load user preferences:', error)
    });
  }
}
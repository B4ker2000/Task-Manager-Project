import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './Components/popup.component';
import { AsyncPipe } from '@angular/common';
import { PopupService } from './services/popup.service';

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

  // GLOBAL INITIALIZATION ROUTINE: Fires BEFORE any route screens render!
  ngOnInit(): void {
    if(typeof window !== 'undefined' && window.localStorage) {
      // Theme Cache Reader
      const savedTheme = localStorage.getItem('user-preferred-theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        console.log(`Global Core Engine securely initialized theme layout to: ${savedTheme}`);
      }

      // Font Style Cache Reader
      const savedFont = localStorage.getItem('user-preferred-font');
      if (savedFont) {
        document.documentElement.setAttribute('data-accessible-font', savedFont);
        console.log(`Global Core Engine securely initialized typography layout to: ${savedFont}`);
      }

      // Colorblind Filter Cache Reader
      const savedColorblindOption = localStorage.getItem('user-preferred-colorblind');
      if (savedColorblindOption) {
        document.documentElement.setAttribute('data-colorblind', savedColorblindOption);
        console.log(`Global Core Engine securely initialized colorblind filter to: ${savedColorblindOption}`);
      }
    }
  }
}

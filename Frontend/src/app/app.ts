import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Frontend');

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

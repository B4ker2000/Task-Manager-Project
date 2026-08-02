import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Frontend');

  // GLOBAL INITIALIZATION ROUTINE: Fires BEFORE any route screens render!
  ngOnInit(): void {
    if(typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = localStorage.getItem('user-preferred-theme');
      if(savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        console.log(`Global Core Engine securely initialized theme layout to: ${savedTheme}`);
      }
    }
  }
}

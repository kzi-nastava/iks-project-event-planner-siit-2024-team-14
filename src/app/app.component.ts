import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',  // The selector is the tag name for this component in your HTML
  templateUrl: './app.component.html',  // The path to the template file
  styleUrls: ['./app.component.css']  // The path to the component's styles (CSS)
})
export class AppComponent {
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    // Subscribe to route changes to check if we're on the login page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }
}

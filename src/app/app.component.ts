import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  isRegistrationPage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (!sessionStorage.getItem('appInitialized')) {
      localStorage.clear();
      sessionStorage.setItem('appInitialized', 'true');
    }

    // Check if the current route is 'login' or 'registration-eo'/'registration-spp'
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Only check for when navigation ends
    ).subscribe(() => {
      const currentUrl = this.router.url;
      // Set the flags based on the current route
      this.isLoginPage = currentUrl.includes('/login');
      this.isRegistrationPage = currentUrl.includes('/registration-eo') || currentUrl.includes('/registration-spp');
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Dodajemo promenljivu koja prati da li je drawer otvoren
  isSidebarOpen: boolean = false;

  constructor(private router: Router) {}

  // Funkcija koja menja stanje otvaranja/zatvaranja drawer-a
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openLogin(): void {
    console.log('Profile icon clicked!');
    this.router.navigate(['/login']);
  }
}

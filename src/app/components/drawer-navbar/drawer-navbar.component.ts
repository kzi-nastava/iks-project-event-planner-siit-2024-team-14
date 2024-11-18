import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-navbar',
  templateUrl: './drawer-navbar.component.html',
  styleUrls: ['./drawer-navbar.component.css']
})
export class DrawerNavbarComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home-guest-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }
}


import { Component } from '@angular/core';

@Component({
  selector: 'app-home-guest-organizer',
  templateUrl: './home-organizer.component.html',
  styleUrls: ['./home-organizer.component.css']
})
export class HomeOrganizerComponent {
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}


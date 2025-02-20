import { Component } from '@angular/core';

@Component({
  selector: 'app-home-provider',
  templateUrl: './home-provider.component.html',
  styleUrls: ['./home-provider.component.css']
})
export class HomeProviderComponent {
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;
  isNotificationsOpen:  boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }
  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}


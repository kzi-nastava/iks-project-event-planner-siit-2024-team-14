import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileRoute: string = '/login';
  homeRoute: string = '/login';
  unreadCount: number = 0;

  role: string = '';
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.role = parsedUser.role;

        switch (this.role) {
          case 'User':
            this.profileRoute = '/au-profile';
            this.homeRoute = '/home-authenticated-user';
            break;
          case 'EventOrganizer':
            this.profileRoute = '/organizer-profile';
            this.homeRoute = '/home-organizer';
            break;
          case 'ServiceAndProductProvider':
            this.profileRoute = '/provider-profile';
            this.homeRoute = '/home-provider';
            break;
          case 'Admin':
            this.profileRoute = '/admin-profile';
            this.homeRoute = '/home-admin';
            break;
          default:
            this.profileRoute = '/login';
            this.homeRoute = '/';
        }
      } catch (e) {
        console.error('Invalid user object in localStorage');
      }
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}

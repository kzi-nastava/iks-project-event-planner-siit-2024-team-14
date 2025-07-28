import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../notifications/notifications.service';

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

  constructor(private notificationService: NotificationService) {}


  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const userId = this.getUserIdFromLocalStorage();

    if (userId !== null) {
      this.loadUnreadNotificationCount(userId);
      this.notificationService.unreadNotificationCount$.subscribe(count => {
        this.unreadCount = count;
      });
    }
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

  getUserIdFromLocalStorage(): number | null {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      const parsedUserId = parseInt(userIdFromStorage, 10);
      return isNaN(parsedUserId) ? null : parsedUserId;
    }
    return null;
  }

  loadUnreadNotificationCount(userId: number): void {
    this.notificationService.loadUnreadNotificationsCount(userId);
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}

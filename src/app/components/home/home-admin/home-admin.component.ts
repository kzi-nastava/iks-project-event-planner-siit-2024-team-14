import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../notifications/notifications.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;

  unreadCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();

    if (userId !== null) {
      this.loadUnreadNotificationCount(userId);
      this.notificationService.unreadNotificationCount$.subscribe(count => {
        this.unreadCount = count;
      });
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
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}


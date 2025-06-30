import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../notifications/notifications.service';
import {HomeOrganizerService} from '../../home/home-organizer/home-organizer.service';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css'
})
export class ProviderProfileComponent implements OnInit {
  user: any;
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;
  unreadCount: number = 0;

  constructor(private notificationService: NotificationService, private userService: HomeOrganizerService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    if (this.user.id !== null) {
      this.loadUnreadNotificationCount(this.user.id);
      this.notificationService.unreadNotificationCount$.subscribe(count => {
        this.unreadCount = count;
      });
    }
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  loadUnreadNotificationCount(userId: number): void {
    this.notificationService.loadUnreadNotificationsCount(userId);
  }

  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
}

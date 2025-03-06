import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../notifications/notifications.service';
import {HomeProviderService} from './home-provider.service';

@Component({
  selector: 'app-home-provider',
  templateUrl: './home-provider.component.html',
  styleUrls: ['./home-provider.component.css']
})
export class HomeProviderComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isNotificationsOpen:  boolean = false;
  user: any;
  unreadCount: number = 0;

  constructor(private notificationService: NotificationService, private userService: HomeProviderService) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();

    if (userId !== null) {
      this.loadUnreadNotificationCount(userId);
      this.notificationService.unreadNotificationCount$.subscribe(count => {
        this.unreadCount = count;
      });
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); // Assign to class property
    }

    if (this.user && this.user.id) {
      this.fetchUserDetails(this.user.id); // Fetch user details
    } else {
      console.error('User ID not found in localStorage');
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

  fetchUserDetails(userId: number): void {
    this.userService.getProviderById(userId).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.provider)); // Store new data
        this.user = response.provider; // Update this.user with new data
        console.log('User details updated:', this.user);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}


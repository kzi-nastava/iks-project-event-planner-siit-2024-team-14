import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './notifications.service';

export interface Notification {
  id: number;
  message: string;
  date: string;
  isRead: boolean;
  userId: number;
  commentId: number | null;
  eventId: number | null;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  @Input() isNotificationsOpen = false;
  isMuted = false;
  private userId: number | null = null;

  constructor(
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();

    if (this.userId !== null) {
      // Učitavanje postojećih notifikacija
      this.loadNotifications();
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

  loadNotifications(): void {
    if (this.userId !== null) {
      this.notificationService.getNotifications(this.userId).subscribe(
        (data) => this.notifications = data,
        (error) => console.error('Greška pri učitavanju notifikacija', error)
      );
    }
  }

  toggleMuteNotifications(): void {
    this.isMuted = !this.isMuted;
  }

  closeNotifications(): void {
    this.isNotificationsOpen = false;
    if (this.userId !== null) {
      this.notificationService.markAllAsRead(this.userId).subscribe(() => {
        this.notifications.forEach(notification => notification.isRead = true);
      }, error => console.error('Greška pri označavanju notifikacija kao pročitanih', error));
    }
  }

}

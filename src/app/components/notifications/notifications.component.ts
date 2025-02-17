import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './notifications.service';
import { WebSocketService } from './websocket.service';

export interface Notification {
  id: number;
  message: string;
  date: string;  // Backend vraća string
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
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];

  @Input() isNotificationsOpen = false;
  isMuted = false;
  private userId: number | null = null;

  constructor(
    private notificationService: NotificationService,
    private websocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();

    if (this.userId !== null) {
      this.loadNotifications();
      this.websocketService.getNotifications(this.userId).subscribe(
        (newNotification: Notification) => {
          this.notifications.push(newNotification);
        },
        (error) => console.error('Greška u WebSocket pretplati', error)
      );
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

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  toggleMuteNotifications(): void {
    this.isMuted = !this.isMuted;
  }

  closeNotifications(): void {
    this.isNotificationsOpen = false;

  }

  ngOnDestroy(): void {
    this.websocketService.disconnect();
  }
}

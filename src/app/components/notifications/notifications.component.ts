import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './websocket.service'; // Importuj WebSocket servis

interface Notification {
  username: string;
  message: string;
  image: string;
  isRead: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @Input() isNotificationsOpen: boolean = false;
  notifications: Notification[] = []; // Array za notifikacije

  isMuted = false;

  constructor(private websocketService: WebSocketService) {}

  ngOnInit() {
    // Poveži se na WebSocket server kada komponenta bude inicijalizovana
    this.websocketService.connect();

    // Slušaj za nove notifikacije putem WebSocket-a
    this.websocketService.getNotifications().subscribe((notification) => {
      this.notifications.push(notification); // Dodaj novu notifikaciju
    });
  }

  ngOnDestroy() {
    // Prekini vezu kada komponenta bude uništena
    this.websocketService.disconnect();
  }

  toggleMuteNotifications() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      console.log('Notifications muted');
    } else {
      console.log('Notifications unmuted');
    }
  }

  closeNotifications() {
    this.isNotificationsOpen = false;

    // Kada se zatvore obaveštenja, označavaju se kao pročitana
    this.notifications = this.notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
  }
}

import { Component, Input } from '@angular/core';

interface Notification {
  username: string;
  message: string;
  image: string;
  isRead: boolean;
}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})


export class NotificationsComponent {
  @Input() isNotificationsOpen: boolean = false; // Prima stanje otvaranja komentara

  notifications: Notification[] = [
    {
      username: 'Ana Jovanovic',
      message: 'Your event Birthday party is starting in 1 hour! Make sure everything is ready and check all final details...',
      image: 'https://via.placeholder.com/40',
      isRead: false
    },
    {
      username: 'Petar Petrovic',
      message: 'Your event Birthday party is starting in 1 hour! Make sure everything is ready and check all final details...',
      image: 'https://via.placeholder.com/40',
      isRead: false
    },
    {
      username: 'Mila Milanovic',
      message: 'Your event Birthday party is starting in 1 hour! Make sure everything is ready and check all final details...',
      image: 'https://via.placeholder.com/40',
      isRead: true
    },
    {
      username: 'Hleb & Kifle',
      message: 'Your event Birthday party is starting in 1 hour! Make sure everything is ready and check all final details...',
      image: 'https://via.placeholder.com/40',
      isRead: true
    }
  ];

  isMuted = false;

  toggleMuteNotifications() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      // Logika za isključivanje obaveštenja
      console.log('Notifications muted');
    } else {
      // Logika za uključivanje obaveštenja
      console.log('Notifications unmuted');
    }
  }


  closeNotifications() {
    this.isNotificationsOpen = false;

    //NEEDS TO CHANGE IN DATA BASE -> notification.IsRead = true
    this.notifications = this.notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
  }

}



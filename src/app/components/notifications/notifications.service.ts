import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { NotificationModel } from '../../interfaces/notification.model'; // Definiši model notifikacije

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private unreadNotificationCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unreadNotificationCount$: Observable<number> = this.unreadNotificationCountSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(`${this.apiUrl}?userId=${userId}`);
  }

  loadUnreadNotificationsCount(userId: number): void {
    this.http.get<number>(`${this.apiUrl}/unread-count?userId=${userId}`).subscribe(
        (unreadCount) => {
          console.log('Backend unread count response:', unreadCount);
          this.unreadNotificationCountSubject.next(unreadCount);
        },
        (error) => {
          console.error('Error loading unread notifications count', error);
          this.unreadNotificationCountSubject.next(0);
        }
    );
  }


  markAllAsRead(userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mark-all-as-read?userId=${userId}`, {});
  }

  toggleMuteNotifications(userId: number, isMuted: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mute-notifications?userId=${userId}&muted=${isMuted}`, {});

  }
  toggleMuteNotificationsStatus(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/mute-notifications/status?userId=${userId}`);
  }

}


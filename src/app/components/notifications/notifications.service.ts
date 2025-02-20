import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './notifications.component';  // Definiši model notifikacije

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  // Poziv za preuzimanje notifikacija za određenog korisnika
  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}?userId=${userId}`);
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


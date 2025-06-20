import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, catchError, finalize, of, Subscription, tap} from 'rxjs';
import {Notification} from './model/notification.model';
import {AuthService} from '../infrastructure/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {User} from '../infrastructure/auth/model/user.model';
import {IMessage, StompSubscription} from '@stomp/stompjs';
import {StompService} from './stomp.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>(this.notifications);

  get notifications$() {
    return this.notificationsSubject.asObservable();
  }

  get unreadNotifications$() {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => !n.isRead))
    );
  }

  private loggedInUserId = NaN;
  private subs: Subscription[] = [];
  private ss?: StompSubscription;


  constructor(authService: AuthService, private http: HttpClient, private stompService: StompService) {
    let sub1, sub2: Subscription;

    sub1 = stompService.connected$.subscribe(connected => {
      if (connected)
        this.subscribeToTopics();
      else
        this.ss?.unsubscribe();
    });

    sub2 = authService.user$.subscribe(this.onUserChanged.bind(this));
    this.subs.push(sub1, sub2);
  }



  private onUserChanged(user: User | null) {
    this.loggedInUserId = user?.id || NaN;
    this.notifications.splice(0, this.notifications.length);

    if (!user) {
      this.notificationsSubject.next(this.notifications);
      return;
    }

    this.http.get<Notification[]>(environment.apiUrl + '/notifications', { params: { userId: user.id } })
      .pipe(
        tap(notifications => this.notifications = notifications),
        catchError(err => {
          console.warn('[NotificationService] Failed to fetch notifications:', err);
          return of();
        }),
        finalize(() => {
          this.subscribeToTopics();
          this.notificationsSubject.next(this.notifications);
        })
      ).subscribe();
  }



  private subscribeToTopics() {
    this.ss?.unsubscribe();

    if (!this.loggedInUserId || !this.stompService.connected)
      return;

    this.ss = this.stompService.subscribe(
      `/topic/notifications/${this.loggedInUserId}`,
      this.onNotificationReceived.bind(this)
    );
  }



  private onNotificationReceived(msg: IMessage) {
    const notification: Notification = JSON.parse(msg.body);
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
  }


  disconnect() {
    this.ss?.unsubscribe();
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  ngOnDestroy() {
    this.disconnect();
  }

}

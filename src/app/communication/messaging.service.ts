import {Injectable, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Message} from './model/message.model';
import {filter} from 'rxjs/operators';
import {IMessage, StompSubscription} from '@stomp/stompjs';
import {Chat} from './model/chat.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../infrastructure/auth/auth.service';
import {StompService} from './stomp.service';
import {environment} from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class MessagingService implements OnDestroy {
  private messageSubject = new Subject<Message>();

  get message$() {
    return this.messageSubject.asObservable();
  }

  chat$(chatId: number) {
    return this.message$.pipe(
      filter(message => message.chatId === chatId)
    );
  }

  private loggedInUserId = NaN;
  private subs: Subscription[] = [];
  private ss?: StompSubscription;


  constructor(authService: AuthService, private stompService: StompService, private http: HttpClient) {
    let sub1, sub2: Subscription;

    sub1 = stompService.connected$.subscribe(connected => {
      if (connected)
        this.subscribeToTopics();
      else
        this.ss?.unsubscribe();
    });

    sub2 = authService.user$.subscribe(user => {
      this.loggedInUserId = user?.id || NaN;
      this.subscribeToTopics();
    });

    this.subs.push(sub1, sub2);
  }



  private subscribeToTopics() {
    this.ss?.unsubscribe();

    if (!this.loggedInUserId || !this.stompService.connected)
      return;

    this.ss = this.stompService.subscribe(
      `/queue/${this.loggedInUserId}`,
      msg => this.onMessageReceived(msg),
    );
  }

  private onMessageReceived(stompMessage: IMessage) {
    const message: Message = JSON.parse(stompMessage.body);
    this.messageSubject.next(message);
  }



  sendMessage(recipientId: number, content: string) {
    if (!this.loggedInUserId) {
      console.warn("[MessagingService] Cannot send message, no logged in user.");
      return;
    }

    if (!this.stompService.connected) {
      console.log('[MessagingService] Not connected via stomp, using http to send message instead.');

      this.http.post<Message>(
        environment.apiUrl + `/chat/${recipientId}`,
        { content },
        { params: { userId: this.loggedInUserId } } // for testing purposes until server auth works properly
      ).subscribe({
        next: msg => console.log("[MessagingService] Message sent via http successfully:", msg),
        error: console.error
      });

      return;
    }

    this.stompService.sendMessage(
      `/app/chat/${recipientId}`,
      { content, senderId: this.loggedInUserId }
    );
  }



  getInbox() {
    return this.http.get<Chat[]>(
      environment.apiUrl + '/chat',
      { params: { userId: this.loggedInUserId } }
    );
  }



  getChat(chatterId: number) {
    return this.http.get<Chat>(
      environment.apiUrl + `/chat/${chatterId}`,
      { params: { userId: this.loggedInUserId } }
    );
  }



  block(chatterId: number) {
    return this.http.post(
      environment.apiUrl + `/chat/${this.loggedInUserId}/block/${chatterId}`,
      {},
      { responseType: 'text' }
    );
  }



  disconnect() {
    this.ss?.unsubscribe();
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

}

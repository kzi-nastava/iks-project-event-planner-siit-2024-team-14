import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private notificationSubject = new Subject<any>();

  constructor() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000, // Automatski reconnect ako se veza prekine
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (msg: string) => console.log(`[WebSocket Debug]: ${msg}`)
    });

    this.stompClient.onConnect = () => {
      console.log('WebSocket povezan.');
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Greška u WebSocket konekciji:', error);
    };

    this.stompClient.activate(); // Aktivacija veze
  }

  getNotifications(userId: number): Observable<any> {
    return new Observable((observer) => {
      this.stompClient.subscribe(`/topic/notifications/${userId}`, (message: IMessage) => {
        observer.next(JSON.parse(message.body));
      });
    });
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('WebSocket isključen.');
    }
  }
}

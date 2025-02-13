import { Injectable } from '@angular/core';
import { Client, IMessage, StompConfig, StompSubscription } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;
  private notificationsSubject = new Subject<any>(); // Subject za real-time notifikacije

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws', // Zameni sa tvojim WS URL-om
      reconnectDelay: 5000, // Automatski pokušaj ponovne konekcije
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  // Metoda za pretplatu na notifikacije
  getNotifications() {
    return this.notificationsSubject.asObservable();
  }

  // Povezivanje na WebSocket i slušanje na notifikacije
  connect() {
    this.client.onConnect = () => {
      this.client.subscribe('/topic/notifications', (message: IMessage) => {
        this.notificationsSubject.next(JSON.parse(message.body)); // Primanje i emitovanje notifikacija
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Greška STOMP:', frame.headers['message']);
      console.error('Detalji:', frame.body);
    };

    this.client.activate(); // Aktivacija konekcije
  }

  // Prekidanje WebSocket konekcije
  disconnect() {
    if (this.client.active) {
      this.client.deactivate(); // Prekid konekcije
    }
  }
}

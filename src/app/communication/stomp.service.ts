import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Client, IMessage} from '@stomp/stompjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class StompService {

  private connectedSubject = new BehaviorSubject<boolean>(false);
  get connected$() { return this.connectedSubject.asObservable(); }
  get connected() { return !!this.client?.connected; }

  private client?: Client;



  constructor() {
    this.initConnection();
  }


  initConnection() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: msg => { /* console.log('[StompService] ', msg); */ }
    });

    this.client.onConnect = () => {
      console.log('[StompService] Connected.');
      this.connectedSubject.next(true);
    }
    this.client.onDisconnect = () => {
      console.log('[StompService] Disconnected.');
      this.connectedSubject.next(false);
    }

    this.client.onStompError = frame => {
      console.error('[StompService] STOMP error.', frame.body);
    };

    this.client.onWebSocketClose = event => {
      console.log('[StompService] WebSocket closed.');
      this.connectedSubject.next(false);
    };

    this.client.onWebSocketError = event => {
      console.error('[StompService] WebSocket error.', event);
    };

    this.client.activate();
  }



  sendMessage(destination: string, body: string | Object) {
    if (!this.client?.connected) {
      console.warn(`[StompService] Cannot send message to '${destination}'. Client not connected.`);
      return;
    }

    this.client!.publish({
      destination,
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  }



  subscribe(destination: string, callback: (msg: IMessage) => void) {
    if (!this.client?.connected) {
      console.warn(`[StompService] Cannot subscribe to '${destination}'. Client not connected.`);
      return;
    }

    const sub = this.client!.subscribe(destination, callback);
    console.log(`[StompService] Subscribed to destination "${destination}".`)
    return sub;
  }



  disconnect() {
    this.client?.deactivate();

    if (this.connectedSubject.value)
      this.connectedSubject.next(false);
  }

}

import { Injectable } from '@angular/core';
import { StompConfig } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class StompConfigService {
  stompConfig: StompConfig = {
    url: 'http://localhost:8080/ws', // URL za WebSocket server (prema backendu)
    headers: {
      // Dodaj zaglavlja ako su potrebna
    },
    heartbeat_in: 0, // Održavanje veze
    heartbeat_out: 20000, // Interval za slanje heartbeat poruka
    reconnect_delay: 5000, // Pokušaj ponovnog povezivanja
    debug: true
  };
}

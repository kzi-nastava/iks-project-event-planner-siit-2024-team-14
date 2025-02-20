import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventModel} from '../../../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class HottestEventsService {
  private apiUrl = 'http://localhost:8080/api/events/top5';

  constructor(private http: HttpClient) {}

  getTopEvents(): Observable<EventModel[]> {
    // Preuzimanje grada iz localStorage
    const userCity = localStorage.getItem('userCity');

    // Ako postoji grad korisnika, koristi ga u URL-u
    const city = userCity ? encodeURIComponent(userCity) : 'Novi Sad';  // Ako nema grada, koristi Novi Sad

    const url = `${this.apiUrl}?city=${city}`;

    return this.http.get<EventModel[]>(url);
  }
}

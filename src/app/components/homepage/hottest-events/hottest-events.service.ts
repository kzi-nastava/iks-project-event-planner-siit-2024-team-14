import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventModel {
  id: number;
  organizerFirstName: string;
  organizerLastName: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  organizerProfilePicture: string;
}

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

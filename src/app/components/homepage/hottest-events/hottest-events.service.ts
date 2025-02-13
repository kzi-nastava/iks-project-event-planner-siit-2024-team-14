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

    // Provera da li postoji grad korisnika
    if (userCity!== null) {
      // Dodavanje grada u URL, kodiranje specijalnih karaktera
      const url = `${this.apiUrl}?city=${encodeURIComponent(userCity)}`;
      return this.http.get<EventModel[]>(url);
    } else {
      // Ako nema grada, vraćamo sve događaje
      return this.http.get<EventModel[]>(this.apiUrl);
    }

  }
}

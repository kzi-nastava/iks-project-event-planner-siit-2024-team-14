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
}

@Injectable({
  providedIn: 'root'
})
export class HottestEventsService {
  private apiUrl = 'http://localhost:8080/api/events/top5?city=Novi%20Sad';

  constructor(private http: HttpClient) {}

  getTopEvents(): Observable<EventModel[]> { // Takođe promenjen tip
    return this.http.get<EventModel[]>(this.apiUrl);
  }
}

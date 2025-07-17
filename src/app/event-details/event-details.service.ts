import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {
  private apiUrl = 'http://localhost:8080/api/events';  // Prilagodi URL prema backendu

  constructor(private http: HttpClient) {}

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

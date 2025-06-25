import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {EventModel} from '../../../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events/all';
  private filterUrl = 'http://localhost:8080/api/events/filter';
  private blockedUsersUrl = 'http://localhost:8080/api/chat/blocked-users';


  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  getFilteredEvents(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.filterUrl, { params });
  }

  getAllLocations(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/events/locations');
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/events/categories');
  }

  getBlockedUsers(): Observable<number[]> {
    const userId = localStorage.getItem('userId');
    console.log(userId);

    if (!userId) {
      return  of([]); // Ako korisnik nije ulogovan, vrati prazan niz
    }

    return this.http.get<number[]>(`${this.blockedUsersUrl}?userId=${userId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {EventModel} from '../../../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class HottestEventsService {
  private apiUrl = 'http://localhost:8080/api/events/top5';

  private blockedUsersUrl = 'http://localhost:8080/api/chat/blocked-users'; //url for blocked users

  constructor(private http: HttpClient) {}

  getTopEvents(): Observable<EventModel[]> {
    const userCity = localStorage.getItem('userCity');
    const city = !userCity || userCity === 'null' ? 'Novi Sad' : userCity;
    const url = `${this.apiUrl}?city=${city}`;

    return this.http.get<EventModel[]>(url);
  }

  getBlockedUsers(): Observable<number[]> {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      return of([]);
    }
    return this.http.get<number[]>(`${this.blockedUsersUrl}?userId=${userId}`);
  }


}

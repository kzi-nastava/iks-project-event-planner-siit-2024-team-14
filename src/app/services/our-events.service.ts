import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventModel} from './hottest-events.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events/all?city=Novi%20Sad';
  private filterUrl = 'http://localhost:8080/api/events/filter';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventModel[]> { // Takođe promenjen tip
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  getFilteredEvents(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.filterUrl, { params });
  }
}

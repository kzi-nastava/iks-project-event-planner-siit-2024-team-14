import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventType} from '../../interfaces/event-type.model'
import {CategoriesEtModel} from '../../interfaces/categories-et.model';

@Injectable({
  providedIn: 'root'
})
export class EventTypeManagementService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllEventTypes(): Observable<EventType[]> {
    return this.http.get<EventType[]>(`${this.baseUrl}/event-types/get-all-categories`);
  }

  getAllCategories(): Observable<CategoriesEtModel[]> {
    return this.http.get<CategoriesEtModel[]>(`${this.baseUrl}/categories/get-all-et`);
  }

  updateEventType(eventData: any) {
    return this.http.put(`${this.baseUrl}/event-types/update`, eventData);
  }

  createEventType(eventData: any) {
    return this.http.post(`${this.baseUrl}/event-types/create`, eventData);
  }

  activateOrDeactivate(event: EventType): Observable<any> {
    return this.http.put(`${this.baseUrl}/event-types/de-activate/${event.id}`, event);
  }
}

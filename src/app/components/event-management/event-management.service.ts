import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesEtModel } from '../../interfaces/categories-et.model';
import { GetEtNamesModel } from '../../interfaces/get-et-names.model';
import { CreateEvent } from '../../interfaces/create-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventManagementService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getEventById(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/events/${eventId}`);
  }

  getAllCategories(): Observable<CategoriesEtModel[]> {
    return this.http.get<CategoriesEtModel[]>(`${this.baseUrl}/categories/get-all-et`);
  }

  getAllEventTypes(): Observable<GetEtNamesModel[]> {
    return this.http.get<GetEtNamesModel[]>(`${this.baseUrl}/event-types/get-all-event`);
  }

  getServicesAndProducts(eventType: string): Observable<CategoriesEtModel[]> {
    return this.http.get<CategoriesEtModel[]>(`${this.baseUrl}/categories/get-by-event-type`, {
      params: { eventType }
    });
  }

  createEvent(formData: FormData): Observable<any> {
    return this.http.post<CreateEvent>(`${this.baseUrl}/events/create-event`, formData);
  }

  /** ✅ Toggles a user's favorite event */
  setFavoriteEvent(userId: number, eventId: number): Observable<{ isFavorite: boolean }> {
    return this.http.post<{ isFavorite: boolean }>(
      `${this.baseUrl}/organizers/${userId}/favorite-events/${eventId}`, {}
    );
  }

  /** ✅ Gets all favorite events for a user */
  getFavoriteEvents(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/organizers/${userId}/favorite-events`);
  }
}

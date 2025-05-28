import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CategoriesEtModel} from '../../interfaces/categories-et.model';
import {GetEtNamesModel} from '../../interfaces/get-et-names.model';
import {HttpClient} from '@angular/common/http';
import {CreateEvent} from '../../interfaces/create-event.model';

@Injectable({
  providedIn: 'root'
})
export class EventManagementService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoriesEtModel[]> {
    return this.http.get<CategoriesEtModel[]>(`${this.baseUrl}/categories/get-all-et`);
  }

  getAllEventTypes(): Observable<GetEtNamesModel[]> {
    return this.http.get<CategoriesEtModel[]>(`${this.baseUrl}/event-types/get-all-event`);
  }

  getServicesAndProducts(eventType: string): Observable<CategoriesEtModel[]> {
    return this.http.get<CategoriesEtModel[]>(`${this.baseUrl}/categories/get-by-event-type`, {
      params: { eventType }
    });
  }

  createEvent(formData: FormData): Observable<any> {
    console.log(formData);
    return this.http.post<CreateEvent>(`${this.baseUrl}/events/create-event`, formData);
  }

}

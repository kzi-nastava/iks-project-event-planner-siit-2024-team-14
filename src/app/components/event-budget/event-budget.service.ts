import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BudgetItem} from './model/budget-item.model';

@Injectable({
  providedIn: 'root'
})
export class EventBudgetService {
  protected baseUrl = "http://localhost:8080/api/events"

  constructor(private http: HttpClient) { }


  deleteEventBudgetItem(eventId: number, categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}/budget/${categoryId}`);
  }

  updateEventBudgetItem(eventId: number, categoryId: number, amount: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${eventId}/budget/${categoryId}`, { amount: amount });
  }

  addEventBudgetItem(eventId: number, categoryId: number, amount: number): Observable<BudgetItem> {
    return this.http.post<BudgetItem>(this.baseUrl + `/${eventId}/budget/${categoryId}`, { amount: amount })
  }

}

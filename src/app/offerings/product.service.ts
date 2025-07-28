import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './model/product.model';
import {environment} from '../../environment/environment';
import {EventModel} from '../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL);
  }

  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseURL + `/${id}`);
  }

  update(product: Partial<Product> & Pick<Product, 'id'>) {
    return this.httpClient.put<Product>(`${this.baseURL}/${product.id}`, product);
  }

  purchase(productId: number, eventId: number) {
    return this.httpClient.post<any>(`${environment.apiUrl}/events/${eventId}/purchases`, productId);
  }

  getOrganizerEvents(organizerId: number) {
    return this.httpClient.get<EventModel[]>(`${environment.apiUrl}/events/by-organizer/${organizerId}`);
  }

}

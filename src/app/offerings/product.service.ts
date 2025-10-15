import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { environment } from '../../environment/environment';
import { EventModel } from '../interfaces/event.model';
import {Product} from './model/product.model';
import {Page} from '../interfaces/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'http://localhost:8080/api/products';

  private productCreated = new Subject<void>();
  productCreated$ = this.productCreated.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAll(params?: any): Observable<Page<Product>> {
    return this.httpClient.get<Page<Product>>(this.baseURL, {params: new HttpParams({fromObject: params})});
  }

  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseURL + '/' + id);
  }

  // NEW: Get events for a specific organizer
  getOrganizerEvents(organizerId: number): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(`${environment.apiUrl}/events/by-organizer/${organizerId}`);
  }

  // NEW: Purchase product for an event
  purchase(productId: number, eventId: number): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/purchases/create`, { productId, eventId });
  }

  update(product: Partial<Product> & Pick<Product, 'id'>) {
    return this.httpClient.put<Product>(`${this.baseURL}/${product.id}`, product);
  }

  create(product: any){
    return this.httpClient.post<Product>(this.baseURL, product);
  }

  delete(product: Pick<Product, 'id'> | Product['id']) {
    return this.httpClient.delete<void>(`${this.baseURL}/${typeof product === 'number' ? product : product.id}`);
  }

  notifyProductCreated() {
    this.productCreated.next();
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseURL}/categories`);
  }

  suggestCategory(category: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/categories/suggest`, category);
  }
}

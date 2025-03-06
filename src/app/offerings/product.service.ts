import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Service} from './model/service.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.baseURL);
  }

  getById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.baseURL + `/${id}`);
  }
}

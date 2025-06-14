import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseURL);
  }

  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseURL + `/${id}`);
  }
}

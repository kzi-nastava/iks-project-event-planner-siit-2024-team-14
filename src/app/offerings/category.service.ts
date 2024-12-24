import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './model/category.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = `${environment.apiHost}/api/categories`;

  constructor(private httpClient: HttpClient) { }


  add(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseURL, category);
  }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseURL);
  }

  getById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseURL}/${id}`)
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}

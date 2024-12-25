import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './model/category.model';
import {Observable} from 'rxjs';
import {environment} from '../../env/environment'
import {HasId} from './model/has-id.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = `${environment.apiHost}/api/categories`;

  constructor(private httpClient: HttpClient) { }


  add(category: Category): Observable<Category & HasId> {
    return this.httpClient.post<Category & HasId>(this.baseURL, category);
  }

  getAll(): Observable<(Category & HasId)[]> {
    return this.httpClient.get<(Category & HasId)[]>(this.baseURL);
  }

  getById(id: number): Observable<Category & HasId> {
    return this.httpClient.get<Category & HasId>(`${this.baseURL}/${id}`)
  }

  delete(identifiable: number | HasId): Observable<any> {
    const resolvedId = typeof identifiable === 'number' ? identifiable : identifiable.id;
    return this.httpClient.delete(`${this.baseURL}/${resolvedId}`);
  }

  update(category: Category & HasId): Observable<Category & HasId> {
    return this.httpClient.put<Category & HasId>(this.baseURL, category);
  }
}

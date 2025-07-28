import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './model/category.model';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseURL = `${environment.apiUrl}/categories`;

  constructor(private httpClient: HttpClient) { }


  add(category: Category) {
    return this.httpClient.post<Category>(this.baseURL, category);
  }

  getAll() {
    return this.httpClient.get<Category[]>(this.baseURL);
  }

  getById(id: Category['id']) {
    return this.httpClient.get<Category>(`${this.baseURL}/${id}`)
  }

  delete(categoryOrId: Pick<Category, 'id'> | Category['id']) {
    const id = typeof categoryOrId === 'object' ? categoryOrId.id : categoryOrId;
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  update(category: Partial<Category> & Pick<Category, 'id'>) {
    return this.httpClient.put<Category>(this.baseURL, category);
  }

}

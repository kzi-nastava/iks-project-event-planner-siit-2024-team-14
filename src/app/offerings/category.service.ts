import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './model/category.model';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected baseUrl = `${environment.apiUrl}/categories`

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

}

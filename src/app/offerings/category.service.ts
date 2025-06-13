import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './model/category.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected baseUrl = 'http://localhost:8080/api/categories'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

}

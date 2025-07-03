import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SolutionModel} from '../../../interfaces/solution.model';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private apiUrl = 'http://localhost:8080/api/solutions/all';
  private filterUrl = 'http://localhost:8080/api/solutions/filter';
  private blockedUsersUrl = 'http://localhost:8080/api/chat/blocked-users'; // URL za blokirane korisnike


  constructor(private http: HttpClient) {}

  getAllSolutions(): Observable<SolutionModel[]> {
    return this.http.get<SolutionModel[]>(this.apiUrl);
  }

  getFilteredSolutions(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.filterUrl, { params });
  }

  getAllLocations(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/solutions/locations');
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/solutions/categories');
  }

  getBlockedUsers(): Observable<number[]> {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      return of([]);
    }

    return this.http.get<number[]>(`${this.blockedUsersUrl}?userId=${userId}`);
  }
}

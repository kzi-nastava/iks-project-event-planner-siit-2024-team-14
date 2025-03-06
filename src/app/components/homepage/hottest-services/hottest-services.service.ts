import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SolutionModel} from '../../../interfaces/solution.model';


@Injectable({
  providedIn: 'root'
})
export class HottestSolutionsService {
  private apiUrl = 'http://localhost:8080/api/solutions/top5';
  private blockedUsersUrl = 'http://localhost:8080/api/chat/blocked-users'; // URL za blokirane korisnike


  constructor(private http: HttpClient) {}

  getTopSolutions(): Observable<SolutionModel[]> {
    const userCity = localStorage.getItem('userCity');
    const city = userCity ? encodeURIComponent(userCity) : 'Novi Sad';

    const url = `${this.apiUrl}?city=${city}`;

    return this.http.get<SolutionModel[]>(url);
  }

  getBlockedUsers(): Observable<number[]> {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      return of([]);
    }

    return this.http.get<number[]>(`${this.blockedUsersUrl}?userId=${userId}`);
  }

}

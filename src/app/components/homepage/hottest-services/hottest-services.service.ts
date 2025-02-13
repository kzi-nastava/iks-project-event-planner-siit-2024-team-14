import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SolutionModel {
  id: number;
  providerCompanyName: string;
  providerLastName: string;
  name: string;
  description: string;
  location: string;
  price: string;
  discount: string;
  imageUrl: string;
  solutionType: string;
}

@Injectable({
  providedIn: 'root'
})
export class HottestSolutionsService {
  private apiUrl = 'http://localhost:8080/api/solutions/top5';

  constructor(private http: HttpClient) {}

  getTopSolutions(): Observable<SolutionModel[]> {
    // Preuzimanje grada iz localStorage
    const userCity = localStorage.getItem('userCity');

    // Ako postoji grad korisnika, koristi ga u URL-u
    if (userCity !== null) {
      const url = `${this.apiUrl}?city=${encodeURIComponent(userCity)}`;
      return this.http.get<SolutionModel[]>(url);
    } else {
      // Ako nema grada, koristi Novi Sad kao podrazumevani grad
      const url = `${this.apiUrl}?city=Novi%20Sad`;
      return this.http.get<SolutionModel[]>(url);
    }
  }

}

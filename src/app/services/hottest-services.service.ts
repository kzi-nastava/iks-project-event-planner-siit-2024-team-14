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
}

@Injectable({
  providedIn: 'root'
})
export class HottestSolutionsService {
  private apiUrl = 'http://localhost:8080/api/solutions/top5?city=Novi%20Sad';

  constructor(private http: HttpClient) {}

  getTopSolutions(): Observable<SolutionModel[]> { // Takođe promenjen tip
    return this.http.get<SolutionModel[]>(this.apiUrl);
  }
}

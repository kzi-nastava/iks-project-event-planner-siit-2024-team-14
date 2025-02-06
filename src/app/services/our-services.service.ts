import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SolutionModel} from './hottest-services.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private apiUrl = 'http://localhost:8080/api/solutions/all?city=Novi%20Sad';
  private filterUrl = 'http://localhost:8080/api/solutions/filter';

  constructor(private http: HttpClient) {}

  getAllSolutions(): Observable<SolutionModel[]> {
    return this.http.get<SolutionModel[]>(this.apiUrl);
  }

  getFilteredSolutions(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.filterUrl, { params });
  }
}

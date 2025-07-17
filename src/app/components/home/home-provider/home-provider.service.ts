import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeProviderService {

  private apiUrl = 'http://localhost:8080/api/providers'; // Base API URL

  constructor(private http: HttpClient) { }

  // Function to fetch user details by ID
  getProviderById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${userId}`);
  }
}

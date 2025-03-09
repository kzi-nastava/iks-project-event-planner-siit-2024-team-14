import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeOrganizerService {

  private apiUrl = 'http://localhost:8080/api/organizers'; // Base API URL

  constructor(private http: HttpClient) { }

  // Function to fetch user details by ID
  getOrganizerById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${userId}`);
  }
}

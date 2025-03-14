import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  activateAccount(token: string, role: string): Observable<any> {
    if (role === "ServiceAndProductProvider") {
      return this.http.get(`${this.baseUrl}/providers/activate?token=${token}`);
    }
    return this.http.get(`${this.baseUrl}/organizers/activate?token=${token}`);
  }
}

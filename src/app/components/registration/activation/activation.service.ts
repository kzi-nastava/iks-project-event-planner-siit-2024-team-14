import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivationService {
  private baseUrl = 'http://localhost:8080/api/providers';

  constructor(private http: HttpClient) {}

  activateAccount(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/activate?token=${token}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../../interfaces/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/users/login'; // Backend endpoint

  constructor(private http: HttpClient) {}

  // Login API call
  login(data: Login): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}

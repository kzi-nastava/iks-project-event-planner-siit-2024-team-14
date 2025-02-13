import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationSpp } from '../../../interfaces/registration-spp.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationSppService {

  private apiUrl = 'http://localhost:8080/api/providers/register';

  constructor(private http: HttpClient) {}

  register(data: RegistrationSpp): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true  // This sends credentials (cookies, etc.)
    });
  }
}

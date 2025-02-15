import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistrationSpp} from '../../../interfaces/registration-spp.model';
import {Observable} from 'rxjs';
import {RegistrationEo} from '../../../interfaces/registration-eo.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationEoService {

  private apiUrl = 'http://localhost:8080/api/organizers/register';

  constructor(private http: HttpClient) { }

  register(data: RegistrationEo): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true  // This sends credentials (cookies, etc.)
    });
  }
}

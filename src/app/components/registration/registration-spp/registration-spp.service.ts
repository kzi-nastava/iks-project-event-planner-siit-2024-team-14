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

  register(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}

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

  register(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData); // Ensure the backend supports multipart/form-data
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuService {

  private providerUrl = 'http://localhost:8080/api/providers/upgrade-to-provider';
  private organizerUrl = 'http://localhost:8080/api/organizers/upgrade-to-organizer';

  constructor(private http: HttpClient) {}

  updateAsProvider(formData: FormData): Observable<any> {
    return this.http.post(this.providerUrl, formData, { responseType: 'text' });
  }

  updateAsOrganizer(formData: FormData): Observable<any> {
    return this.http.post(this.organizerUrl, formData, { responseType: 'text' });
  }
}

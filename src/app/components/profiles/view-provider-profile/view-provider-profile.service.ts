import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewProviderProfileService {
  private apiUrl = 'http://localhost:8080/api/providers';

  constructor(private http: HttpClient) {}

  getOrganizerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}

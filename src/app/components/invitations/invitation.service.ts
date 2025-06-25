import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private baseUrl = 'http://localhost:8080/api/invitations';

  constructor(private http: HttpClient) {}

  // Provera da li je email registrovan korisnik
  checkUserByEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check?email=${encodeURIComponent(email)}`);
  }

  // Slanje pozivnica
  sendInvitations(emails: string[], eventId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/send`, {
      eventId,
      emails
    });
  }
}

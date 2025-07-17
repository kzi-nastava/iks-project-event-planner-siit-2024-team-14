import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from '../../interfaces/event.model';
import {InvitationModel} from '../../interfaces/invitation.model';

@Injectable({ providedIn: 'root' })
export class InvitationService {

  private apiUrl = 'http://localhost:8080/api/invitations';

  constructor(private http: HttpClient) {}

  sendInvitations(eventId: number, emails: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/bulk`, {
      eventId: eventId,
      guestEmails: emails
    });
  }

  getInvitationsForOrganizer(organizerId: number): Observable<{
    event: EventModel,
    invitations: InvitationModel[]
  }[]> {
    return this.http.get<{
      event: EventModel,
      invitations: InvitationModel[]
    }[]>(`http://localhost:8080/api/invitations/by-organizer/${organizerId}`);
  }


  getInvitationsForEvent(eventId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/event/${eventId}`);
  }

  updateInvitationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, null, { params: { status } });
  }
}

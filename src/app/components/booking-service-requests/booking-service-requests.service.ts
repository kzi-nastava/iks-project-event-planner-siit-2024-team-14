import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {BookingServiceRequestModel} from '../../interfaces/booking-service-request.model';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceRequestsService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<BookingServiceRequestModel[]> {
    return this.http.get<BookingServiceRequestModel[]>(`${this.apiUrl}/requests`);
  }

  approveRequestStatus(requestId: number, approved: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve`, { requestId, approved })
        .pipe(
            catchError(error => {
              alert(error.error || 'Unable to approve booking. The selected time slot is already booked. Please contact the event organizer or reject the request.');
              return throwError(() => new Error(error.error || 'Something went wrong!'));
            })
        );
  }

  deleteRequestStatus(requestId: number, approved: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delete`, { requestId, approved });
  }
}

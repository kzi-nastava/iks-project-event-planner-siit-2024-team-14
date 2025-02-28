import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BookingServiceRequestModel} from '../../interfaces/booking-service-request.model';

@Injectable({
  providedIn: 'root'
})
export class AllBookingsProviderService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<BookingServiceRequestModel[]> {
    return this.http.get<BookingServiceRequestModel[]>(`${this.apiUrl}/all`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingServiceRequestModel } from '../../interfaces/booking-service-request.model';

@Injectable({
  providedIn: 'root'
})
export class AllBookingsProviderService {
  private apiUrl = 'http://localhost:8080/api/bookings';

  private bookingsSubject = new BehaviorSubject<BookingServiceRequestModel[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadAllBookings(): void {
    this.http.get<BookingServiceRequestModel[]>(`${this.apiUrl}/all`).subscribe((bookings) => {
      this.bookingsSubject.next(bookings);
    });
  }

  updateLocalBookingStatus(bookingId: number, newStatus: string): void {
    const updatedBookings = this.bookingsSubject.value.map(booking =>
      booking.id === bookingId ? { ...booking, confirmed: newStatus } : booking
    );
    this.bookingsSubject.next(updatedBookings);
  }
}

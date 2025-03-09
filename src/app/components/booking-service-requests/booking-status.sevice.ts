import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookingServiceRequestModel } from '../../interfaces/booking-service-request.model';

@Injectable({
  providedIn: 'root'
})
export class BookingStatusService {
  private bookingsSubject = new BehaviorSubject<BookingServiceRequestModel[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  updateBookings(bookings: BookingServiceRequestModel[]) {
    this.bookingsSubject.next(bookings);
  }
}

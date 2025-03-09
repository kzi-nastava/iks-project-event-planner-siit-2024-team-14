import { Component, Input, OnInit } from '@angular/core';
import { AllBookingsProviderService } from './all-bookings-provider.service';
import { BookingServiceRequestModel } from '../../interfaces/booking-service-request.model';

@Component({
  selector: 'app-all-bookings-provider',
  templateUrl: './all-bookings-provider.component.html',
  styleUrls: ['./all-bookings-provider.component.css']
})
export class AllBookingsProviderComponent implements OnInit {
  @Input() isBookingsOpen: boolean = false;
  bookings: BookingServiceRequestModel[] = [];

  constructor(private allBookingsProviderService: AllBookingsProviderService) {}

  ngOnInit(): void {
    this.allBookingsProviderService.loadAllBookings();
    this.allBookingsProviderService.bookings$.subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  closeRequests() {
    this.isBookingsOpen = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'approved';
      case 'PENDING':
        return 'pending';
      case 'REJECTED':
        return 'rejected';
      default:
        return '';
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BookingServiceRequestsService } from './booking-service-requests.service';
import { BookingServiceRequestModel } from '../../interfaces/booking-service-request.model';
import { AllBookingsProviderService } from '../all-bookings-provider/all-bookings-provider.service';

@Component({
  selector: 'app-booking-service-requests',
  templateUrl: './booking-service-requests.component.html',
  styleUrls: ['./booking-service-requests.component.css']
})
export class BookingServiceRequestsComponent implements OnInit {
  @Input() isBookingRequestsOpen: boolean = false;
  requests: BookingServiceRequestModel[] = [];

  constructor(
      private bookingServiceRequestsService: BookingServiceRequestsService,
      private allBookingsProviderService: AllBookingsProviderService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.bookingServiceRequestsService.getAllRequests().subscribe((requests) => {
      this.requests = requests;
    });
  }

  approveRequest(request: BookingServiceRequestModel) {
    this.bookingServiceRequestsService.approveRequestStatus(request.id, "APPROVED").subscribe(() => {
      request.confirmed = "APPROVED";
      alert('Request approved!');
      this.allBookingsProviderService.updateLocalBookingStatus(request.id, "APPROVED");
    });
  }

  deleteRequest(request: BookingServiceRequestModel) {
    this.bookingServiceRequestsService.deleteRequestStatus(request.id, "REJECTED").subscribe(() => {
      request.confirmed = "REJECTED";
      alert('Request rejected!');
      this.allBookingsProviderService.updateLocalBookingStatus(request.id, "REJECTED");
    });
  }

  closeRequests() {
    this.isBookingRequestsOpen = false;
  }
}

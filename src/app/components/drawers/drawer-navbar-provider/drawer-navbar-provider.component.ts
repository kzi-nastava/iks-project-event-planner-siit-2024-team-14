import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-drawer-navbar-provider',
  templateUrl: './drawer-navbar-provider.component.html',
  styleUrls: ['./drawer-navbar-provider.component.css'],
})

export class DrawerNavbarProviderComponent {
  @Input() isSidebarOpen: boolean = false;
  isNotificationsOpen = false;
  @Output() toggleNotifications = new EventEmitter<boolean>();

  isBookingRequestsOpen = false;
  @Output() toggleBookingRequests = new EventEmitter<boolean>();

  isBookingsOpen = false;
  @Output() toggleBookings = new EventEmitter<boolean>();

  toggleNotificationsSidebar() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.toggleNotifications.emit(this.isNotificationsOpen);
  }

  toggleBookingRequestsSidebar() {
    this.isBookingRequestsOpen = !this.isBookingRequestsOpen;
    this.toggleBookingRequests.emit(this.isBookingRequestsOpen);
  }

  toggleBookingsSidebar() {
    this.isBookingsOpen = !this.isBookingsOpen;
    this.toggleBookings.emit(this.isBookingsOpen);
  }
}

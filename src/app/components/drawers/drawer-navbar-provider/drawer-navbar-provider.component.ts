import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
@Component({
  selector: 'app-drawer-navbar-provider',
  templateUrl: './drawer-navbar-provider.component.html',
  styleUrls: ['./drawer-navbar-provider.component.css'],
})

export class DrawerNavbarProviderComponent {

  constructor(private dialog: MatDialog, private router: Router) { }

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

  logOut() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Log out',
        message: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.clear();
        window.location.href = '/home-guest';
      }
    });
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-drawer-navbar-organizer',
  templateUrl: './drawer-navbar-organizer.component.html',
  styleUrls: ['./drawer-navbar-organizer.component.css'],
})

export class DrawerNavbarOrganizerComponent {
  constructor(private router: Router, private dialog: MatDialog,) {
  }

  @Input() isSidebarOpen: boolean = false;

  isNotificationsOpen = false;
  @Output() toggleNotifications = new EventEmitter<boolean>();

  toggleNotificationsSidebar() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.toggleNotifications.emit(this.isNotificationsOpen);
  }

  navigateToMyEvents() {
    this.router.navigate(['my-events-eo']);
  }

  navigateToMyInvitations() {
    this.router.navigate(['all-invitation']);
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

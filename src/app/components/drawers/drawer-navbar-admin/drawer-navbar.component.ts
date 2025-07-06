import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-drawer-navbar-admin',
  templateUrl: './drawer-navbar.component.html',
  styleUrls: ['./drawer-navbar.component.css'],
})

export class DrawerNavbarComponent {

  constructor(private dialog: MatDialog, private router: Router) { }

  @Input() isSidebarOpen: boolean = false;
  isCommentsOpen = false;
  @Output() toggleComments = new EventEmitter<boolean>();

  isNotificationsOpen = false;
  @Output() toggleNotifications = new EventEmitter<boolean>();

  isReportsOpen = false;
  @Output() toggleReports = new EventEmitter<boolean>();

  // Opens and closes comments sidebar
  toggleCommentsSidebar() {
    this.isCommentsOpen = !this.isCommentsOpen;
    this.toggleComments.emit(this.isCommentsOpen);
  }

  toggleNotificationsSidebar() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.toggleNotifications.emit(this.isNotificationsOpen);
  }

  toggleReportsSidebar() {
    this.isReportsOpen = !this.isReportsOpen;
    this.toggleReports.emit(this.isReportsOpen);
  }

  navigateToEventTypeManagement() {
    this.router.navigate(['event-type-management']);
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

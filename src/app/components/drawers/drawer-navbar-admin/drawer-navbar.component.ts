import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-drawer-navbar-admin',
  templateUrl: './drawer-navbar.component.html',
  styleUrls: ['./drawer-navbar.component.css'],
})

export class DrawerNavbarComponent {
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
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-drawer-navbar-organizer',
  templateUrl: './drawer-navbar-organizer.component.html',
  styleUrls: ['./drawer-navbar-organizer.component.css'],
})

export class DrawerNavbarOrganizerComponent {
  constructor(private router: Router) {
  }

  @Input() isSidebarOpen: boolean = false;

  isNotificationsOpen = false;
  @Output() toggleNotifications = new EventEmitter<boolean>();

  toggleNotificationsSidebar() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.toggleNotifications.emit(this.isNotificationsOpen);
  }

  navigateToMyEvents() {
    this.router.navigate(['my-events-od']);
  }
}

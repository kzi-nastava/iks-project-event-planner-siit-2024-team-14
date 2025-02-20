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

  toggleNotificationsSidebar() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    this.toggleNotifications.emit(this.isNotificationsOpen);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-drawer-navbar-provider',
  templateUrl: './drawer-navbar-provider.component.html',
  styleUrls: ['./drawer-navbar-provider.component.css'],
})

export class DrawerNavbarProviderComponent {
  @Input() isSidebarOpen: boolean = false;
  isCommentsOpen = false;
  @Output() toggleComments = new EventEmitter<boolean>();

  // Opens and closes comments sidebar
  toggleNotificationsSidebar() {
    this.isCommentsOpen = !this.isCommentsOpen;
    this.toggleComments.emit(this.isCommentsOpen);
  }
}

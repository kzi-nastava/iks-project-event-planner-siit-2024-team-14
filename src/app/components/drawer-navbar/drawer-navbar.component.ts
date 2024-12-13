import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-drawer-navbar',
  templateUrl: './drawer-navbar.component.html',
  styleUrls: ['./drawer-navbar.component.css'],
})

export class DrawerNavbarComponent {
  @Input() isSidebarOpen: boolean = false;
  isCommentsOpen = false;

  // Opens comments sidebar
  openComments() {
    this.isCommentsOpen = true;
  }

  // Closes comments sidebar
  closeComments() {
    this.isCommentsOpen = false;
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-drawer-navbar-organizer',
  templateUrl: './drawer-navbar-organizer.component.html',
  styleUrls: ['./drawer-navbar-organizer.component.css'],
})

export class DrawerNavbarOrganizerComponent {
  @Input() isSidebarOpen: boolean = false;
  isCommentsOpen = false;
  @Output() toggleComments = new EventEmitter<boolean>();

  // Opens and closes comments sidebar
  toggleCommentsSidebar() {
    this.isCommentsOpen = !this.isCommentsOpen;
    this.toggleComments.emit(this.isCommentsOpen);
  }
}

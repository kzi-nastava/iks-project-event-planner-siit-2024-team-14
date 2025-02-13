import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-drawer-navbar',
  templateUrl: './drawer-navbar.component.html',
  styleUrls: ['./drawer-navbar.component.css'],
})

export class DrawerNavbarComponent {
  @Input() isSidebarOpen: boolean = false;
  isCommentsOpen = false;
  @Output() toggleComments = new EventEmitter<boolean>();

  // Opens and closes comments sidebar
  toggleCommentsSidebar() {
    this.isCommentsOpen = !this.isCommentsOpen;
    this.toggleComments.emit(this.isCommentsOpen);
  }
}

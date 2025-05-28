import { Component } from '@angular/core';

@Component({
  selector: 'my-events-od',
  templateUrl: './my-events-od.component.html',
  styleUrl: './my-events-od.component.css'
})
export class MyEventsOdComponent {
  showCreatePopup = false;

  // HEADER ----------------------------------------------------------------------
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;
  unreadCount: number = 0;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
  //------------------------------------------------------------------------

  // get selected event and open popup
  createEvent(): void {
    this.showCreatePopup = true;
  }

  closePopup(): void {
    this.showCreatePopup = false;
  }
}

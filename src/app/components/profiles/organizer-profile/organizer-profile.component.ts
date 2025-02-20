import { Component, OnInit } from '@angular/core';
import { HomeOrganizerService } from '../../home/home-organizer/home-organizer.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent {
  user: any;
  isSidebarOpen: boolean = false;

  constructor() {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }
}

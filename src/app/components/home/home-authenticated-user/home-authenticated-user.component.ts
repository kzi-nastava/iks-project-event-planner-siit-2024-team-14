import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home-authenticated-user.component.html',
  styleUrls: ['./home-authenticated-user.component.css']
})
export class HomeAuthenticatedUserComponent {
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }
}


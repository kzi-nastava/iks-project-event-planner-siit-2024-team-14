import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-guest',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  ngOnInit() {
    // localStorage.clear();
  }
}


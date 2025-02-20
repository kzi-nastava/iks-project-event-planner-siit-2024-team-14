import {Component, OnInit} from '@angular/core';
import {HomeOrganizerService} from "./home-organizer.service";

@Component({
  selector: 'app-home-guest-organizer',
  templateUrl: './home-organizer.component.html',
  styleUrls: ['./home-organizer.component.css']
})
export class HomeOrganizerComponent implements OnInit {
  title = 'Welcome to the Home Page!';
  isSidebarOpen: boolean = false;
  user: any;

  constructor(private userService: HomeOrganizerService) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); // Assign to class property
    }

    if (this.user && this.user.id) {
      this.fetchUserDetails(this.user.id); // Fetch user details
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  fetchUserDetails(userId: number): void {
    this.userService.getOrganizerById(userId).subscribe(
        (response: any) => {
          localStorage.setItem('user', JSON.stringify(response.organizer)); // Store new data
          this.user = response.organizer; // Update this.user with new data
          console.log('User details updated:', this.user);
        },
        (error: any) => {
          console.error('Error fetching user details:', error);
        }
    );
  }
}


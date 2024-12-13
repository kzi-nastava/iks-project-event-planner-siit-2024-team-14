import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-drawer-navbar',
  templateUrl: './drawer-navbar.component.html',
  styleUrls: ['./drawer-navbar.component.css'],
})
export class DrawerNavbarComponent {
  @Input() isSidebarOpen: boolean = false;
  isCommentsOpen = false; // For comments sidebar

  // Sample comments data
  comments = [
    {
      username: 'Petar Petrović',
      stars: [1, 1, 1, 1, 0.5],
      text: 'This was the worst service ever! The staff was horrible, and the whole thing was a waste of money.',
      provider: 'Hleb & Knife',
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
    },

    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
    },

    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
    },
    // Dodaj još komentara ovde za testiranje
  ];

  // Toggles navigation sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Opens comments sidebar
  openComments() {
    this.isCommentsOpen = true;
  }

  // Closes comments sidebar
  closeComments() {
    this.isCommentsOpen = false;
  }

  // Approves a comment
  approveComment() {
    alert('Comment approved!');
  }

  // Deletes a comment
  deleteComment() {
    alert('Comment deleted!');
  }
}

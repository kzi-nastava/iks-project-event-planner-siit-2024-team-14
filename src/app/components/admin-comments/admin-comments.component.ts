import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrl: './admin-comments.component.css'
})
export class AdminCommentsComponent {
  isCommentsOpen: boolean = true;

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
    }
  ];

  // Approves a comment
  approveComment() {
    alert('Comment approved!');
  }

  // Deletes a comment
  deleteComment() {
    alert('Comment deleted!');
  }

  closeComments() {
    this.isCommentsOpen = false;
  }
}

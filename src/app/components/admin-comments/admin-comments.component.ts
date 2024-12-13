import { Component, Input } from '@angular/core';

interface Comment {
  username: string;
  stars: number[];
  text: string;
  provider: string;
}

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent {
  @Input() isCommentsOpen: boolean = false; // Prima stanje otvaranja komentara

  comments: Comment[] = [
    {
      username: 'Petar Petrović',
      stars: [1, 1, 1, 1],
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
      stars: [1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1],
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

  // Metoda za zatvaranje komentara
  closeComments() {
    this.isCommentsOpen = false;
  }
}

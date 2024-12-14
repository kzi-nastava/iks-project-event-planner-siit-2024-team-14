import { Component, Input } from '@angular/core';

interface Comment {
  username: string;
  stars: number[];  //rating
  text: string;  //content
  provider: string;
  status: string;
  //date
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
      status: "pending"
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
      status: "pending"
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
      status: "pending"
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
      status: "pending"
    },
    {
      username: 'Miloš Nikolić',
      stars: [1, 1, 1, 1, 1],
      text: 'Great experience! Highly recommend.',
      provider: 'Fancy Catering',
      status: "accepted"
    }
  ];

  // Approves a comment
  approveComment(comment: Comment) {
    comment.status = 'accepted';  //needs real change in db
    alert('Comment approved!');
  }

  // Deletes a comment
  deleteComment(comment: Comment) {
    comment.status = 'declined';   //needs real change in db
    alert('Comment deleted!');
  }

  // Metoda za zatvaranje komentara
  closeComments() {
    this.isCommentsOpen = false;
  }
}

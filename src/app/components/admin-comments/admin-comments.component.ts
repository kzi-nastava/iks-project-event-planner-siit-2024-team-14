import { Component, Input, OnInit } from '@angular/core';
import { CommentService, CommentModel } from './admin-comments.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  @Input() isCommentsOpen: boolean = false; // Prima stanje otvaranja komentara
  comments: CommentModel[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    // Dohvati sve komentare sa statusom 'pending'
    this.loadPendingComments();
  }

  // Metoda za učitavanje komentara
  loadPendingComments() {
    this.commentService.getAllComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  // Kreiranje niza zvezdica prema ratingu komentara
  createStarsArray(rating: number): number[] {
    return new Array(rating).fill(0); // Vraća niz sa toliko elemenata koliko je ocena
  }

  // Odobravanje komentara
  approveComment(comment: CommentModel) {
    this.commentService.approveCommentStatus(comment.id, 'accepted').subscribe(() => {
      comment.status = 'accepted';  // Promeni status na frontu
      alert('Comment approved!');
    });

  }

  // Brisanje komentara (logičko brisanje)
  deleteComment(comment: CommentModel) {
    this.commentService.deleteCommentStatus(comment.id, 'deleted').subscribe(() => {
      comment.status = 'deleted';  // Promeni status na frontu
      alert('Comment deleted!');
    });
  }

  // Metoda za zatvaranje komentara
  closeComments() {
    this.isCommentsOpen = false;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './admin-comments.service';
import { CommentModel } from '../../interfaces/comment.model';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  @Input() isCommentsOpen: boolean = false;
  comments: CommentModel[] = [];

  baseUrl = 'http://localhost:8080/';

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadPendingComments();
  }

  loadPendingComments() {
    this.commentService.getAllComments().subscribe((comments) => {
      this.comments = comments.map(comment => this.addFullProfilePicUrl(comment));
    });
  }

  createStarsArray(rating: number): number[] {
    return new Array(rating).fill(0);
  }

  approveComment(comment: CommentModel) {
    this.commentService.approveCommentStatus(comment.id, 'accepted').subscribe(() => {
      comment.status = 'accepted';
      alert('Comment approved!');
    });
  }

  deleteComment(comment: CommentModel) {
    this.commentService.deleteCommentStatus(comment.id, 'deleted').subscribe(() => {
      comment.status = 'deleted';
      alert('Comment deleted!');
    });
  }

  closeComments() {
    this.isCommentsOpen = false;
  }

  private addFullProfilePicUrl(comment: CommentModel): CommentModel {
    return {
      ...comment,
      commenterProfilePicture: comment.commenterProfilePicture && !comment.commenterProfilePicture.startsWith('http')
        ? this.baseUrl + comment.commenterProfilePicture
        : comment.commenterProfilePicture
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CommentModel} from '../../interfaces/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  // Dohvati sve komentare sa statusom 'pending'
  getAllComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.apiUrl}/pending`);
  }

  // Ažuriraj status komentara (odobri ili obriši)
  approveCommentStatus(commentId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve`, { commentId, status });
  }

  // Ažuriraj status komentara (odobri ili obriši)
  deleteCommentStatus(commentId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delete`, { commentId, status });
  }
}

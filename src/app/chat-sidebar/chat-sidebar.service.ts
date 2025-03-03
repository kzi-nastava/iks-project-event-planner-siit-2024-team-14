import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlockedUserModel } from '../interfaces/BlockedUser';

@Injectable({
  providedIn: 'root'
})

export class ChatSidebarService {
  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  block(loggedUserId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${loggedUserId}/block/${userId}`, {}, { responseType: 'text' as 'json' });
  }
}

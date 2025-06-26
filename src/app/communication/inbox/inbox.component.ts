import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Chat } from '../model/chat.model';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {MessagingService} from '../messaging.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit, OnDestroy {
  inbox: Chat[] = [];
  selectedChat?: Chat;

  protected get selectedChatter() {
    return this.selectedChat ? this.getChatter(this.selectedChat) : undefined;
  }



  constructor(private auth: AuthService, private messagingService: MessagingService, private route: ActivatedRoute, protected router: Router, private http: HttpClient) { }



  protected getChatter(chat: Chat) {
    let me = this.auth.user!;
    return chat.recipient.id === me?.id ? chat.sender : chat.recipient;
  }


  private subs: Subscription[] = [];

  ngOnInit() {
    let sub1 = this.auth.user$.subscribe(u => {
      this.selectedChat = undefined;
      if (u)
        this.loadInbox(u)
      else
        this.router.navigate(['/login']).then();
    });

    let sub2 = this.messagingService.message$.subscribe(msg => {
      if (!this.inbox.some(chat => chat.id === msg.chatId))
        this.loadInbox();
    });

    this.subs.push(sub1, sub2);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }


  private loadInbox(_user?: any) { console.log('Loading inbox...')
    this.inbox.splice(0, this.inbox.length);
    let user = _user ?? this.auth.user;

    if (!user)
      return;

    let sub = this.messagingService.getInbox().subscribe({
      next: inbox => {
        this.inbox.push(...inbox);

        const email = this.route.snapshot.params['email'];
        if (email)
          this.selectUserByEmail(email);
      },
      error: err => console.error("[InboxComponent] Failed to load user inbox:", err)
    });

    this.subs.push(sub);
  }

  private selectUserByEmail(email: string) {

    this.http.get<{id: number}>(environment.apiUrl + `/users/~${email}`).subscribe({
      next: chatter => {
        let chat = this.inbox.find(c => chatter.id === c.sender.id || chatter.id === c.recipient.id);
        if (chat) {
          this.selectedChat = chat;
          return;
        }

        this.messagingService.getChat(chatter.id)
          .subscribe({
            next: chat => this.inbox.push(this.selectedChat = chat),
            error: err => {
              console.error(err);
              this.router.navigate(['/chat']).then();
            }
          });
      },
      error: err => {
        console.error(err);
        this.router.navigate(['/chat']).then();
      }
    })
  }

}

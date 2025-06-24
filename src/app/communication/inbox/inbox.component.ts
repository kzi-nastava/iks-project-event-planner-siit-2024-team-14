import {Component, OnDestroy, OnInit} from '@angular/core';
import { Chat } from '../model/chat.model';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {MessagingService} from '../messaging.service';
import {Subscription} from 'rxjs';

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



  constructor(private auth: AuthService, private messagingService: MessagingService) { }



  protected getChatter(chat: Chat) {
    let me = this.auth.user!;
    return chat.recipient.id === me?.id ? chat.sender : chat.recipient;
  }


  private subs: Subscription[] = [];

  ngOnInit() {
    let sub1 = this.auth.user$.subscribe(u => {
      this.selectedChat = undefined;
      this.loadInbox();
    });

    let sub2 = this.messagingService.message$.subscribe(msg => {
      if (!this.inbox.some(chat => chat.id === msg.chatId))
        this.loadInbox();
    })

    this.subs.push(sub1, sub2);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }


  private loadInbox() {

    if (!this.auth.user) {
      this.inbox = [];
      return;
    }

    let sub = this.messagingService.getInbox().subscribe({
      next: inbox => this.inbox = inbox,
      error: err => console.error("[InboxComponent] Failed to load user inbox:", err)
    });

    this.subs.push(sub);
  }

}

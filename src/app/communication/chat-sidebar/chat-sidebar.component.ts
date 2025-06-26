import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChatSidebarService} from './chat-sidebar.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Message} from '../model/message.model';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {MessagingService} from '../messaging.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit, OnDestroy {
  c = { id: NaN } as any;

  get chatter(): any { return this.c; }

  @Input({required: true})
  set chatter(chatter: number | { id: number }) {
    if (chatter) {
      this.c = typeof chatter === 'number' ? { id: chatter } : chatter;
      this.loadMessages();
    }
  }

  @Input() chaterName: string = 'Organizer Name';
  @Input() isOpen: boolean = false;
  @Input() chaterPhotoUrl: string = " ";
  @Input() chaterId: number = -1;

  showOptions: boolean = false;
  newMessage: string = '';
  role: string | null = '';

  protected messages: Message[] = [];

  constructor(protected auth: AuthService, private chatService : ChatSidebarService, private router: Router, private messagingService: MessagingService) {}

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  blockUser() {
    const loggedUserId = this.auth.user?.id;
    if (loggedUserId) {
      this.messagingService.block(this.c.id)
        .subscribe(response => {
          console.log('User blocked successfully', response);
          alert("User blocked successfully!");
          this.showOptions = false;
          this.isOpen = false;
          this.role = localStorage.getItem("role");
          if(this.role != null) {
            this.redirectUser(this.role);
          }

        }, error => {
          console.error('Error blocking user', error);
          alert("User blocked unsuccessfully!");

        });
    }

  }

  viewProfile(){

  }

  deleteMessages(){

  }

  sendMessage() {
    this.newMessage = this.newMessage.trim();

    if (this.newMessage) {
      this.messagingService.sendMessage(this.c.id, this.newMessage);
      this.newMessage = '';
    }
  }


  redirectUser(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['home-admin']);
        break;
      case 'EventOrganizer':
        this.router.navigate(['home-organizer']);
        break;
      case 'ServiceAndProductProvider':
        this.router.navigate(['home-provider']);
        break;
      default:
        this.router.navigate(['home-guest']);
    }
  }

  private messagesSub?: Subscription;

  private loadMessages() {
    this.messages = [];
    this.messagesSub?.unsubscribe();

    this.messagingService.getChat(this.chatter.id).subscribe({
      next: chat => {
        this.c = chat.sender.id === this.c.id ? chat.sender : chat.recipient;
        this.messages.push(...chat.messages);

        this.messagesSub = this.messagingService.chat$(chat.id)
          .subscribe(msg => this.messages.unshift(msg));
      },
      error: console.log
    });

  }


  ngOnDestroy(): void {
    if (this.messagesSub) {
      this.messagesSub.unsubscribe();
      delete this.messagesSub;
    }
  }

  ngOnInit(): void {

  }

}

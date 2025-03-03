import { Component, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatSidebarService} from './chat-sidebar.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent {
  @Input() chaterName: string = 'Organizer Name';
  @Input() isOpen: boolean = false;
  @Input() chaterPhotoUrl: string = " ";
  @Input() chaterId: number = -1;

  showOptions: boolean = false;
  newMessage: string = '';

  messages = [
    { text: "Hi, I'm interested in booking your service!", sender: "me" },
    { text: "Hello! Thank you for reaching out. What details do you need?", sender: "organizer" }
  ];

  constructor(private http: HttpClient, private chatService : ChatSidebarService) {}

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  blockUser() {
    const loggedUserId = localStorage.getItem("userId");
    if (loggedUserId) {
      this.chatService.block(Number(loggedUserId), this.chaterId)
        .subscribe(response => {
          console.log('User blocked successfully', response);
          alert("User blocked successfully!");
          this.showOptions = false;
          this.isOpen = false;
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
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: "me" });
      this.newMessage = '';
      setTimeout(() => {
        this.messages.push({ text: "Thank you for your message!", sender: "organizer" });
      }, 1000);
    }
  }


}

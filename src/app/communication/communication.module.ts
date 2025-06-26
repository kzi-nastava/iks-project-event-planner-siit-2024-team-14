import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import {ChatSidebarComponent} from './chat-sidebar/chat-sidebar.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    InboxComponent,
    ChatSidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    InboxComponent,
    ChatSidebarComponent,
  ]
})
export class CommunicationModule { }

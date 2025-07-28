import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import {ChatSidebarComponent} from './chat-sidebar/chat-sidebar.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared.module';


@NgModule({
  declarations: [
    InboxComponent,
    ChatSidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    InboxComponent,
    ChatSidebarComponent,
  ]
})
export class CommunicationModule { }

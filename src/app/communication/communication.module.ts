import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatSidebarComponent} from './chat-sidebar/chat-sidebar.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ChatSidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ChatSidebarComponent,
  ]
})
export class CommunicationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagePopupComponent} from './dialogs/message-popup/message-popup.component';
import {MessageModalComponent} from './dialogs/message-modal/message-modal.component';

@NgModule({
  declarations: [MessagePopupComponent, MessageModalComponent],
  imports: [CommonModule],
  exports: [MessagePopupComponent, MessageModalComponent]
})
export class SharedModule { }

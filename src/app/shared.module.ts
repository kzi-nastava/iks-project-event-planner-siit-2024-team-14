import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagePopupComponent} from './dialogs/message-popup/message-popup.component';
import {MessageModalComponent} from './dialogs/message-modal/message-modal.component';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog';
import {SuccessfulComponent} from './components/registration/successful/successful.component';

@NgModule({
  declarations: [
    MessagePopupComponent,
    MessageModalComponent,
    ConfirmDialogComponent,
    SuccessfulComponent,
  ],
  imports: [CommonModule],
  exports: [
    MessagePopupComponent,
    MessageModalComponent,
    ConfirmDialogComponent,
    SuccessfulComponent,
  ]
})
export class SharedModule { }

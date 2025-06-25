import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InvitationService} from './invitation.service';

@Component({
  selector: 'app-invitation-popup',
  templateUrl: './invitation-popup.component.html',
  styleUrls: ['./invitation-popup.component.css']
})
export class InvitationPopupComponent {
  emails: string[] = [];
  newEmail: string = '';
  eventId: number;

  constructor(
    private dialogRef: MatDialogRef<InvitationPopupComponent>,
    private invitationService: InvitationService,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: number }
  ) {
    this.eventId = data.eventId;
  }
  addEmail(): void {
    if (this.newEmail && this.validateFormat(this.newEmail)) {
      this.emails.push(this.newEmail);
      this.newEmail = '';
    }
  }

  removeEmail(index: number): void {
    this.emails.splice(index, 1);
  }

  validateEmail(index: number): void {
    const email = this.emails[index];
    this.invitationService.checkUserByEmail(email).subscribe((isRegistered: boolean) => {
      if (isRegistered) {
        alert(`${email} is a registered user. They will be redirected to login.`);
      } else {
        alert(`${email} is not registered. A registration link will be sent.`);
      }
    });
  }

  sendInvitations(): void {
    this.invitationService.sendInvitations(this.emails, this.eventId).subscribe(() => {
      alert('Invitations sent successfully!');
      this.dialogRef.close();
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  private validateFormat(email: string): boolean {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  }
}

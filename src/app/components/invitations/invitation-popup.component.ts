import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InvitationService} from './invitation.service';

@Component({
  selector: 'app-invitation-popup',
  templateUrl: './invitation-popup.component.html',
  styleUrls: ['./invitation-popup.component.css']
})
export class InvitationPopupComponent {
  emails: string[] = [''];
  maxGuests: number;

  constructor(
    public dialogRef: MatDialogRef<InvitationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: number, maxGuests: number }
  ) {
    this.maxGuests = data.maxGuests;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  addEmail(): void {
    if (this.emails.length < this.maxGuests) {
      this.emails.push('');
    }
  }

  removeEmail(index: number): void {
    if (this.emails.length > 1) {
      this.emails.splice(index, 1);
    }
  }

  validateEmail(index: number): void {
    const email = this.emails[index];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert(`Invalid email at position ${index + 1}`);
    } else {
      alert(`Valid email: ${email}`);
    }
  }

  sendInvitations(): void {
    const validEmails = this.emails.filter(email => email.trim() !== '');
    console.log('Sending invites to:', validEmails, 'for event', this.data.eventId);

    // Ovde ide poziv servisa ka bekendu

    this.dialogRef.close();
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}

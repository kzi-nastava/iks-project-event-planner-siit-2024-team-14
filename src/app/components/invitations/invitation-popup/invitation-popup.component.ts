import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InvitationService} from '../invitation.service';

@Component({
  selector: 'app-invitation-popup',
  templateUrl: './invitation-popup.component.html',
  styleUrls: ['./invitation-popup.component.css']
})
export class InvitationPopupComponent {
  emails: string[] = [''];
  maxGuests: number;
  eventId: number;
  @Input() existingEmails: string[] = [];


  constructor(
    private invitationService: InvitationService,
    public dialogRef: MatDialogRef<InvitationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: number, maxGuests: number, existingEmails: string[] }
  ) {
    this.maxGuests = data.maxGuests;
    this.eventId = data.eventId;
    this.existingEmails = data.existingEmails || [];
  }

  totalCount(): number {
    return this.existingEmails.length + this.emails.length;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  addEmail(): void {
    const total = this.existingEmails.length + this.emails.length;
    if (total < this.maxGuests) {
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
    const validEmails = this.emails
      .map(email => email.trim())
      .filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (validEmails.length === 0) {
      alert('Please enter at least one valid email.');
      return;
    }

    this.invitationService.sendInvitations(this.eventId, validEmails).subscribe({
      next: () => {
        alert('Invitations sent successfully!');
        this.dialogRef.close();
      },
      error: err => {
        console.error('Error sending invitations', err, this.eventId, validEmails);
        alert('Failed to send invitations.');
      }
    });
  }


  closePopup(): void {
    this.dialogRef.close();
  }
}

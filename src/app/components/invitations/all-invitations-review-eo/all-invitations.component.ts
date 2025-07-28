import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../notifications/notifications.service';
import {HomeOrganizerService} from '../../home/home-organizer/home-organizer.service';
import {InvitationService} from '../invitation.service';
import {EventModel} from '../../../interfaces/event.model';
import {InvitationModel} from '../../../interfaces/invitation.model';
import {InvitationPopupComponent} from '../invitation-popup/invitation-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-all-invitations-review-eo',
  templateUrl: './all-invitations.component.html',
  styleUrls: ['./all-invitations.component.css']
})
export class AllInvitationsComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;
  user: any;
  unreadCount: number = 0;

  groupedInvitations: {
    event: EventModel;
    invitations: InvitationModel[];
    emptySlots: number;
  }[] = [];

  constructor(private invitationService: InvitationService, private notificationService: NotificationService, private userService: HomeOrganizerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();

    if (userId !== null) {
      this.loadUnreadNotificationCount(userId);
      this.notificationService.unreadNotificationCount$.subscribe(count => {
        this.unreadCount = count;
      });
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser); // Assign to class property
    }

    if (this.user && this.user.id) {
      this.fetchUserDetails(this.user.id); // Fetch user details
    } else {
      console.error('User ID not found in localStorage');
    }

    this.loadInvitations();
  }

  loadInvitations(): void {
    const organizerId = Number(localStorage.getItem('userId'));
    this.invitationService.getInvitationsForOrganizer(organizerId).subscribe(
      (response) => {
        this.groupedInvitations = response.map(eventInvites => {
          const empty = eventInvites.event.maxParticipants - eventInvites.invitations.length;
          return {
            event: eventInvites.event,
            invitations: eventInvites.invitations,
            emptySlots: empty > 0 ? empty : 0
          };
        });
      },
      (error) => {
        console.error('Error loading invitations:', error);
      }
    );
  }

  addInvitation(eventId: number, maxGuests: number, invitations: any[]): void {
    const existingEmails = invitations.map(inv => inv.guestEmail);

    const dialogRef = this.dialog.open(InvitationPopupComponent, {
      width: '500px',
      data: {
        eventId: eventId,
        maxGuests: maxGuests,
        existingEmails: existingEmails
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadInvitations();
    });
  }

  getUserIdFromLocalStorage(): number | null {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      const parsedUserId = parseInt(userIdFromStorage, 10);
      return isNaN(parsedUserId) ? null : parsedUserId;
    }
    return null;
  }

  loadUnreadNotificationCount(userId: number): void {
    this.notificationService.loadUnreadNotificationsCount(userId);
  }

  fetchUserDetails(userId: number): void {
    this.userService.getOrganizerById(userId).subscribe(
      (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.organizer)); // Store new data
        this.user = response.organizer; // Update this.user with new data
        console.log('User details updated:', this.user);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}


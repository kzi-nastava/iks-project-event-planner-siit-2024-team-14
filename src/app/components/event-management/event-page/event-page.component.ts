import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventManagementService} from '../event-management.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  event: any = null;
  user: any = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventManagementService: EventManagementService
  ) {}

  ngOnInit(): void {
    // Retrieve the event ID from the URL
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventId) {
      this.eventManagementService.getEventById(eventId).subscribe({
        next: (data) => {
          this.event = data;
          console.log("EVENT: ", data);
        },
        error: (err) => {
          console.error('Event not found:', err);
        }
      });
    }

    // Retrieve user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  chatWithOrganizer() {
    alert('Chat functionality is under development!');
  }

  addReview(comment: string, rating: number) {
    if (comment && rating) {
      this.event.reviews.push({
        author: 'Anonymous',
        rating,
        comment,
      });
    }
  }

  getPhotoUrl(): string {
    if (!this.event) {
      return '../../../../../assets/images/no_photos.jpg';
    }

    // This should call your backend endpoint
    return `http://localhost:8080/api/events/get-photo/${this.event.id}`;
  }


  protected readonly Number = Number;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite; // Toggle the favorite state

    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error("No user found in localStorage!");
      return;
    }

    this.user = JSON.parse(userString);

    console.log("this.user:", this.user);
    console.log("this.user.id:", this.user.id);

    const userId = this.user.id;
    const eventId = this.event.id;

    this.eventManagementService.setFavoriteEvent(userId, eventId).subscribe({
      next: (response) => {
        console.log('Favorite status updated:', response);
      },
      error: (error) => {
        console.error('Error updating favorite status:', error);
        this.isFavorite = !this.isFavorite;
      }
    })
  }
}

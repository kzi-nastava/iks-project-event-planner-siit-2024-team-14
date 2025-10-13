import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventManagementService } from '../event-management.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event: any = null;
  user: any = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventManagementService: EventManagementService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const eventId = Number(this.route.snapshot.paramMap.get('id'));

    // Load user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    // Load event and check favorite
    if (eventId) {
      this.eventManagementService.getEventById(eventId).subscribe({
        next: (data) => {
          this.event = data;
          console.log('EVENT:', data);
          this.checkIfFavorite();
        },
        error: (err) => console.error('Event not found:', err)
      });
    }
  }

  /** ✅ Checks if this event is in the user's favorites */
  checkIfFavorite(): void {
    if (!this.user?.id || !this.event?.id) return;

    this.eventManagementService.getFavoriteEvents(this.user.id).subscribe({
      next: (favorites) => {
        this.isFavorite = favorites.some((fav) => fav.id === this.event.id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error checking favorite status:', err)
    });
  }

  /** ✅ Toggles event favorite */
  toggleFavorite(): void {
    if (!this.user || !this.event) return;

    const userId = this.user.id;
    const eventId = this.event.id;

    this.eventManagementService.setFavoriteEvent(userId, eventId).subscribe({
      next: (response) => {
        this.isFavorite = response.isFavorite;
        console.log('Favorite status updated:', this.isFavorite);
      },
      error: (error) => console.error('Error updating favorite status:', error)
    });
  }

  chatWithOrganizer() {
    alert('Chat functionality is under development!');
  }

  addReview(comment: string, rating: number) {
    if (comment && rating) {
      this.event.reviews.push({ author: 'Anonymous', rating, comment });
    }
  }

  getPhotoUrl(): string {
    if (!this.event) {
      return '../../../../../assets/images/no_photos.jpg';
    }
    return `http://localhost:8080/api/events/get-photo/${this.event.id}`;
  }

  protected readonly Number = Number;
}

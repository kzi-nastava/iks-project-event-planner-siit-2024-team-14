import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventManagementService } from '../event-management.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event: any = null;
  user: any = null;
  isFavorite: boolean = false;
  selectedEventId = 6;


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

  generateEventPDF(): void {
    if (!this.event) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Event Details', 14, 20);

    doc.setFontSize(12);
    doc.text(`Title: ${this.event.name || 'N/A'}`, 14, 35);
    doc.text(`Description: ${this.event.description || 'N/A'}`, 14, 45);
    doc.text(`Location: ${this.event.location || 'N/A'}`, 14, 55);
    doc.text(`Start Date: ${this.event.startDate || 'N/A'}`, 14, 65);
    doc.text(`End Date: ${this.event.endDate || 'N/A'}`, 14, 75);

    if (this.event.activities && this.event.activities.length > 0) {
      doc.text('Activities:', 14, 90);

      const tableRows = this.event.activities.map((a: any) => [
        a.name,
        a.description,
        a.startTime,
        a.endTime,
        a.location
      ]);

      autoTable(doc, {
        head: [['Name', 'Description', 'Start Time', 'End Time', 'Location']],
        body: tableRows,
        startY: 95,
      });
    }

    doc.save(`${this.event.name || 'event'}-details.pdf`);
  }
}

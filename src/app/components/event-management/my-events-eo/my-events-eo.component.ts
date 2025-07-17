import { Component, OnInit } from '@angular/core';
import { EventService } from '../../homepage/all-events/our-events.service';

@Component({
  selector: 'my-events-eo',
  templateUrl: './my-events-eo.component.html',
  styleUrl: './my-events-eo.component.css'
})
export class MyEventsEoComponent implements OnInit {
  showCreatePopup = false;

  eventsList: any[] = [];
  filteredEvents: any[] = [];
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  category: string = '';
  page: number = 0;
  totalEvents: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;

  baseUrl = 'http://localhost:8080/';

  constructor(private eventService: EventService) {}

  // get selected event and open popup
  createEvent(): void {
    this.showCreatePopup = true;
  }

  closePopup(): void {
    this.showCreatePopup = false;
  }

  ngOnInit() {
    this.loadMyEvents();
  }

  loadMyEvents(): void {
    this.eventService.getEventsByOrganizer().subscribe({
      next: (events) => {
        // Dodaj puni URL za slike pre dodeljivanja
        const eventsWithFullUrls = events.map(event => this.addFullImageUrl(event));
        this.eventsList = eventsWithFullUrls;
        this.totalEvents = events.length;
        this.totalPages = Math.ceil(this.totalEvents / this.pageSize);
        this.filteredEvents = [...this.eventsList];
      },
      error: (err) => {
        console.error('Error loading events:', err);
      }
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadMyEvents();
  }

  private addFullImageUrl(event: any): any {
    return {
      ...event,
      imageUrl: event.imageUrl && !event.imageUrl.startsWith('http') ? this.baseUrl + event.imageUrl : event.imageUrl,
      organizerProfilePicture: event.organizerProfilePicture && !event.organizerProfilePicture.startsWith('http') ? this.baseUrl + event.organizerProfilePicture : event.organizerProfilePicture
    };
  }
}

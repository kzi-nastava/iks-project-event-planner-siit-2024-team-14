import {Component, OnInit} from '@angular/core';
import {EventService} from '../../homepage/all-events/our-events.service';

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

  constructor(private eventService: EventService) {}

  // HEADER ----------------------------------------------------------------------
  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;
  unreadCount: number = 0;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }
  //------------------------------------------------------------------------

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
        this.eventsList = events;
        this.totalEvents = events.length;
        this.totalPages = Math.ceil(this.totalEvents / this.pageSize);
        this.filteredEvents = [...events];
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
}

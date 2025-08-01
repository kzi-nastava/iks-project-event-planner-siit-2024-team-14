import { Component, OnInit } from '@angular/core';
import { EventService } from './our-events.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-all-events',
  templateUrl: './our-events.component.html',
  styleUrls: ['./our-events.component.css']
})
export class OurEventsComponent implements OnInit {
  eventsList: any[] = [];
  blockedUserIds: number[] = [];
  filteredEvents: any[] = [];
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  category: string = '';
  page: number = 0;
  totalEvents: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  showFilters: boolean = false;

  locations: string[] = [];
  categories: string[] = [];

  baseUrl = 'http://localhost:8080/';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
    this.fetchLocations();
    this.fetchCategories();
  }

  loadEvents() {
    this.eventService.getBlockedUsers().subscribe(
      (blockedUsers) => {
        this.blockedUserIds = blockedUsers;

        this.eventService.getAllEvents().subscribe(
          (response: any[]) => {
            const eventsWithFullUrls = response.map(event => this.addFullImageUrl(event));
            this.eventsList = eventsWithFullUrls.filter(event =>
              !this.blockedUserIds.includes(event.organizerId)
            );
            this.totalEvents = this.eventsList.length;
            this.totalPages = Math.ceil(this.totalEvents / this.pageSize);
            this.filteredEvents = [...this.eventsList];
          },
          (error) => {
            console.error('Error loading events:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading blocked users:', error);
      }
    );
  }

  fetchLocations() {
    this.eventService.getAllLocations().subscribe(
      (data: string[]) => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  fetchCategories() {
    this.eventService.getAllCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSearch() {
    this.filteredEvents = this.eventsList.filter(event =>
      event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.organizerFirstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.organizerLastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  applyFilters() {
    this.page = 0;

    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.pageSize.toString());

    if (this.startDate) {
      params = params.set('startDate', this.startDate);
    }

    if (this.endDate) {
      params = params.set('endDate', this.endDate);
    }

    if (this.category && this.category.trim() !== '') {
      params = params.set('category', this.category);
    }

    if (this.location && this.location.trim() !== '') {
      params = params.set('location', this.location);
    }

    this.eventService.getFilteredEvents(params).subscribe(
      response => {
        const events = (response.content || []) as any[];
        const eventsWithFullUrls = events.map(event => this.addFullImageUrl(event));
        this.eventsList = eventsWithFullUrls;
        this.totalEvents = response.totalElements;
        this.totalPages = Math.ceil(this.totalEvents / this.pageSize);
        this.filteredEvents = [...this.eventsList];
      },
      error => {
        console.error('Error applying filters:', error);
      }
    );
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadEvents();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  private addFullImageUrl(event: any): any {
    return {
      ...event,
      imageUrl: event.imageUrl && !event.imageUrl.startsWith('http') ? this.baseUrl + event.imageUrl : event.imageUrl,
      organizerProfilePicture: event.organizerProfilePicture && !event.organizerProfilePicture.startsWith('http') ? this.baseUrl + event.organizerProfilePicture : event.organizerProfilePicture
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { EventService } from './our-events.service';
import {HttpParams} from '@angular/common/http';

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
          (response) => {
            this.eventsList = response.filter(event =>
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

    // Kreiranje HttpParams samo sa postojećim parametrima
    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.pageSize.toString());

    if (this.startDate) {
      params = params.set('startDate', this.startDate);
    }

    if (this.endDate) {
      params = params.set('endDate', this.endDate);
    }

    if (this.category && this.category.trim() !== '') params = params.set('category', this.category);

    if (this.location && this.location.trim() !== '') {
      params = params.set('location', this.location);
    }

    this.eventService.getFilteredEvents(params)
      .subscribe(
        response => {
          this.eventsList = response.content;
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
}

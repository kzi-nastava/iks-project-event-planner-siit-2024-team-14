import { Component, OnInit } from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {EventService} from '../homepage/all-events/our-events.service';

@Component({
  selector: 'app-joined-events',
  templateUrl: './joined-events.component.html',
  styleUrls: ['./joined-events.component.css']
})
export class JoinedEventsComponent implements OnInit {
  eventsList: any[] = [];
  blockedUserIds: number[] = [];
  filteredEvents: any[] = [];
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  category: string = '';
  page: number = 0;
  totalEvents: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  categories: string[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getBlockedUsers().subscribe(
      (blockedUsers) => {
        this.blockedUserIds = blockedUsers;

        this.eventService.getJoinedEvents().subscribe(
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

  onPageChange(page: number) {
    this.page = page;
    this.loadEvents();
  }

}

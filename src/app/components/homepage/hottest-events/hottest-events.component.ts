import { Component, OnInit } from '@angular/core';
import { HottestEventsService } from './hottest-events.service';
import { EventModel } from '../../../interfaces/event.model';

@Component({
  selector: 'app-hottest-events',
  templateUrl: './hottest-events.component.html',
  styleUrl: './hottest-events.component.css'
})
export class HottestEventsComponent implements OnInit {
  hottestEvents: EventModel[] = [];
  blockedUserIds: number[] = [];
  currentSlide = 0;

  baseUrl = 'http://localhost:8080/';

  constructor(private eventsService: HottestEventsService) {}

  ngOnInit() {
    this.loadTopEvents();
  }

  loadTopEvents(): void {
    this.eventsService.getBlockedUsers().subscribe(
      (blockedUsers) => {
        this.blockedUserIds = blockedUsers;
        if (this.blockedUserIds && this.blockedUserIds.length > 1) {
          this.eventsService.getTopEvents().subscribe(
            (data) => {
              this.hottestEvents = data
                .filter(event => !this.blockedUserIds.includes(event.organizerId))
                .map(event => this.addFullImageUrl(event));
            },
            (error) => {
              console.error('Error loading events:', error);
            }
          );
        } else {
          this.eventsService.getTopEvents().subscribe(
            (data) => {
              this.hottestEvents = data.map(event => this.addFullImageUrl(event));
            },
            (error) => {
              console.error('Error loading events:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error loading blocked users:', error);
      }
    );
  }

  private addFullImageUrl(event: EventModel): EventModel {
    return {
      ...event,
      imageUrl: this.baseUrl + event.imageUrl,
      organizerProfilePicture: this.baseUrl + event.organizerProfilePicture
    };
  }

  nextSlide() {
    if (this.currentSlide < this.hottestEvents.length - 4) {
      this.currentSlide += 1.5;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1.5;
    }
  }

  getTransform() {
    return `translateX(-${this.currentSlide * 33.33}%)`;
  }
}

import { Component, OnInit } from '@angular/core';
import { HottestEventsService, EventModel } from './hottest-events.service';

@Component({
  selector: 'app-hottest-events',
  templateUrl: './hottest-events.component.html',
  styleUrl: './hottest-events.component.css'
})
export class HottestEventsComponent implements OnInit {
  hottestEvents: EventModel[] = [];

  currentSlide = 0;

  constructor(private eventsService: HottestEventsService) {}

  ngOnInit() {
    this.loadTopEvents();
  }

  loadTopEvents(): void {
    this.eventsService.getTopEvents().subscribe(
      (data) => {
        this.hottestEvents = data;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
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

import { Component, OnInit } from '@angular/core';
import { HottestEventsService, EventModel } from '../../services/hottest-events.service';

@Component({
  selector: 'app-hottest-events',
  templateUrl: './hottest-events.component.html',
  styleUrl: './hottest-events.component.css'
})
export class HottestEventsComponent implements OnInit {
  hottestEvents: EventModel[] = []; // Ispravljeno

  currentSlide = 0;

  constructor(private eventsService: HottestEventsService) {}

  ngOnInit() {
    this.eventsService.getTopEvents().subscribe((events: EventModel[]) => { // Ispravljeno
      this.hottestEvents = events;
    });
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

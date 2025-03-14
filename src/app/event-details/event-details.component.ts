import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventDetailsService} from './event-details.service';
import {EventModel} from '../interfaces/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: EventModel = { id: -1 } as EventModel;

  constructor(private route: ActivatedRoute, private eventService: EventDetailsService) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    console.log("Event ID:", eventId); // Proveri da li dobija ID iz URL-a
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        console.log("Fetched event:", event); // Proveri da li dobija event
        this.event = event;
      });
    }
  }
}

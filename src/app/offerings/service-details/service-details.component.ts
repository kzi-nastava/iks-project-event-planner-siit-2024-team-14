import { Service } from '../model/service.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../../interfaces/event.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service: Service = { id: -1 } as Service;
  role: string | null | undefined;

  isPopupOpen: boolean = false;
  userEvents: EventModel[] = [];
  selectedEventId: number | null = null;
  availableStartTimes: string[] = [];
  availableEndTimes: string[] = [];

  reservation = {
    serviceId: 0,
    date: '',
    startTime: '',
    endTime: 0,
    eventId: 0
  };
  minDate: string = '';
  unavailableTimes: { startTime: string; endTime: string }[] = [];

  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.isPopupOpen = false;
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.fetchUserEvents(+userId);
    }

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.serviceService.getById(id).subscribe({
        next: service => {
          this.service = service;
          this.reservation.serviceId = service.id;
          console.log(this.service);

          // Convert duration, minDuration, and maxDuration to minutes for calculation
          if (service.duration) {
            const durationInMinutes = this.convertDurationToMinutes(service.duration);
            // You can now use the durationInMinutes for any calculation
            this.service.durationInMinutes = durationInMinutes;
            this.reservation.endTime = this.service.durationInMinutes;
          }

          if (service.minDuration) {
            const minDurationInMinutes = this.convertDurationToMinutes(service.minDuration);
            this.service.minDurationInMinutes = minDurationInMinutes;
          }

          if (service.maxDuration) {
            const maxDurationInMinutes = this.convertDurationToMinutes(service.maxDuration);
            this.service.maxDurationInMinutes = maxDurationInMinutes;
          }

        },
        error: err => console.log('Failed to fetch service data.')
      });
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  convertDurationToMinutes(duration: string): number {
    const regex = /PT(\d+)(H|M)/;
    const match = duration.match(regex);

    if (!match) return 0;

    let totalMinutes = 0;
    if (match[2] === 'H') {
      totalMinutes = parseInt(match[1]) * 60;  // Convert hours to minutes
    } else if (match[2] === 'M') {
      totalMinutes = parseInt(match[1]);
    }

    return totalMinutes;
  }


  openReservationPopup(): void {
    this.isPopupOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeReservationPopup(): void {
    this.isPopupOpen = false;
    document.body.style.overflow = 'auto';
  }

  fetchUserEvents(userId: number): void {
    this.http.get<EventModel[]>(`http://localhost:8080/api/events/by-organizer/${userId}`)
      .subscribe(events => {
        this.userEvents = events;
      });
  }

  onEventChange(): void {
    if (this.selectedEventId != null) {
      // @ts-ignore
      const selectedEvent = this.userEvents.find(event => event.id === +this.selectedEventId);
      if (selectedEvent) {
        const today = new Date().toISOString().split('T')[0];
        if (selectedEvent.startDate < today) {
          alert('This event has already ended.');
          this.selectedEventId = null;
          this.reservation.date = '';
          this.reservation.eventId = 0;
        } else {
          this.reservation.date = selectedEvent.startDate;
          this.reservation.eventId = selectedEvent.id;
          this.onDateChange();
        }
      }
    } else {
      alert('You need to choose an event first!');
    }
  }

  onDateChange(): void {
    if (this.reservation.date) {
      this.serviceService.getUnavailableTimes(this.service.id, this.reservation.date).subscribe(bookings => {
        this.unavailableTimes = bookings.map(b => ({ startTime: b.startTime, endTime: b.endTime }));
        this.updateAvailableTimes();
      });
    }
  }

  updateAvailableTimes(): void {
    this.availableStartTimes = [];
    this.availableEndTimes = [];
    const startOfDay = new Date(this.reservation.date);
    startOfDay.setHours(8, 0, 0, 0);

    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = new Date(startOfDay);
        startTime.setHours(hour, minute);

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 30);

        const startTimeStr = startTime.toISOString().slice(11, 16);
        const endTimeStr = endTime.toISOString().slice(11, 16);

        const isUnavailable = this.unavailableTimes.some(u => u.startTime === startTimeStr && u.endTime === endTimeStr);
        if (!isUnavailable) {
          this.availableStartTimes.push(startTimeStr);
          this.availableEndTimes.push(endTimeStr);
        }
      }
    }
  }

  generateDurationOptions(minDuration: number, maxDuration: number): number[] {
    const options = [];

    // Preporučujemo da pretvorimo min i max duration u minute
    for (let i = minDuration; i <= maxDuration; i += 30) {
      options.push(i);
    }

    return options;
  }


  submitReservation(): void {
    this.http.post('http://localhost:8080/api/services/reserve', this.reservation)
      .subscribe({
        next: response => {
          alert('Service booked successfully!');
          this.closeReservationPopup();
        },
        error: err => alert('Failed to book service.')
      });
  }
}

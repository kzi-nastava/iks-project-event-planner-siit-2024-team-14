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

  reservation = {
    serviceId: 0,
    date: '',
    startTime: '',
    duration: 0,
    eventId: 0
  };
  minDate: string = '';

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

          // Convert duration, minDuration, and maxDuration to minutes for calculation
          if (service.duration) {
            const durationInMinutes = this.convertDurationToMinutes(service.duration);
            // You can now use the durationInMinutes for any calculation
            this.service.durationInMinutes = durationInMinutes;
            this.reservation.duration = this.service.durationInMinutes;
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
    this.reservation.startTime = '';
    if (this.reservation.date) {
      let durationParam = this.service.durationInMinutes || null;

      this.serviceService.getAvailableStartTimes(this.service.id, this.reservation.date, durationParam)
        .subscribe(availableTimes => {
          this.availableStartTimes = availableTimes;
        });
    }
  }

  onDurationChange(): void {
    let durationParam = this.reservation.duration|| null;
    this.serviceService.getAvailableStartTimes(this.service.id, this.reservation.date, durationParam)
      .subscribe(availableTimes => {
        this.availableStartTimes = availableTimes;
      });
  }

  generateDurationOptions(minDuration: number, maxDuration: number): number[] {
    const options = [];
    for (let i = minDuration; i <= maxDuration; i += 30) {
      options.push(i);
    }

    return options;
  }

  submitReservation(): void {
    // Kreiramo objekat za slanje
    const bookingRequest = {
      serviceId: this.reservation.serviceId,
      eventId: this.reservation.eventId,
      bookingDate: this.reservation.date,  // Pretpostavljam da je datum u formatu "yyyy-MM-dd"
      startTime: this.reservation.startTime,  // Formatirano kao string, npr. "08:00"
      duration: this.reservation.duration  // Pretpostavljam da je duration u minutima, npr. 60
    };

    // Poslati zahtev
    this.http.post('http://localhost:8080/api/bookings/reserve', bookingRequest, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log(response); // Ovdje proveri kako izgleda raw response
          alert('Service booked successfully!');
          this.closeReservationPopup();
        },
        error: err => {
          console.error('Error occurred:', err);
          alert('Failed to book service.');
        }
      });
  }


}

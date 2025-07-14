import { Service } from '../../model/service.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service.service';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../../../interfaces/event.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service: Service = { id: -1 } as Service;
  role: string | null | undefined;
  isPopupOpen = false;
  userEvents: EventModel[] = [];
  selectedEventId: number | null = null;
  availableStartTimes: string[] = [];
  minDate: string = '';

  reservation = {
    serviceId: 0,
    date: '',
    startTime: '',
    duration: 0,
    eventId: 0,
    reservationType: ''
  };

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    if (userId) this.fetchUserEvents(+userId);

    this.route.params.subscribe(params => {
      this.fetchServiceDetails(+params['id']);
    });

    this.minDate = new Date().toISOString().split('T')[0];
  }

  private fetchServiceDetails(serviceId: number): void {
    this.serviceService.getById(serviceId).subscribe({
      next: service => {
        this.service = service;
        this.reservation.serviceId = service.id;

        this.service.durationInMinutes = this.convertDurationToMinutes(service.duration);
        this.service.minDurationInMinutes = this.convertDurationToMinutes(service.minDuration);
        this.service.maxDurationInMinutes = this.convertDurationToMinutes(service.maxDuration);
        this.service.reservationPeriodInDays = this.convertDurationToDays(service.reservationPeriod);
        this.service.cancellationPeriodInDays = this.convertDurationToDays(service.cancellationPeriod);
        this.reservation.duration = this.service.durationInMinutes;
        this.reservation.reservationType = this.service.reservationType;
      },
      error: () => console.log('Failed to fetch service data.')
    });
  }

  private fetchUserEvents(userId: number): void {
    this.http.get<EventModel[]>(`http://localhost:8080/api/events/by-organizer/${userId}`)
      .subscribe(events => this.userEvents = events);
  }

  private convertDurationToMinutes(duration?: string): number {
    if (!duration) return 0;

    const match = duration.match(/PT(\d+)(H|M)/);
    if (!match) return 0;

    return match[2] === 'H' ? parseInt(match[1]) * 60 : parseInt(match[1]);
  }

  private convertDurationToDays(duration: string): number {
    const daysMatch = duration.match(/P(\d+)D/);
    const hoursMatch = duration.match(/PT(\d+)H/);
    return daysMatch ? parseInt(daysMatch[1]) : hoursMatch ? Math.ceil(parseInt(hoursMatch[1]) / 24) : 0;
  }

  openReservationPopup(): void {
    this.isPopupOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeReservationPopup(): void {
    this.isPopupOpen = false;
    document.body.style.overflow = 'auto';
  }

  onEventChange(): void {
    if (!this.selectedEventId) {
      alert('You need to choose an event first!');
      return;
    }

    // @ts-ignore
    const selectedEvent = this.userEvents.find(event => event.id === +this.selectedEventId);
    if (!selectedEvent) return;

    const today = new Date();
    const eventStartDate = new Date(selectedEvent.startDate);
    const reservationPeriodInDays = this.convertDurationToDays(this.service.reservationPeriod);

    const minAllowedDate = new Date();
    minAllowedDate.setDate(today.getDate() + reservationPeriodInDays);

    if (eventStartDate < today) {
      this.resetReservation('This event has already ended.');
    } else if (eventStartDate < minAllowedDate) {
      this.resetReservation(`You must book this service at least ${reservationPeriodInDays} days in advance.`);
    } else {
      this.reservation.date = selectedEvent.startDate;
      this.reservation.eventId = selectedEvent.id;
      this.onDateChange();
    }
  }

  private resetReservation(message: string): void {
    alert(message);
    this.selectedEventId = null;
    this.reservation.date = '';
    this.reservation.eventId = 0;
  }

  onDateChange(): void {
    if (!this.reservation.date) return;

    const durationParam = this.service.durationInMinutes || null;
    this.serviceService.getAvailableStartTimes(this.service.id, this.reservation.date, durationParam)
      .subscribe(times => this.availableStartTimes = times);
  }

  onDurationChange(): void {
    const durationParam = this.reservation.duration || null;
    this.serviceService.getAvailableStartTimes(this.service.id, this.reservation.date, durationParam)
      .subscribe(times => this.availableStartTimes = times);
  }

  generateDurationOptions(minDuration: number, maxDuration: number): number[] {
    return Array.from({ length: Math.floor((maxDuration - minDuration) / 30) + 1 }, (_, i) => minDuration + i * 30);
  }

  submitReservation(): void {
    const bookingRequest = {
      serviceId: this.reservation.serviceId,
      eventId: this.reservation.eventId,
      bookingDate: this.reservation.date,
      startTime: this.reservation.startTime,
      duration: this.reservation.duration,
      reservationType: this.reservation.reservationType
    };

    this.closeReservationPopup();


    this.http.post('http://localhost:8080/api/bookings/reserve', bookingRequest, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Service booked successfully!');
          this.resetReservationForm();
        },
        error: err => {
          console.error('Error occurred:', err);
          alert('Failed to book service.');
        }
      });
  }

  private resetReservationForm(): void {
    this.selectedEventId = null;
    this.reservation = {
      serviceId: this.service.id,
      date: '',
      startTime: '',
      duration: this.service.durationInMinutes || 0,
      eventId: -1,
      reservationType: ''
    };
    this.availableStartTimes = [];
  }
}

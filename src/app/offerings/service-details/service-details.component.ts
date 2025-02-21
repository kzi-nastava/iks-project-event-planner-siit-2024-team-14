import {Service} from '../model/service.model';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServiceService} from '../service.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  service: Service = {id: -1} as Service;

  isPopupOpen: boolean = false;
  reservation = {
    serviceId: 0,
    date: '',
    startTime: '',
    endTime: ''
  };
  minDate: string = '';

  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private http: HttpClient) { }


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];

      this.serviceService.getById(id).subscribe({
        next: service => {
          this.service = service;
          console.log(service)
          this.reservation.serviceId = service.id;
          },
        error: err => console.log('Failed to fetch service data.')
      });
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  openReservationPopup(): void {
    this.isPopupOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeReservationPopup(): void {
    this.isPopupOpen = false;
    document.body.style.overflow = 'auto';
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

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Service} from './model/service.model';
import {BookingService} from "./model/booking-service.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseURL = 'http://localhost:8080/api/services/';

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.baseURL);
  }

  getById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.baseURL + id);
  }

  getUnavailableTimes(serviceId: number, date: string) {
    return this.httpClient.get<BookingService[]>(`http://localhost:8080/api/bookings/available-times?serviceId=${serviceId}&date=${date}`);
  }

}

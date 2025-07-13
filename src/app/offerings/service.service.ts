import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Service} from './model/service.model';
import {Page} from '../interfaces/page.model';
import {environment} from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseURL = `${environment.apiUrl}/services`;

  constructor(private httpClient: HttpClient) { }


  getAll(params?: any): Observable<Page<Service>> {
    return this.httpClient.get<Page<Service>>(this.baseURL, {params: new HttpParams({fromObject: params})});
  }

  getById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(this.baseURL + '/' + id);
  }

  getAvailableStartTimes(serviceId: number, date: string, duration: number | null) {
    let url = `${environment.apiUrl}/bookings/available-start-times?serviceId=${serviceId}&date=${date}`;
    if (duration !== null) {
      url += `&duration=${duration}`;
    }
    return this.httpClient.get<string[]>(url);
  }

  update(service: Partial<Service> & Pick<Service, 'id'>) {
    return this.httpClient.put<Service>(`${this.baseURL}/${service.id}`, service);
  }

  create(service: any) {
    return this.httpClient.post<Service>(this.baseURL, service);
  }

}

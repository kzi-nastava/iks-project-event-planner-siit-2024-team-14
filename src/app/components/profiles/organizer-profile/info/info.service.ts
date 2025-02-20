import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EditEO} from '../../../../interfaces/edit-eo.model';
import {Observable} from 'rxjs';
import {ChangePassword} from '../../../../interfaces/change-password.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) {}

  edit(data: EditEO): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/organizers/update`, data);
  }

  changePassword(data: ChangePassword): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/users/changePassword`, data);
  }

  changeProfilePhoto(data: FormData, id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/organizers/update-photo/${id}`, data);
  }
}

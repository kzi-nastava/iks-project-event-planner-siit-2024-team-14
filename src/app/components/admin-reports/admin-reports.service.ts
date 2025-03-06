import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReportUserModel} from '../../interfaces/report-user.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<ReportUserModel[]> {
    return this.http.get<ReportUserModel[]>(`${this.apiUrl}/pending`);
  }

  approveReportStatus(reportId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve`, { reportId, status });
  }

  deleteReportStatus(reportId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delete`, { reportId, status });
  }
}

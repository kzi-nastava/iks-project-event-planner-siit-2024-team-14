import { Component, Input, OnInit } from '@angular/core';
import {ReportUserModel} from '../../interfaces/report-user.model';
import {ReportService} from './admin-reports.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  @Input() isReportsOpen: boolean = false;
  reports: ReportUserModel[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadPendingReports();
  }

  loadPendingReports() {
    this.reportService.getAllReports().subscribe((reports) => {
      this.reports = reports;

      console.log(reports);
    });
  }

  approveReport(report: ReportUserModel) {
    this.reportService.approveReportStatus(report.reportId, 'accepted').subscribe(() => {
      report.status = 'accepted';
      alert('Report approved!');
    });

  }

  deleteReport(report: ReportUserModel) {
    this.reportService.deleteReportStatus(report.reportId, 'deleted').subscribe(() => {
      report.status = 'deleted';
      alert('Report deleted!');
    });

  }

  closeReports() {
    this.isReportsOpen = false;
  }
}

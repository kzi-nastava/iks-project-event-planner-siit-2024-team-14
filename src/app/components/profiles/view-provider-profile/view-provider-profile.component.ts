import { Component, OnInit } from '@angular/core';
import { ViewProviderProfileService } from './view-provider-profile.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProviderModel } from '../../../interfaces/provider.model';

@Component({
  selector: 'app-view-provider-profile',
  templateUrl: './view-provider-profile.component.html',
  styleUrls: ['./view-provider-profile.component.css']
})
export class ViewProviderProfileComponent implements OnInit {
  user: ProviderModel = { id: -1 } as ProviderModel;
  isSidebarOpen: boolean = false;
  showReportForm = false;
  reportReason: string = '';
  isChatOpen: boolean = false;
  loggedUserId: number | null = null;

  baseUrl = 'http://localhost:8080/';

  constructor(
    private route: ActivatedRoute,
    private viewProviderProfileService: ViewProviderProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.viewProviderProfileService.getOrganizerById(userId).subscribe(user => {
        this.user = this.addFullImageUrl(user);
      });
    }

    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      this.loggedUserId = parseInt(userIdFromStorage, 10);
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openReportForm() {
    this.showReportForm = true;
  }

  closeReportForm() {
    this.showReportForm = false;
    this.reportReason = '';
  }

  submitReport() {
    if (!this.reportReason.trim()) {
      alert("Please enter a reason for the report.");
      return;
    }

    const reportData = {
      senderId: localStorage.getItem("userId"),
      reportedUserId: this.user.id,
      reason: this.reportReason
    };

    this.http.post('http://localhost:8080/api/reports', reportData).subscribe({
      next: () => {
        alert("Report submitted successfully!");
        this.closeReportForm();
      },
      error: () => {
        alert("Error submitting report.");
      }
    });
  }

  private addFullImageUrl(user: ProviderModel): ProviderModel {
    return {
      ...user,
      profilePhoto: user.profilePhoto && !user.profilePhoto.startsWith('http')
        ? this.baseUrl + user.profilePhoto
        : user.profilePhoto
    };
  }

  protected readonly localStorage = localStorage;
}

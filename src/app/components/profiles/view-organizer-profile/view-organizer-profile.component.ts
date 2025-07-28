import { Component, OnInit } from '@angular/core';
import { OrganizerModel } from '../../../interfaces/organizer.model';
import { ViewOrganizerProfileService } from './view-organizer-profile.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-organizer-profile',
  templateUrl: './view-organizer-profile.component.html',
  styleUrls: ['./view-organizer-profile.component.css']
})
export class ViewOrganizerProfileComponent implements OnInit {
  user: OrganizerModel = { id: -1 } as OrganizerModel;
  isSidebarOpen: boolean = false;
  showReportForm = false;
  reportReason: string = '';

  isChatOpen: boolean = false;
  loggedUserId: number | null = null;

  baseUrl = 'http://localhost:8080/';

  constructor(
    private route: ActivatedRoute,
    private viewOrganizerProfileService: ViewOrganizerProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.viewOrganizerProfileService.getOrganizerById(userId).subscribe(user => {
        this.user = this.addFullImageUrl(user);
      });
    }

    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      this.loggedUserId = parseInt(userIdFromStorage, 10);
    }
  }

  get fullName(): string {
    return this.user ? `${this.user.name} ${this.user.surname}` : 'User Name';
  }

  private addFullImageUrl(user: OrganizerModel): OrganizerModel {
    return {
      ...user,
      profilePhoto: user.profilePhoto && !user.profilePhoto.startsWith('http')
        ? this.baseUrl + user.profilePhoto
        : user.profilePhoto
    };
  }

  getProfilePhotoUrl(): string {
    return this.user?.profilePhoto || '../../../../../assets/images/profile6.jpg';
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
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

  protected readonly localStorage = localStorage;
}

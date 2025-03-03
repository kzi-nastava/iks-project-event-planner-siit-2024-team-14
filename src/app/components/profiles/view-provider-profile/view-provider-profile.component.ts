import {Component, OnInit} from '@angular/core';
import {ViewProviderProfileService} from './view-provider-profile.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProviderModel} from '../../../interfaces/provider.model';

@Component({
  selector: 'app-view-provider-profile',
  templateUrl: './view-provider-profile.component.html',
  styleUrls: ['./view-provider-profile.component.css']
})
export class ViewProviderProfileComponent implements OnInit{
  user: ProviderModel = { id: -1 } as ProviderModel;
  isSidebarOpen: boolean = false;
  showReportForm = false;
  reportReason: string = '';
  isChatOpen: boolean = false;
  loggedUserId: number | null = null;

  constructor(private route: ActivatedRoute, private viewProviderProfileService: ViewProviderProfileService, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.viewProviderProfileService.getOrganizerById(userId).subscribe(user => {
        this.user = user;
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

  // Method to get profile photo URL
  getProfilePhotoUrl(): string {
    const photoFileName = this.user?.profilePhoto;
    console.log(photoFileName);
    return photoFileName ? `http://localhost:8080/api/providers/get-photo/${photoFileName}` : '../../../../../assets/images/profile6.jpg';
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
      senderId: localStorage.getItem("userId"),  // ID korisnika koji šalje prijavu
      reportedUserId: this.user.id,  // ID korisnika koji je prijavljen
      reason: this.reportReason  // Razlog prijave
    };

    this.http.post('http://localhost:8080/api/reports', reportData).subscribe(response => {
      alert("Report submitted successfully!");
      this.closeReportForm();
    }, error => {
      alert("Error submitting report.");
    });
  }

  protected readonly localStorage = localStorage;
}

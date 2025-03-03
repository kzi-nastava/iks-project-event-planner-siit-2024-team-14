import {Component, OnInit} from '@angular/core';
import {OrganizerModel} from '../../../interfaces/organizer.model';
import {ViewOrganizerProfileService} from './view-organizer-profile.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-view-organizer-profile',
  templateUrl: './view-organizer-profile.component.html',
  styleUrls: ['./view-organizer-profile.component.css']
})
export class ViewOrganizerProfileComponent implements OnInit{
  user: OrganizerModel = { id: -1 } as OrganizerModel;
  isSidebarOpen: boolean = false;
  showReportForm = false;
  reportReason: string = '';

  isChatOpen: boolean = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  constructor(private route: ActivatedRoute, private viewOrganizerProfileService: ViewOrganizerProfileService, private http: HttpClient) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.viewOrganizerProfileService.getOrganizerById(userId).subscribe(user => {
        this.user = user;
      });
    }
  }

  get fullName(): string {
    return this.user ? `${this.user.name} ${this.user.surname}` : 'User Name';
  }

  // Method to get profile photo URL
  getProfilePhotoUrl(): string {
    const photoFileName = this.user?.profilePhoto;
    console.log(photoFileName);
    return photoFileName ? `http://localhost:8080/api/organizers/get-photo/${photoFileName}` : '../../../../../assets/images/profile6.jpg';
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

}

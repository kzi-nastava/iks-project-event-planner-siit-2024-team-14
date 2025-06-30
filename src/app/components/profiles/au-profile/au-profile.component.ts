import {Component, OnInit} from '@angular/core';
import {InfoService} from '../info/info.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePassword} from '../../../interfaces/change-password.model';
import {UpdateAsProviderComponent} from './update-as-provider/update-as-provider.component';
import { MatDialog } from '@angular/material/dialog';
import {UpdateAsOrganizerComponent} from './update-as-organizer/update-as-organizer.component';

@Component({
  selector: 'app-au-profile',
  templateUrl: './au-profile.component.html',
  styleUrls: ['./au-profile.component.css']
})
export class AuProfileComponent implements OnInit {
  isSidebarOpen: boolean = false;
  user: any = null;
  showPasswordModal = false;
  passwordsDoNotMatch: boolean = false;
  oldPasswordDoesNotMatch: boolean = false;
  photos: string[] = [];
  // Deactivate modal variables
  isDeactivateModalVisible: boolean = false;
  modalTitle: string = 'Are you sure you want to deactivate your account?';
  modalMessage: string = 'This action cannot be undone.';
  okButtonDeactivate: boolean = false;
  noButton: boolean = false;
  yesButton: boolean = false;

  constructor(private infoService: InfoService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Retrieve user first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  // CHANGE PASSWORD ---------------------------------------------------------------

  openPasswordModal(event: MouseEvent): void {
    event.preventDefault();
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
    this.passwordForm.reset();
  }

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  changePassword(): void {
    if (this.passwordForm.valid) {
      const {oldPassword, password, confirmPassword} = this.passwordForm.value;

      if (password !== confirmPassword) {
        this.passwordsDoNotMatch = true;
        return;
      }

      const passwordData: ChangePassword = {
        id: this.user.id,
        oldPassword: oldPassword || '',
        password: password || ''
      };

      this.infoService.changePassword(passwordData).subscribe({
        next: (response: any) => {
          alert('Password changed successfully!');
          this.user.password = response.password;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.closePasswordModal();
        },
        error: () => this.oldPasswordDoesNotMatch = true
      });
    }
  }

  // Deactivation logic ----------------------

  openDeactivateModal(event: MouseEvent): void {
    event.preventDefault();
    this.yesButton = true;
    this.noButton = true;
    this.isDeactivateModalVisible = true;
  }

  cancelDeactivation(): void {
    this.isDeactivateModalVisible = false;
  }

  confirmDeactivation(): void {
    console.log("Deactivating account...");
    this.yesButton = false;
    this.noButton = false;

    this.infoService.deactivateAccount(this.user.id, this.user.role).subscribe({
      next: (response) => {
        console.log("ROLE in deactivate: ", this.user.role);
        this.modalTitle = 'Your account has been deactivated!';
        this.modalMessage = '';
        this.okButtonDeactivate = true;

        this.isDeactivateModalVisible = true;
      },
      error: (err) => {
        console.error('Error deactivating account:', err);
      }
    });

    this.isDeactivateModalVisible = false;
  }

  okButtonDeactivationClicked(): void {
    localStorage.clear();
    this.router.navigate(['home-guest']);
    this.isDeactivateModalVisible = false;
  }

  updateAuAsOrganizer() {
    this.dialog.open(UpdateAsOrganizerComponent, {
      width: '700px',
      data: {
        email: this.user.email,
        password: this.user.password
      }
    });

  }

  updateAuAsProvider() {
    this.dialog.open(UpdateAsProviderComponent, {
      width: '700px',
      data: {
        email: this.user.email,
        password: this.user.password
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

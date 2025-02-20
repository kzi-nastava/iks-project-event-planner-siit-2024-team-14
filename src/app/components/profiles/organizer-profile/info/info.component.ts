import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEO } from '../../../../interfaces/edit-eo.model';
import { InfoService } from './info.service';
import { ChangePassword } from '../../../../interfaces/change-password.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  user: any = null;
  showUpdateModal = false;
  showPasswordModal = false;
  passwordsDoNotMatch: boolean = false;  // Flag to check password match
  oldPasswordDoesNotMatch: boolean = false;  // Flag to check password match


  constructor(private infoService: InfoService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  get fullName(): string {
    return this.user ? `${this.user.name} ${this.user.surname}` : 'User Name';
  }

  /* UPDATE ----------------------------------------------------------------------- */
  openUpdateModal(event: MouseEvent): void {
    event.preventDefault();
    this.showUpdateModal = true;

    // Prefill the form with current user data
    this.editForm.setValue({
      name: this.user.name || '',
      surname: this.user.surname || '',
      address: this.user.address || '',
      city: this.user.city || '',
      phoneNumber: this.user.phoneNumber || ''
    });
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  edit(): void {
    if (this.editForm.valid) {
      const editData: EditEO = {
        id: this.user.id,
        name: this.editForm.value.name || '',
        surname: this.editForm.value.surname || '',
        address: this.editForm.value.address || '',
        city: this.editForm.value.city || '',
        phoneNumber: this.editForm.value.phoneNumber || ''
      };

      // Call the edit API and update local user data after success
      this.infoService.edit(editData).subscribe({
        next: (response: any) => {
          console.log('Edit Successfully:', response);

          // Update the local user data with the response from the server
          this.user.name = response.name;
          this.user.surname = response.surname;
          this.user.address = response.address;
          this.user.city = response.city;
          this.user.phoneNumber = response.phoneNumber;

          // Update the user in localStorage as well
          localStorage.setItem('user', JSON.stringify(this.user));

          // Close the modal after successful update
          this.closeUpdateModal();
        },
        error: (err) => {
          console.error('Error updating profile:', err);
        }
      });
    }
  }

  /* CHANGE PASSWORD -------------------------------------------------------------------------------- */

  openPasswordModal(event: MouseEvent): void {
    event.preventDefault();
    this.showPasswordModal = true;
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;
  }

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  changePassword(): void {
    if (this.passwordForm.valid) {
      const { oldPassword, password, confirmPassword } = this.passwordForm.value;

      // Check if the new password and confirm password match
      if (password !== confirmPassword) {
        this.passwordsDoNotMatch = true;
        return;
      }

      const passwordData: ChangePassword = {
        id: this.user.id,
        oldPassword: oldPassword || '',
        password: password || ''
      };

      // Call the changePassword API
      this.infoService.changePassword(passwordData).subscribe({
        next: (response: any) => {
          // If the password change is successful, show success alert
          if (response.message === 'Password successfully changed') {
            alert('Password changed successfully!');

            // Update local user data and localStorage
            this.user.password = response.password;
            localStorage.setItem('user', JSON.stringify(this.user));

            // Close the password modal
            this.closePasswordModal();
          }
        },
        error: (err: any) => {
          console.error('Error changing password:', err);

          // Check if error response exists and contains a message
          const errorMessage = err?.error?.message || 'An unexpected error occurred';

          this.oldPasswordDoesNotMatch = true;
          return;
        }
      });
    }
  }

}

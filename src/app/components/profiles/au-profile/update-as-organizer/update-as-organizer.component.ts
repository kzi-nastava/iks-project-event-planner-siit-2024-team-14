import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuService } from '../au.service';

@Component({
  selector: 'app-update-as-organizer',
  templateUrl: './update-as-organizer.component.html',
  styleUrls: ['./update-as-organizer.component.css']
})
export class UpdateAsOrganizerComponent {
  showModal = false;
  modalTitle: string = 'Registration in progress...';
  modalMessage: string = 'Please wait while we process your registration.';
  showOkButton = false;

  selectedFile: File | null = null;
  user: any = null;

  registrationForm: FormGroup;

  constructor(
    private auService: AuService,
    private dialogRef: MatDialogRef<UpdateAsOrganizerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { email: string; password: string }
  ) {
    this.registrationForm = new FormGroup({
      email: new FormControl(
        { value: this.data.email, disabled: true },
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        { value: this.data.password, disabled: true },
        [Validators.required]
      ),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  register() {
    if (this.registrationForm.valid && this.selectedFile) {
      this.showModal = true;
      this.modalTitle = 'Registration as organizer in progress...';
      this.modalMessage = 'Please wait while we process your registration.';
      this.showOkButton = false;

      const dto = {
        id: this.user?.id,
        email: this.data.email,
        password: this.data.password,
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        name: this.registrationForm.value.name || '',
        surname: this.registrationForm.value.surname || '',
        address: this.registrationForm.value.address || '',
        city: this.registrationForm.value.city || '',
        phoneNumber: this.registrationForm.value.phoneNumber || ''
      };

      const formData = new FormData();
      const dtoBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
      formData.append('dto', dtoBlob);
      formData.append('photo', this.selectedFile, this.selectedFile.name);

      console.log('Sending FormData:', dto);
      console.log('Selected photo:', this.selectedFile);

      this.auService.updateAsOrganizer(formData).subscribe({
        next: (response) => {
          console.log('Success response:', response);
          this.modalTitle = 'Registration Successful';
          this.modalMessage = 'Upgrade successful. Please log in again to continue as an organizer.';
          this.showOkButton = true;
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.modalTitle = 'Registration Failed';
          this.modalMessage = 'An error occurred. Please check your data or try again later.';
          this.showModal = true;
          this.showOkButton = true;
        }
      });
    } else {
      alert('Please fill out the form and upload a photo.');
    }
  }

  onOkClick(): void {
    this.dialogRef.close();
    localStorage.clear();
    window.location.href = '/login';
  }
}

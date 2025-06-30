import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuService } from '../au.service';

@Component({
  selector: 'app-update-as-provider',
  templateUrl: './update-as-provider.component.html',
  styleUrls: ['./update-as-provider.component.css']
})
export class UpdateAsProviderComponent {
  showModal = false;
  modalTitle: string = 'Registration in progress...';
  modalMessage: string = 'Please wait while we process your registration.';
  showOkButton = false;
  selectedFiles: File[] = [];
  user: any = null;

  registrationForm: FormGroup;

  constructor(
    private auService: AuService,
    private dialogRef: MatDialogRef<UpdateAsProviderComponent>,
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
      companyName: new FormControl('', [Validators.required]),
      companyDescription: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      photos: new FormControl(null)
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    const totalSelectedFiles = files.length + this.selectedFiles.length;

    if (totalSelectedFiles > 3) {
      alert('You can select a maximum of 3 photos.');
      const filesToAdd = Array.from(files).slice(0, 3 - this.selectedFiles.length);
      this.selectedFiles.push(...filesToAdd);
    } else {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }

  register() {
    if (this.registrationForm.valid) {
      this.showModal = true;
      this.modalTitle = 'Registration as provider in progress...';
      this.modalMessage = 'Please wait while we process your registration.';
      this.showOkButton = false;

      const dto = {
        id: this.user?.id,
        email: this.data.email,
        password: this.data.password,
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        companyName: this.registrationForm.value.companyName || '',
        companyDescription: this.registrationForm.value.companyDescription || '',
        address: this.registrationForm.value.address || '',
        city: this.registrationForm.value.city || '',
        phoneNumber: this.registrationForm.value.phoneNumber || ''
      };

      const formData = new FormData();
      const dtoBlob = new Blob([JSON.stringify(dto)], { type: 'application/json' });
      formData.append('dto', dtoBlob);

      this.selectedFiles.forEach((file) => {
        formData.append('photos', file, file.name);
      });

      console.log('Sending FormData:', dto);
      console.log('Selected files:', this.selectedFiles);

      this.auService.updateAsProvider(formData).subscribe({
        next: (response) => {
          console.log('Success response:', response);
          this.modalTitle = 'Registration Successful';
          this.modalMessage = 'Upgrade successful. Please log in again to continue as a provider.';
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
      alert('Please fill out the form correctly.');
    }
  }

  onOkClick(): void {
    this.dialogRef.close();
    localStorage.clear();
    window.location.href = '/login';
  }
}

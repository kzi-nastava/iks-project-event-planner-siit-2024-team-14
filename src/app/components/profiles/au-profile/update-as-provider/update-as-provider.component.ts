import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AuService} from '../au.service';

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
      this.showOkButton = false;
      this.modalTitle = 'Registration as provider in progress...';
      this.modalMessage = 'Please wait while we process your registration.';

      const formData = new FormData();

      const dto = {
        email: this.data.email,
        password: this.data.password,
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        companyName: this.registrationForm.value.companyName || '',
        companyDescription: this.registrationForm.value.companyDescription || '',
        address: this.registrationForm.value.address || '',
        city: this.registrationForm.value.city || '',
        phoneNumber: this.registrationForm.value.phoneNumber || ''
      };

      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      this.selectedFiles.forEach(file => {
        const filename = `${this.data.email}-${file.name}`;
        formData.append('photos', file, filename);
      });

      this.auService.updateAsProvider(formData).subscribe({
        next: () => {
          this.modalTitle = 'Registration Successful';
          this.showOkButton = true;
        },
        error: (err) => {
          this.showModal = false;
          alert('Registration failed. Please check your credentials.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}

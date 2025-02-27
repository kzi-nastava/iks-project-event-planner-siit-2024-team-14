import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationSppService } from './registration-spp.service';
import { RegistrationSpp } from '../../../interfaces/registration-spp.model';

@Component({
  selector: 'app-registration-spp',
  templateUrl: './registration-spp.component.html',
  styleUrls: ['./registration-spp.component.css']
})
export class RegistrationSppComponent {
  showModal = false;
  modalTitle: string = 'Registration in progress...';  // Default title
  modalMessage: string = 'Please wait while we process your registration.';
  showOkButton = false;
  selectedFiles: File[] = [];

  constructor(private registrationService: RegistrationSppService,
              private router: Router) {}

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    photos: new FormControl(null)
  });

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
    console.log(this.registrationForm.value);

    if (this.registrationForm.valid) {
      this.modalMessage = "Loading...";
      this.showModal = true;
      this.showOkButton = false;
      this.modalTitle = 'Registration in progress...';
      this.modalMessage = 'Please wait while we process your registration.';

      const formData = new FormData();
      const dto = {
        email: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        companyName: this.registrationForm.value.companyName || '',
        companyDescription: this.registrationForm.value.companyDescription || '',
        address: this.registrationForm.value.address || '',
        city: this.registrationForm.value.city || '',
        phoneNumber: this.registrationForm.value.phoneNumber || ''
      };

      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      this.selectedFiles.forEach(file => {
        const email = this.registrationForm.value.email || '';
        const filename = `${email}-${file.name}`; // Name the file based on email
        formData.append('photos', file, filename);
      });

      this.registrationService.register(formData).subscribe({
        next: (response: any) => {
          console.log('Registration successful: ', response);
          this.modalTitle = 'Registration Successful';
          this.modalMessage = "Now you need to activate your account via email. After that, log in and enjoy!";
          this.showOkButton = true;
        },
        error: (err) => {
          if (err.status === 409) {  // Assuming 409 is the HTTP status for duplicate email
            alert('User with that email address already exists');
          } else {
            alert('Registration failed. Please check your credentials.');
          }
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  closeModal() {
    this.showModal = false;
  }
}

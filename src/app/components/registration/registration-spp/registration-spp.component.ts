import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationSppService } from './registration-spp.service';
import {RegistrationSpp} from '../../../interfaces/registration-spp.model';

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
  selectedFile: File | null = null;

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
  })

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
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

      if (this.selectedFile) {
        const email = this.registrationForm.value.email || '';
        const filename = `${email}.png`; // Name the file based on email
        formData.append('photo', this.selectedFile, filename);
      }

      this.registrationService.register(formData).subscribe({
        next: (response: any) => {
          console.log('Registration successful: ', response);
          this.showModal = true;  // Show the success modal
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
    this.showModal = false; // Close modal (handled by SuccessfulComponent)
  }

}

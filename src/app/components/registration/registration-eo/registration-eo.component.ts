import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationEoService } from './registration-eo.service';

@Component({
  selector: 'app-registration-eo',
  templateUrl: './registration-eo.component.html',
  styleUrls: ['./registration-eo.component.css']
})
export class RegistrationEoComponent {
  showModal = false;
  modalTitle: string = 'Registration in progress...';  // Default title
  modalMessage: string = 'Please wait while we process your registration.';
  showOkButton = false;
  selectedFile: File | null = null;

  constructor(private registrationService: RegistrationEoService, private router: Router) {}

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    photo: new FormControl(null)  // Optional photo control
  });

  // Handle file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  register() {
    console.log(this.registrationForm.value);

    if (this.registrationForm.valid) {
      // Show loading modal
      this.modalMessage = "Loading...";
      this.showModal = true;
      this.showOkButton = false;
      this.modalTitle = 'Registration in progress...';

      const formData = new FormData();
      const dto = {
        email: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        name: this.registrationForm.value.name || '',
        surname: this.registrationForm.value.surname || '',
        address: this.registrationForm.value.address || '',
        city: this.registrationForm.value.city || '',
        phoneNumber: this.registrationForm.value.phoneNumber || ''
      };

      // Append form data
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      // Append photo if available (optional)
      if (this.selectedFile) {
        const email = this.registrationForm.value.email || '';
        const filename = `${email}.png`;  // Use email as the filename
        formData.append('photo', this.selectedFile, filename);
      }

      // Call the registration service
      this.registrationService.register(formData).subscribe({
        next: (response: any) => {
          console.log('Registration successful: ', response);
          this.modalTitle = 'Registration Successful';
          this.modalMessage = "Now you need to activate your account via email. After that, log in and enjoy!";
          this.showOkButton = true;  // Show "OK" button when registration is successful
        },
        error: (err) => {
          if (err.status === 409) {
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
    this.showModal = false;  // Close modal when OK is clicked
  }
}

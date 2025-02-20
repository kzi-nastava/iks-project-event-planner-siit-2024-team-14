import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationEoService } from './registration-eo.service';
import {RegistrationEo} from '../../../interfaces/registration-eo.model';

@Component({
  selector: 'app-registration-eo',
  templateUrl: './registration-eo.component.html',
  styleUrls: ['./registration-eo.component.css']
})
export class RegistrationEoComponent {
  showModal = false;
  selectedFile: File | null = null;

  constructor(
    private registrationService: RegistrationEoService, private router: Router) {}

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    photo: new FormControl(null)
  })

  // Handle file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  register() {
    console.log('Form Submitted');
    console.log(this.registrationForm.value);  // Logs the current form data

    if (this.registrationForm.valid) {
      console.log('Valid form');
      const formData = new FormData();

      // Prepare dto as JSON string and append it as a part
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

      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

      // Append the photo file as 'photo'
      if (this.selectedFile) {
        const email = this.registrationForm.value.email || '';
        const filename = `${email}.png`; // Name the file based on email
        formData.append('photo', this.selectedFile, filename);
      }

      // Send form data to backend
      this.registrationService.register(formData).subscribe({
        next: (response: any) => {
          console.log('Registration successful: ', response);
          this.showModal = true;
        },
        error: (err) => {
          if (err.status === 409) {  // HTTP status for duplicate email
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

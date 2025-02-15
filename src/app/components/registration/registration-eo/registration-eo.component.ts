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

  register() {
    console.log('Form Submitted');
    console.log(this.registrationForm.value);  // Logs the current form data

    if (this.registrationForm.valid) {
      console.log('Valid form');
      const registrationData: RegistrationEo = {
        email: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        name: this.registrationForm.value.name || '',
        surname: this.registrationForm.value.surname || '',
        address: this.registrationForm.value.address || '',
        city: this.registrationForm.value.city || '',
        phoneNumber: Number(this.registrationForm.value.phoneNumber) || 0,
        photo: this.registrationForm.value.photo || null
      };

      console.log('Before subscribe');
      this.registrationService.register(registrationData).subscribe({
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

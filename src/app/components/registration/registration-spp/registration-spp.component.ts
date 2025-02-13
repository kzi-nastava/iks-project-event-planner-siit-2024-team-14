import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationSppService } from './registration-spp.service';
import {RegistrationSpp} from '../../../interfaces/registration-spp.model';

function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordsDoNotMatch: true }
    : null;
}

@Component({
  selector: 'app-registration-spp',
  templateUrl: './registration-spp.component.html',
  styleUrls: ['./registration-spp.component.css']
})
export class RegistrationSppComponent {

  showModal = false; // Controls modal visibility

  constructor(
    private registrationService: RegistrationSppService, private router: Router) {}

  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required]),
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
      const registrationData: RegistrationSpp = {
        email: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        confirmPassword: this.registrationForm.value.confirmPassword || '',
        companyName: this.registrationForm.value.companyName || '',
        companyDescription: this.registrationForm.value.companyDescription || '',
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

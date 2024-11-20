import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-spp',
  templateUrl: './registration-spp.component.html',
  styleUrl: './registration-spp.component.css'
})
export class RegistrationSppComponent {
  isValidPhoneNumber: boolean = true;

  // Method to handle phone number input validation
  onPhoneInput(event: any): void {
    const phoneNumber = event.target.value;
    const validPhonePattern = /^[0-9+\-\(\)\s]*$/;

    // Check if input matches pattern
    if (!validPhonePattern.test(phoneNumber)) {
      this.isValidPhoneNumber = false;
      event.target.value = phoneNumber.slice(0, -1);  // Remove invalid character
    } else {
      this.isValidPhoneNumber = true;
    }
  }
}

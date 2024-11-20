import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  createServiceForm!: FormGroup;

  availableEventTypes = ['Birthday Party', 'Retirement Party', 'Rooftop Theatre'];
  availableCategories = ['Dj Services', 'Catering', 'Horse Riding Lessons'];

  constructor(private location: Location, private fb: FormBuilder) {
    this.initializeForm();
  }

  createService() {
    if (this.createServiceForm.valid){
      console.log("Creating new service...")
      this.location.back();
    }
    console.log("Invalid service data!")
  }



  closePopup() {
    this.location.back();
  }



  private initializeForm() {
    this.createServiceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      images: [null], // File inputs require custom handling
      eventTypes: [[]], // Multi-select uses arrays
      reservationPolicy: ['manual', Validators.required],
      visibility: ['public', Validators.required],
      availability: ['available', Validators.required],
      category: [''],
      customCategory: [''], // Used only if 'Suggest new category' is selected
      duration: [0, [Validators.required, Validators.min(0)]],
      minReservationTime: [0, [Validators.required, Validators.min(0)]],
      maxReservationTime: [0, [Validators.required, Validators.min(0)]],
      reservationTimeSpan: [0, [Validators.required, Validators.min(0)]],
      cancellationTimePeriod: [0, [Validators.required, Validators.min(0)]],
    });
  }
}

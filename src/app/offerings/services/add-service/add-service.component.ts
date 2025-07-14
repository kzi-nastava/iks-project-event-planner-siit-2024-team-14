import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {EventTypeManagementService} from '../../../components/event-type-management/event-type-management.service';
import {CategoryService} from '../../category.service';
import {ServiceService} from '../../service.service';
import {MessagePopupComponent} from '../../../dialogs/message-popup/message-popup.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  infoFormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    price: ['', [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.min(0), Validators.max(100)]],
  });

  categoryFormGroup = this.formBuilder.group({
    id: [NaN],
    name: [''],
    description: ['']
  });

  secondFormGroup = this.formBuilder.group({
    category: this.categoryFormGroup,
    applicableEventTypeIds: [[]],
  });

  reservationFormGroup = this.formBuilder.group({
    reservationType: ['AUTOMATIC', [Validators.required]],
    durationMinutes: ['', [Validators.min(0)]],
    minDurationMinutes: ['', [Validators.min(0)]],
    maxDurationMinutes: ['', [Validators.min(0)]],
    reservationPeriodDays: ['', [Validators.required, Validators.min(0)]],
    cancellationPeriodDays: ['', [Validators.required, Validators.min(0)]],
  });

  durationMode: 'fixed' | 'range' = 'fixed';
  isAddingNewCategory = false;

  get autoAcceptReservations() {
    return this.reservationFormGroup.get('reservationType')?.value === 'AUTOMATIC';
  }

  set autoAcceptReservations(value: boolean) {
    this.reservationFormGroup.get('reservationType')?.setValue(
      value ? 'AUTOMATIC' : 'MANUAL'
    );
  }

  allEventTypes = [] as any[];
  allCategories = [] as any[];
  @ViewChild('successPopup') successPopup!: MessagePopupComponent;
  @ViewChild('errorPopup') errorPopup!: MessagePopupComponent;


  ngOnInit() {
    this.eventTypeService.getAllEventTypes().subscribe(types => this.allEventTypes = types);
    this.categoryService.getAll().subscribe(categories => this.allCategories = categories)
  }



  onSubmit() {
    let data = {
      ...this.infoFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.reservationFormGroup.value
    };

    if (this.isAddingNewCategory) {
      delete data.category?.id;
    } else {
      delete data.category?.name;
      delete data.category?.description;
    }

    if (this.durationMode === 'fixed') {
      delete data.minDurationMinutes;
      delete data.maxDurationMinutes;
    } else {
      delete data.durationMinutes;
    }

    console.log(data);
    this.serviceService.create(data)
      .subscribe({
        next: service => {
          console.log('[AddServiceComponent] Added new service', service);
          this.successPopup.message = `Created a service: "${service.name}"`;
          this.successPopup.isVisible = true;
        },
        error: err => {
          this.errorPopup.message = `Failed to create service: ${err.message}`
          this.errorPopup.isVisible = !!'yes';
        }
      });
  }



  private eventTypeService = inject(EventTypeManagementService);
  private categoryService = inject(CategoryService);
  private serviceService = inject(ServiceService);
  protected location = inject(Location);
  protected router = inject(Router);
}

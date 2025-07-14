import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Service} from '../../model/service.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from '../../service.service';
import {EventTypeManagementService} from '../../../components/event-type-management/event-type-management.service';
import {CategoryService} from '../../category.service';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  service = {id: NaN} as Service;
  _formBuilder = inject(FormBuilder);

  serviceFormGroup = this._formBuilder.group({
    name: ['', [Validators.minLength(3)]],
    description: [''],
    price: [NaN, [Validators.min(0)]],
    discount: [NaN, [Validators.min(0), Validators.max(100)]],
    applicableEventTypeIds: [[] as number[], [Validators.minLength(1)]],
    durationMinutes: [NaN, [Validators.min(0)]],
    maxDurationMinutes: [NaN, [Validators.min(0)]],
    minDurationMinutes: [NaN, [Validators.min(0)]],
    reservationPeriodDays: [NaN, [Validators.min(0)]],
    cancellationPeriodDays: [NaN, [Validators.min(0)]],
    visibility: [''],
    reservationType: [''],
    available: [] as boolean[]
  });


  allCategories= [] as any[];
  allEventTypes = [] as any[];


  get isPublic() {
    return this.serviceFormGroup.get('visibility')?.value === 'PUBLIC';
  }

  set isPublic(value: boolean) {
    const visibility = this.serviceFormGroup.get('visibility');

    visibility?.setValue(
      value ? 'PUBLIC' : 'PRIVATE'
    );

    visibility?.markAsDirty();
  }

  get autoAcceptReservations() {
    return this.serviceFormGroup.get('reservationType')?.value === 'AUTOMATIC';
  }

  set autoAcceptReservations(value: boolean) {
    const reservationType = this.serviceFormGroup.get('reservationType');

    reservationType?.setValue(
      value ? 'AUTOMATIC' : 'MANUAL'
    );

    reservationType?.markAsDirty();
  }



  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.service.id = +params['id'];

        this.serviceService.getById(this.service.id)
          .subscribe({
            next: service => {
              this.service = service;
              this.reset();
            },
            error: err => {
              console.error('[EditServiceComponent] Failed to fetch service', err);
              this.router.navigate(['/solutions']).then();
            }
          });
      }
    )

    this.eventTypeService.getAllEventTypes()
      .subscribe(types => this.allEventTypes = types);

    this.categoryService.getAll()
      .subscribe(categories => this.allCategories = categories);
  }


  submit() {
    if (this.serviceFormGroup.invalid) {
      this.serviceFormGroup.markAllAsTouched();
      return;
    }

    const data = Object.fromEntries(
      Object.entries(this.serviceFormGroup.controls)
        .filter(([key, control]) =>
          control.dirty &&
          (
            control.value ||
            control.value !== null &&
            control.value !== '' &&
            control.value !== undefined &&
            Number.isNaN(control.value)
          )
        )
        .map(([key, control]) => [key, control.value])
    );

    if (Object.keys(data).length === 0)
      return;

    console.log('Updating service', data);
    this.serviceService.update({...data, id: this.service.id})
      .subscribe(service => {
        this.service = service;
        this.reset();
      });
  }

  reset() {
    this.serviceFormGroup.patchValue({
      ...this.service,
      applicableEventTypeIds: this.service.applicableEventTypes?.map(t => t.id)
    });

    this.serviceFormGroup.markAsPristine();
    this.serviceFormGroup.markAsUntouched();
    this.serviceFormGroup.updateValueAndValidity();
  }


  delete() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Confirmation`,
        message: `Are you sure you want to delete "${this.service.name}"`
      }
    })
      .afterClosed().subscribe(result => {
        if (result) {
          this.serviceService.delete(this.service)
            .subscribe(_ => this.router.navigate(['/solutions']));
        }
      })

  }



  route = inject(ActivatedRoute);
  router = inject(Router);
  serviceService = inject(ServiceService);
  eventTypeService = inject(EventTypeManagementService);
  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);
}

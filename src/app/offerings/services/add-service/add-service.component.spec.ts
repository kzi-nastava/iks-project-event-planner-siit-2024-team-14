import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../infrastructure/material/material.module';
import {BrowserModule, By} from '@angular/platform-browser';
import {of, throwError} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepper} from '@angular/material/stepper';

import { AddServiceComponent } from './add-service.component';
import {EventTypeManagementService} from '../../../components/event-type-management/event-type-management.service';
import {CategoryService} from '../../category.service';
import {ServiceService} from '../../service.service';
import {MockMessagePopupComponent} from './__mocks__/mock-message-popup';



describe('AddServiceComponent', () => {
  let component: AddServiceComponent;
  let el: HTMLElement;
  let fixture: ComponentFixture<AddServiceComponent>;

  let serviceService: jasmine.SpyObj<ServiceService>;
  let location: jasmine.SpyObj<Location>;
  let router: jasmine.SpyObj<Router>;


  beforeEach(async () => {
    let eventTypeService = jasmine.createSpyObj('EventTypeManagementService', ['getAllEventTypes']);
    let categoryService = jasmine.createSpyObj('CategoryService', ['getAll']);

    eventTypeService.getAllEventTypes.and.returnValue(of([
      { id: 1, name: 'First Event Type'},
      { id: 2, name: 'Second Event Type'},
    ]));
    categoryService.getAll.and.returnValue(of([
      { id: 1, name: 'First Category'},
      { id: 2, name: 'Second Category' },
    ]));

    serviceService = jasmine.createSpyObj('ServiceService', ['create']);
    location = jasmine.createSpyObj('Location', ['back']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddServiceComponent],
      imports: [
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MockMessagePopupComponent,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: Location, useValue: location},
        { provide: EventTypeManagementService, useValue: eventTypeService },
        { provide: CategoryService, useValue: categoryService },
        { provide: ServiceService, useValue: serviceService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddServiceComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize with first step active', () => {
    let stepper: MatStepper = fixture.debugElement.query(By.directive(MatStepper)).componentInstance;
    expect(stepper).toBeInstanceOf(MatStepper);
    expect(stepper.selectedIndex).toBe(0);
  });


  it('should go back when close button is clicked', () => {
    const location = fixture.debugElement.injector.get(Location);

    const button = el.querySelector('.close-btn') as HTMLElement;
    expect(button).toBeTruthy();
    button.click();

    expect(location.back).toHaveBeenCalledTimes(1);
  });


  it('should validate required fields in first step', () => {
    const stepper = fixture.debugElement.query(By.directive(MatStepper)).componentInstance as MatStepper;
    const buttonNext = el.querySelector('button[matStepperNext]') as HTMLButtonElement;
    const nameControl = component.infoFormGroup.get('name');
    const priceControl = component.infoFormGroup.get('price');

    nameControl?.setValue('');
    priceControl?.setValue(null);
    expect(component.infoFormGroup.invalid).toBeTrue();

    buttonNext.click();
    fixture.detectChanges();
    expect(stepper.selectedIndex).toBe(0);

    nameControl?.setValue('Valid Name');
    priceControl?.setValue(10);
    expect(component.infoFormGroup.valid).toBeTrue();

    buttonNext.click();
    fixture.detectChanges();
    expect(stepper.selectedIndex).toBe(1);
  });


  it('should submit valid form data and show success', () => {
    component.infoFormGroup.setValue({
      name: 'Test Service',
      description: 'Test Description',
      price: 100,
      discount: 10
    });

    component.secondFormGroup.setValue({
      category: { id: 1, name: '', description: '' },
      applicableEventTypeIds: [1]
    });

    component.reservationFormGroup.setValue({
      reservationType: 'AUTOMATIC',
      durationMinutes: 60,
      minDurationMinutes: null,
      maxDurationMinutes: null,
      reservationPeriodDays: 7,
      cancellationPeriodDays: 2
    });

    serviceService.create
      .and.returnValue(of({ id: 1, name: 'Test Service' } as any));

    component.onSubmit();
    fixture.detectChanges();

    expect(serviceService.create).toHaveBeenCalledTimes(1);
    expect(component.successPopup.isVisible).toBeTrue();
    expect(component.successPopup.message).toContain('Test Service');

    component.successPopup.close.emit();
    expect(router.navigate).toHaveBeenCalledWith(['solutions']);
  });


  it('should send correct data on submit', () => {
    component.infoFormGroup.setValue({
      name: 'Test Service',
      description: 'Test Description',
      price: 100,
      discount: 10
    });

    component.isAddingNewCategory = false;
    component.secondFormGroup.setValue({
      category: { id: 1, name: '', description: '' },
      applicableEventTypeIds: [1]
    });

    component.reservationFormGroup.setValue({
      reservationType: 'AUTOMATIC',
      durationMinutes: 60,
      minDurationMinutes: null,
      maxDurationMinutes: null,
      reservationPeriodDays: 7,
      cancellationPeriodDays: 2
    });

    serviceService.create
      .and.callFake(s => {

        expect(s.category?.id).toBe(1);
        expect(s.category.name).toBeUndefined();
        expect(s.category.description).toBeUndefined();

        expect(s.durationMinutes).toBe(60);
        expect(s.minDurationMinutes).toBeUndefined();
        expect(s.maxDurationMinutes).toBeUndefined();

        return of({} as any);
    });

    component.onSubmit();
    expect(serviceService.create).toHaveBeenCalled();
  });


  it('should handle service creation error', () => {
    component.infoFormGroup.setValue({
      name: 'Test Service',
      description: '',
      price: 0,
      discount: 0
    });

    serviceService.create
      .and.returnValue(throwError(() => new Error('Test Error')));

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorPopup.isVisible).toBeTrue();
    expect(component.errorPopup.isError).toBeTrue();
    expect(component.errorPopup.message).toContain('Test Error');
  });


});

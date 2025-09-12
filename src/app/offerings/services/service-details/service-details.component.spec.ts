import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceDetailsComponent } from './service-details.component';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;
  let httpMock: HttpTestingController;
  let serviceService: jasmine.SpyObj<ServiceService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ServiceService', ['getById', 'getAvailableStartTimes']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ServiceDetailsComponent],
      providers: [
        { provide: ServiceService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    serviceService = TestBed.inject(ServiceService) as jasmine.SpyObj<ServiceService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ✅ Pozitivni testovi
  it('should open and close reservation popup', () => {
    component.openReservationPopup();
    expect(component.isPopupOpen).toBeTrue();

    component.closeReservationPopup();
    expect(component.isPopupOpen).toBeFalse();
  });

  it('should set body overflow when opening and closing popup', () => {
    component.openReservationPopup();
    expect(document.body.style.overflow).toBe('hidden');

    component.closeReservationPopup();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should fetch service details and set reservation', () => {
    const mockService: any = { id: 10, durationMinutes: 60, reservationType: 'MANUAL' };
    serviceService.getById.and.returnValue(of(mockService));

    (component as any).fetchServiceDetails(10);

    expect(component.service).toEqual(mockService);
    expect(component.reservation.serviceId).toBe(10);
    expect(component.reservation.duration).toBe(60);
    expect(component.reservation.reservationType).toBe('MANUAL');
  });

  it('should generate duration options correctly', () => {
    const result = component.generateDurationOptions(30, 90);
    expect(result).toEqual([30, 60, 90]);
  });

  it('should submit reservation and reset form', () => {
    spyOn(component as any, 'resetReservationForm');
    spyOn(component, 'closeReservationPopup');

    component.reservation = {
      serviceId: 1,
      date: '2025-12-01',
      startTime: '10:00',
      duration: 60,
      eventId: 2,
      reservationType: 'MANUAL'
    };

    component.submitReservation();

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/reserve');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      serviceId: 1,
      eventId: 2,
      bookingDate: '2025-12-01',
      startTime: '10:00',
      duration: 60,
      reservationType: 'MANUAL'
    });

    req.flush('ok');

    expect(component.closeReservationPopup).toHaveBeenCalled();
    expect(component['resetReservationForm']).toHaveBeenCalled();
  });

  it('should alert if reservation fails', () => {
    spyOn(window, 'alert');
    spyOn(component, 'closeReservationPopup');

    component.reservation = {
      serviceId: 1,
      date: '2025-12-01',
      startTime: '10:00',
      duration: 60,
      eventId: 2,
      reservationType: 'MANUAL'
    };

    component.submitReservation();

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/reserve');
    req.error(new ProgressEvent('Network error'));

    expect(window.alert).toHaveBeenCalledWith('Failed to book service.');
    expect(component.closeReservationPopup).toHaveBeenCalled();
  });

  // ❌ Negativni testovi
  it('should alert if no event selected on onEventChange', () => {
    spyOn(window, 'alert');
    component.selectedEventId = null;

    component.onEventChange();

    expect(window.alert).toHaveBeenCalledWith('You need to choose an event first!');
  });

  it('should reset reservation if event is in the past', () => {
    const pastEvent = { id: 5, startDate: '2025-01-01' };
    component.userEvents = [pastEvent as any];
    component.selectedEventId = 5;

    component['service'] = { reservationPeriod: 'P5D' } as any;
    spyOn(window, 'alert');

    component.onEventChange();

    expect(component.reservation.date).toBe('');
    expect(component.reservation.eventId).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('This event has already ended.');
  });

  it('should reset reservation if event is too soon', () => {
    const today = new Date();
    const soonDate = new Date();
    soonDate.setDate(today.getDate() + 1);

    const soonEvent = { id: 6, startDate: soonDate.toISOString().split('T')[0] };
    component.userEvents = [soonEvent as any];
    component.selectedEventId = 6;
    component['service'] = { reservationPeriod: 'P5D' } as any;
    spyOn(window, 'alert');

    component.onEventChange();

    expect(component.reservation.date).toBe('');
    expect(component.reservation.eventId).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('You must book this service at least 5 days in advance.');
  });

  // 🔲 Granični slučajevi
  it('should return single option if minDuration == maxDuration', () => {
    const result = component.generateDurationOptions(60, 60);
    expect(result).toEqual([60]);
  });

  it('should call serviceService.getAvailableStartTimes on onDurationChange', () => {
    serviceService.getAvailableStartTimes.and.returnValue(of(['10:00', '11:00']));
    component.service = { id: 1 } as any;
    component.reservation.date = '2025-12-01';
    component.reservation.duration = 60;

    component.onDurationChange();

    expect(serviceService.getAvailableStartTimes).toHaveBeenCalledWith(1, '2025-12-01', 60);
  });

  it('should handle empty available start times', () => {
    serviceService.getAvailableStartTimes.and.returnValue(of([]));
    component.service = { id: 1 } as any;
    component.reservation.date = '2025-12-01';
    component.reservation.duration = 60;

    component.onDurationChange();

    expect(component.availableStartTimes.length).toBe(0);
  });

  it('should update available start times on date change', () => {
    serviceService.getAvailableStartTimes.and.returnValue(of(['09:00', '10:00']));
    component.service = { id: 1, durationMinutes: 60 } as any;
    component.reservation.date = '2025-12-01';

    component.onDateChange();

    expect(component.availableStartTimes).toEqual(['09:00', '10:00']);
  });

  it('should set reservation date and eventId on valid event selection', () => {
    const futureEvent = { id: 10, startDate: '2025-12-10' } as any;
    component.userEvents = [futureEvent];
    component.service = { reservationPeriod: 'P1D' } as any;
    component.selectedEventId = 10;

    spyOn(component, 'onDateChange');

    component.onEventChange();

    expect(component.reservation.date).toBe('2025-12-10');
    expect(component.reservation.eventId).toBe(10);
    expect(component.onDateChange).toHaveBeenCalled();
  });

  it('should alert if selected time slot is already booked', () => {
    spyOn(window, 'alert');
    spyOn(component, 'closeReservationPopup');

    component.reservation = {
      serviceId: 1,
      date: '2025-12-01',
      startTime: '10:00',
      duration: 60,
      eventId: 2,
      reservationType: 'MANUAL'
    };

    component.submitReservation();

    const req = httpMock.expectOne('http://localhost:8080/api/bookings/reserve');
    req.flush({ message: 'Already booked' }, { status: 409, statusText: 'Conflict' });

    expect(window.alert).toHaveBeenCalledWith('Failed to book service.');
    expect(component.closeReservationPopup).toHaveBeenCalled();
  });

  it('should fetch user events successfully', () => {
    const mockEvents = [
      { id: 1, startDate: '2025-12-01' },
      { id: 2, startDate: '2025-12-05' }
    ];

    (component as any).fetchUserEvents(123);

    const req = httpMock.expectOne('http://localhost:8080/api/events/by-organizer/123');
    expect(req.request.method).toBe('GET');

    req.flush(mockEvents);

    expect(component.userEvents.length).toBe(2);
    expect(component.userEvents[0].id).toBe(1);
  });

  it('should reset reservation form to default values', () => {
    component.service = { id: 7, durationMinutes: 45 } as any;
    component.reservation = {
      serviceId: 7,
      date: '2025-12-01',
      startTime: '09:00',
      duration: 45,
      eventId: 10,
      reservationType: 'MANUAL'
    };
    component.availableStartTimes = ['09:00'];

    (component as any).resetReservationForm();

    expect(component.reservation.serviceId).toBe(7);
    expect(component.reservation.date).toBe('');
    expect(component.reservation.startTime).toBe('');
    expect(component.reservation.duration).toBe(45);
    expect(component.reservation.eventId).toBe(-1);
    expect(component.availableStartTimes).toEqual([]);
  });

  it('should correctly convert duration strings to days', () => {
    const convert = (component as any).convertDurationToDays.bind(component);

    expect(convert('P3D')).toBe(3);        // 3 dana
    expect(convert('PT48H')).toBe(2);      // 48h = 2 dana
    expect(convert('PT1H')).toBe(1);       // zaokružuje na ceo dan
    expect(convert('XYZ')).toBe(0);        // nepoznat format
  });

  it('should not call getAvailableStartTimes if reservation date is empty', () => {
    component.service = { id: 1, durationMinutes: 60 } as any;
    component.reservation.date = ''; // prazan datum
    component.reservation.duration = 60;

    component.onDateChange();

    expect(serviceService.getAvailableStartTimes).not.toHaveBeenCalled();
  });


});

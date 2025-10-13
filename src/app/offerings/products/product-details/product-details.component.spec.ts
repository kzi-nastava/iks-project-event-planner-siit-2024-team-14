import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductDetailsComponent } from './product-details.component';
import { ProductService } from '../../product.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../infrastructure/auth/auth.service';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let httpMock: HttpTestingController;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ProductService', ['getById', 'getAvailableStock']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ProductService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
        { provide: AuthService, useValue: { user$: of(null) } } // mock AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ✅ Positive tests
  it('should open and close purchase popup', () => {
    component.openPurchasePopup();
    expect(component.isPopupOpen).toBeTrue();

    component.closePurchasePopup();
    expect(component.isPopupOpen).toBeFalse();
  });

  it('should set body overflow when opening and closing popup', () => {
    component.openPurchasePopup();
    expect(document.body.style.overflow).toBe('hidden');

    component.closePurchasePopup();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should fetch product details and set purchase data', () => {
    const mockProduct: any = { id: 10, price: 50, available: true };
    productService.getById.and.returnValue(of(mockProduct));

    (component as any).fetchProductDetails(10);

    expect(component.product).toEqual(mockProduct);
    expect(component.purchase.productId).toBe(10);
    expect(component.purchase.price).toBe(50);
  });

  it('should generate quantity options correctly', () => {
    const result = component.generateQuantityOptions(1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should submit purchase and reset form', () => {
    spyOn(component as any, 'resetPurchaseForm');
    spyOn(component, 'closePurchasePopup');

    component.purchase = {
      productId: 1,
      quantity: 2,
      price: 100,
      eventId: 2,
      purchaseDate: ''
    };

    component.submitPurchase();

    const req = httpMock.expectOne('http://localhost:8080/api/purchases/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      productId: 1,
      eventId: 2,
      quantity: 2,
      price: 100,
      purchaseDate: ''
    });

    req.flush('ok');

    expect(component.closePurchasePopup).toHaveBeenCalled();
    expect(component['resetPurchaseForm']).toHaveBeenCalled();
  });

  it('should alert if purchase fails', () => {
    spyOn(window, 'alert');
    spyOn(component, 'closePurchasePopup');

    component.purchase = {
      productId: 1,
      quantity: 1,
      price: 50,
      eventId: 2,
      purchaseDate: ''
    };

    component.submitPurchase();

    const req = httpMock.expectOne('http://localhost:8080/api/purchases/create');
    req.error(new ProgressEvent('Network error'));

    expect(window.alert).toHaveBeenCalledWith('Failed to purchase product.');
    expect(component.closePurchasePopup).toHaveBeenCalled();
  });

  // ❌ Negative tests
  it('should alert if no event selected on onEventChange', () => {
    spyOn(window, 'alert');
    component.selectedEventId = null;

    component.onEventChange();

    expect(window.alert).toHaveBeenCalledWith('You need to choose an event first!');
  });

  it('should reset purchase if event has ended', () => {
    const pastEvent = { id: 5, startDate: '2025-01-01' };
    component.userEvents = [pastEvent as any];
    component.selectedEventId = 5;

    spyOn(window, 'alert');

    component.onEventChange();

    expect(component.purchase.eventId).toBe(0);
    expect(window.alert).toHaveBeenCalledWith('This event has already ended.');
  });

  // 🔲 Edge cases
  it('should return single option if min == max quantity', () => {
    const result = component.generateQuantityOptions(3, 3);
    expect(result).toEqual([3]);
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

  it('should reset purchase form to default values', () => {
    component.product = { id: 7, price: 50 } as any;
    component.purchase = {
      productId: 7,
      quantity: 2,
      price: 100,
      eventId: 10,
      purchaseDate: '2025-12-01'
    };

    (component as any).resetPurchaseForm();

    expect(component.purchase.productId).toBe(7);
    expect(component.purchase.quantity).toBe(1);
    expect(component.purchase.price).toBe(50);
    expect(component.purchase.eventId).toBe(-1);
    expect(component.purchase.purchaseDate).toBe('');
  });

  it('should alert if stock is unavailable', () => {
    spyOn(window, 'alert');
    spyOn(component, 'closePurchasePopup');

    component.purchase = {
      productId: 1,
      quantity: 10,
      price: 500,
      eventId: 2,
      purchaseDate: ''
    };

    component.submitPurchase();

    const req = httpMock.expectOne('http://localhost:8080/api/purchases/create');
    req.flush({ message: 'Out of stock' }, { status: 409, statusText: 'Conflict' });

    expect(window.alert).toHaveBeenCalledWith('Failed to purchase product.');
    expect(component.closePurchasePopup).toHaveBeenCalled();
  });
});

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product.model';
import { ProductService } from '../../product.service';
import { User } from '../../../infrastructure/auth/model/user.model';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { EventModel } from '../../../interfaces/event.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = { id: -1 } as Product;
  user: User | null = null;
  get role() { return this.user?.role; }

  isPopupOpen = false;
  userEvents: EventModel[] = [];
  selectedEventId: number | null = null;
  minDate: string = '';

  purchase = {
    productId: 0,
    eventId: 0,
    purchaseDate: '',
    price: 0,
    quantity: 1
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(user => (this.user = user));
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) this.fetchUserEvents(+userId);

    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.fetchProductDetails(productId);
    });

    this.minDate = new Date().toISOString().split('T')[0];
  }

  /** Fetch product details */
  private fetchProductDetails(productId: number): void {
    this.productService.getById(productId).subscribe({
      next: product => {
        if (!product || !product.id) {
          alert('Product not available.');
          this.product = { id: -1 } as Product;
          return;
        }

        this.product = product;
        this.purchase.productId = product.id;
        if (product.price) {
          this.purchase.price = product.price;
        }
      },
      error: () => {
        alert('Product not available.');
        this.product = { id: -1 } as Product;
      }
    });
  }

  /** Fetch all events created by this organizer */
  private fetchUserEvents(userId: number): void {
    this.http
      .get<EventModel[]>(`http://localhost:8080/api/events/by-organizer/${userId}`)
      .subscribe(events => (this.userEvents = events));
  }

  /** Open purchase popup */
  openPurchasePopup(): void {
    this.isPopupOpen = true;
    document.body.style.overflow = 'hidden';
  }

  /** Close purchase popup */
  closePurchasePopup(): void {
    this.isPopupOpen = false;
    document.body.style.overflow = 'auto';
  }

  /** Handle event selection change */
  onEventChange(): void {
    if (!this.selectedEventId) {
      alert('You need to choose an event first!');
      return;
    }

    const selectedEvent = this.userEvents.find(event => event.id === Number(this.selectedEventId));
    if (!selectedEvent) {
      alert('Selected event not found!');
      return;
    }

    const today = new Date();
    const eventStartDate = new Date(selectedEvent.startDate);

    if (eventStartDate < today) {
      this.resetPurchase('This event has already ended.');
    } else {
      this.purchase.eventId = selectedEvent.id;
      this.purchase.purchaseDate = this.minDate;
    }
  }

  /** Reset purchase fields when invalid event chosen */
  private resetPurchase(message: string): void {
    alert(message);
    this.selectedEventId = null;
    this.purchase.purchaseDate = '';
    this.purchase.eventId = 0;
  }

  /** Submit purchase to backend */
  submitPurchase(): void {
    if (!this.purchase.eventId) {
      alert('Please select an event before purchasing.');
      return;
    }

    const purchaseRequest = {
      productId: this.purchase.productId,
      eventId: this.purchase.eventId,
      purchaseDate: this.purchase.purchaseDate,
      quantity: this.purchase.quantity,
      price: this.purchase.price
    };

    this.closePurchasePopup();

    this.http
      .post('http://localhost:8080/api/purchases/create', purchaseRequest, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Product purchased successfully!');
          this.resetPurchaseForm();
        },
        error: err => {
          console.error('Error occurred:', err);
          alert('Failed to purchase product.');
        }
      });
  }

  /** Reset purchase form after successful submission */
  private resetPurchaseForm(): void {
    this.selectedEventId = null;
    this.purchase = {
      productId: this.product.id,
      eventId: -1,
      purchaseDate: '',
      price: this.product.price ?? 0,
      quantity: 1
    };
  }

  /** Generate quantity options */
  generateQuantityOptions(min: number, max: number): number[] {
    if (min > max) return [];
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }
}

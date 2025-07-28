import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ProductService} from '../../product.service';
import {AuthService} from '../../../infrastructure/auth/auth.service';
import {EventModel} from '../../../interfaces/event.model';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrl: './purchase-product.component.css'
})
export class PurchaseProductComponent implements OnInit {
  @Input() product: any;
  @Output() onPurchased = new EventEmitter<any>();

  organizerEvents?: EventModel[];


  ngOnInit() {
    const organizer = this.auth.user;

    if (organizer?.role !== 'EventOrganizer') {
      console.warn('[PurchaseProductComponent] User is not an organizer');
      return;
    }

    this.eventService.getOrganizerEvents(organizer.id)
      .subscribe(events => this.organizerEvents = events);
  }


  purchase(event: EventModel) {
    this.productService.purchase(this.product.id, event.id)
      .subscribe(purchase => {
        alert(`"${purchase.product.name}" successfully purchased for event "${purchase.event.name}".`);
        this.onPurchased.emit(purchase);
      });
  }


  productService = inject(ProductService);
  eventService = this.productService;
  auth = inject(AuthService);
  dialog = inject(MatDialog);
}

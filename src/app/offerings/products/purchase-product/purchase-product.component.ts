import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../product.service';
import { AuthService } from '../../../infrastructure/auth/auth.service';
import { EventModel } from '../../../interfaces/event.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-product',
  templateUrl: './purchase-product.component.html',
  styleUrls: ['./purchase-product.component.css'] // fixed typo
})
export class PurchaseProductComponent implements OnInit {
  @Input() product!: any; // ideally use Product type
  @Output() onPurchased = new EventEmitter<any>();

  organizerEvents?: EventModel[];

  productService = inject(ProductService);
  auth = inject(AuthService);
  dialog = inject(MatDialog);

  ngOnInit() {
    const organizer = this.auth.user;

    if (organizer?.role !== 'EventOrganizer') {
      console.warn('[PurchaseProductComponent] User is not an organizer');
      return;
    }

    this.productService.getOrganizerEvents(organizer.id)
      .subscribe((events: EventModel[]) => this.organizerEvents = events);
  }

  purchase(event: EventModel) {
    this.productService.purchase(this.product.id, event.id)
      .subscribe((purchase: any) => {
        alert(`"${purchase.product.name}" successfully purchased for event "${purchase.event.name}".`);
        this.onPurchased.emit(purchase);
      });
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventTypeManagementService} from '../../../components/event-type-management/event-type-management.service';
import {CategoryService} from '../../category.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../dialogs/confirm-dialog/confirm-dialog';
import {ProductService} from '../../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product = {id: NaN} as Product;
  _formBuilder = inject(FormBuilder);

  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  eventTypeService = inject(EventTypeManagementService);
  categoryService = inject(CategoryService);
  dialog = inject(MatDialog);

  productFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    price: [NaN, [Validators.min(0)]],
    discount: [NaN, [Validators.min(0), Validators.max(100)]],
    applicableEventTypeIds: [[] as number[], [Validators.minLength(1)]],
    visibility: [''],
    reservationType: [''],
    available: [] as boolean[]
  });

  allCategories= [] as any[];
  allEventTypes = [] as any[];

  get isPublic() {
    return this.productFormGroup.get('visibility')?.value === 'PUBLIC';
  }

  set isPublic(value: boolean) {
    const visibility = this.productFormGroup.get('visibility');

    visibility?.setValue(
      value ? 'PUBLIC' : 'PRIVATE'
    );

    visibility?.markAsDirty();
  }

  ngOnInit(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});

    this.route.params.subscribe(
      params => {
        this.product.id = +params['id'];

        this.productService.getById(this.product.id)
          .subscribe({
            next: product => {
              this.product = product;
              this.reset();
            },
            error: err => {
              console.error('[EditServiceComponent] Failed to fetch product', err);
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
    if (this.productFormGroup.invalid) {
      this.productFormGroup.markAllAsTouched();
      return;
    }

    const data = Object.fromEntries(
      Object.entries(this.productFormGroup.controls)
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

    console.log('Updating product', data);
    this.productService.update({...data, id: this.product.id})
      .subscribe(product => {
        this.product = product;
        this.reset();
        alert("Successfully updated product!");
        this.router.navigate(['/solutions']);
      });
  }

  reset() {
    this.productFormGroup.patchValue({
      ...this.product,
      applicableEventTypeIds: this.product.applicableEventTypes?.map(t => t.id)
    });

    this.productFormGroup.markAsPristine();
    this.productFormGroup.markAsUntouched();
    this.productFormGroup.updateValueAndValidity();
  }

  delete() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Confirmation`,
        message: `Are you sure you want to delete "${this.product.name}"`
      }
    })
      .afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(this.product)
          .subscribe(_ => this.router.navigate(['/solutions']));
      }
    })
  }
}

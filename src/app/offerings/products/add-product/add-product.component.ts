import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { CategoryService } from '../../category.service';
import { EventTypeManagementService } from '../../../components/event-type-management/event-type-management.service';
import { ProductService } from '../../product.service';
import { MessagePopupComponent } from '../../../dialogs/message-popup/message-popup.component';
import { Router } from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatStep, MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MockMessagePopupComponent} from '../../services/add-service/__mocks__/mock-message-popup';
import {MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatStepperModule,
    MockMessagePopupComponent,
    MatButton
  ],
  styleUrls: ['./add-product.component.css']
})


export class AddProductComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private eventTypeService = inject(EventTypeManagementService);
  private productService = inject(ProductService);
  protected location = inject(Location);
  protected router = inject(Router);

  constructor(
      private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  infoFormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    price: [NaN, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.min(0), Validators.max(100)]],
    visible: [true],
    available: [true],
    status: ['PENDING'] // default value
  });

  categoryFormGroup = this.formBuilder.group({
    id: [NaN],
    name: [''],
    description: ['']
  });

  secondFormGroup = this.formBuilder.group({
    category: this.categoryFormGroup,
    applicableEventTypeIds: [] as number[][],
  });

  isAddingNewCategory = false;
  allCategories: any[] = [];
  allEventTypes: any[] = [];

  @ViewChild('successPopup') successPopup!: MessagePopupComponent;
  @ViewChild('errorPopup') errorPopup!: MessagePopupComponent;

  ngOnInit() {
    this.eventTypeService.getAllEventTypes().subscribe(types => this.allEventTypes = types);
    this.categoryService.getAll().subscribe(categories => this.allCategories = categories);
  }
  /*
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // Set the base64 string as the form value
      this.infoFormGroup.get('imageUrl')?.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
 */


  onSubmit() {
    let data = {
      ...this.infoFormGroup.value,
      ...this.secondFormGroup.value
    };

    if (this.isAddingNewCategory) {
      delete data.category?.id;
    } else {
      delete data.category?.name;
      delete data.category?.description;
    }

    console.log('[AddProductComponent] Submitting product:', data);

    console.log(data);
    this.productService.create(data).subscribe({
      next: (product) => {
        this.successPopup.message = this.isAddingNewCategory
          ? `Proposed new category "${data.category?.name}". Admin will review your proposal.`
          : `Created product: "${product.name}"`;
        this.successPopup.isVisible = true;

        alert("Product created!");
        this.dialogRef.close('created'); // ✅ close popup after success
      },
      error: (err) => {
        this.errorPopup.message = `Failed to create product: ${err.message}`;
        this.errorPopup.isVisible = true;
      }
    });
  }

}

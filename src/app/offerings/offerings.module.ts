import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import {ProductDetailsComponent} from './product-details/product-details.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatListItemAvatar} from '@angular/material/list';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatListItemAvatar,
    RouterLink
  ],
  exports: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
  ]
})
export class OfferingsModule { }


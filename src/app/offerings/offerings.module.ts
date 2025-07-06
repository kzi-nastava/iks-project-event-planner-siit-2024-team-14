import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RouterLink} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../infrastructure/material/material.module';
import { PriceListComponent } from './price-list/price-list.component';


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
    PriceListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    MaterialModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
    PriceListComponent,
  ]
})
export class OfferingsModule { }


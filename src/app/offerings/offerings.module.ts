import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./services/service-details/service-details.component";
import { AddServiceComponent } from "./services/add-service/add-service.component";
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {RouterLink} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../infrastructure/material/material.module';
import { PriceListComponent } from './price-list/price-list.component';
import { SolutionFiltersComponent } from './solution-filters/solution-filters.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { ProviderSolutionsComponent } from './provider-solutions/provider-solutions.component';
import { SolutionCardComponent } from './solution-card/solution-card.component';
import {SharedModule} from '../shared.module';
import { EditServiceComponent } from './services/edit-service/edit-service.component';
import { PurchaseProductComponent } from './products/purchase-product/purchase-product.component';


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
    PriceListComponent,
    SolutionFiltersComponent,
    SolutionListComponent,
    ProviderSolutionsComponent,
    SolutionCardComponent,
    EditServiceComponent,
    PurchaseProductComponent,
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
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
    PriceListComponent,
    SolutionFiltersComponent,
    SolutionListComponent,
    ProviderSolutionsComponent,
    SolutionCardComponent,
  ]
})
export class OfferingsModule { }


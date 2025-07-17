import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../infrastructure/material/material.module';
import { SharedModule } from '../shared.module';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { CategoryExpansionPanelComponent } from './categories/category-expansion-panel/category-expansion-panel.component';
import { CategoriesDashboardComponent } from './categories/categories-dashboard/categories-dashboard.component';
import { CategoryManagementComponent } from './categories/category-management/category-management.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ServiceDetailsComponent } from "./services/service-details/service-details.component";
import { AddServiceComponent } from "./services/add-service/add-service.component";
import { EditServiceComponent } from './services/edit-service/edit-service.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { PurchaseProductComponent } from './products/purchase-product/purchase-product.component';
import { PriceListComponent } from './price-list/price-list.component';
import { SolutionFiltersComponent } from './solution-filters/solution-filters.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { ProviderSolutionsComponent } from './provider-solutions/provider-solutions.component';
import { SolutionCardComponent } from './solution-card/solution-card.component';

@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
    EditServiceComponent,
    PurchaseProductComponent,
    AddCategoryComponent,
    CategoryExpansionPanelComponent,
    CategoriesDashboardComponent,
    CategoryManagementComponent,
    EditCategoryComponent,
    PriceListComponent,
    SolutionFiltersComponent,
    SolutionListComponent,
    ProviderSolutionsComponent,
    SolutionCardComponent,
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
    RouterOutlet,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    CategoriesDashboardComponent,
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

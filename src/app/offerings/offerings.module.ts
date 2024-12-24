import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import {MaterialModule} from '../infrastructure/material/material.module';
import {CategoryExpansionPanelComponent} from './category-expansion-panel/category-expansion-panel.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import { AddCategoryComponent } from './add-category/add-category.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {CategoriesDashboardComponent} from './categories-dashboard/categories-dashboard.component';
import {CategoryManagementComponent} from './category-management/category-management.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  declarations: [
    ServiceDetailsComponent,
    AddServiceComponent,
    AddCategoryComponent,
    CategoryExpansionPanelComponent,
    CategoriesDashboardComponent,
    CategoryManagementComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
  ],
  exports: [
    CategoriesDashboardComponent
  ]
})
export class OfferingsModule { }

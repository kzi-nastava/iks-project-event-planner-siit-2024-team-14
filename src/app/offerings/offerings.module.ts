import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import {MaterialModule} from '../infrastructure/material/material.module';
import {CategoryFormComponent} from './category-form/category-form.component';
import {CategoryExpansionPanelComponent} from './category-expansion-panel/category-expansion-panel.component';



@NgModule({
  declarations: [
    ServiceDetailsComponent,
    AddServiceComponent,
    CategoryFormComponent,
    CategoryExpansionPanelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class OfferingsModule { }

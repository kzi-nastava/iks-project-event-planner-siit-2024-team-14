import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";



@NgModule({
  declarations: [
    ServiceDetailsComponent,
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class OfferingsModule { }

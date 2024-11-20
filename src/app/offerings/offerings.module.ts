import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from './service-details/service-details.component';



@NgModule({
  declarations: [
    ServiceDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class OfferingsModule { }

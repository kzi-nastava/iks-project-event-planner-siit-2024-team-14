import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from './service-details/service-details.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OfferingsModule { }

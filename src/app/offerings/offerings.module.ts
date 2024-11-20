import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OfferingsModule { }

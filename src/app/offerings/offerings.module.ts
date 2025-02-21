import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import {ProductDetailsComponent} from './product-details/product-details.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatListItemAvatar} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserModule} from '@angular/platform-browser';

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
    RouterLink,
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    ServiceDetailsComponent,
    ProductDetailsComponent,
    AddServiceComponent,
  ]
})
export class OfferingsModule { }


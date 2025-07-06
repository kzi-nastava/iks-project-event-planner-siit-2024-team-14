import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import {ProductDetailsComponent} from './product-details/product-details.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatListItemAvatar} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserModule} from '@angular/platform-browser';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
  MatCardSubtitle,
  MatCardAvatar
} from '@angular/material/card';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import { PriceListComponent } from './price-list/price-list.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

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
    MatToolbar,
    MatIcon,
    MatListItemAvatar,
    RouterLink,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardImage,
    MatCardAvatar,
    MatPaginator,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatInput,
    MatIconButton,
    MatFormField,
    MatLabel,
    MatButton,
    MatSelect,
    MatOption,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
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


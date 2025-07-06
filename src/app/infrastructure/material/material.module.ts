import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';


const matModules = [
  MatSelectModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatRadioModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatPaginatorModule,
  MatMenuModule,
  MatTableModule,
  MatListModule,
];


@NgModule({
  imports: [
    CommonModule,
    ...matModules
  ],
  exports: matModules
})
export class MaterialModule { }

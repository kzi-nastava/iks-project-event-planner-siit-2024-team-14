import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const matModules = [
  MatSelectModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatPaginatorModule,
  MatMenuModule,
  MatTableModule,
  MatListModule,
  MatStepperModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...matModules
  ],
  exports: matModules
})
export class MaterialModule { }

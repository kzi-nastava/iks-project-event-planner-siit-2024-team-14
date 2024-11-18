import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';  // Correct import
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    NavbarComponent,   // Declare NavbarComponent here
    HomeComponent,
    AboutComponent,
    ServicesComponent,
  ],
  imports: [
    BrowserModule,
    MatIcon,
    NgOptimizedImage
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

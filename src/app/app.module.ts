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
import { DrawerNavbarComponent } from './components/drawer-navbar/drawer-navbar.component';
import { LoginComponent } from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { RegistrationEoComponent } from './components/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration-spp/registration-spp.component';

@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    NavbarComponent,   // Declare NavbarComponent here
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    DrawerNavbarComponent,
    LoginComponent,
    RegistrationEoComponent,
    RegistrationSppComponent
  ],
  imports: [
    BrowserModule,
    MatIcon,
    NgOptimizedImage,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

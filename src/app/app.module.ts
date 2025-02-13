import {NgModule, PACKAGE_ROOT_URL} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';  // Correct import
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { DrawerNavbarComponent } from './components/drawer-navbar/drawer-navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HottestEventsComponent } from './components/homepage/hottest-events/hottest-events.component';
import { OurEventsComponent } from './components/homepage/our-events/our-events.component';
import { HottestServicesComponent } from './components/homepage/hottest-services/hottest-services.component';
import { OurSevicesComponent } from './components/homepage/our-sevices/our-sevices.component';
import {FooterComponent} from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { ActivationComponent } from './components/registration/activation/activation.component';
import { SuccessfulComponent } from './components/registration/successful/successful.component';
import { HttpClientModule } from '@angular/common/http';
import {AdminCommentsComponent} from './components/admin-comments/admin-comments.component';

@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    NavbarComponent,   // Declare NavbarComponent here
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    DrawerNavbarComponent,
    AdminCommentsComponent,
    HottestEventsComponent,
    HottestServicesComponent,
    OurSevicesComponent,
    OurEventsComponent,
    FooterComponent,
    LoginComponent,
    RegistrationEoComponent,
    RegistrationSppComponent,
    ActivationComponent,
    SuccessfulComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIcon,
    NgOptimizedImage,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

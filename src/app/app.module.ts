import {NgModule, PACKAGE_ROOT_URL} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home-guest/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { DrawerNavbarComponent } from './components/drawers/drawer-navbar-admin/drawer-navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HottestEventsComponent } from './components/homepage/hottest-events/hottest-events.component';
import { OurEventsComponent } from './components/homepage/our-events/our-events.component';
import { HottestServicesComponent } from './components/homepage/hottest-services/hottest-services.component';
import { OurSevicesComponent } from './components/homepage/our-sevices/our-sevices.component';
import {FooterComponent} from './components/homepage/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { ActivationComponent } from './components/registration/activation/activation.component';
import { SuccessfulComponent } from './components/registration/successful/successful.component';
import { HttpClientModule } from '@angular/common/http';
import {AdminCommentsComponent} from './components/admin-comments/admin-comments.component';
import {HomeAdminComponent} from './components/home/home-admin/home-admin.component';
import {HomeOrganizerComponent} from './components/home/home-organizer/home-organizer.component';
import {HomeProviderComponent} from './components/home/home-provider/home-provider.component';
import {DrawerNavbarOrganizerComponent} from './components/drawers/drawer-navbar-organizer/drawer-navbar-organizer.component';
import {DrawerNavbarProviderComponent} from './components/drawers/drawer-navbar-provider/drawer-navbar-provider.component';
import {DrawerNavbarGuestComponent} from './components/drawers/drawer-navbar-guest/drawer-navbar-guest.component';
import {NotificationsComponent} from './components/notifications/notifications.component';

import { WebSocketService } from './components/notifications/websocket.service';

@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    HomeComponent,
    HomeAdminComponent,
    HomeOrganizerComponent,
    HomeProviderComponent,
    AboutComponent,
    ServicesComponent,
    DrawerNavbarComponent,
    DrawerNavbarOrganizerComponent,
    DrawerNavbarProviderComponent,
    DrawerNavbarGuestComponent,
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
    SuccessfulComponent,
    NotificationsComponent
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
    provideAnimationsAsync(),
    WebSocketService
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

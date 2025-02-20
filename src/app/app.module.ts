import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HottestEventsComponent } from './components/homepage/hottest-events/hottest-events.component';
import { OurEventsComponent } from './components/homepage/our-events/our-events.component';
import { HottestServicesComponent } from './components/homepage/hottest-services/hottest-services.component';
import { OurSevicesComponent } from './components/homepage/our-sevices/our-sevices.component';
import { FooterComponent } from './components/homepage/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { OfferingsModule } from './offerings/offerings.module';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { OrganizerProfileComponent } from './components/profiles/organizer-profile/organizer-profile.component';
import { LinesComponent } from './components/decorations/lines/lines.component';
import { InfoComponent } from './components/profiles/organizer-profile/info/info.component';
import { UpcomingEventsComponent } from './components/profiles/organizer-profile/upcoming-events/upcoming-events.component';
import { FavoriteEventsComponent } from './components/profiles/organizer-profile/favorite-events/favorite-events.component';
import { FavoriteSolutionsComponent } from './components/profiles/organizer-profile/favorite-solutions/favorite-solutions.component';
import { OccupancyCalendarComponent } from './components/profiles/organizer-profile/occupancy-calendar/occupancy-calendar.component';
import { DrawerNavbarComponent} from './components/drawers/drawer-navbar-admin/drawer-navbar.component';
import { DrawerNavbarProviderComponent} from './components/drawers/drawer-navbar-provider/drawer-navbar-provider.component';
import { DrawerNavbarGuestComponent} from './components/drawers/drawer-navbar-guest/drawer-navbar-guest.component';
import { DrawerNavbarOrganizerComponent} from './components/drawers/drawer-navbar-organizer/drawer-navbar-organizer.component';
import { SuccessfulComponent} from './components/registration/successful/successful.component';
import { HomeAdminComponent} from './components/home/home-admin/home-admin.component';
import { HomeOrganizerComponent} from './components/home/home-organizer/home-organizer.component';
import { HomeComponent} from './components/home/home-guest/home.component';
import { HomeProviderComponent} from './components/home/home-provider/home-provider.component';
import { AdminCommentsComponent} from './components/admin-comments/admin-comments.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    AboutComponent,
    ServicesComponent,
    HottestEventsComponent,
    OurEventsComponent,
    HottestServicesComponent,
    OurSevicesComponent,
    FooterComponent,
    LoginComponent,
    RegistrationEoComponent,
    RegistrationSppComponent,
    OrganizerProfileComponent,
    LinesComponent,
    InfoComponent,
    UpcomingEventsComponent,
    FavoriteEventsComponent,
    FavoriteSolutionsComponent,
    OccupancyCalendarComponent,
    DrawerNavbarComponent,
    DrawerNavbarOrganizerComponent,
    DrawerNavbarGuestComponent,
    DrawerNavbarProviderComponent,
    SuccessfulComponent,
    HomeComponent,
    HomeOrganizerComponent,
    HomeProviderComponent,
    HomeAdminComponent,
    AdminCommentsComponent,

  ],
  imports: [
    BrowserModule,
    MatIcon,
    NgOptimizedImage,
    AppRoutingModule,
    OfferingsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

import {NgModule, PACKAGE_ROOT_URL} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { OurEventsComponent } from './components/homepage/all-events/our-events.component';
import { HottestServicesComponent } from './components/homepage/hottest-services/hottest-services.component';
import { OurSevicesComponent } from './components/homepage/all-sevices/our-sevices.component';
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
import {OfferingsModule} from './offerings/offerings.module';
import { OrganizerProfileComponent} from './components/profiles/organizer-profile/organizer-profile.component';
import {AdminReportsComponent} from './components/admin-reports/admin-reports.component';
import {ViewOrganizerProfileComponent} from './components/profiles/view-organizer-profile/view-organizer-profile.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import {ViewProviderProfileComponent} from './components/profiles/view-provider-profile/view-provider-profile.component';
import { InfoComponent } from './components/profiles/info/info.component';
import { LinesComponent } from './components/decorations/lines/lines.component';
import { UpcomingEventsComponent } from './components/profiles/upcoming-events/upcoming-events.component';
import { FavoriteEventsComponent } from './components/profiles/favorite-events/favorite-events.component';
import { FavoriteSolutionsComponent } from './components/profiles/favorite-solutions/favorite-solutions.component';
import { OccupancyCalendarComponent } from './components/profiles/occupancy-calendar/occupancy-calendar.component';
import { BookingServiceRequestsComponent } from './components/booking-service-requests/booking-service-requests.component';
import { AllBookingsProviderComponent } from './components/all-bookings-provider/all-bookings-provider.component';
import {ProviderProfileComponent} from './components/profiles/provider-profile/provider-profile.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { EventTypeManagementComponent } from './components/event-type-management/event-type-management.component'
import { AddEventTypeComponent } from './components/event-type-management/add/add.component'
import { EditEventTypeComponent} from './components/event-type-management/edit/edit.component';
import { MyEventsOdComponent } from './components/event-management/my-events-od/my-events-od.component';
import { CreateEventComponent } from './components/event-management/create-event/create-event.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatInput} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MessagePopupComponent } from './components/event-management/message-popup/message-popup.component';

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
    AdminReportsComponent,
    BookingServiceRequestsComponent,
    AllBookingsProviderComponent,
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
    NotificationsComponent,
    OrganizerProfileComponent,
    InfoComponent,
    LinesComponent,
    UpcomingEventsComponent,
    FavoriteEventsComponent,
    FavoriteSolutionsComponent,
    OccupancyCalendarComponent,
    ViewOrganizerProfileComponent,
    EventDetailsComponent,
    ViewProviderProfileComponent,
    ProviderProfileComponent,
    ChatSidebarComponent,
    EventTypeManagementComponent,
    AddEventTypeComponent,
    EditEventTypeComponent,
    MyEventsOdComponent,
    CreateEventComponent,
    MessagePopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIcon,
    NgOptimizedImage,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OfferingsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    CommonModule
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

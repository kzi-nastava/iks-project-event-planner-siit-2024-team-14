import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home-guest/home.component';
import { ServicesComponent } from './components/services/services.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgOptimizedImage } from '@angular/common';
import { DrawerNavbarComponent } from './components/drawers/drawer-navbar-admin/drawer-navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HottestEventsComponent } from './components/homepage/hottest-events/hottest-events.component';
import { OurEventsComponent } from './components/homepage/all-events/our-events.component';
import { HottestServicesComponent } from './components/homepage/hottest-services/hottest-services.component';
import { OurServicesComponent } from './components/homepage/all-services/our-services.component';
import {FooterComponent} from './components/homepage/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { ActivationComponent } from './components/registration/activation/activation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { EventTypeManagementComponent } from './components/event-type-management/event-type-management.component'
import { AddEventTypeComponent } from './components/event-type-management/add/add.component'
import { EditEventTypeComponent} from './components/event-type-management/edit/edit.component';
import { MyEventsEoComponent } from './components/event-management/my-events-eo/my-events-eo.component';
import { CreateEventComponent } from './components/event-management/create-event/create-event.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { EventBudgetComponent } from './components/event-budget/event-budget.component';
import { AddEventBudgetItemComponent } from './components/event-budget/add-event-budget-item/add-event-budget-item.component';
import {AuthInterceptor} from './infrastructure/auth/auth.interceptor';
import {InvitationPopupComponent} from './components/invitations/invitation-popup/invitation-popup.component';
import {InvitationRegisterComponent} from './components/registration/registration-au/registration-au.component';
import {CommunicationModule} from './communication/communication.module';
import {AllInvitationsComponent} from './components/invitations/all-invitations-review-eo/all-invitations.component';
import {
  HomeAuthenticatedUserComponent
} from './components/home/home-authenticated-user/home-authenticated-user.component';
import {DrawerNavbarAuComponent} from './components/drawers/drawer-navbar-au/drawer-navbar-au.component';
import {AuProfileComponent} from './components/profiles/au-profile/au-profile.component';
import {
  UpdateAsProviderComponent
} from './components/profiles/au-profile/update-as-provider/update-as-provider.component';
import {
  UpdateAsOrganizerComponent
} from './components/profiles/au-profile/update-as-organizer/update-as-organizer.component';
import {JoinedEventsComponent} from './components/joined-events/joined-events.component';
import {HeaderComponent} from './components/homepage/header/header.component';
import {EventPageComponent} from './components/event-management/event-page/event-page.component';
import {MaterialModule} from './infrastructure/material/material.module';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    HomeComponent,
    HomeAdminComponent,
    HomeOrganizerComponent,
    HomeProviderComponent,
    HomeAuthenticatedUserComponent,
    ServicesComponent,
    DrawerNavbarComponent,
    DrawerNavbarOrganizerComponent,
    DrawerNavbarProviderComponent,
    DrawerNavbarGuestComponent,
    DrawerNavbarAuComponent,
    AdminCommentsComponent,
    AdminReportsComponent,
    BookingServiceRequestsComponent,
    AllBookingsProviderComponent,
    HottestEventsComponent,
    HottestServicesComponent,
    OurServicesComponent,
    OurEventsComponent,
    FooterComponent,
    LoginComponent,
    RegistrationEoComponent,
    RegistrationSppComponent,
    ActivationComponent,
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
    AuProfileComponent,
    UpdateAsProviderComponent,
    UpdateAsOrganizerComponent,
    EventTypeManagementComponent,
    AddEventTypeComponent,
    EditEventTypeComponent,
    MyEventsEoComponent,
    EventPageComponent,
    CreateEventComponent,
    EventBudgetComponent,
    AddEventBudgetItemComponent,
    InvitationPopupComponent,
    InvitationRegisterComponent,
    AllInvitationsComponent,
    JoinedEventsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgOptimizedImage,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OfferingsModule,
    CommonModule,
    CommunicationModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe
  ],
  exports: [
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }


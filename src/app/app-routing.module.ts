import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-guest/home.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { ActivationComponent } from './components/registration/activation/activation.component';
import {HomeProviderComponent} from './components/home/home-provider/home-provider.component';
import {HomeOrganizerComponent} from './components/home/home-organizer/home-organizer.component';
import {AddServiceComponent} from './offerings/add-service/add-service.component';
import {ServiceDetailsComponent} from './offerings/service-details/service-details.component';
import {ProductDetailsComponent} from './offerings/product-details/product-details.component';
import {OrganizerProfileComponent} from './components/profiles/organizer-profile/organizer-profile.component';
import {EventDetailsComponent} from './event-details/event-details.component';
import {ViewOrganizerProfileComponent} from './components/profiles/view-organizer-profile/view-organizer-profile.component';
import {ViewProviderProfileComponent} from './components/profiles/view-provider-profile/view-provider-profile.component';
import {ProviderProfileComponent} from './components/profiles/provider-profile/provider-profile.component';
import {EventTypeManagementComponent} from './components/event-type-management/event-type-management.component';
import {MyEventsEoComponent} from './components/event-management/my-events-eo/my-events-eo.component';
import {InvitationPopupComponent} from './components/invitations/invitation-popup/invitation-popup.component';
import {InvitationRegisterComponent} from './components/registration/registration-au/registration-au.component';
import {InboxComponent} from './communication/inbox/inbox.component';
import {authGuard} from './infrastructure/auth/auth.guard';
import {AllInvitationsComponent} from './components/invitations/all-invitations-review-eo/all-invitations.component';
import {
  HomeAuthenticatedUserComponent
} from './components/home/home-authenticated-user/home-authenticated-user.component';
import {AuProfileComponent} from './components/profiles/au-profile/au-profile.component';
import {JoinedEventsComponent} from './components/joined-events/joined-events.component';
import {HomeAdminComponent} from './components/home/home-admin/home-admin.component';
import {PriceListComponent} from './offerings/price-list/price-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-guest', pathMatch: 'full' },  // Default redirect to /home-guest
  { path: 'home-guest', component: HomeComponent },  // Home component route
  { path: 'home-provider', component: HomeProviderComponent, canActivate: [authGuard], data: { roles: ['ServiceAndProductProvider'] } },
  { path: 'home-organizer', component: HomeOrganizerComponent, canActivate: [authGuard], data: { roles: ['EventOrganizer'] } },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
  { path: 'home-authenticated-user', component: HomeAuthenticatedUserComponent, canActivate: [authGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },         // Login route (no duplication)
  { path: 'chat', redirectTo: 'chat/', pathMatch: "full" },
  { path: 'chat/:email', component: InboxComponent, canActivate: [authGuard] },
  { path: 'services', component: ServicesComponent },
  { path: 'services/add', component: AddServiceComponent },
  { path: 'services/:id', component: ServiceDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'price-list', component: PriceListComponent, canActivate: [authGuard], data: { roles: ['ServiceAndProductProvider'] }},
  { path: 'registration-eo', component: RegistrationEoComponent },
  { path: 'registration-spp', component: RegistrationSppComponent },
  { path: 'activate', component: ActivationComponent },
  { path: 'organizer-profile', component: OrganizerProfileComponent },
  { path: 'au-profile', component: AuProfileComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'view-organizer-profile/:id', component: ViewOrganizerProfileComponent },
  { path: 'view-provider-profile/:id', component: ViewProviderProfileComponent },
  { path: 'provider-profile', component: ProviderProfileComponent },
  { path: 'event-type-management', component: EventTypeManagementComponent },
  { path: 'my-events-eo', component: MyEventsEoComponent },
  {path: 'invitation-popup', component: InvitationPopupComponent },
  {path: 'invitation/register', component: InvitationRegisterComponent },
  {path: 'all-invitation', component: AllInvitationsComponent },
  {path: 'joined-events', component: JoinedEventsComponent },
  {path: 'inbox', component: InboxComponent },
  { path: '**', redirectTo: '/home-guest' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

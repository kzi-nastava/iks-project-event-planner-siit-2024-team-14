import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-guest/home.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import {CategoriesDashboardComponent} from './offerings/categories/categories-dashboard/categories-dashboard.component';
import {AddCategoryComponent} from './offerings/categories/add-category/add-category.component';
import {EditCategoryComponent} from './offerings/categories/edit-category/edit-category.component';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { ActivationComponent } from './components/registration/activation/activation.component';
import {HomeProviderComponent} from './components/home/home-provider/home-provider.component';
import {HomeOrganizerComponent} from './components/home/home-organizer/home-organizer.component';
import {AddServiceComponent} from './offerings/services/add-service/add-service.component';
import {ServiceDetailsComponent} from './offerings/services/service-details/service-details.component';
import {ProductDetailsComponent} from './offerings/products/product-details/product-details.component';
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
import {ProviderSolutionsComponent} from './offerings/provider-solutions/provider-solutions.component';
import {EditServiceComponent} from './offerings/services/edit-service/edit-service.component';
import {
  UpdateAsProviderComponent
} from './components/profiles/au-profile/update-as-provider/update-as-provider.component';
import {
  UpdateAsOrganizerComponent
} from './components/profiles/au-profile/update-as-organizer/update-as-organizer.component';

enum Role {
  ADMIN = 'Admin',
  PROVIDER = 'ServiceAndProductProvider',
  ORGANIZER = 'EventOrganizer',
  USER = 'User',
}

const routes: Routes = [
  { path: '', redirectTo: '/home-guest', pathMatch: 'full' },  // Default redirect to /home-guest
  { path: 'home-guest', component: HomeComponent },  // Home component route
  { path: 'home-provider', component: HomeProviderComponent, canActivate: [authGuard], data: { roles: [Role.PROVIDER] } },
  { path: 'home-organizer', component: HomeOrganizerComponent, canActivate: [authGuard], data: { roles: [Role.ORGANIZER] } },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [authGuard], data: { roles: [Role.ADMIN] } },
  { path: 'home-authenticated-user', component: HomeAuthenticatedUserComponent, canActivate: [authGuard], data: { roles: [Role.USER] } },
  { path: 'login', component: LoginComponent, data: { showHeader: false, showFooter: false } },         // Login route (no duplication)
  { path: 'chat', redirectTo: 'chat/', pathMatch: "full" },
  { path: 'chat/:email', component: InboxComponent, canActivate: [authGuard] },
  { path: 'solutions', component: ProviderSolutionsComponent, canActivate: [authGuard], data: { roles: [Role.PROVIDER] }},
  { path: 'services', component: ServicesComponent },
  { path: 'services/add', component: AddServiceComponent, canActivate: [authGuard], data: { roles: [Role.PROVIDER], showHeader: false, showFooter: false } },
  { path: 'services/:id', component: ServiceDetailsComponent },
  { path: 'services/:id/edit', component: EditServiceComponent, canActivate: [authGuard], data: { roles: [Role.PROVIDER] } },
  { path: 'products/:id', component: ProductDetailsComponent },
  {
    path: 'categories',
    component: CategoriesDashboardComponent,
    canActivate: [authGuard],
    data: { roles: [Role.ADMIN] },
    children: [
      { path: 'add', component: AddCategoryComponent, outlet: 'popup'},
      { path: ':id/edit', component: EditCategoryComponent, outlet: 'popup'},
      { path: '**', redirectTo: ''},
    ]
  },
  { path: 'price-list', component: PriceListComponent, canActivate: [authGuard], data: { roles: [Role.PROVIDER] }},
  { path: 'registration-eo', component: RegistrationEoComponent, data: { showHeader: false, showFooter: false } },
  { path: 'registration-spp', component: RegistrationSppComponent, data: { showHeader: false, showFooter: false } },
  { path: 'become-eo', component: UpdateAsOrganizerComponent, canActivate: [authGuard], data: {  showHeader: false, showFooter: false } },
  { path: 'become-spp', component: UpdateAsProviderComponent, canActivate: [authGuard], data: { showHeader: false, showFooter: false } },
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
  {path: 'invitation/register', component: InvitationRegisterComponent, data: { showHeader: false, showFooter: false } },
  {path: 'all-invitation', component: AllInvitationsComponent },
  {path: 'joined-events', component: JoinedEventsComponent },
  {path: 'inbox', redirectTo: 'chat' },
  { path: '**', redirectTo: '/home-guest' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home-guest/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration/registration-spp/registration-spp.component';
import { ActivationComponent } from './components/registration/activation/activation.component';
import {HomeProviderComponent} from './components/home/home-provider/home-provider.component';
import {HomeOrganizerComponent} from './components/home/home-organizer/home-organizer.component';
import {HomeAdminComponent} from './components/home/home-admin/home-admin.component'; // Make sure this is correctly imported
import {AddServiceComponent} from './offerings/add-service/add-service.component';
import {ServiceDetailsComponent} from './offerings/service-details/service-details.component';
import {ProductDetailsComponent} from './offerings/product-details/product-details.component';
import {OrganizerProfileComponent} from './components/profiles/organizer-profile/organizer-profile.component';
import {EventDetailsComponent} from './event-details/event-details.component';
import {
  ViewOrganizerProfileComponent
} from './components/profiles/view-organizer-profile/view-organizer-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-guest', pathMatch: 'full' },  // Default redirect to /home-guest
  { path: 'home-guest', component: HomeComponent },  // Home component route
  { path: 'home-provider', component: HomeProviderComponent },
  { path: 'home-organizer', component: HomeOrganizerComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'login', component: LoginComponent },         // Login route (no duplication)
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/add', component: AddServiceComponent },
  { path: 'services/:id', component: ServiceDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'registration-eo', component: RegistrationEoComponent },
  { path: 'registration-spp', component: RegistrationSppComponent },
  { path: 'activate', component: ActivationComponent }, // Ensure this route exists
  { path: 'organizer-profile', component: OrganizerProfileComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  {path: 'view-organizer-profile/:id', component: ViewOrganizerProfileComponent },
  { path: '**', redirectTo: '/home-guest' } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

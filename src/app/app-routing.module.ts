import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration-spp/registration-spp.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default redirect to /home
  { path: 'home', component: HomeComponent },  // Home component route
  { path: 'login', component: LoginComponent },         // Login route (no duplication)
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'registration-eo', component: RegistrationEoComponent },
  { path: 'registration-spp', component: RegistrationSppComponent },
  { path: '**', redirectTo: '/home' }, // Fallback for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

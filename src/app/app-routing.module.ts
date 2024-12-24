import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';  // Correct import path
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationEoComponent } from './components/registration-eo/registration-eo.component';
import { RegistrationSppComponent } from './components/registration-spp/registration-spp.component';
import { AddServiceComponent } from './offerings/add-service/add-service.component';
import { ServiceDetailsComponent } from './offerings/service-details/service-details.component';
import {CategoriesDashboardComponent} from './offerings/categories-dashboard/categories-dashboard.component';
import {AddCategoryComponent} from './offerings/add-category/add-category.component';
import {EditCategoryComponent} from './offerings/edit-category/edit-category.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default redirect to /home
  { path: 'home', component: HomeComponent },  // Home component route
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/add', component: AddServiceComponent },
  { path: 'services/:id', component: ServiceDetailsComponent },
  {
    path: 'categories',
    component: CategoriesDashboardComponent,
    canActivate: [], // TODO: add guard to allow only admin role to access this
    children: [
      { path: 'add', component: AddCategoryComponent, outlet: 'popup'},
      { path: ':id/edit', component: EditCategoryComponent, outlet: 'popup'},
      { path: '**', redirectTo: ''},
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration-eo', component: RegistrationEoComponent },
  { path: 'registration-spp', component: RegistrationSppComponent },
  { path: '**', redirectTo: '/home' }, // Fallback for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

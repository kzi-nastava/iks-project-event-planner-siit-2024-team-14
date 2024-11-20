import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';  // Correct import
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIcon} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';
import { DrawerNavbarComponent } from './components/drawer-navbar/drawer-navbar.component';
import {FormsModule} from '@angular/forms';
import { HottestEventsComponent } from './components/hottest-events/hottest-events.component';
import { OurEventsComponent } from './components/our-events/our-events.component';
import { HottestServicesComponent } from './components/hottest-services/hottest-services.component';
import { OurSevicesComponent } from './components/our-sevices/our-sevices.component';
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,     // Declare the root component
    NavbarComponent,   // Declare NavbarComponent here
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    DrawerNavbarComponent,
    HottestEventsComponent,
    OurEventsComponent,
    HottestServicesComponent,
    OurSevicesComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MatIcon,
    NgOptimizedImage,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]  // Root component that Angular bootstraps
})
export class AppModule { }

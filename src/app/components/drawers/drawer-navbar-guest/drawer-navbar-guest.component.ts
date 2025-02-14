import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-drawer-navbar-guest',
  templateUrl: './drawer-navbar-guest.component.html',
  styleUrls: ['./drawer-navbar-guest.component.css'],
})

export class DrawerNavbarGuestComponent {
  @Input() isSidebarOpen: boolean = false;
}

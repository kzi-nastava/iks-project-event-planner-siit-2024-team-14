import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UpdateAsProviderComponent} from '../../profiles/au-profile/update-as-provider/update-as-provider.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-drawer-navbar-au',
  templateUrl: './drawer-navbar-au.component.html',
  styleUrls: ['./drawer-navbar-au.component.css'],
})

export class DrawerNavbarAuComponent {
  @Input() isSidebarOpen: boolean = false;
  constructor(private dialog: MatDialog) {}

  updateAuAsProvider() {
    this.dialog.open(UpdateAsProviderComponent, {
      width: '700px',
      data: {
        email: 'user@example.com',
        password: 'password123'
      }
    });
  }
}

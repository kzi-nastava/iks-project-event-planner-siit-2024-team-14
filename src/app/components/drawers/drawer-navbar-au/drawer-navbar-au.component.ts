import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UpdateAsProviderComponent} from '../../profiles/au-profile/update-as-provider/update-as-provider.component';
import { MatDialog } from '@angular/material/dialog';
import {UpdateAsOrganizerComponent} from '../../profiles/au-profile/update-as-organizer/update-as-organizer.component';

@Component({
  selector: 'app-drawer-navbar-au',
  templateUrl: './drawer-navbar-au.component.html',
  styleUrls: ['./drawer-navbar-au.component.css'],
})

export class DrawerNavbarAuComponent implements OnInit {
  @Input() isSidebarOpen: boolean = false;
  user: any = null;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  updateAuAsProvider() {
    this.dialog.open(UpdateAsProviderComponent, {
      width: '700px',
      data: {
        email: this.user.email,
        password: this.user.password
      }
    });
  }

  updateAuAsOrganizer(){
    this.dialog.open(UpdateAsOrganizerComponent, {
      width: '700px',
      data: {
        email: this.user.email,
        password: this.user.password
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../notifications/notifications.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  title = 'Welcome to the Home Page!';

  constructor() {}

}


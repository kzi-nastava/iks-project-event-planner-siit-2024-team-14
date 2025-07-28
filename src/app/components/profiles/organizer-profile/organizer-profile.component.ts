import { Component, OnInit } from '@angular/core';
import { HomeOrganizerService } from '../../home/home-organizer/home-organizer.service';
import {NotificationService} from '../../notifications/notifications.service';

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {
  user: any;

  constructor() {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../notifications/notifications.service';
import {HomeOrganizerService} from '../../home/home-organizer/home-organizer.service';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css'
})
export class ProviderProfileComponent{
  user: any;

  constructor() {}
}

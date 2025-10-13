import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OrganizerProfileComponent} from '../organizer-profile/organizer-profile.component';
import {ViewOrganizerProfileService} from '../view-organizer-profile/view-organizer-profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite-events',
  templateUrl: './favorite-events.component.html',
  styleUrls: ['./favorite-events.component.css']
})
export class FavoriteEventsComponent implements OnInit {

  favoriteEvents: any[] = [];
  user: any;

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
              private viewOrganizerProfileService: ViewOrganizerProfileService,
              private router: Router) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.loadFavoriteEvents();
    } else {
      console.error('No user found in localStorage');
    }
  }

  loadFavoriteEvents(): void {
    this.viewOrganizerProfileService.getFavoriteEvents(this.user.id)
      .subscribe({
        next: (events) => {
          console.log('Favorite events loaded:', events);
          this.favoriteEvents = events;
        },
        error: (err) => {
          console.error('Error fetching favorite events:', err);
        }
      });
  }

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.map(n => n[0]).join('');
  }

  openEvent(eventId: number) {
    this.router.navigate(['/events', eventId]);
  }


  getPhotoUrl(eventId: number): string {
    if (!eventId) {
      return '../../../assets/images/no_photos.jpg'; // fallback image
    }
    return `http://localhost:8080/api/events/get-photo/${eventId}`;
  }

}

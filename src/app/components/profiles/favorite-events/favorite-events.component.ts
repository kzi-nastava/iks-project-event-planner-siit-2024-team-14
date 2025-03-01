import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-events',
  templateUrl: './favorite-events.component.html',
  styleUrl: './favorite-events.component.css'
})
export class FavoriteEventsComponent {
  events = [
    {
      organizerName: 'Dragana Milošević',
      location: 'Niš, Serbia',
      date: '02.12.2024',
      title: 'Bakery Opening',
      description: 'Come with an empty stomach!',
      imageUrl: '../../../assets/images/event6.png'
    },
    {
      organizerName: 'Nina Matijević',
      location: 'Belgrade, Serbia',
      date: '22.12.2024',
      title: 'Graduation Party',
      description: 'All college graduates welcome :)',
      imageUrl: '../../../assets/images/event7.png'
    },
    {
      organizerName: 'Dušan Kovačević',
      location: 'Petrovaradin, Serbia',
      date: '30.11.2024.',
      title: 'EXIT Festival',
      description: 'Together, always <3',
      imageUrl: '../../../assets/images/event8.png'
    },
  ];

  // Method to get initials of the organizer's name
  getInitials(name: string): string {
    const names = name.split(' ');
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  }
}


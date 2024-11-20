import { Component } from '@angular/core';

@Component({
  selector: 'app-our-events',
  templateUrl: './our-events.component.html',
  styleUrl: './our-events.component.css'
})
export class OurEventsComponent {
  eventList = [
    { organizerName: 'Dragana Milošević', location: 'Niš, Serbia', title: 'Bakery Opening', description: 'Come with an empty stomach!', imageUrl: '../../../assets/images/event6.png' },
    { organizerName: 'Nina Matijević', location: 'Belgrade, Serbia', title: 'Graduation Party', description: 'All college graduates welcome :)', imageUrl: '../../../assets/images/event7.png' },
    { organizerName: 'Dušan Kovačević', location: 'Petrovaradin, Serbia', title: 'EXIT Festival', description: 'Together, always <3', imageUrl: '../../../assets/images/event8.png' },
  ];

  searchTerm: string = '';
  filteredEvents: any[] = this.eventList; // Initially shows all events

  // Method to handle filtering
  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredEvents = this.eventList; // If the search term is empty, show all events
    } else {
      this.filteredEvents = this.eventList.filter(event =>
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.organizerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Assuming you have this method to get initials
  getInitials(name: string): string {
    const names = name.split(' ');
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  }

}

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

  filteredEvents = [...this.eventList]; // Prikaz filtriranih događaja
  searchQuery: string = ''; // Pretraga
  selectedFilter: string = ''; // Filter lokacije

  // Filtriranje događaja
  filterEvents() {
    this.filteredEvents = this.eventList.filter((event) => {
      const matchesSearch =
        !this.searchQuery ||
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.organizerName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFilter =
        !this.selectedFilter || event.location === this.selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }

  // Metoda za inicijale
  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

}

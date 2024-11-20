import { Component } from '@angular/core';

@Component({
  selector: 'app-our-sevices',
  templateUrl: './our-sevices.component.html',
  styleUrl: './our-sevices.component.css'
})
export class OurSevicesComponent {
  eventList = [
    { organizerName: 'Eva Lolic', location: 'Niš, Serbia', title: 'Singer', description: 'Music lover', imageUrl: '../../../assets/images/service6.png' },
    { organizerName: 'Natasa Mitrovic', location: 'Belgrade, Serbia', title: 'Marketing team', description: 'Burn your social medias', imageUrl: '../../../assets/images/service7.png' },
    { organizerName: 'Zoran Petrovic', location: 'Petrovaradin, Serbia', title: 'Photobooth Rentals', description: 'Interactive photo booths with custom backdrops and props.', imageUrl: '../../../assets/images/service8.png' },
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

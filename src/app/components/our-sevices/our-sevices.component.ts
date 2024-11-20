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

import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite-solutions',
  templateUrl: './favorite-solutions.component.html',
  styleUrl: './favorite-solutions.component.css'
})
export class FavoriteSolutionsComponent {
  solutions = [
    { organizerName: 'Eva Lolic', location: 'Niš, Serbia', title: 'Singer', description: 'Music lover', price:'60 000 din', imageUrl: '../../../assets/images/service6.png' },
    { organizerName: 'Natasa Mitrovic', location: 'Belgrade, Serbia', title: 'Marketing team', description: 'Burn your social medias', price:'45 000 din', imageUrl: '../../../assets/images/service7.png' },
    { organizerName: 'Zoran Petrovic', location: 'Petrovaradin, Serbia', title: 'Photobooth Rentals', description: 'Interactive photo booths with custom backdrops and props.', price:'10 000 din', imageUrl: '../../../assets/images/service8.png' },
  ];

  // Method to get initials of the organizer's name
  getInitials(name: string): string {
    const names = name.split(' ');
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
  }
}


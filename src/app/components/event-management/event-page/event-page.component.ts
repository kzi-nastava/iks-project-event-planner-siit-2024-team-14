import { Component } from '@angular/core';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {
  isFavorite: boolean = false; // Tracks whether the event is favorited

  event = {
    title: 'Conference on Technological Innovations 2024',
    image: '../../../assets/images/event9.jpg',
    details: {
      subtitle: 'Technological Innovation: Trends and the Future',
      type: 'Conference',
      description:
        'A conference that brings together leading experts in the field technologies to discuss the latest innovations, challenges and opportunities in the technology industry. The event provides an opportunity for networking and exchange experiences between professionals from different sectors.',
      maxGuests: 300,
      status: 'Open',
      location: 'Belgrade, Serbia',
      startDate: '1/11/2024',
      endDate: '1/11/2024',
    },
    reviews: [
      {
        author: 'Milica Milosevic',
        rating: 5,
        comment:
          'Amazing service! The team was punctual, professional, and exceeded all our expectations to make our event remarkable. The level of dedication they put into every detail amazed us! Highly recommend them for any special occasion!',
      },
    ],
    budget: {
      items: []
    }
  };

  chatWithOrganizer() {
    alert('Chat functionality is under development!');
  }

  addReview(comment: string, rating: number) {
    if (comment && rating) {
      this.event.reviews.push({
        author: 'Anonymous',
        rating,
        comment,
      });
    }
  }

  protected readonly Number = Number;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite; // Toggle the favorite state
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-hottest-events',
  templateUrl: './hottest-events.component.html',
  styleUrl: './hottest-events.component.css'
})
export class HottestEventsComponent {
  hottestEvents = [
    { organizerName: 'Ana Jovanović', location: 'Novi Sad, Serbia', date: '01.12.2024.' ,title: 'Birthday Party', description: 'Entry with present', imageUrl: '../../../assets/images/event1.png', profileImage: '../../../assets/images/profile1.png' },
    { organizerName: 'Miloš Nikolić', location: 'Novi Sad, Serbia', date: '24.12.2024.',  title: 'Horse Riding', description: 'For horse lovers, free entry', imageUrl: '../../../assets/images/event2.png', profileImage: '../../../assets/images/profile2.png' },
    { organizerName: 'Nikolina Petrović', location: 'Novi Sad, Serbia', date: '15.12.2024.', title: 'Rooftop Theatre', description: 'Free entry, bring popcorn and drinks :)', imageUrl: '../../../assets/images/event3.png', profileImage: '../../../assets/images/profile3.png'},
    { organizerName: 'Dragana Milivojević', location: 'Novi Sad, Serbia', date: '31.12.2024.',  title: 'Bakery Opening', description: 'Come with an empty stomach!', imageUrl: '../../../assets/images/event4.png', profileImage: '../../../assets/images/profile4.png'},
    { organizerName: 'Nikola Matijević', location: 'Novi Sad, Serbia', date: '12.12.2024.', title: 'Graduation Party', description: 'All college graduates welcome :)', imageUrl: '../../../assets/images/event5.png', profileImage: '../../../assets/images/profile5.png'},
  ];

  currentSlide = 0;

  nextSlide() {
    if (this.currentSlide < this.hottestEvents.length - 4) {
      this.currentSlide += 1.5;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide -= 1.5;
    }
  }

  getTransform() {
    return `translateX(-${this.currentSlide * 33.33}%)`;
  }


}

import { Component } from '@angular/core';

@Component({
  selector: 'app-hottest-services',
  templateUrl: './hottest-services.component.html',
  styleUrl: './hottest-services.component.css'
})
export class HottestServicesComponent {

  hottestEvents = [
    { organizerName: 'Milos Markovic', location: 'Novi Sad, Serbia', title: 'Champagne', description: 'Sparkling wine', imageUrl: '../../../assets/images/service1.png', profileImage: '../../../assets/images/profile9.png'},
    { organizerName: 'Katarina Peric', location: 'Novi Sad, Serbia', title: 'Horse riding lessons', description: 'For horse lovers', imageUrl: '../../../assets/images/service2.png', profileImage: '../../../assets/images/profile10.png' },
    { organizerName: 'Nenad Bosiljcic', location: 'Novi Sad, Serbia', title: 'Rooftop theatre equipment', description: 'For the best movie night', imageUrl: '../../../assets/images/service3.png', profileImage: '../../../assets/images/profile11.png'},
    { organizerName: 'Ivan Ivanovic', location: 'Novi Sad, Serbia', title: 'Catering service', description: 'The best food service in your town! :)', imageUrl: '../../../assets/images/service4.png', profileImage: '../../../assets/images/profile12.png'},
    { organizerName: 'Anastasija Beric', location: 'Novi Sad, Serbia', title: 'Band', description: 'High-energy band playing modern favorites.', imageUrl: '../../../assets/images/service5.png', profileImage: '../../../assets/images/profile13.png'},
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

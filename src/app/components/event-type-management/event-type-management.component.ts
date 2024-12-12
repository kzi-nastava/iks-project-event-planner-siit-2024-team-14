import { Component } from '@angular/core';

@Component({
  selector: 'app-event-type-management',
  templateUrl: './event-type-management.component.html',
  styleUrl: './event-type-management.component.css'
})
export class EventTypeManagementComponent {
  eventTypes = [
    {
      name: 'Birthday party',
      image: '../../../assets/images/event1.png',
      active: true
    },
    {
      name: 'Retirement party',
      image: '../../../assets/images/event7.png',
      active: false
    },
    {
      name: 'Rooftop theater',
      image: '../../../assets/images/event3.png',
      active: true
    },
    {
      name: 'Wedding celebration',
      image: '../../../assets/images/event2.png',
      active: true
    },
    {
      name: 'Corporate event',
      image: '../../../assets/images/event8.png',
      active: false
    },
    {
      name: 'Outdoor concert',
      image: '../../../assets/images/event6.png',
      active: true
    }
  ];

  currentIndex = 0;
  itemsPerPage = 3; // Number of cards visible in one row

  showPopup = false;

  // Navigate to the previous set of cards
  prevEventType() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Navigate to the next set of cards
  nextEventType() {
    if (this.currentIndex < this.eventTypes.length - this.itemsPerPage) {
      this.currentIndex++;
    }
  }

  editEvent(event: any) {
    // Implement edit functionality here
  }

  toggleStatus(event: any) {
    event.active = !event.active;
  }

  newEventType() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}

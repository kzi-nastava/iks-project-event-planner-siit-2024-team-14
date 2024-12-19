import { Component } from '@angular/core';

@Component({
  selector: 'app-event-type-management',
  templateUrl: './event-type-management.component.html',
  styleUrls: ['./event-type-management.component.css']
})
export class EventTypeManagementComponent {
  eventTypes = [
    {
      name: 'Birthday party',
      image: '../../../assets/images/event1.png',
      description: 'Unforgettable birthday party.',
      services: ['decoration', 'drinks', 'food'],
      active: true
    },
    {
      name: 'Retirement party',
      image: '../../../assets/images/event7.png',
      description: 'One last goodbye to the working days.',
      services: ['drinks', 'band'],
      active: false
    },
    {
      name: 'Rooftop theater',
      image: '../../../assets/images/event3.png',
      description: 'Rooftop theater with a view.',
      services: ['food', 'drinks'],
      active: true
    },
    {
      name: 'Wedding celebration',
      image: '../../../assets/images/event2.png',
      description: 'Wedding celebration to die for.',
      services: ['decoration', 'band', 'waiters'],
      active: true
    },
    {
      name: 'Corporate event',
      image: '../../../assets/images/event8.png',
      description: 'Corporate event type.',
      services: ['drinks', 'food', 'band'],
      active: false
    },
    {
      name: 'Outdoor concert',
      image: '../../../assets/images/event6.png',
      description: 'A live music event with various artists.',
      services: ['fireworks', 'band'],
      active: true
    }
  ];

  currentIndex = 0;
  itemsPerPage = 3;
  showPopup = false;
  selectedEvent: any = null;

  // Navigate to the previous set of cards
  prevEventType(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Navigate to the next set of cards
  nextEventType(): void {
    if (this.currentIndex < Math.ceil(this.eventTypes.length / this.itemsPerPage) - 1) {
      this.currentIndex++;
    }
  }

  // Open the edit popup for a selected event
  editEvent(event: any): void {
    this.selectedEvent = { ...event }; // Clone the event to avoid modifying the original data
    this.showPopup = true;
  }

  // Toggle the active/inactive status of an event
  toggleStatus(event: any): void {
    event.active = !event.active;
  }

  // Open a popup to create a new event type
  newEventType(): void {
    this.selectedEvent = {
      name: '',
      image: '',
      description: '',
      services: [],
      active: false
    }; // Default values for a new event
    this.showPopup = true;
  }

  // Close the popup
  closePopup(): void {
    this.showPopup = false;
    this.selectedEvent = null;
  }

  // Save the edited or new event type
  saveEvent(updatedEvent: any): void {
    const index = this.eventTypes.findIndex(event => event.name === updatedEvent.name);
    if (index !== -1) {
      // Update existing event
      this.eventTypes[index] = { ...updatedEvent };
    } else {
      // Add new event
      this.eventTypes.push(updatedEvent);
    }
    this.closePopup();
  }

  deleteEvent(): void {
    const index = this.eventTypes.indexOf(this.selectedEvent);
    if (index !== -1) {
      this.eventTypes.splice(index, 1);
    }
    this.closePopup(); // Close the popup after deletion
  }

}

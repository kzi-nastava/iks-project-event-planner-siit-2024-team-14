import {Component, OnInit} from '@angular/core';
import {EventType} from '../../interfaces/event-type.model'
import {EventTypeManagementService} from './event-type-management.service';
import {CategoriesEtModel} from '../../interfaces/categories-et.model';

@Component({
  selector: 'app-event-type-management',
  templateUrl: './event-type-management.component.html',
  styleUrls: ['./event-type-management.component.css']
})
export class EventTypeManagementComponent implements OnInit {
  eventTypes: EventType[] = [];
  categories: CategoriesEtModel[] = [];
  showCreatePopup = false;
  showEditPopup = false;

  constructor(private eventTypeService: EventTypeManagementService) {}

  ngOnInit() {
    this.loadEventTypes();
    this.loadCategories();
  }

  // loading event types for cards
  loadEventTypes() {
    this.eventTypeService.getAllEventTypes().subscribe({
      next: (data) => {
        this.eventTypes = data;
      },
      error: (err) => {
        console.error('Error fetching event types', err);
      }
    })
  }

  // loading categories that are displayed near checkbox in modal
  loadCategories() {
    this.eventTypeService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data; // Get the categories
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  currentIndex = 0;
  itemsPerPage = 3;
  selectedEvent: any = null;

  prevEventType(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextEventType(): void {
    if (this.currentIndex < Math.ceil(this.eventTypes.length / this.itemsPerPage) - 1) {
      this.currentIndex++;
    }
  }

  // get selected event and open popup
  createEventType(): void {
    this.showEditPopup = false;
    this.showCreatePopup = true;
  }

  // get selected event and open popup
  editEventType(event: any) {
    this.selectedEvent = { ...event };  // copy of the event data
    console.log("Selected Event Data:", this.selectedEvent);
    this.showEditPopup = true;
    this.showCreatePopup = false;
  }

  // Toggle the active/inactive status of an event
  activationStatus(event: any): void {
    event.isActive = !event.isActive;  // Toggle the active status

    // Call a service to update the status in the backend if needed
    this.eventTypeService.activateOrDeactivate(event).subscribe({
      next: (response) => {
        console.log('Event status updated successfully:', response);
        // Optionally, handle success feedback or close a modal
      },
      error: (err) => {
        console.error('Error updating event status:', err);
      }
    });
  }


  // Close the popup
  closePopup(): void {
    this.showCreatePopup = false;
    this.showEditPopup = false;
  }

  // update displayed event types after editing or creating event type
  refreshEventTypes(updatedEvent: EventType): void {
    const index = this.eventTypes.findIndex(event => event.id === updatedEvent.id);

    if (index !== -1) {
      // Update the existing event with the new data
      this.eventTypes[index] = { ...updatedEvent }; // Using spread to ensure immutability
    } else {
      console.error('Event not found in list, cannot update.');
    }

    console.log("Updated Event Types after saving:", this.eventTypes);
    this.closePopup(); // Close the popup after saving

    // Reload the event types to ensure the display is refreshed
    this.loadEventTypes(); // This will fetch the latest events from the backend
  }




  deleteEvent(): void {
    const index = this.eventTypes.indexOf(this.selectedEvent);
    if (index !== -1) {
      this.eventTypes.splice(index, 1);
    }
    this.closePopup(); // Close the popup after deletion
  }


  // NAVBAR

  isSidebarOpen: boolean = false;
  isNotificationsOpen: boolean = false;

  unreadCount: number = 0;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('Sidebar toggled!', this.isSidebarOpen);
  }

  openNotifications() : void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }


/*
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

 */
}

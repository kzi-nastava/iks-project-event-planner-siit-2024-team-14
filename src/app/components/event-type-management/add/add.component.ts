import { Component, EventEmitter, Output } from '@angular/core';
import { EventTypeManagementService } from '../event-type-management.service';
import { CategoriesEtModel } from '../../../interfaces/categories-et.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddEventTypeComponent {
  categories: CategoriesEtModel[] = [];
  eventData: {
    name: string;
    description: string;
    categories: string[];
  } = {
    name: '',
    description: '',
    categories: []
  };

  errorMessage: string = ''; // Holds error messages
  successMessage: string = ''; // Holds success messages

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  constructor(private eventTypeService: EventTypeManagementService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.eventTypeService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching categories. Please try again.';
        console.error('Error fetching categories', err);
      }
    });
  }

  onCategoryChange(event: any, category: CategoriesEtModel) {
    if (event.target.checked) {
      this.eventData.categories.push(category.name);
    } else {
      this.eventData.categories = this.eventData.categories.filter(cat => cat !== category.name);
    }
  }

  createEventType(): void {
    this.errorMessage = ''; // Clear previous errors
    this.successMessage = ''; // Clear previous success messages

    if (this.eventData.name === '' || this.eventData.description === '' || this.eventData.categories.length === 0) {
      this.errorMessage = 'Please fill in all required fields (Name, Description, and at least one Category).';
      return;
    }

    const newEventType = {
      name: this.eventData.name,
      description: this.eventData.description,
      active: true,
      categories: this.eventData.categories.map(name => ({ name }))
    };

    this.eventTypeService.createEventType(newEventType).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        this.successMessage = 'Event type created successfully!';
        this.save.emit(response);
        setTimeout(() => this.closePopup(), 1500); // Close modal after 1.5 seconds
      },
      error: (err) => {
        console.error('Error creating eventType:', err);

        if (err.status === 400 && err.error?.message.includes('already exists')) {
          this.errorMessage = 'An event type with this name already exists.';
        } else {
          this.errorMessage = 'An error occurred while creating the event type. Please try again.';
        }
      }
    });
  }


  closePopup(): void {
    this.close.emit();
  }
}

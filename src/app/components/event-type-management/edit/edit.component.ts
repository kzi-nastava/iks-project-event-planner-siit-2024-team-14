import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesEtModel } from '../../../interfaces/categories-et.model';
import { EventTypeManagementService } from '../event-type-management.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditEventTypeComponent implements OnInit {
  categories: CategoriesEtModel[] = [];
  errorMessage: string = ''; // Holds error messages

  @Input() eventData: any; // Event data passed from the parent
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private eventTypeService: EventTypeManagementService) {}

  ngOnInit() {
    this.loadCategories();
  }

  // loading all existing categories
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

  // for checking box if category is selected for current event type
  isCategorySelected(category: CategoriesEtModel): boolean {
    return this.eventData.categories && this.eventData.categories.some((cat: CategoriesEtModel) => cat.name === category.name);
  }

  // adding or removing category based on checkbox
  toggleService(category: CategoriesEtModel, event: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!this.eventData.categories.some((cat: CategoriesEtModel) => cat.name === category.name)) {
        this.eventData.categories.push(category);
      }
    } else {
      const index = this.eventData.categories.findIndex((cat: CategoriesEtModel) => cat.name === category.name);
      if (index !== -1) {
        this.eventData.categories.splice(index, 1);
      }
    }
  }

  // update event type function
  editEventType(): void {
    this.errorMessage = ''; // Clear previous errors
    if (!this.eventData || !this.eventData.id) {
      console.error('No event data available for editing.');
      return;
    }

    if (this.eventData.name === '' || this.eventData.description === '' || this.eventData.categories.length === 0) {
      this.errorMessage = 'Please fill in all required fields (Description and at least one Category).';
      return;
    }

    console.log("There is event for editing")
    const updatedEvent = {
      id: this.eventData.id,
      name: this.eventData.name,
      description: this.eventData.description,
      active: this.eventData.active,
      categories: this.eventData.categories.map((cat: CategoriesEtModel) => ({ name: cat.name }))
    };
    console.log("updated event", updatedEvent);
    this.eventTypeService.updateEventType(updatedEvent).subscribe({
      next: (response) => {
        console.log('Event updated successfully:', response);
        this.save.emit(response); // Notify parent component of the update
        this.closePopup(); // Close the popup after successful update
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while creating the event type. Please try again.';
        console.error('Error updating event:', err);
      }
    });
  }

  // ------------ADD THIS--------------
  deleteEvent(): void {
    this.delete.emit();
  }

  closePopup(): void {
    this.close.emit();
  }
}

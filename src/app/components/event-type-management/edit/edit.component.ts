import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @Input() eventData: any; // Event data passed from the parent
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>(); // Event emitter for delete action

  showDeleteConfirmation = false; // Flag to show/hide delete confirmation popup

  // Toggle service selection
  toggleService(service: string, event: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!this.eventData.services.includes(service)) {
        this.eventData.services.push(service);
      }
    } else {
      const index = this.eventData.services.indexOf(service);
      if (index !== -1) {
        this.eventData.services.splice(index, 1);
      }
    }
  }

  // Save the event and emit the data
  saveEvent(): void {
    this.save.emit(this.eventData);
  }

  // Delete the event and emit the action
  deleteEvent(): void {
    this.delete.emit();
  }

  // Close the popup
  closePopup(): void {
    this.close.emit();
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css'
})
export class MessageModalComponent {
  @Input() message: string = 'Operation Successful';
  @Output() close = new EventEmitter<void>();
  @Input() modalTitle: string = 'Successfully created event';
  @Input() isVisible: boolean = false;
  @Input() showOkButton: boolean = false;  // Handle OK button visibility

  constructor(private router: Router) {}

  closeModal() {
    this.close.emit();
  }
}

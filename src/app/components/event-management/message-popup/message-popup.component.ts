import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrl: './message-popup.component.css'
})
export class MessagePopupComponent {
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

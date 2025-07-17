import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.css']
})
export class MessagePopupComponent {
  @Input() message: string = 'Operation completed.';
  @Input() title: string = 'Info';
  @Input() isVisible: boolean = false;
  @Input() isError: boolean = false;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}

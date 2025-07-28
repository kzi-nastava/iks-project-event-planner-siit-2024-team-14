import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-message-popup',
  standalone: true,
  template: ''
})
export class MockMessagePopupComponent {
  @Input() message: string = '';
  @Input() title: string = '';
  @Input() isVisible: boolean = false;
  @Input() isError: boolean = false;

  @Output() close = new EventEmitter<void>();
}

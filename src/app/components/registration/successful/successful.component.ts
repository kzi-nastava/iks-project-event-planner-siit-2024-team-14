import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.css']
})
export class SuccessfulComponent {
  @Input() message: string = 'Operation Successful';
  @Output() close = new EventEmitter<void>();
  @Input() modalTitle: string = 'Registration';
  @Input() isVisible: boolean = false;

  constructor(private router: Router) {}

  closeModal() {
    this.close.emit();
    this.router.navigate(['login']);
  }
}

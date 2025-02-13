import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.css']
})
export class SuccessfulComponent {
  @Input() message: string = 'Operation Successful'; // Default message
  @Output() close = new EventEmitter<void>(); // Event when user clicks OK

  constructor(private router: Router) {}

  closeModal() {
    this.close.emit(); // Notify parent component
    this.router.navigate(['login']); // Redirect to login
  }
}

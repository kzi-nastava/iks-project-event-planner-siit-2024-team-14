import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showModal = false; // To track modal visibility

  constructor(private router: Router) {}

  openModal(event: MouseEvent): void {
    event.preventDefault();  // Prevent any default behavior like navigation
    this.showModal = true;    // Show the modal
  }

  closeModal(): void {
    this.showModal = false;
  }

  redirectTo(route: string): void {
    this.router.navigate([route], {replaceUrl: true});
    this.closeModal();
  }
}

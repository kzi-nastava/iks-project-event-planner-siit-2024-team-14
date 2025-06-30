import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from '../../interfaces/login.model';
import {AuthService} from '../../infrastructure/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // State for modal visibility
  showModal = false;

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) {}

  // Reactive Form Definition
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  // Login Function
  login(): void {
    if (this.loginForm.valid) {
      const loginData: Login = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      };

      // Send login data to the backend
      this.authService.login(loginData.email, loginData.password).subscribe({
        next: (response: any) => {
          // Print the response in the console
          console.log('Login successful:', response);

          // Saving token and user data in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userCity', response.user.city);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('userPassword', response.user.password);

          localStorage.setItem('role', response.user.role);

          this.redirectUser(response.user.role);
        },
        error: (err) => {
          // Check if the error response contains a message and display it
          if (err?.error?.message) {
            alert(err.error.message); // Show the error message from the response
          } else {
            alert('Login failed. Please check your credentials.'); // Default message
          }
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Modal Controls
  openModal(event: MouseEvent): void {
    event.preventDefault();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  redirectTo(route: string): void {
    this.router.navigate([route], { replaceUrl: true });
    this.closeModal();
  }

  redirectUser(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['home-admin']);
        break;
      case 'EventOrganizer':
        this.router.navigate(['home-organizer']);
        break;
      case 'ServiceAndProductProvider':
        this.router.navigate(['home-provider']);
        break;
      case 'User':
        this.router.navigate(['home-authenticated-user']);
        break;
      default:
        this.router.navigate(['home-guest']);
    }
  }

}

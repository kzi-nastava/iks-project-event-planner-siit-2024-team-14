import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from '../../interfaces/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // State for modal visibility
  showModal = false;

  constructor(private loginService: LoginService, private router: Router) {}

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
      this.loginService.login(loginData).subscribe({
        next: (response: any) => {
          // Print the response in the console
          console.log('Login successful:', response);

          // Saving token and user data u localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userCity', response.user.city);

          this.redirectUser(response.user.role);
        },
        error: (err) => {
          alert('Login failed. Please check your credentials.');
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
      default:
        this.router.navigate(['home-guest']);
    }
  }

}

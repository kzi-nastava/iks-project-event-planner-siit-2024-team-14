import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invitation-register',
  templateUrl: './registration-au.component.html',
  styleUrls: ['./registration-au.component.css']
})
export class InvitationRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  emailFromUrl: string = '';
  eventIdFromUrl!: number;

  showModal = false;
  modalTitle: string = 'Registration in progress...';
  modalMessage: string = 'Please wait while we process your registration.';
  showOkButton = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailFromUrl = this.route.snapshot.queryParamMap.get('email') || '';
    this.eventIdFromUrl = Number(this.route.snapshot.queryParamMap.get('eventId'));

    this.registrationForm = this.fb.group({
      email: [{ value: this.emailFromUrl, disabled: true }, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registrationForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    this.modalTitle = 'Registration in progress...';
    this.modalMessage = 'Please wait while we process your registration.';
    this.showOkButton = false;
    this.showModal = true;

    const data = {
      email: this.emailFromUrl,
      password: this.registrationForm.getRawValue().password,
      confirmPassword: this.registrationForm.getRawValue().confirmPassword,
      fullName: this.registrationForm.getRawValue().fullName,
      eventId: this.eventIdFromUrl
    };

    this.http.post<any>('http://localhost:8080/api/invitations/register', data).subscribe({
      next: (res) => {
        this.modalTitle = 'Registration Successful';
        this.modalMessage = res.message || 'Check your email to activate your account.';
        this.showOkButton = true;
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.modalTitle = 'Registration Issue';

        if (err.status === 409) {
          this.modalMessage = 'User with that email address already exists.';
        } else {
          this.modalMessage = 'There was a problem sending the activation email, but your account was created. Try requesting activation again.';
        }

        this.showOkButton = true;
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
  }
}

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
  form!: FormGroup;
  emailFromUrl: string = '';
  eventIdFromUrl!: number;

  showModal = false;
  modalTitle = '';
  modalMessage = '';
  showOkButton = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.emailFromUrl = this.route.snapshot.queryParamMap.get('email') || '';
    this.eventIdFromUrl = Number(this.route.snapshot.queryParamMap.get('eventId'));

    this.form = this.fb.group({
      email: [{ value: this.emailFromUrl, disabled: true }, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    const data = {
      email: this.emailFromUrl,
      password: this.form.getRawValue().password,
      confirmPassword: this.form.getRawValue().confirmPassword,
      fullName: this.form.getRawValue().fullName,
      eventId: this.eventIdFromUrl
    };

    this.http.post('http://localhost:8080/api/invitations/register', data).subscribe({
      next: () => {
        this.modalTitle = 'Registration Successful';
        this.modalMessage = 'You are now following the event. Enjoy!';
        this.showOkButton = true;
        this.showModal = true;
      },
      error: () => {
        alert('Something went wrong. Please try again.');
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/']);
  }
}

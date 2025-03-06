import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ActivationService} from './activation.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
  activationMessage: string = 'Activating your account...';
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private activationService: ActivationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract token from the query parameters
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const role = params['role'];

      console.log('Params: ', params);

      console.log('The role is: ', role);

      if (token) {
        console.log('Activation link clicked with token: ', token);

        // Call the activation service to validate the token
        this.activationService.activateAccount(token, role).subscribe(
          (response: any) => {
            this.activationMessage = response.message || 'Your account has been activated successfully!';
            this.isSuccess = true;
            console.log('Account activated successfully.');
          },
          (error) => {
            this.activationMessage = error.error?.message || 'Invalid or expired activation link.';
            this.isSuccess = false;
            console.error('Error during activation:', error);
          }
        );
      } else {
        this.activationMessage = 'Invalid activation request.';
        this.isSuccess = false;
        console.error('No token found in the URL.');
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SolutionService, Offering } from './solution-service';
import {Router} from '@angular/router';
import {AddProductComponent} from '../products/add-product/add-product.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-provider-solutions',
  templateUrl: './provider-solutions.component.html',
  styleUrls: ['./provider-solutions.component.css']
})
export class ProviderSolutionsComponent {
  constructor(private router: Router,
              private dialog: MatDialog) {}

  solutionService = inject(SolutionService); // ✅ inject the combined SolutionService
  auth = inject(AuthService);

  protected getProviderSolutions(params: any) {
    return this.solutionService.getAll({ ...params, provider: this.auth.user!.id });
  }

  onNewService() {
    this.router.navigate(['/services/add']);
  }

  onNewProduct() {
    this.dialog.open(AddProductComponent, {
      width: '450px',
      panelClass: 'product-dialog-container'
    });
  }
}

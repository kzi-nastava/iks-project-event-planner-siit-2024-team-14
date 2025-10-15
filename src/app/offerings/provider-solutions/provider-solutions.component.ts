import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { SolutionService, Offering } from './solution-service';
import {Router} from '@angular/router';
import {AddProductComponent} from '../products/add-product/add-product.component';
import {MatDialog} from '@angular/material/dialog';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-provider-solutions',
  templateUrl: './provider-solutions.component.html',
  styleUrls: ['./provider-solutions.component.css']
})
export class ProviderSolutionsComponent implements OnInit {
  constructor(private router: Router,
              private dialog: MatDialog,
              private productService: ProductService) {}

  solutionService = inject(SolutionService); // ✅ inject the combined SolutionService
  auth = inject(AuthService);

  ngOnInit(): void {
    this.loadProducts();

    // 👇 When navigated with "refresh" flag, reload
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['refresh']) {
      this.loadProducts();
    }
  }


  protected getProviderSolutions(params: any) {
    return this.solutionService.getAll({ ...params, provider: this.auth.user!.id });
  }

  loadProducts() {
    this.solutionService
      .getAll({ provider: this.auth.user!.id })
      .subscribe((res) => {
        // if your <app-solution-list> uses async data binding,
        // make sure to pass this result or update the observable
      });
  }

  onNewService() {
    this.router.navigate(['/services/add']);
  }

  onNewProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '450px',
      panelClass: 'product-dialog-container'
    });

    dialogRef.afterClosed().subscribe((refresh) => {
      if (refresh) {
        this.loadProducts(); // reload after new product is added
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../product.service';
import {User} from '../../../infrastructure/auth/model/user.model';
import {AuthService} from '../../../infrastructure/auth/auth.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  user: User | null = null;

  showPurchasePopup = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => this.user = user);
  }


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];

      this.productService.getById(id).subscribe({
        next: product => this.product = product,
        error: err => {
          console.error(`[ProductDetailsComponent] Failed to load product ${id}`, err);
          // this.router.navigate(['/home']);
        }
      });
    })
  }

}

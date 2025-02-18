import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  protected product: Product = {id: -1} as Product;


  constructor(private route: ActivatedRoute, private productService: ProductService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];

      this.productService.getById(id).subscribe({
        next: product => this.product = product,
        error: err => console.log('Failed to fetch product data.')
      })
    })
  }

}

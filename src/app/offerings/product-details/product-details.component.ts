import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  protected product: Product = {id: -1} as Product;


  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params =>
    {
      const id = +params['id'];
      // TODO: Load product data instead
      this.product = {
        id: id,
        name: 'Moët & Chandon Brut Impérial',
        description: 'A luxurious French champagne with a balanced blend of Pinot Noir, Chardonnay, and Pinot Meunier.',
        category: {name: 'Drinks', description: 'Non alcoholic and alcoholic beverages.'},
        price: 5000,
        applicableEventTypes: [{name: 'Party'}, {name: 'Wedding'}]
      } as unknown as Product
    })
  }

}

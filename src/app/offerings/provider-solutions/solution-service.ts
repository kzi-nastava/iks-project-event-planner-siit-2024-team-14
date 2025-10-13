import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceService } from '../service.service';
import { ProductService } from '../product.service';
import { Page } from '../../interfaces/page.model';

export interface Offering {
  id: number;
  name: string;
  type: 'SERVICE' | 'PRODUCT';
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class SolutionService {

  constructor(
    private serviceService: ServiceService,
    private productService: ProductService
  ) {}

  getAll(params: any): Observable<Page<Offering>> {
    // forkJoin returns an object of observables
    return forkJoin({
      services: this.serviceService.getAll(params),
      products: this.productService.getAll(params)
    }).pipe(
      map(result => {
        // explicitly cast the result to ensure TypeScript knows the types
        const services = (result['services'] as any).content || [];
        const products = (result['products'] as any).content || [];

        const all: Offering[] = [
          ...services.map((s: any) => ({ ...s, type: 'SERVICE' })),
          ...products.map((p: any) => ({ ...p, type: 'PRODUCT' }))
        ];

        return {
          content: all,
          totalElements: all.length,
          totalPages: 1,
          number: 0,
          size: all.length,
          numberOfElements: all.length,
          first: true,
          last: true,
          empty: all.length === 0
        } as Page<Offering>;
      })
    );
  }
}

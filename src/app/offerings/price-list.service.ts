import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {AuthService} from '../infrastructure/auth/auth.service';
import {ServiceService} from './service.service';
import {ProductService} from './product.service';
import {throwError} from 'rxjs';
import {Page} from '../interfaces/page.model';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {


  public getProviderSolutions(params?: any) {
    return this.http.get<Page<Object>>(environment.apiUrl + `/providers/${this.auth.user?.id || -1}/solutions`, {params});
  }


  public exportPriceListPdf() {
    return this.http.get(environment.apiUrl + '/price-list.pdf', { responseType: 'blob' });
  }


  public updateSolutionPrice(solution: any, price: number) {
    const data = {
      id: typeof solution === 'number' ? solution : solution.id,
      price
    }

    switch (solution.solutionType) {
      case 'Service':
        return this.serviceService.update(data);
      case 'Product':
        return this.productService.update(data);
      default:
        console.error(`[PriceListService] Failed to update solution price, unknown type ${solution.solutionType}`);
        return throwError(() => new Error(`Unknown type ${solution.solutionType}`));
    }

  }



  http = inject(HttpClient);
  auth = inject(AuthService);
  serviceService = inject(ServiceService);
  productService = inject(ProductService);
}

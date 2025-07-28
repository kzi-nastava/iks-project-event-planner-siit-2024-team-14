import { Component, inject } from '@angular/core';
import {ServiceService} from '../service.service';
import {AuthService} from '../../infrastructure/auth/auth.service';
import {OurServicesComponent} from '../../components/homepage/all-services/our-services.component';
import {SolutionService} from '../../components/homepage/all-services/our-services.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-provider-solutions',
  templateUrl: './provider-solutions.component.html',
  styles: `* {
    color: #412c26;
  }

  main {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
    margin-bottom: 3rem;
  }`
})
export class ProviderSolutionsComponent {


  protected getProviderSolutions(params: any) {
    return this.solutionService.getAll({...params, provider: this.auth.user!.id});
  }


  solutionService = inject(ServiceService); // TODO: Use solution service to get services and products, not just services
  auth = inject(AuthService);
}

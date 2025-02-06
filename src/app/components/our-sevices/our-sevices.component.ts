import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../services/our-services.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-our-sevices',
  templateUrl: './our-sevices.component.html',
  styleUrl: './our-sevices.component.css'
})

export class OurSevicesComponent implements OnInit {
  solutionsList: any[] = [];
  filteredSolutions: any[] = [];
  searchTerm: string = '';
  category: string = '';
  startDate: string = '';
  endDate: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  solutionType: string = '';
  page: number = 0;
  totalSolutions: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  showFilters: boolean = false;

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.loadSolutions();
  }

  loadSolutions() {
    this.solutionService.getAllSolutions()
      .subscribe(response => {
        this.solutionsList = response;
        this.totalSolutions = response.length;
        this.totalPages = Math.ceil(this.totalSolutions / this.pageSize);
        this.filteredSolutions = [...this.solutionsList];
      });
  }

  onSearch() {
    this.filteredSolutions = this.solutionsList.filter(solution =>
      solution.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.providerCompanyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  applyFilters() {
    this.page = 0;

    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.pageSize.toString());

    if (this.category) params = params.set('category', this.category);
    if (this.startDate) params = params.set('startDate', this.startDate);
    if (this.endDate) params = params.set('endDate', this.endDate);
    if (this.minPrice !== null) params = params.set('minPrice', this.minPrice.toString());
    if (this.maxPrice !== null) params = params.set('maxPrice', this.maxPrice.toString());
    if (this.solutionType) params = params.set('type', this.solutionType);

    this.solutionService.getFilteredSolutions(params).subscribe(
      response => {
        this.solutionsList = response.content;
        this.totalSolutions = response.totalElements;
        this.totalPages = Math.ceil(this.totalSolutions / this.pageSize);
        this.filteredSolutions = [...this.solutionsList];
      },
      error => {
        console.error('Error applying filters:', error);
      }
    );
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.applyFilters();
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getInitials(providerCompanyName: string): string {
    return providerCompanyName ? providerCompanyName.charAt(0).toUpperCase() : '';
  }
}

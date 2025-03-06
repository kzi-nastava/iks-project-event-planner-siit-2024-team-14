import { Component, OnInit } from '@angular/core';
import { SolutionService } from './our-services.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-all-sevices',
  templateUrl: './our-sevices.component.html',
  styleUrl: './our-sevices.component.css'
})

export class OurSevicesComponent implements OnInit {
  solutionsList: any[] = [];
  blockedUserIds: number[] = [];
  filteredSolutions: any[] = [];
  searchTerm: string = '';
  category: string = '';
  startDate: string = '';
  endDate: string = '';
  location: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  solutionType: string = '';
  page: number = 0;
  totalSolutions: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  showFilters: boolean = false;

  locations: string[] = []; // Lista gradova
  categories: string[] = []; // Lista za filter

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.loadSolutions();
    this.fetchLocations();
    this.fetchCategories();
  }

  loadSolutions() {
    this.solutionService.getBlockedUsers().subscribe(
      (blockedUsers) => {
        this.blockedUserIds = blockedUsers;

        this.solutionService.getAllSolutions().subscribe(
          (response) => {
            this.solutionsList = response.filter(solution =>
              !this.blockedUserIds.includes(solution.providerId) // Filtrira usluge čiji je pružalac usluga blokiran
            );
            this.totalSolutions = this.solutionsList.length;
            this.totalPages = Math.ceil(this.totalSolutions / this.pageSize);
            this.filteredSolutions = [...this.solutionsList];
          },
          (error) => {
            console.error('Error loading solutions:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading blocked users:', error);
      }
    );
  }


  fetchLocations() {
    this.solutionService.getAllLocations().subscribe(
      (data: string[]) => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  fetchCategories() {
    this.solutionService.getAllCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
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

    if (this.category && this.category.trim() !== '') params = params.set('category', this.category);
    if (this.startDate) params = params.set('startDate', this.startDate);
    if (this.endDate) params = params.set('endDate', this.endDate);
    if (this.minPrice != null) params = params.set('minPrice', this.minPrice.toString());
    if (this.maxPrice != null) params = params.set('maxPrice', this.maxPrice.toString());
    if (this.location && this.location.trim() !== '') {
      params = params.set('location', this.location);
    }

    if (this.solutionType && this.solutionType.trim() !== '') params = params.set('type', this.solutionType);

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
}

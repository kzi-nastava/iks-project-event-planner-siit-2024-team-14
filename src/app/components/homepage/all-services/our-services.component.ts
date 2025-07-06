import { Component, OnInit } from '@angular/core';
import { SolutionService } from './our-services.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-all-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {
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

  locations: string[] = [];
  categories: string[] = [];

  baseUrl = 'http://localhost:8080/';

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
          (response: any[]) => {
            // Dodaj puni URL za slike i filtriraj po blokiranim korisnicima
            const solutionsWithFullUrls = response
              .map(solution => this.addFullImageUrl(solution))
              .filter(solution => !this.blockedUserIds.includes(solution.providerId));
            this.solutionsList = solutionsWithFullUrls;
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
    if (this.location && this.location.trim() !== '') params = params.set('location', this.location);
    if (this.solutionType && this.solutionType.trim() !== '') params = params.set('type', this.solutionType);

    this.solutionService.getFilteredSolutions(params).subscribe(
      (response: any[]) => {
        // Dodaj puni URL za slike
        const solutionsWithFullUrls = response.map(solution => this.addFullImageUrl(solution));
        this.solutionsList = solutionsWithFullUrls;
        this.totalSolutions = this.solutionsList.length;
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

  private addFullImageUrl(solution: any): any {
    return {
      ...solution,
      imageUrl: solution.imageUrl && !solution.imageUrl.startsWith('http') ? this.baseUrl + solution.imageUrl : solution.imageUrl
    };
  }
}

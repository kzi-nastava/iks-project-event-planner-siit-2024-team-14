import {Component, OnInit} from '@angular/core';
import {SolutionService} from '../../services/our-services.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-our-sevices',
  templateUrl: './our-sevices.component.html',
  styleUrl: './our-sevices.component.css'
})

export class OurSevicesComponent implements OnInit {
  solutionsList: any[] = []; // Lista svih događaja
  filteredSolutions: any[] = []; // Lista filtriranih događaja (pretraga + filtriranje)
  searchTerm: string = ''; // String za pretragu
  category: string = ''; // Kategorija za filtriranje
  page: number = 0; // Trenutna stranica
  totalSolutions: number = 0; // Ukupno događaja
  pageSize: number = 10; // Broj događaja po stranici
  totalPages: number = 0; // Ukupno stranica
  showFilters: boolean = false; // Da li su filteri prikazani

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.loadSolutions();
  }

  // Učitavanje svih događaja sa servera
  loadSolutions() {
    this.solutionService.getAllSolutions()
      .subscribe(response => {
        this.solutionsList = response;  // Početno učitaj sve događaje (ako je response već lista)
        this.totalSolutions = response.length;  // Ako je response samo lista, koristi duzinu
        this.totalPages = Math.ceil(this.totalSolutions / this.pageSize);  // Izračunavanje ukupnih stranica
        this.filteredSolutions = [...this.solutionsList];  // Početno postavi sve događaje kao filtrirane

      });
  }

  // Pretraga događaja po imenu, organizatoru, opisu itd.
  onSearch() {
    this.filteredSolutions = this.solutionsList.filter(solution =>
      solution.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.providerCompanyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.price.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solution.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  applyFilters() {
    this.page = 0;

    // Kreiranje HttpParams samo sa postojećim parametrima
    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.pageSize.toString());


    if (this.category) {
      params = params.set('category', this.category);
    }

    // Poziv backend servisa sa filtriranim parametrima
    this.solutionService.getFilteredSolutions(params)
      .subscribe(
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
    this.page = page;
    this.loadSolutions();
  }

  getInitials(providerCompanyName: string): string {
    if (providerCompanyName) {
      return providerCompanyName.charAt(0).toUpperCase();
    } else {
      return '';
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}

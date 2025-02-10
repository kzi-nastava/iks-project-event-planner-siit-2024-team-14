import { Component, OnInit } from '@angular/core';
import { EventService } from './our-events.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-our-events',
  templateUrl: './our-events.component.html',
  styleUrls: ['./our-events.component.css']
})
export class OurEventsComponent implements OnInit {
  eventsList: any[] = []; // Lista svih događaja
  filteredEvents: any[] = []; // Lista filtriranih događaja (pretraga + filtriranje)
  searchTerm: string = ''; // String za pretragu
  startDate: string = ''; // Startni datum za filtriranje
  endDate: string = ''; // Krajni datum za filtriranje
  location: string = '';
  category: string = ''; // Kategorija za filtriranje
  page: number = 0; // Trenutna stranica
  totalEvents: number = 0; // Ukupno događaja
  pageSize: number = 10; // Broj događaja po stranici
  totalPages: number = 0; // Ukupno stranica
  showFilters: boolean = false; // Da li su filteri prikazani

  locations: string[] = []; // Lista gradova
  categories: string[] = []; // Lista za filter

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
    this.fetchLocations();
    this.fetchCategories();
  }

  // Učitavanje svih događaja sa servera
  loadEvents() {
    this.eventService.getAllEvents()
      .subscribe(response => {
        this.eventsList = response;  // Početno učitaj sve događaje (ako je response već lista)
        this.totalEvents = response.length;  // Ako je response samo lista, koristi duzinu
        this.totalPages = Math.ceil(this.totalEvents / this.pageSize);  // Izračunavanje ukupnih stranica
        this.filteredEvents = [...this.eventsList];  // Početno postavi sve događaje kao filtrirane

      });
  }

  fetchLocations() {
    this.eventService.getAllLocations().subscribe(
      (data: string[]) => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  fetchCategories() {
    this.eventService.getAllCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Pretraga događaja po imenu, organizatoru, opisu itd.
  onSearch() {
    this.filteredEvents = this.eventsList.filter(event =>
      event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.organizerFirstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.organizerLastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  applyFilters() {
    this.page = 0;

    // Kreiranje HttpParams samo sa postojećim parametrima
    let params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.pageSize.toString());

    if (this.startDate) {
      params = params.set('startDate', this.startDate);
    }

    if (this.endDate) {
      params = params.set('endDate', this.endDate);
    }

    if (this.category && this.category.trim() !== '') params = params.set('category', this.category);

    if (this.location && this.location.trim() !== '') {
      params = params.set('location', this.location);
    }

    this.eventService.getFilteredEvents(params)
      .subscribe(
        response => {
          this.eventsList = response.content;
          this.totalEvents = response.totalElements;
          this.totalPages = Math.ceil(this.totalEvents / this.pageSize);
          this.filteredEvents = [...this.eventsList];
        },
        error => {
          console.error('Error applying filters:', error);
        }
      );
  }

// Promeni stranicu
  onPageChange(page: number) {
    this.page = page;
    this.loadEvents();
  }

  getInitials(organizerFirstName: string, organizerLastName: string): string {
    if (organizerFirstName && organizerLastName) {
      return organizerFirstName.charAt(0).toUpperCase() + organizerLastName.charAt(0).toUpperCase();
    } else {
      return ''; // Ako nema organizatora, vrati prazan string
    }
  }

  // Funkcija za otvaranje/zatvaranje filtera
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}

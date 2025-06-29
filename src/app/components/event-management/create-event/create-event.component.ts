import {AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CategoriesEtModel } from '../../../interfaces/categories-et.model';
import { EventManagementService } from '../event-management.service';
import { DatePipe } from '@angular/common';
import { GetEtNamesModel } from '../../../interfaces/get-et-names.model';
import { CreateEvent } from '../../../interfaces/create-event.model';
import { MatDialog } from '@angular/material/dialog';
import {InvitationPopupComponent} from '../../invitations/invitation-popup.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  constructor(private http: HttpClient, private eventService: EventManagementService, private datePipe: DatePipe, private dialog: MatDialog) {}

  @Output() closePopupEvent = new EventEmitter<void>();

  categories: CategoriesEtModel[] = [];
  eventTypes: GetEtNamesModel[] = [];
  selectedCategory: string | null = null;
  selectedEventType: string | null = null;
  selectedFile: File | null = null;

  eventData: CreateEvent = {
    name: '',
    description: '',
    categories: [],
    guestNumber: '',
    type: '',
    location: '',
    startDate: null,
    endDate: null,
    eventType: '',
    organizer: '',
    photo: null
  };

  showModal = false;
  modalTitle: string = 'New event successfully created!';
  modalMessage: string = '';
  errorMessage: string = '';
  showOkButton = false;
  minDate: string = '';

  formattedStartDate: string | null = null;
  formattedEndDate: string | null = null;

  locationSearch: string = '';
  locationResults: any[] = [];


  ngOnInit() {
    this.loadCategories();
    this.loadEventTypes();
    this.eventData.organizer = localStorage.getItem('userId') || '';
    this.minDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  loadCategories() {
    this.eventService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching categories. Please try again.';
        console.error('Error fetching categories', err);
      },
    });
  }

  loadEventTypes() {
    this.eventService.getAllEventTypes().subscribe({
      next: (data) => {
        this.eventTypes = [{ name: 'All' }, ...data];
      },
      error: (err) => {
        this.errorMessage = 'Error fetching event types. Please try again.';
        console.error('Error fetching event types', err);
      }
    });
  }

  onCategoryChange(event: Event, category: any) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.eventData.categories.includes(category.name)) {
        this.eventData.categories.push(category.name);
      }
    } else {
      this.eventData.categories = this.eventData.categories.filter(c => c !== category.name);
    }
  }

  onEventTypeChange(eventType: string) {
    this.selectedCategory = eventType;

    if (!eventType) {
      this.categories = [];
      return;
    }

    if (eventType === 'All') {
      this.loadCategories();
    } else {
      this.selectedEventType = eventType;
      this.eventService.getServicesAndProducts(eventType).subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error('Error fetching categories', err);
          this.categories = [];
        }
      });
    }
  }

  onLocationInputChange(): void {
    if (this.locationSearch.length < 2) return;

    this.http.get<any[]>(`http://localhost:8080/api/location/search?query=${this.locationSearch}`)
      .subscribe({
        next: (results) => this.locationResults = results,
        error: (err) => console.error("Location search error", err)
      });
  }

  selectLocation(result: any): void {
    this.locationSearch = result.display_name;
    this.locationResults = [];
    this.eventData.location = result.display_name;
  }

  onStartDateChange() {
    if (this.eventData.startDate) {
      this.formattedStartDate = this.datePipe.transform(this.eventData.startDate, 'dd/MM/yyyy');
      this.validateDateOrder();
    }
  }

  onEndDateChange() {
    if (this.eventData.endDate) {
      this.formattedEndDate = this.datePipe.transform(this.eventData.endDate, 'dd/MM/yyyy');
      this.validateDateOrder();
    }
  }

  validateDateOrder(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time to midnight for accurate comparison

    if (this.eventData.startDate) {
      const start = new Date(this.eventData.startDate);
      if (start < today) {
        this.errorMessage = 'Start date cannot be in the past.';
        return false;
      }
    }

    if (this.eventData.startDate && this.eventData.endDate) {
      if (this.eventData.endDate < this.eventData.startDate) {
        this.errorMessage = 'End date cannot be before start date.';
        return false;
      }
    }

    this.errorMessage = '';
    return true;
  }

  isFormValid(): boolean {
    return !!(
      this.eventData.name &&
      this.eventData.description &&
      this.selectedCategory &&
      this.categories.length > 0 &&
      this.eventData.guestNumber &&
      this.eventData.type &&
      this.eventData.location &&
      this.eventData.startDate &&
      this.eventData.endDate &&
      this.eventData.organizer
    );
  }

  createEvent(): void {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    if (!this.validateDateOrder()) {
      return;
    }

    const formData = new FormData();
    const dto = {
      name: this.eventData.name,
      description: this.eventData.description,
      categories: this.eventData.categories,
      guestNumber: Number(this.eventData.guestNumber),
      type: this.eventData.type,
      location: this.eventData.location,
      startDate: this.eventData.startDate,
      endDate: this.eventData.endDate,
      eventType: this.selectedEventType ?? '',
      organizer: this.eventData.organizer
    };

    formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    if (this.selectedFile) {
      const name = this.eventData.name;
      const filename = `${name}.png`;
      formData.append('photo', this.selectedFile, filename);
    }

    this.eventService.createEvent(formData).subscribe({
      next: (response: any) => {
        console.log('Creating event successful: ', response);
        this.errorMessage = '';

        this.showModal = true;
        this.showOkButton = true;
        if (this.eventData.type === 'CLOSED' && response?.id) {
          this.dialog.open(InvitationPopupComponent, {
            width: '600px',

            data: { eventId: Number(response.id), maxGuests: Number(this.eventData.guestNumber) }
          });
        }

      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Event already exists.';
        } else {
          this.errorMessage = 'Error creating event. Please try again.';
        }
        console.error(err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  closeModal() {
    this.showModal = false;
    this.closePopupEvent.emit();
  }
}

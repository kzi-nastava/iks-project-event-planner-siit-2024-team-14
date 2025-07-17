import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FilterParams} from '../model/filter-params.model';
import {Category} from '../model/category.model';
import {EventType} from '../model/event-type.model';
import {CategoryService} from '../category.service';
import {EventTypeManagementService} from '../../components/event-type-management/event-type-management.service';

@Component({
  selector: 'app-solution-filters',
  templateUrl: './solution-filters.component.html',
  styleUrl: './solution-filters.component.css'
})
export class SolutionFiltersComponent implements OnInit {
  @Output() public onFilter = new EventEmitter<FilterParams>();

  @Input()
  public set filters(filters: FilterParams) {
    this.params = {...filters}
  }

  @Input({required: false, transform: (v: any) => v !== undefined && v !== false})
  public showType= false;

  protected params = {} as FilterParams;
  allCategories = [] as Category[];
  allEventTypes = [] as EventType[];


  onSubmit() {
    this.onFilter.emit(this.params);
  }

  public clear() {
    this.params = {};
  }


  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: categories => this.allCategories = categories
    });

    this.eventTypeService.getAllEventTypes()
      .subscribe(types => this.allEventTypes = types as EventType[]); //blah
  }


  categoryService = inject(CategoryService);
  eventTypeService = inject(EventTypeManagementService);
  formFieldAppearance: 'fill' | 'outline' = 'outline';
}

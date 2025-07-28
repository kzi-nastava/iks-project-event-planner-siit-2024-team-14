import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from '../../../offerings/model/category.model';
import {CategoryService} from '../../../offerings/category.service';
import {EventBudgetService} from '../event-budget.service';
import {BudgetItem} from '../model/budget-item.model';
import {NgForm} from '@angular/forms';
import {SolutionCategory} from '../../../interfaces/solution-category.model';

@Component({
  selector: 'app-add-event-budget-item',
  templateUrl: './add-event-budget-item.component.html',
  styleUrl: './add-event-budget-item.component.css'
})
export class AddEventBudgetItemComponent implements OnInit {

  @Input() event: any = { id: null };
  @Output() cancel = new EventEmitter<void>();
  @Output() budgetItemSubmit = new EventEmitter<BudgetItem>();

  @ViewChild("itemForm") itemForm!: NgForm;
  item: BudgetItem = { category: { id: null } as unknown as Category, amount: 0 } as BudgetItem;
  categories: Category[] = [];


  constructor(private categoryService: CategoryService, private budgetService: EventBudgetService) { }


  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: categories => {
        // Show only categories that don't already have a budget plan
        this.categories = categories.filter(category => !this.event.budget?.items?.some((item: BudgetItem) => item.category.id === category.id));
      },
      error: console.error
    })
  }


  protected submitBudgetItem() {
    if (this.itemForm.valid) {
      this.budgetService.addEventBudgetItem(this.event.id, this.item.category.id, this.item.amount).subscribe({
        next: item => {
          this.itemForm.resetForm();
          this.budgetItemSubmit.emit(item);
        },
        error: console.error
      });
    }
  }

  // TODO: add suggested categories based on event type
}

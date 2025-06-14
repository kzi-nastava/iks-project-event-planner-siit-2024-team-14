import {Component, Input, OnInit} from '@angular/core';
import {EventBudgetService} from './event-budget.service';
import {Budget} from './model/budget.model';

@Component({
  selector: 'app-event-budget',
  templateUrl: './event-budget.component.html',
  styleUrl: './event-budget.component.css'
})
export class EventBudgetComponent implements OnInit {
  @Input({required: true})
  event: any = { id: null, budget: { items: [] } };

  constructor(private budgetService: EventBudgetService) { }


  deleteBudgetItem(item: any): void {
    this.budgetService.deleteEventBudgetItem(this.event.id, item.category.id).subscribe({
      next: () => {
        let items = this.budget.items;
        const i = items.indexOf(item);
        if (i != -1) {
          items.splice(i, 1);
          this.budget.amount -= item.amount;
        }
      },
      error: console.error
    });
  }


  updateBudgetItem(item: any, newAmount: number) {
    // maybe should change the amount immediately and then recover it if error occurs
    this.budgetService.updateEventBudgetItem(this.event.id, item.category.id, newAmount).subscribe({
      next: () => this.budget.amount += -item.amount + (item.amount = newAmount),
      error: console.error
    })
  }


  onBudgetItemAdded(item: any) {
    this.showAddBudgetItem &&= false;
    this.budget.items.push(item);
    this.budget.amount += item.amount;
    this.budget.spent += item.spent;
  }


  protected readonly Number = Number;
  protected editing_index = -1;
  protected showAddBudgetItem = false;

  get budget(): Budget {
    return this.event.budget;
  }

  ngOnInit(): void {
    this.budgetService.getEventBudget(this.event.id)
      .subscribe({
        next: budget => this.event.budget = budget,
        error: console.error,
      })
  }

}

import {Component, Input} from '@angular/core';
import {EventBudgetService} from './event-budget.service';

@Component({
  selector: 'app-event-budget',
  templateUrl: './event-budget.component.html',
  styleUrl: './event-budget.component.css'
})
export class EventBudgetComponent {
  @Input({required: false})
  event: { id: number, budget: { amount: number, spent: number, items: { amount: number, spent: number, category: any}[] } } = { id: -1, budget: { items: [{ category: "Catering", amount: 0, spent: 0 }, { category: "Sth", amount: 1, spent: 0 }], amount: 0, spent: 0 } } as any;


  constructor(private budgetService: EventBudgetService) {
  }


  deleteBudgetItem(item: any): void {
    this.budgetService.deleteEventBudgetItem(this.event.id, item.category.id).subscribe({
      next: () => {
        let items = this.event.budget?.items;
        const i = items.indexOf(item);
        if (i != -1) {
          items.splice(i, 1);
        }
      },
      error: console.error
    });
  }


  updateBudgetItem(item: any, newAmount: number) {
    // maybe should change the amount immediately and then recover it if error occurs
    this.budgetService.updateEventBudgetItem(this.event.id, item.category.id, newAmount).subscribe({
      next: () => item.amount = newAmount,
      error: console.error
    })
  }


  protected readonly Number = Number;
  protected editing_index: number = -1;
}

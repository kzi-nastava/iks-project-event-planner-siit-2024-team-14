import {BudgetItem} from './budget-item.model';

export interface Budget {
  event: any;
  amount: number;
  spent: number;
  items: BudgetItem[];
}

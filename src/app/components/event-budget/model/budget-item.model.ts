import {BudgetItemSolution} from './budget-item-solution.model';
import {SolutionCategory} from '../../../interfaces/solution-category.model';
import {Category} from '../../../offerings/model/category.model';

export interface BudgetItem {
  category: Category;
  amount: number;
  spent: number;
  items: BudgetItemSolution[];
}

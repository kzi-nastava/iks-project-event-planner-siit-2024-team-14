import {SolutionCategory} from './solution-category.model';

export interface EventType {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  categories: SolutionCategory[];
}

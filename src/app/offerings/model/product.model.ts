import {Offering} from './offering.model';
import {Category} from './category.model';
import {EventType} from './event-type.model';

export interface Product extends Offering {
  price: number
  discount: number
  category: Category
  applicableEventTypes: EventType[];

}

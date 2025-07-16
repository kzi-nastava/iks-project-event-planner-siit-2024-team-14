import {BaseEntity} from './base-entity.model';
import {Category} from './category.model';
import {EventType} from './event-type.model';

/**
 * Represents an offering (product or service) in the application.
 * This interface is designed to encapsulate the essential details required
 * to display quick information cards for services/products in the application UI.
 */
export interface Offering extends BaseEntity {
  provider: any;
  providerId: number;

  name: string;
  description: string;
  imageUrl: string;

  category: Category;
  applicableEventTypes: EventType[];
  price: number;
  discount: number;
}

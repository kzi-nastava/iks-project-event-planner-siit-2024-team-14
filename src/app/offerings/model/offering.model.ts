import {BaseEntity} from './base-entity.model';

/**
 * Represents an offering (product or service) in the application.
 * This interface is designed to encapsulate the essential details required
 * to display quick information cards for services/products in the application UI.
 */
export interface Offering extends BaseEntity {
  name: string;
  description?: string;
  coverImageURL?: string;
}

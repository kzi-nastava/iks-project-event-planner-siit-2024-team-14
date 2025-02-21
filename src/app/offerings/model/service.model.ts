import { Offering } from './offering.model';
import { Category } from './category.model';
import { EventType } from './event-type.model';

export interface Service extends Offering {
  // TODO: Revisit.
  category: Category;
  applicableEventTypes: EventType[];
  price: number;
  discount: number;
  imageURLs: string[];

  visibility: string;
  reservationType: string;
  isAvailable: boolean;

  duration?: number;
  minDuration?: number;
  maxDuration?: number;
  reservationPeriod: number;
  cancellationPeriod: number;

  provider: any;
}

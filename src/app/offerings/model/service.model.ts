import { Offering } from './offering.model';
import { Category } from './category.model';
import { EventType } from './event-type.model';

export interface Service extends Offering {
  // TODO: Revisit.
  category: Category;
  applicableEventTypes: EventType[];

  specificities: string;
  price: number;
  discount: number;
  imageURLs: string[];

  visibility: 'public' | 'private' | 'pending';
  reservationPolicy: 'manual' | 'auto';
  isAvailable: boolean;

  sessionDuration?: number;
  minDuration?: number;
  maxDuration?: number;
  reservationPeriod: number;
  cancellationPeriod: number;

  provider: any;
}

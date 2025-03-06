import { Offering } from './offering.model';
import { Category } from './category.model';
import { EventType } from './event-type.model';

export interface Service extends Offering {
  // TODO: Revisit.
  id: number;
  category: Category;
  applicableEventTypes: EventType[];
  price: number;
  discount: number;
  imageURLs: string[];

  visibility: string;
  reservationType: string;
  isAvailable: boolean;

  duration?: string;
  minDuration?: string;
  maxDuration?: string;
  reservationPeriod: string;
  cancellationPeriod: string;

  durationInMinutes: number;
  minDurationInMinutes: number;
  maxDurationInMinutes: number;
  reservationPeriodInDays: number;
  cancellationPeriodInDays: number;

  provider: any;
  providerId: number;
}

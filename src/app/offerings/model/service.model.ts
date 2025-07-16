import { Offering } from './offering.model';
import { Category } from './category.model';
import { EventType } from './event-type.model';

export interface Service extends Offering {
  visibility: 'PUBLIC' | 'PRIVATE' | 'PENDING';
  reservationType: 'AUTOMATIC' | 'MANUAL';
  isAvailable: boolean;

  duration?: string;
  minDuration?: string;
  maxDuration?: string;
  reservationPeriod: string;
  cancellationPeriod: string;

  durationMinutes: number;
  minDurationMinutes: number;
  maxDurationMinutes: number;
  reservationPeriodDays: number;
  cancellationPeriodDays: number;
}

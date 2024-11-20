import { BaseEntity } from './base-entity.model';

export interface EventType extends BaseEntity {
  name: string;
  description?: string;
}

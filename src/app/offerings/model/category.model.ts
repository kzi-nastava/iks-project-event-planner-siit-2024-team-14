import { BaseEntity } from './base-entity.model';

export interface Category extends BaseEntity {
  name: string;
  description: string;
}
